import { signIn } from "@hono/auth-js/react"
import { useNavigate } from "@remix-run/react"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"

export function LoginPage() {
  const navigate = useNavigate()

  const [loginId, setLoginId] = useState("")

  const [password, setPassword] = useState("")

  const mutation = useMutation({
    async mutationFn() {
      const resp = await signIn("credentials", {
        email: loginId,
        password: password,
        redirect: false,
      })
      if (resp?.status !== 200) {
        return "ログインに失敗しました"
      }
      return null
    },
  })

  const onSubmit = async () => {
    const result = await mutation.mutateAsync()
    if (result === null) {
      navigate("/")
      return
    }
    toast(result)
  }

  return (
    <div className={"mx-auto max-w-xs space-y-4 p-4 pt-40"}>
      <h1 className="font-bold">{"TIMETABLE"}</h1>
      <form
        className="space-y-2"
        onSubmit={(event) => {
          event.preventDefault()
          onSubmit()
        }}
      >
        <Input
          type="email"
          placeholder="メールアドレス"
          value={loginId}
          onChange={(event) => setLoginId(event.target.value)}
        />
        <Input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button type="submit" className="w-full">
          {"ログイン"}
        </Button>
      </form>
    </div>
  )
}
