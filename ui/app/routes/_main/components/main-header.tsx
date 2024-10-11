import { signOut } from "@hono/auth-js/react"
import { Link, useLocation } from "@remix-run/react"
import { House } from "lucide-react"
import { Button } from "~/components/ui/button"

export default function MainHeader() {
  // 今いるページを取得する
  const location = useLocation()

  return (
    <header className="py-4 px-8 bg-gray-200 flex justify-between">
      <Link to="/">
        <Button variant={"secondary"}>
          <House className="w-4" />
        </Button>
      </Link>
      <div className="flex gap-x-2">
        <Button
          className="flex space-x-2 w-full"
          variant={"secondary"}
          onClick={() => {
            signOut()
            alert("ログアウトしました")
          }}
        >
          {"ログアウト"}
        </Button>
      </div>
    </header>
  )
}
