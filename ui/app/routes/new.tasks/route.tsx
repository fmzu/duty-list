import { useMutation, useSuspenseQuery } from "@tanstack/react-query"
import { useState } from "react"
import { client } from "~/lib/client"

/**
 * 管理者が新しい当番タグを作成する
 * 管理者以外はアクセスできない
 * @returns
 */
export default function Route() {
  // タスク名のステートを追加
  const [name, setName] = useState("")

  const [taskItemId, setTaskItemId] = useState("")

  const data = useSuspenseQuery({
    queryKey: ["taskitems"],
    async queryFn() {
      const resp = await client.api["task-items"].$get()

      const items = await resp.json()

      return items
    },
  })

  const mutation = useMutation({
    async mutationFn() {
      const resp = await client.api.tasks.$post({
        json: {
          name: name, // ステートからタスク名を取得
          ownerId: null,
          taskItemId: taskItemId,
        },
      })

      const json = await resp.json()

      return json
    },
  })

  const onSubmit = () => {
    const result = mutation.mutate()

    alert("タグを追加しました")
    window.location.reload()

    if (result === null) {
      return
    }
  }

  return (
    <main className="p-8 container space-y-4">
      <h1 className="font-bold">{"当番の確認"}</h1>
      {data.data.map((task) => (
        <div key={task.id}>
          <div>{task.name}</div>
        </div>
      ))}
    </main>
  )
}
