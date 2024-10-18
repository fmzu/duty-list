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
  userId: string
}

export default function UserDialog(props: Props) {
  const data = useSuspenseQuery({
    /**
     * キャッシュするためのキー
     * ページごとに変える
     */
    queryKey: ["userdialog", props.userId],
    async queryFn() {
      const resp = await client.api.users[":user"].$get({
        param: { user: props.userId },
      })

      const user = await resp.json()

      return user
    },
  })

  const endpoint = client.api.users[":user"]

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
      param: { user: props.userId },
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
          <DialogTitle>{"ユーザの編集・削除"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-4">
            <p>{"削除"}</p>
            <Button className="w-full" variant={"secondary"} onClick={onDelete}>
              {"削除"}
            </Button>
          </div>
          <Separator />
          <div className="space-y-4">
            <p>{"編集"}</p>
            <div className="space-y-2">
              <p className="text-sm">{"現在の情報: "}</p>
              <Input
                placeholder={"現在のユーザ名"}
                value={data.data.name}
                readOnly
              />
              <Input
                placeholder={"現在のメールアドレス"}
                value={data.data.email}
                readOnly
              />
              <Separator />
              <p className="text-sm">{"新しい情報: "}</p>
              <Input placeholder={"ユーザ名"} />
              <Input placeholder={"メールアドレス"} />
              <Button className="w-full">{"決定"}</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
