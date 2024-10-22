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
  tagId: string
  setTagId: (tagId: string) => void
}

export function TagsSelect(props: Props) {
  const data = useSuspenseQuery({
    queryKey: ["tagSelect"],
    async queryFn() {
      const resp = await client.api.tags.$get()

      const tags = await resp.json()

      return tags
    },
  })

  const handleStringToInt = (value: string) => {
    props.setTagId(String(value))
  }

  return (
    <Select onValueChange={handleStringToInt} value={props.tagId}>
      <SelectTrigger>
        <SelectValue placeholder="作業区分" />
      </SelectTrigger>
      <SelectContent>
        {data.data.map((tag) => (
          <SelectItem key={tag.id} value={tag.id}>
            {tag.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
