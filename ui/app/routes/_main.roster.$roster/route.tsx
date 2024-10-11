import { type LoaderFunctionArgs, json } from "@remix-run/cloudflare"
import { useLoaderData } from "@remix-run/react"
import { Input } from "~/components/ui/input"
import {} from "~/components/ui/select"
import { loaderClient } from "~/lib/loader-client"
import { DutyCheckbox } from "~/routes/_main.roster.$roster/components/duty-checkbox"

/**
 * ページIDを日付にする
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
          <DutyCheckbox
            key={duty.id}
            id={duty.id}
            name={duty.name}
            overview={duty.overview}
          />
        ))}
      </div>
    </main>
  )
}
