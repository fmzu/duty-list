import { authHandler, initAuthConfig } from "@hono/auth-js"
import { apiFactory } from "~/interface/api-factory"
import { authConfig } from "~/interface/auth-config"
import { adminProgramsRoutes } from "~/interface/routes/admin-programs"
import { adminUsersRoutes } from "~/interface/routes/admin-users"
import { myEnrollmentsRoutes } from "~/interface/routes/my-enrollments"
import { myUserRoutes } from "~/interface/routes/my-user"
import { usersRoutes } from "~/interface/routes/users"
import { programEnrollmentsRoutes } from "./routes/program-enrollments"
import { programsRoutes } from "./routes/programs"

export const api = apiFactory
  .createApp()
  .basePath("/api")
  .use("*", initAuthConfig(authConfig))
  .use("/auth/*", authHandler())
  .route("/", programsRoutes)
  .route("/", programEnrollmentsRoutes)
  .route("/users", usersRoutes)
  .route("/", adminProgramsRoutes)
  .route("/", adminUsersRoutes)
  .route("/", myEnrollmentsRoutes)
  .route("/", myUserRoutes)
