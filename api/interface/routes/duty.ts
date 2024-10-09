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
   * 複数の講義を取得する
   */
  .get("/programs", async (c) => {
    const db = drizzle(c.env.DB, { schema })

    const programs = await db.query.programs.findMany()

    const programsJson = programs.map((program) => {
      return {
        ...program,
      }
    })

    return c.json(programsJson)
  })
  /**
   * 任意の講義を取得する
   */
  .get("/programs/:program", async (c) => {
    const db = drizzle(c.env.DB, { schema })

    const programId = c.req.param("program")

    const program = await db.query.programs.findFirst({
      where: eq(schema.programs.id, programId),
    })

    if (program === undefined) {
      throw new HTTPException(404, { message: "Not found" })
    }

    const programJson = { ...program }

    return c.json(programJson)
  })
