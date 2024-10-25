import { useMutation, useSuspenseQuery } from "@tanstack/react-query"
import type { InferRequestType, InferResponseType } from "hono/client"
import { EllipsisVertical } from "lucide-react"
import { useState } from "react"
import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"
import { client } from "~/lib/client"

type Props = {
  tagId: string
}

export default function TagDialog(props: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)

  const closeModal = () => setIsOpen(false)

  const data = useSuspenseQuery({
    /**
     * キャッシュするためのキー
     * ページごとに変える
     */
    queryKey: ["tagdialog", props.tagId],
    async queryFn() {
      const resp = await client.api.tags[":tag"].$get({
        param: { tag: props.tagId },
      })

      const tag = await resp.json()

      return tag
    },
  })

  const endpoint = client.api.tags[":tag"]

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
      param: { tag: props.tagId },
    })
    alert("ユーザを削除しました")
    window.location.reload()

    data.refetch()
  }

  const putMutation = useMutation<
    InferResponseType<typeof endpoint.$put>,
    Error,
    InferRequestType<typeof endpoint.$put>
  >({
    async mutationFn() {
      const resp = await endpoint.$put({
        param: { tag: props.tagId },
        json: {
          name: name,
        },
      })

      const json = await resp.json()

      return json
    },
  })

  const [name, setName] = useState(data.data.name)

  const onSubmit = async () => {
    const result = await putMutation.mutateAsync({
      param: { tag: props.tagId },
      json: {
        name: name,
      },
    })

    alert("当番作業情報を更新しました")
    window.location.reload()
    data.refetch()

    if (result === null) {
      return
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild onClick={openModal}>
        <Button variant={"secondary"}>
          <EllipsisVertical className="w-4" />
        </Button>
      </DialogTrigger>
      {isOpen && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{"タグの編集・削除"}</DialogTitle>
          </DialogHeader>
          <div>
            <p>{"削除"}</p>
            <Button
              className="w-full"
              variant={"secondary"}
              onClick={() => {
                onDelete()
                closeModal()
              }}
            >
              {"削除"}
            </Button>
          </div>
          <div className="space-y-2">
            <p>{"編集"}</p>
            <div className="space-y-2">
              <p className="text-sm">{"現在の情報: "}</p>
              <Input
                placeholder={"現在の当番作業名"}
                value={data.data.name}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <p className="text-sm">{"新しい情報: "}</p>
              <Input
                placeholder={"新しい当番作業名"}
                value={name}
                onChange={(event) => {
                  // 入力値をステートに設定
                  setName(event.target.value)
                }}
              />
              <Button
                className="w-full"
                onClick={() => {
                  onSubmit()
                  closeModal()
                }}
              >
                {"決定"}
              </Button>
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  )
}
