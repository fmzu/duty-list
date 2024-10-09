import { eq } from "drizzle-orm"
import { drizzle } from "drizzle-orm/d1"
import { HTTPException } from "hono/http-exception"
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
