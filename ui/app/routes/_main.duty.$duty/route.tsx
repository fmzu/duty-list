import { type LoaderFunctionArgs, json } from "@remix-run/cloudflare"
import { useLoaderData } from "@remix-run/react"
import { Checkbox } from "~/components/ui/checkbox"
import { Input } from "~/components/ui/input"
import { loaderClient } from "~/lib/loader-client"

/**
 * チェックリストの当番作業一覧を表示する
 * この中で本日の担当を登録することができる
 * ボタン押したらページ開いてる人の名前が入るようにする
 * @returns
 */
export async function loader(args: LoaderFunctionArgs) {
  const client = loaderClient(
    args.context.cloudflare.env.API.fetch.bind(args.context.cloudflare.env.API),
  )

  const resp = await client.api.duty.$get()

  const duty = await resp.json()

  return json(duty)
}

export default function Route() {
  const data = useLoaderData<typeof loader>()

  return (
    <main className="p-8 container space-y-4">
      <h1 className="font-bold">{"当番作業一覧"}</h1>
      <div>
        <p>{"午前"}</p>
        <Input placeholder="担当者" />
      </div>
      <div>
        <p>{"午後"}</p>
        <Input placeholder="担当者" />
      </div>
      <div className="space-y-2">
        {data.map((duty) => (
          <div key={duty.id} className="flex items-center space-x-2">
            <Checkbox id={duty.id} className="items-center" />
            <label htmlFor={duty.id} className="font-bold text-lg items-center">
              {duty.name}
            </label>
          </div>
        ))}
      </div>
    </main>
  )
}
