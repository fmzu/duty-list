import { vValidator } from "@hono/valibot-validator"
import { eq } from "drizzle-orm"
import { drizzle } from "drizzle-orm/d1"
import { HTTPException } from "hono/http-exception"
import { nullable, object, string } from "valibot"
import { apiFactory } from "~/interface/api-factory"
import { schema } from "~/lib/schema"

const app = apiFactory.createApp()
/**
 * 当番作業の項目
 */
export const taskItemsRoutes = app
  /**
   * 作業項目を追加する
   */
  .post(
    "/task-items",
    vValidator(
      "json",
      object({
        name: string(),
        overview: string(),
        tagId: nullable(string()),
      }),
    ),
    async (c) => {
      const json = c.req.valid("json")

      const db = drizzle(c.env.DB)

      const itemId = crypto.randomUUID()

      await db.insert(schema.taskItems).values({
        id: itemId,
        name: json.name,
        overview: json.overview,
        tagId: json.tagId,
      })

      return c.json({})
    },
  )
  /**
   * 複数の作業項目を取得する
   */
  .get("/task-items", async (c) => {
    const db = drizzle(c.env.DB, { schema })

    const itemId = c.req.param("taskItem")

    const taskItems = await db.query.taskItems.findMany({
      with: { tag: true },
    })

    const taskItemsJson = taskItems.map((taskItem) => {
      return {
        ...taskItem,
      }
    })

    return c.json(taskItemsJson)
  })
  /**
   * 任意の作業項目を取得する
   */
  .get("/task-items/:taskItem", async (c) => {
    const db = drizzle(c.env.DB, { schema })

    const itemId = c.req.param("taskItem")

    const taskItem = await db.query.taskItems.findFirst({
      where: eq(schema.taskItems.id, itemId),
      with: { tag: true },
    })

    if (taskItem === undefined) {
      throw new HTTPException(404, { message: "Not found" })
    }

    const taskItemJson = { ...taskItem }

    return c.json(taskItemJson)
  })
  /**
   * 任意の作業項目を修正する
   */
  .put(
    "/task-items/:taskItem",
    vValidator(
      "json",
      object({
        name: string(),
        overview: string(),
        tagId: nullable(string()),
      }),
    ),
    async (c) => {
      const db = drizzle(c.env.DB)

      const itemId = c.req.param("taskItem")

      const json = c.req.valid("json")

      await db
        .update(schema.taskItems)
        .set({
          name: json.name,
          overview: json.overview,
          tagId: json.tagId,
        })
        .where(eq(schema.taskItems.id, itemId))

      return c.json({})
    },
  )
  /**
   * 任意の当番を削除する
   */
  .delete("/task-items/:taskItem", async (c) => {
    const db = drizzle(c.env.DB)

    const itemId = c.req.param("taskItem")

    await db.delete(schema.taskItems).where(eq(schema.taskItems.id, itemId))

    return c.json({})
  })
