import { drizzle } from "drizzle-orm/d1"
import { apiFactory } from "~/interface/api-factory"
import { schema } from "~/lib/schema"

const app = apiFactory.createApp()
/**
 * 自分の受講登録の一覧
 */
export const myEnrollmentsRoutes = app
  /**
   * 自分の受講登録の一覧を取得する
   */
  .get("my/enrollments", async (c) => {
    const db = drizzle(c.env.DB, { schema })

    const myEnrollments = await db.query.enrollments.findMany()

    const myEnrollmentsJson = myEnrollments.map((enrollment) => {
      return {
        ...enrollment,
      }
    })

    return c.json(myEnrollmentsJson)
  })
