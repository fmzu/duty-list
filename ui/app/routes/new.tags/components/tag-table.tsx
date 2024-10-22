import { useSuspenseQuery } from "@tanstack/react-query"
import { Card } from "~/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import { client } from "~/lib/client"
import TagDialog from "~/routes/new.tags/components/tag-dialog"

/**
 * 連携するタスクを取得する
 * @returns
 */
export default function TagTable() {
  const data = useSuspenseQuery({
    queryKey: ["tagTable"],
    async queryFn() {
      const resp = await client.api.tags.$get()

      const tags = await resp.json()

      return tags
    },
  })

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{""}</TableHead>
            <TableHead>{"名前"}</TableHead>
            <TableHead>{"作業一覧"}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.map((tag) => (
            <TableRow key={tag.id}>
              <TableCell>
                <TagDialog tagId={tag.id} />
              </TableCell>
              <TableCell>{tag.name}</TableCell>
              <TableCell>{tag.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
