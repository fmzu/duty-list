import { useMutation, useSuspenseQuery } from "@tanstack/react-query"
import { client } from "~/lib/client"
import { UserSelect } from "~/routes/_main._index/components/user-select"
import { TaskCheckbox } from "~/routes/_main.roster.$roster/components/task-checkbox"

/**
 * ページIDを日付にする
 * チェックリストの当番作業一覧を表示する
 * この中で本日の担当を登録することができる
 * ボタン押したらページ開いてる人の名前が入るようにする
 * @returns
 */

export default function Route() {
  const data = useSuspenseQuery({
    queryKey: ["tasks"],
    async queryFn() {
      const resp = await client.api.tasks.$get()
      const tasks = await resp.json()
      return tasks
    },
  })

  const mutation = useMutation({
    async mutationFn() {
      const resp = await client.api.rosters.$post({
        json: {
          name: "",
          ownerId: "",
        },
      })

      const json = await resp.json()

      return json
    },
  })

  return (
    <main className="p-8 container space-y-4">
      <h1 className="font-bold">{"10月16日当番作業一覧"}</h1>
      <div>
        <p>{"午前"}</p>
        <UserSelect />
      </div>
      {/* <div>
        <p>{"午後"}</p>
        <UserSelect />
      </div> */}
      <div className="space-y-2">
        {data.data.map((task) => (
          <TaskCheckbox
            key={task.id}
            id={task.id}
            name={task.name}
            overview={task.overview}
          />
        ))}
      </div>
    </main>
  )
}
