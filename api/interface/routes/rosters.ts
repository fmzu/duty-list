import { vValidator } from "@hono/valibot-validator"
import { eq } from "drizzle-orm"
import { drizzle } from "drizzle-orm/d1"
import { HTTPException } from "hono/http-exception"
import { nullable, object, string } from "valibot"
import { schema } from "~/lib/schema"
import { apiFactory } from "../api-factory"

const app = apiFactory.createApp()

export const rostersRoutes = app
  /**
   * 当番作業表を作成する
   */
  .post(
    "/rosters",
    vValidator(
      "json",
      object({
        name: string(),
        amOwnerId: nullable(string()),
        pmOwnerId: nullable(string()),
        taskId: nullable(string()),
      }),
    ),
    async (c) => {
      const json = c.req.valid("json")

      const db = drizzle(c.env.DB)

      const rosterId = crypto.randomUUID()

      await db.insert(schema.rosters).values({
        id: rosterId,
        name: json.name,
        amOwnerId: json.amOwnerId,
        pmOwnerId: json.pmOwnerId,
        taskId: json.taskId,
      })

      return c.json({})
    },
  )
  /**
   * 複数の当番作業表を取得する
   */
  .get("/rosters", async (c) => {
    const db = drizzle(c.env.DB, { schema })

    const rosters = await db.query.rosters.findMany({
      with: { amOwner: true, pmOwner: true, task: true },
    })

    const rostersJson = rosters.map((roster) => {
      return {
        ...roster,
      }
    })

    return c.json(rostersJson)
  })
  /**
   * 任意の当番作業表を取得する
   */
  .get("/roster/:roster", async (c) => {
    const db = drizzle(c.env.DB, { schema })

    const rosterId = c.req.param("roster")

    const roster = await db.query.rosters.findFirst({
      where: eq(schema.rosters.id, rosterId),
      with: { amOwner: true, pmOwner: true, task: true },
    })

    if (roster === undefined) {
      throw new HTTPException(404, { message: "Not found" })
    }

    const rosterJson = {
      ...roster,
    }

    return c.json(rosterJson)
  })
  /**
   * 当番作業表を更新する
   */
  .put(
    "/roster/:roster",
    vValidator(
      "json",
      object({
        name: string(),
        amOwnerId: nullable(string()),
        pmOwnerId: nullable(string()),
        taskId: nullable(string()),
      }),
    ),
    async (c) => {
      const db = drizzle(c.env.DB)

      const rosterId = c.req.param("roster")

      const json = c.req.valid("json")

      await db
        .update(schema.rosters)
        .set({
          name: json.name,
          amOwnerId: json.amOwnerId,
          pmOwnerId: json.pmOwnerId,
          taskId: json.taskId,
        })
        .where(eq(schema.rosters.id, rosterId))

      return c.json({})
    },
  )
  /**
   * 当番作業表を削除する
   * あまり使うことはなさそう！
   */
  .delete("/roster/:roster", async (c) => {
    const db = drizzle(c.env.DB)

    const rosterId = c.req.param("roster")

    await db.delete(schema.rosters).where(eq(schema.rosters.id, rosterId))

    return c.json({})
  })
