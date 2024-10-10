import { signIn } from "@hono/auth-js/react"
import { useNavigate } from "@remix-run/react"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"

export default function Route() {
  const navigate = useNavigate()

  const [loginId, setLoginId] = useState("")

  const [password, setPassword] = useState("")

  const mutation = useMutation({
    async mutationFn() {
      console.log("A")
      const resp = await signIn("credentials", {
        email: loginId,
        password: password,
        redirect: false,
      })
      console.log("B", resp?.status)
      if (resp?.status !== 200) {
        return "ログインに失敗しました"
      }
      console.log("C")
      return null
    },
  })

  const onSubmit = async () => {
    const result = await mutation.mutateAsync()
    if (result === null) {
      return
    }
    console.log("D", result)
    alert(result)
    navigate("/sign/in")
  }

  return (
    <div className={"mx-auto max-w-xs space-y-4 p-4 pt-40"}>
      <h1 className="font-bold">{"N"}</h1>
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
        <Button type="submit" className="w-full">
          {"ログイン"}
        </Button>
      </form>
    </div>
  )
}
