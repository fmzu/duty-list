import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { client } from "~/lib/client"

/**
 * 管理者が新しい当番作業表を作成する
 * 管理者以外はアクセスできない
 * @returns
 */
export default function Route() {
  const [name, setName] = useState("")

  const [overview, setOverview] = useState("")

  const mutation = useMutation({
    async mutationFn() {
      const resp = await client.api.duty.$post({
        json: {
          name: name,
          overview: overview,
          // name: name,
          // role: role,
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
      <h1 className="font-bold">{"当番作業の作成"}</h1>
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
    </main>
  )
}
