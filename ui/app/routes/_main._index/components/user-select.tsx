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

export function UserSelect() {
  const data = useSuspenseQuery({
    queryKey: ["users"],
    async queryFn() {
      const resp = await client.api.users.$get()
      const timetable = await resp.json()
      return timetable
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
          {data.data.map((user) => (
            <SelectItem key={user.id} value={user.id}>
              {user.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
