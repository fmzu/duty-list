import type { MetaFunction } from "@remix-run/node"
import { Link } from "@remix-run/react"
import { DutyCard } from "~/routes/_main._index/components/duty-card"

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ]
}

export default function Route() {
  return (
    <main className="p-8 container space-y-4">
      <h1>{"当番管理"}</h1>
      <p className="flex justify-center">{"10月"}</p>
      <div>
        <Link to="/duty/1">
          <DutyCard />
        </Link>
        <Link to="/duty/2">
          <DutyCard />
        </Link>
        <Link to="/duty/3">
          <DutyCard />
        </Link>
        <Link to="/duty/4">
          <DutyCard />
        </Link>
        <Link to="/duty/5">
          <DutyCard />
        </Link>
      </div>
    </main>
  )
}
