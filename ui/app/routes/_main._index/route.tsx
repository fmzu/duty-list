import type { MetaFunction } from "@remix-run/node"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { TaskCard } from "~/routes/_main._index/components/task-card"

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
 * 今日の日付は一番上にする
 * トイレ掃除とかゴミ捨ての頻度を表示する（何日以上してなかったら赤文字で表示する）
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
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
      </div>
    </main>
  )
}
