import { vValidator } from "@hono/valibot-validator"
import { eq } from "drizzle-orm"
import { drizzle } from "drizzle-orm/d1"
import { HTTPException } from "hono/http-exception"
import { object, string } from "valibot"
import { apiFactory } from "~/interface/api-factory"
import { schema } from "~/lib/schema"

const app = apiFactory.createApp()
/**
 * 当番作業のタグ、大枠のカテゴリー
 * タグの追加、取得（複数、一つ）、修正、削除
 * taskも一緒に取得する
 */
export const tagsRoutes = app
  .post(
    "/tags",
    vValidator(
      "json",
      object({
        name: string(),
      }),
    ),
    async (c) => {
      const json = c.req.valid("json")

      const db = drizzle(c.env.DB)

      const tagId = crypto.randomUUID()

      await db.insert(schema.tags).values({
        id: tagId,
        name: json.name,
      })

      return c.json({})
    },
  )
  /**
   * 複数のタグを取得する
   */
  .get("/tags", async (c) => {
    const db = drizzle(c.env.DB, { schema })

    const tags = await db.query.tags.findMany({
      with: { taskItems: true },
    })

    const tagsJson = tags.map((tag) => {
      return {
        ...tag,
      }
    })

    return c.json(tagsJson)
  })
  /**
   * 任意のタグを取得する
   * 連携するtaskも連携する
   */
  .get("/tags/:tag", async (c) => {
    const db = drizzle(c.env.DB, { schema })

    const tagId = c.req.param("tag")

    const tag = await db.query.tags.findFirst({
      where: eq(schema.tags.id, tagId),
      with: { taskItems: true },
    })

    if (tag === undefined) {
      throw new HTTPException(404, { message: "Not found" })
    }

    const tagJson = { ...tag }

    return c.json(tagJson)
  })
  .put(
    "/tags/:tag",
    vValidator(
      "json",
      object({
        name: string(),
      }),
    ),
    async (c) => {
      const db = drizzle(c.env.DB)

      const tagId = c.req.param("tag")

      const json = c.req.valid("json")

      await db
        .update(schema.tags)
        .set({
          name: json.name,
        })
        .where(eq(schema.tags.id, tagId))

      return c.json({})
    },
  )
  .delete("/tags/:tag", async (c) => {
    const db = drizzle(c.env.DB)

    const tagId = c.req.param("tag")

    await db.delete(schema.tags).where(eq(schema.tags.id, tagId))

    return c.json({})
  })
