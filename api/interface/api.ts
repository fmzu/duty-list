import { authHandler, initAuthConfig } from "@hono/auth-js"
import { apiFactory } from "~/interface/api-factory"
import { authConfig } from "~/interface/auth-config"
import { dutyRoutes } from "~/interface/routes/duty"
import { usersRoutes } from "~/interface/routes/users"

export const api = apiFactory
  .createApp()
  .basePath("/api")
  .use("*", initAuthConfig(authConfig))
  .use("/auth/*", authHandler())
  .route("/", dutyRoutes)
  .route("/", usersRoutes)
