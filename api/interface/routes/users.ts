import { vValidator } from "@hono/valibot-validator"
import { genSaltSync, hashSync } from "bcrypt-ts"
import { eq } from "drizzle-orm"
import { drizzle } from "drizzle-orm/d1"
import { HTTPException } from "hono/http-exception"
import { number, object, string } from "valibot"
import { apiFactory } from "~/interface/api-factory"
import { schema } from "~/lib/schema"

const app = apiFactory.createApp()

export const usersRoutes = app
  /**
   * アカウントを作成する
   * @deprecated
   */
  .post(
    "/users",
    vValidator(
      "json",
      object({
        email: string(),
        password: string(),
        name: string(),
        role: number(),
      }),
    ),
    async (c) => {
      const json = c.req.valid("json")

      const db = drizzle(c.env.DB)
      /**
       * パスワードをハッシュ化する
       */
      const salt = genSaltSync(10)

      const hashedPassword = hashSync(json.password, salt)

      const userUuid = crypto.randomUUID()

      await db.insert(schema.users).values({
        id: userUuid,
        email: json.email,
        hashedPassword: hashedPassword,
        login: crypto.randomUUID(),
        name: json.name,
        role: json.role,
      })

      return c.json({}, {})
    },
  )
  /**
   * たくさんのアカウントを取得する
   */
  .get("/users", async (c) => {
    const db = drizzle(c.env.DB)

    const users = await db.select().from(schema.users)

    if (users === undefined) {
      throw new HTTPException(500, { message: "Not Found" })
    }

    const usersJson = users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        role: user.role,
        email: user.email,
      }
    })

    return c.json(usersJson)
  })
  /**
   * 一つのアカウントを取得する
   */
  .get("/users/:user", async (c) => {
    const db = drizzle(c.env.DB)

    const userId = c.req.param("user")

    const user = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, userId))
      .get()

    if (user === undefined) {
      throw new HTTPException(500, { message: "Not Found" })
    }

    const userJson = {
      id: user.id,
      name: user.name,
      role: user.role,
      email: user.email,
      isDeleted: user.isDeleted,
    }

    return c.json(userJson)
  })
  /**
   * アカウントを更新する
   */
  .put("/users/:user", async (c) => {
    return c.json({})
  })
  /**
   * アカウントを削除する
   */
  .delete("/users/:user", async (c) => {
    const db = drizzle(c.env.DB)

    const userId = c.req.param("user")

    await db.delete(schema.users).where(eq(schema.users.id, userId))

    return c.json({})
  })
