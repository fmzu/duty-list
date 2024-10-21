import { vValidator } from "@hono/valibot-validator"
import { eq } from "drizzle-orm"
import { drizzle } from "drizzle-orm/d1"
import { HTTPException } from "hono/http-exception"
import { nullable, object, string } from "valibot"
import { schema } from "~/lib/schema"
import { apiFactory } from "../api-factory"

const app = apiFactory.createApp()
/**
 * 当番
 * 当番作業の追加、取得（複数、一つ）、修正、削除
 * 管理者は当番作業をの操作をすべて行うことができる
 * 一般ユーザは当番作業の取得のみ行うことができる
 * 必須事項に色がついているか努力事項を分けて記載してあるとわかりやすい
 */
export const taskRoutes = app
  .post(
    "/tasks",
    vValidator(
      "json",
      object({
        name: string(),
        // ownerId: nullable(string()),
        overview: nullable(string()),
      }),
    ),
    async (c) => {
      const json = c.req.valid("json")

      const db = drizzle(c.env.DB)

      const taskId = crypto.randomUUID()

      await db.insert(schema.tasks).values({
        id: taskId,
        name: json.name,
        overview: json.overview,
      })

      return c.json({})
    },
  )
  /**
   * 複数の当番を取得する
   */
  .get("/tasks", async (c) => {
    const db = drizzle(c.env.DB, { schema })

    const task = await db.query.tasks.findMany({
      with: { owner: true, tag: true, roster: true },
    })

    const taskJson = task.map((task) => {
      return {
        ...task,
      }
    })

    return c.json(taskJson)
  })
  /**
   * 任意の当番を取得する
   */
  .get("/tasks/:task", async (c) => {
    const db = drizzle(c.env.DB, { schema })

    const taskId = c.req.param("task")

    const task = await db.query.tasks.findFirst({
      where: eq(schema.tasks.id, taskId),
      with: { owner: true, tag: true, roster: true },
    })

    if (task === undefined) {
      throw new HTTPException(404, { message: "Not found" })
    }

    const taskJson = { ...task }

    return c.json(taskJson)
  })
  /**
   * 当番を更新する
   */
  .put(
    "/tasks/:task",
    vValidator(
      "json",
      object({
        name: string(),
        overview: nullable(string()),
      }),
    ),
    async (c) => {
      const db = drizzle(c.env.DB)

      const taskId = c.req.param("task")

      const json = c.req.valid("json")

      await db
        .update(schema.tasks)
        .set({
          name: json.name,
          overview: json.overview,
        })
        .where(eq(schema.tasks.id, taskId))

      return c.json({})
    },
  )
  /**
   * 任意の当番を削除する
   */
  .delete("/tasks/:task", async (c) => {
    const db = drizzle(c.env.DB)

    const taskId = c.req.param("task")

    await db.delete(schema.tasks).where(eq(schema.tasks.id, taskId))

    return c.json({})
  })
