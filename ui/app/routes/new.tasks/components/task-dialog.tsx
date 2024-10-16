import type {} from "hono/client"
import { EllipsisVertical } from "lucide-react"
import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"

export default function TaskDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"secondary"}>
          <EllipsisVertical className="w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{"当番作業の編集・削除"}</DialogTitle>
        </DialogHeader>
        <div>
          <p>{"削除"}</p>
          <Button className="w-full" variant={"secondary"}>
            {"削除"}
          </Button>
        </div>
        <div>
          <p>{"編集"}</p>
          <div className="space-y-2">
            <Input placeholder={"作業名"} />
            <Input placeholder={"作業説明"} />
            <Button className="w-full">{"決定"}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
