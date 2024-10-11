import { useNavigate } from "@remix-run/react"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { client } from "~/lib/client"

export default function Route() {
  const navigate = useNavigate()

  const [loginId, setLoginId] = useState("")

  const [password, setPassword] = useState("")

  const [name, setName] = useState("")

  const [role, setRole] = useState(1)

  const mutation = useMutation({
    async mutationFn() {
      const resp = await client.api.users.$post({
        json: {
          email: loginId,
          password: password,
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

    if (result === null) {
      alert("アカウント登録に失敗しました")
      navigate("/sign/in")
      return
    }

    alert("アカウント登録に成功しました")
    navigate("/sign/in")
  }

  return (
    <div className={"mx-auto max-w-xs space-y-4 p-4 pt-40"}>
      <h1 className="font-bold">{"新しいアカウント"}</h1>
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
        {/* <Input
          type={"text"}
          placeholder="名前"
          value={name}
          onChange={(event) => {
            setName(event.target.value)
          }}
        />
        <Input
          type={"number"}
          placeholder="役割"
          value={role}
          onChange={(event) => {
            setRole(event.target.valueAsNumber)
          }}
        /> */}
        <Button type={"submit"} className="w-full">
          {"登録する"}
        </Button>
      </form>
    </div>
  )
}
