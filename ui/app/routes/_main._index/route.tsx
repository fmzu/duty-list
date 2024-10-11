import type { MetaFunction } from "@remix-run/node"
import { Link } from "@remix-run/react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DutyCard } from "~/routes/_main._index/components/duty-card"

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ]
}

/**
 * カレンダーのように当番を管理するページ
 * 日付と午前午後の当番担当者を表示する
 * 土日祝日は色を変えるか、表示しない
 * @returns
 */
export default function Route() {
  return (
    <main className="p-8 container space-y-4">
      <h1 className="font-bold">{"当番管理"}</h1>
      <div className="flex space-x-2 justify-center items-center">
        <ChevronLeft />
        <p className="flex justify-center text-2xl font-bold">{"10月"}</p>
        <ChevronRight />
      </div>
      <div className="flex flex-col gap-y-2">
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
