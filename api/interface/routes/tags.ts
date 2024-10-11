import { apiFactory } from "~/interface/api-factory"

const app = apiFactory.createApp()
/**
 * 当番作業のタグ、大枠のカテゴリー
 * タグの追加、取得（複数、一つ）、修正、削除
 */
export const tagsRoutes = app
  .post("/tags", async (c) => {
    return c.json({})
  })
  .get("/tags", async (c) => {
    return c.json({})
  })
  .get("/tags/:tag", async (c) => {
    return c.json({})
  })
  .put("/tags/:tag", async (c) => {
    return c.json({})
  })
  .delete("/tags/:tag", async (c) => {
    return c.json({})
  })
