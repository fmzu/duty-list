import { authHandler, initAuthConfig } from "@hono/auth-js"
import { apiFactory } from "~/interface/api-factory"
import { authConfig } from "~/interface/auth-config"
import { myUserRoutes } from "~/interface/routes/my-user"
import { tagsRoutes } from "~/interface/routes/tags"
import { taskItemsRoutes } from "~/interface/routes/task-items"
import { tasksRoutes } from "~/interface/routes/tasks"
import { usersRoutes } from "~/interface/routes/users"

export const api = apiFactory
  .createApp()
  .basePath("/api")
  .use("*", initAuthConfig(authConfig))
  .use("/auth/*", authHandler())
  .route("/", tasksRoutes)
  .route("/", usersRoutes)
  .route("/", myUserRoutes)
  .route("/", taskItemsRoutes)
  .route("/", tagsRoutes)
