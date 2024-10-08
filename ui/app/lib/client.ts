import { hc } from "hono/client"
import type { Api } from "~/../api"

export const client = hc<Api>("/")
