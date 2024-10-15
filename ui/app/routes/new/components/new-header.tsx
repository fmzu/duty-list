import { Link, useLocation } from "@remix-run/react"
import { House } from "lucide-react"
import { Button } from "~/components/ui/button"

export default function NewHeader() {
  // 今いるページを取得する
  const location = useLocation()

  return (
    <header className="py-4 px-8 bg-gray-200 flex justify-start">
      <Link to="/">
        <Button variant={"secondary"}>
          <House className="w-4" />
        </Button>
      </Link>
    </header>
  )
}
