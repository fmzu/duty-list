import { Link } from "@remix-run/react"
import { Card } from "~/components/ui/card"

/**
 * カードの中に日付と担当者を表示する
 * URLを日付にする
 * @returns
 */
export function TaskCard() {
  return (
    <Card className="p-4">
      <Link to="/roster/1">
        <div className="flex gap-x-2 items-end">
          <p className="text-2xl">{"10月16日"}</p>
          <p className="items-center justify-center">{"水曜日"}</p>
        </div>
      </Link>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <p>{"担当者: "}</p>
          <p>{"props.name"}</p>
        </div>
        {/* <div className="flex items-center space-x-2">
          <p>{"午前: "}</p>
          <UserSelect />
        </div>
        <div className="flex items-center space-x-2">
          <p>{"午後: "}</p>
          <UserSelect />
        </div> */}
      </div>
    </Card>
  )
}
