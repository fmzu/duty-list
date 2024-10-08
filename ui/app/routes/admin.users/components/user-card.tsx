import { Link } from "@remix-run/react"
import { Button } from "~/components/ui/button"
import { Card } from "~/components/ui/card"

export default function UserCard() {
  return (
    <Link to="/admin/programs/">
      <Card className="flex p-4 justify-between items-center">
        <p>{"メールアドレス"}</p>
        <div className="space-x-2">
          <Button variant={"outline"}>{"編集"}</Button>
          <Button variant={"outline"}>{"削除"}</Button>
        </div>
      </Card>
    </Link>
  )
}
