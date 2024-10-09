import { verifyAuth } from "@hono/auth-js"
import { vValidator } from "@hono/valibot-validator"
import { genSaltSync, hashSync } from "bcrypt-ts"
import { eq } from "drizzle-orm"
import { drizzle } from "drizzle-orm/d1"
import { HTTPException } from "hono/http-exception"
import { object, string } from "valibot"
import { schema } from "~/lib/schema"
import { apiFactory } from "../api-factory"

const app = apiFactory.createApp()
/**
 * 自分のアカウントを取得、パスワードの修正をする
 */
export const myUserRoutes = app
  /**
   * 自分のアカウントを取得する
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
   * 自分のユーザーパスワードを更新する
   */
  .put(
    "my/user",
    vValidator(
      "json",
      object({
        password: string(),
      }),
    ),
    verifyAuth(),
    async (c) => {
      const json = c.req.valid("json")

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

      /**
       * パスワードをハッシュ化する
       */
      const salt = genSaltSync(10)

      const hashedPassword = hashSync(json.password, salt)

      await db
        .update(schema.users)
        .set({
          hashedPassword: hashedPassword,
        })
        .where(eq(schema.users.email, authUserEmail))

      return c.json({})
    },
  )
