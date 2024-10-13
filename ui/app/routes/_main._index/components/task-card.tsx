import { Link } from "@remix-run/react"
import { Card } from "~/components/ui/card"
import { UserSelect } from "~/routes/_main._index/components/user-select"

export function TaskCard() {
  return (
    <Card className="p-4">
      <Link to="/roster/1">
        <div className="flex gap-x-2 items-end">
          <p className="text-2xl">{"10月08日"}</p>
          <p className="items-center justify-center">{"火曜日"}</p>
        </div>
      </Link>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <p>{"午前: "}</p>
          <UserSelect />
        </div>
        <div className="flex items-center space-x-2">
          <p>{"午後: "}</p>
          <UserSelect />
        </div>
      </div>
    </Card>
  )
}
