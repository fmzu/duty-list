import { useSuspenseQuery } from "@tanstack/react-query"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import { client } from "~/lib/client"

type Props = {
  ownerId: string
  setOwnerId: (tagId: string) => void
}

export function UsersSelect(props: Props) {
  const data = useSuspenseQuery({
    queryKey: ["usersSelect"],
    async queryFn() {
      const resp = await client.api.users.$get()

      const users = await resp.json()

      return users
    },
  })
  console.log("A", data)
  const handleStringToInt = (value: string) => {
    props.setOwnerId(String(value))
  }

  return (
    <Select onValueChange={handleStringToInt} value={props.ownerId}>
      <SelectTrigger>
        <SelectValue placeholder="作業担当者" />
      </SelectTrigger>
      <SelectContent>
        {data.data.map((user) => (
          <SelectItem key={user.id} value={user.id}>
            {user.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
