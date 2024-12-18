import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import {} from "~/components/ui/select"
import { client } from "~/lib/client"
import UserTable from "~/routes/new.users/components/user-table"

/**
 * 管理者が新しいユーザを追作成する
 * 管理者以外はアクセスできない
 * @returns
 */
export default function Route() {
  const [loginId, setLoginId] = useState("")

  const [password, setPassword] = useState("")

  // const [role, setRole] = useState(0)

  const [name, setName] = useState("")

  const mutation = useMutation({
    async mutationFn() {
      const resp = await client.api.users.$post({
        json: {
          email: loginId,
          password: password,
          name: name,
          // role: role,
        },
      })

      const json = await resp.json()

      return json
    },
  })

  const onSubmit = () => {
    const result = mutation.mutate()
    alert("アカウントを作成しました")
    window.location.reload()
    if (result === null) {
      return
    }
  }

  return (
    <main className="p-8 container space-y-4">
      <h1 className="font-bold">{"ユーザの作成"}</h1>
      <form
        className="space-y-2"
        onSubmit={(event) => {
          event.preventDefault()
          onSubmit()
        }}
      >
        <Input
          type={"email"}
          placeholder="メールアドレス"
          value={loginId}
          onChange={(event) => {
            setLoginId(event.target.value)
          }}
        />
        <Input
          type={"password"}
          placeholder="パスワード"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value)
          }}
        />
        <Input
          type={"text"}
          placeholder="名前"
          value={name}
          onChange={(event) => {
            setName(event.target.value)
          }}
        />
        {/* <Input
          type={"number"}
          placeholder="役割"
          value={role}
          onChange={(event) => {
            setRole(event.target.valueAsNumber)
          }}
        /> */}
        {/* <Select>
          <SelectTrigger>
            <SelectValue placeholder="役割" />
          </SelectTrigger>
          <SelectContent defaultValue={"1"}>
            <SelectItem value="0">{"管理者"}</SelectItem>
            <SelectItem value="1">{"ユーザ"}</SelectItem>
          </SelectContent>
        </Select> */}

        <Button type={"submit"} className="w-full">
          {"登録する"}
        </Button>
      </form>
      <div>
        <p>{"ユーザ一覧"}</p>
        <UserTable />
      </div>
    </main>
  )
}
