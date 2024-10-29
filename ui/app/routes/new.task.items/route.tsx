import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { client } from "~/lib/client"
import { TagsSelect } from "~/routes/new.task.items/components/tags-select"
import TaskItemTable from "~/routes/new.task.items/components/task-item-table"

/**
 * 管理者が新しい当番作業表を作成する
 * 管理者以外はアクセスできない
 * @returns
 */
export default function Route() {
  const [name, setName] = useState("")

  const [overview, setOverview] = useState("")

  const [ownerId, setOwnerId] = useState("")

  const [tagId, setTagId] = useState("")

  const mutation = useMutation({
    async mutationFn() {
      const resp = await client.api["task-items"].$post({
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

  const onSubmit = () => {
    const result = mutation.mutate()
    alert("当番作業を追加しました")
    if (result === null) {
      return
    }
  }

  return (
    <main className="p-8 container space-y-4">
      <h1 className="font-bold">{"作業の作成"}</h1>
      <form
        className="space-y-2"
        onSubmit={(event) => {
          event.preventDefault()
          onSubmit()
        }}
      >
        <TagsSelect tagId={tagId} setTagId={setTagId} />
        <Input
          type={"text"}
          placeholder="名前"
          value={name}
          onChange={(event) => {
            setName(event.target.value)
          }}
        />
        <Input
          type={"text"}
          placeholder="作業説明"
          value={overview}
          onChange={(event) => {
            setOverview(event.target.value)
          }}
        />
        <Button type={"submit"} className="w-full">
          {"登録する"}
        </Button>
      </form>
      <div>
        <p>{"当番作業一覧"}</p>
        <TaskItemTable />
      </div>
    </main>
  )
}
