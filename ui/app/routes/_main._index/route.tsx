import type { MetaFunction } from "@remix-run/node"
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
      <p className="flex justify-center text-lg">{"10月"}</p>
      <div className="space-y-2">
        <DutyCard />
        <DutyCard />
        <DutyCard />
        <DutyCard />
        <DutyCard />
      </div>
    </main>
  )
}
