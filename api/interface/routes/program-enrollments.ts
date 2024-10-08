import { eq } from "drizzle-orm"
import { drizzle } from "drizzle-orm/d1"
import { HTTPException } from "hono/http-exception"
import { apiFactory } from "~/interface/api-factory"
import { schema } from "~/lib/schema"

const app = apiFactory.createApp()
/**
 * 一つの講義に対する生徒たちの登録
 */
export const programEnrollmentsRoutes = app
  /**
   * 登録を作成する
   */
  .post("/programs/:program/enrollments", async (c) => {
    return c.json({})
  })
  /**
   * 複数の登録を取得する
   */
  .get("/programs/:program/enrollments", async (c) => {
    const db = drizzle(c.env.DB, { schema })

    const enrollments = await db.query.enrollments.findMany()

    const enrollmentsJson = enrollments.map((enrollment) => {
      return {
        ...enrollment,
      }
    })

    return c.json(enrollmentsJson)
  })
  /**
   * 任意の登録を取得する
   */
  .get("/programs/:program/enrollments/:enrollment", async (c) => {
    const db = drizzle(c.env.DB, { schema })

    const enrollmentId = c.req.param("enrollment")

    const enrollment = await db.query.enrollments.findFirst({
      where: eq(schema.enrollments.id, enrollmentId),
    })

    if (enrollment === undefined) {
      throw new HTTPException(404, { message: "Not found" })
    }

    const enrollmentJson = { ...enrollment }

    return c.json(enrollmentJson)
  })
  /**
   * 任意の登録を修正する
   */
  .put("/programs/:program/enrollments/:enrollment", async (c) => {
    return c.json({})
  })
  /**
   * 任意の登録を削除する
   */
  .delete("/programs/:program/enrollments/:enrollment", async (c) => {
    return c.json({})
  })
