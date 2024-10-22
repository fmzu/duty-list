import { useSuspenseQuery } from "@tanstack/react-query"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import { client } from "~/lib/client"

/**
 * ユーザ画面でのみ使うコンポーネントなので、自分の名前のみ表示されるようにする。（一般ユーザは自分以外の人を選択・指定できない為）
 * @returns
 */
export function UserSelect() {
  const data = useSuspenseQuery({
    queryKey: ["user"],
    async queryFn() {
      const resp = await client.api.my.user.$get()
      const user = await resp.json()
      return user
    },
  })

  return (
    <Select>
      <SelectTrigger className="flex-1">
        <SelectValue placeholder="担当者" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{"担当者"}</SelectLabel>
          <SelectItem key={data.data.id} value={data.data.id}>
            {data.data.name}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
