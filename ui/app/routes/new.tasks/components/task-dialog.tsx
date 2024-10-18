import { useMutation, useSuspenseQuery } from "@tanstack/react-query"
import type { InferRequestType, InferResponseType } from "hono/client"
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
import { Separator } from "~/components/ui/separator"
import { client } from "~/lib/client"

type Props = {
  taskId: string
}

export default function TaskDialog(props: Props) {
  const data = useSuspenseQuery({
    /**
     * キャッシュするためのキー
     * ページごとに変える
     */
    queryKey: ["taskdialog", props.taskId],
    async queryFn() {
      const resp = await client.api.tasks[":task"].$get({
        param: { task: props.taskId },
      })

      const task = await resp.json()

      return task
    },
  })

  const endpoint = client.api.tasks[":task"]

  const deleteMutation = useMutation<
    InferResponseType<typeof endpoint.$delete>,
    Error,
    InferRequestType<typeof endpoint.$delete>
  >({
    async mutationFn(props) {
      const resp = await endpoint.$delete({
        param: props.param,
      })

      return await resp.json()
    },
  })

  const onDelete = async () => {
    await deleteMutation.mutateAsync({
      param: { task: props.taskId },
    })
    alert("ユーザを削除しました")

    data.refetch()
  }

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
          <Button className="w-full" variant={"secondary"} onClick={onDelete}>
            {"削除"}
          </Button>
        </div>
        <div>
          <p>{"編集"}</p>
          <div className="space-y-2">
            <p className="text-sm">{"現在の情報: "}</p>
            <Input
              placeholder={"現在の当番作業名"}
              value={data.data.name}
              readOnly
            />
            <Input
              placeholder={"現在の当番作業説明"}
              value={data.data.overview ?? ""}
              readOnly
            />
            <Separator />
            <Input placeholder={"作業名"} />
            <Input placeholder={"作業説明"} />
            <Button className="w-full">{"決定"}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
