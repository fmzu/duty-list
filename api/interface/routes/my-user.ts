import { eq } from "drizzle-orm"
import { drizzle } from "drizzle-orm/d1"
import { HTTPException } from "hono/http-exception"
import { schema } from "~/lib/schema"
import { apiFactory } from "../api-factory"

const app = apiFactory.createApp()

export const myUserRoutes = app
  /**
   * 任意のユーザーを取得する
   */
  .get("my/user", async (c) => {
    const db = drizzle(c.env.DB, { schema })

    const auth = c.get("authUser")

    const authUserEmail = auth.token?.email ?? null

    if (authUserEmail === null) {
      throw new HTTPException(401, { message: "Unauthorized" })
    }

    const user = await db.query.users.findFirst({
      where: eq(schema.users.email, authUserEmail),
    })

    if (user === undefined) {
      throw new HTTPException(404, { message: "Not found" })
    }

    const userJson = { ...user }

    return c.json(userJson)
  })
  /**
   * 任意のユーザーを修正する
   */
  .put("my-user/:my-user", async (c) => {
    return c.json({})
  })
