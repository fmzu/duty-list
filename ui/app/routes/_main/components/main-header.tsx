import { Link } from "@remix-run/react"
import { Button } from "~/components/ui/button"

export default function MainHeader() {
  return (
    <main className="p-8 container space-y-4 flex justify-end bg-slate-200">
      <Link to={"/sign/in"}>
        <Button>{"ログイン"}</Button>
      </Link>
    </main>
  )
}
