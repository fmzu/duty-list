import { vValidator } from "@hono/valibot-validator"
import { genSaltSync, hashSync } from "bcrypt-ts"
import { eq } from "drizzle-orm"
import { drizzle } from "drizzle-orm/d1"
import { HTTPException } from "hono/http-exception"
import { object, string } from "valibot"
import { apiFactory } from "~/interface/api-factory"
import { schema } from "~/lib/schema"

const app = apiFactory.createApp()
/**
 * 管理者専用のユーザ画面
 */
export const adminUsersRoutes = app
  /**
   * 管理者がユーザを作成する
   */
  .post(
    "admin/users",
    vValidator(
      "json",
      object({
        email: string(),
        password: string(),
      }),
    ),
    async (c) => {
      const json = c.req.valid("json")

      const db = drizzle(c.env.DB)

      const salt = genSaltSync(10)

      const hashedPassword = hashSync(json.password, salt)

      const userUuid = crypto.randomUUID()
      /**
       * 0: 学生，1: 教員，2: 管理者
       * あとでオブジェクトにする
       */
      const roll = 0

      await db.insert(schema.users).values({
        id: userUuid,
        email: json.email,
        hashedPassword: hashedPassword,
        login: crypto.randomUUID(),
        name: crypto.randomUUID(),
        role: roll,
      })

      return c.json({}, {})
    },
  )
  /**
   * 複数のユーザを取得する
   */
  .get("admin/users", async (c) => {
    const db = drizzle(c.env.DB, { schema })

    const users = await db.query.users.findMany()

    if (users === undefined) {
      throw new HTTPException(500, { message: "Not Found" })
    }

    const usersJson = users.map((user) => {
      return {
        id: user.id,
        name: user.name,
      }
    })

    return c.json(usersJson)
  })
  /**
   * 任意のユーザを取得する
   */
  .get("admin/users/:user", async (c) => {
    const db = drizzle(c.env.DB, { schema })

    const userId = c.req.param("user")

    const user = await db.query.users.findFirst({
      where: eq(schema.users.id, userId),
    })
    if (user === undefined) {
      throw new HTTPException(500, { message: "Not Found" })
    }

    const userJson = {
      id: user.id,
      name: user.name,
    }

    return c.json(userJson)
  })
  /**
   * ユーザを更新する
   */
  .put("admin/users/:user", async (c) => {
    return c.json({})
  })
  /**
   * ユーザを削除する
   */
  .delete("admin/users/:user", async (c) => {
    const db = drizzle(c.env.DB)

    const userId = c.req.param("user")

    await db
      .update(schema.users)
      .set({ isDeleted: true })
      .where(eq(schema.users.id, userId))

    return c.json({})
  })
