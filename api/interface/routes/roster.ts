import { vValidator } from "@hono/valibot-validator"
import { drizzle } from "drizzle-orm/d1"
import { nullable, object, string } from "valibot"
import { schema } from "~/lib/schema"
import { apiFactory } from "../api-factory"

const app = apiFactory.createApp()

export const roster = app
  .post(
    "/rosters",
    vValidator(
      "json",
      object({
        name: string(),
        ownerId: nullable(string()),
      }),
    ),
    async (c) => {
      const json = c.req.valid("json")

      const db = drizzle(c.env.DB)

      const rosterId = crypto.randomUUID()

      await db.insert(schema.task).values({
        id: rosterId,
        name: json.name,
        ownerId: json.ownerId,
      })

      return c.json({})
    },
  )
  .get("/rosters", async (c) => {
    return c.json({})
  })
  .get("/roster/:roster", async (c) => {
    return c.json({})
  })
  .put("/rosters/:roster", async (c) => {
    return c.json({})
  })
  .delete("/rosters/:roster", async (c) => {
    return c.json({})
  })
