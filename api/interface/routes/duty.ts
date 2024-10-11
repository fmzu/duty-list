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
 */
export const dutyRoutes = app
  .post(
    "/duty",
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

      const dutyId = crypto.randomUUID()

      await db.insert(schema.duty).values({
        id: dutyId,
        name: json.name,
        overview: json.overview,
      })

      return c.json({})
    },
  )
  /**
   * 複数の当番を取得する
   */
  .get("/duty", async (c) => {
    const db = drizzle(c.env.DB, { schema })

    const duty = await db.query.duty.findMany()

    const dutyJson = duty.map((duty) => {
      return {
        ...duty,
      }
    })

    return c.json(dutyJson)
  })
  /**
   * 任意の当番を取得する
   */
  .get("/duty/:duty", async (c) => {
    const db = drizzle(c.env.DB, { schema })

    const dutyId = c.req.param("duty")

    const duty = await db.query.duty.findFirst({
      where: eq(schema.duty.id, dutyId),
    })

    if (duty === undefined) {
      throw new HTTPException(404, { message: "Not found" })
    }

    const dutyJson = { ...duty }

    return c.json(dutyJson)
  })
  /**
   * 任意の当番を修正する
   */
  .put("/duty/:duty", async (c) => {
    return c.json({})
  })
  /**
   * 任意の当番を削除する
   */
  .put("/duty/:duty", async (c) => {
    const db = drizzle(c.env.DB)

    const dutyId = c.req.param("duty")

    await db
      .update(schema.duty)
      .set({ isDeleted: true })
      .where(eq(schema.duty.id, dutyId))

    return c.json({})
  })
