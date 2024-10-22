import { Link, useLocation } from "@remix-run/react"
import { Menu } from "lucide-react"
import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { Separator } from "~/components/ui/separator"

export default function NewHeader() {
  // 今いるページを取得する
  const location = useLocation()

  return (
    <header className="py-4 px-8 bg-gray-200 flex justify-start">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant={"secondary"}>
            <Menu className="w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col w-56 justify-center items-center">
          <Link to="/">
            <DropdownMenuItem className="h-12">
              {"メインページ"}
            </DropdownMenuItem>
          </Link>
          <Separator />
          <Link to="/new/tags">
            <DropdownMenuItem className="h-12">{"タグ登録"}</DropdownMenuItem>
          </Link>
          <Separator />
          <Link to="/new/tasks">
            <DropdownMenuItem className="h-12">
              {"当番作業登録"}
            </DropdownMenuItem>
          </Link>
          <Separator />
          <Link to="/new/users">
            <DropdownMenuItem className="h-12">{"ユーザ登録"}</DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
