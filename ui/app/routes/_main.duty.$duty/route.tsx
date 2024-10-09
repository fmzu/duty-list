import { Link } from "@remix-run/react"
import { ArrowLeftIcon } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"

/**
 * チェックリストの当番作業一覧を表示する
 * この中で本日の担当を登録することができる
 * ボタン押したらページ開いてる人の名前が入るようにする
 * @returns
 */
export default function Route() {
  return (
    <main className="p-8 container space-y-4">
      <h1 className="font-bold">{"当番作業一覧"}</h1>
      <Link to="/">
        <Button variant={"secondary"}>
          <ArrowLeftIcon className="w-4" />
        </Button>
      </Link>
      <div>
        <p>{"午前"}</p>
        <Input placeholder="担当者" />
      </div>
      <div>
        <p>{"午後"}</p>
        <Input placeholder="担当者" />
      </div>
    </main>
  )
}
