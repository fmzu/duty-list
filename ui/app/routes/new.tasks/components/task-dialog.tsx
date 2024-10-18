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
  taskId: string
}

export default function TaskDialog(props: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)

  const closeModal = () => setIsOpen(false)

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

  const putMutation = useMutation<
    InferResponseType<typeof endpoint.$put>,
    Error,
    InferRequestType<typeof endpoint.$put>
  >({
    async mutationFn() {
      const resp = await endpoint.$put({
        param: { task: props.taskId },
        json: {
          name: name,
          overview: overview,
        },
      })

      const json = await resp.json()

      return json
    },
  })

  const [name, setName] = useState(data.data.name)

  const [overview, setOverview] = useState(data.data.overview)

  const onSubmit = async () => {
    const result = await putMutation.mutateAsync({
      param: { task: props.taskId },
      json: {
        name: name,
        overview: overview,
      },
    })

    alert("当番作業情報を更新しました")

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
            <DialogTitle>{"当番作業の編集・削除"}</DialogTitle>
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
              <Input
                placeholder={"現在の当番作業説明"}
                value={data.data.overview ?? ""}
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
              <Input
                placeholder={"新しい当番作業名"}
                value={overview ?? ""}
                onChange={(event) => {
                  // 入力値をステートに設定
                  setOverview(event.target.value)
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
