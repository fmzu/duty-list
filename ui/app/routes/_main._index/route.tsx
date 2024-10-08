import type { MetaFunction } from "@remix-run/node"
import { Card } from "~/components/ui/card"
import { TimetableTable } from "./components/timetable-table"

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ]
}

export default function Route() {
  return (
    <div className="p-4">
      <p>{"2024年度前期履修登録"}</p>
      <Card>
        <TimetableTable />
      </Card>
    </div>
  )
}
