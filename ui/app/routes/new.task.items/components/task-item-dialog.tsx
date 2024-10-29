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
import { TagsSelect } from "~/routes/new.task.items/components/tags-select"

type Props = {
  itemId: string
}

export default function TaskItemDialog(props: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)

  const closeModal = () => setIsOpen(false)

  const data = useSuspenseQuery({
    /**
     * キャッシュするためのキー
     * ページごとに変える
     */
    queryKey: ["TaskItemDialog", props.itemId],
    async queryFn() {
      const resp = await client.api["task-items"][":taskItem"].$get({
        param: { taskItem: props.itemId },
      })

      const item = await resp.json()

      return item
    },
  })

  const endpoint = client.api["task-items"][":taskItem"]

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
      param: { taskItem: props.itemId },
    })
    alert("ユーザを削除しました")
    window.location.reload()

    data.refetch()
  }

  const [name, setName] = useState(data.data.name)

  const [overview, setOverview] = useState(data.data.overview)

  const [tagId, setTagId] = useState(data.data.tag?.id ?? null)

  const putMutation = useMutation<
    InferResponseType<typeof endpoint.$put>,
    Error,
    InferRequestType<typeof endpoint.$put>
  >({
    async mutationFn() {
      const resp = await endpoint.$put({
        param: { taskItem: props.itemId },
        json: {
          name: name,
          overview: overview,
          tagId: tagId,
        },
      })

      const json = await resp.json()

      return json
    },
  })

  const onSubmit = async () => {
    const result = await putMutation.mutateAsync({
      param: { taskItem: props.itemId },
      json: {
        name: name,
        overview: overview,
        tagId: tagId,
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
                placeholder={"現在の当番作業区分"}
                value={data.data.tag?.name ?? ""}
                readOnly
              />
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
              <TagsSelect tagId={tagId ?? ""} setTagId={setTagId} />
              <Input
                placeholder={"新しい当番作業名"}
                value={name}
                onChange={(event) => {
                  // 入力値をステートに設定
                  setName(event.target.value)
                }}
              />
              <Input
                placeholder={"新しい当番作業説明"}
                value={overview ?? ""}
                onChange={(event) => {
                  // 入力値をステートに設定
                  setOverview(event.target.value)
                }}
              />
              {/* <UsersSelect ownerId={ownerId ?? ""} setOwnerId={setOwnerId} /> */}
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
