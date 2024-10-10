import { signOut } from "@hono/auth-js/react"
import { useLocation } from "@remix-run/react"
import { Button } from "~/components/ui/button"

export default function MainHeader() {
  // 今いるページを取得する
  const location = useLocation()

  // 今いるページと同じパスのボタンを黒くする

  return (
    <header className="p-4 bg-gray-300 flex justify-end">
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
