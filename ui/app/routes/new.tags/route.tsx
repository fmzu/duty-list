import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { client } from "~/lib/client"
import TagTable from "~/routes/new.tags/components/tag-table"

/**
 * 管理者が新しい当番タグを作成する
 * 管理者以外はアクセスできない
 * @returns
 */
export default function Route() {
  const [name, setName] = useState("")

  const mutation = useMutation({
    async mutationFn() {
      const resp = await client.api.tags.$post({
        json: {
          name: name,
        },
      })

      const json = await resp.json()

      return json
    },
  })

  const onSubmit = () => {
    const result = mutation.mutate()

    alert("タグを追加しました")

    if (result === null) {
      return
    }
  }

  return (
    <main className="p-8 container space-y-4">
      <h1 className="font-bold">{"タグの作成"}</h1>
      <form
        className="space-y-2"
        onSubmit={(event) => {
          event.preventDefault()
          onSubmit()
        }}
      >
        <Input
          type={"text"}
          placeholder="名前"
          value={name}
          onChange={(event) => {
            setName(event.target.value)
          }}
        />
        <Button type={"submit"} className="w-full">
          {"登録する"}
        </Button>
      </form>
      <div>
        <p>{"タグ一覧"}</p>
        <TagTable />
      </div>
    </main>
  )
}
