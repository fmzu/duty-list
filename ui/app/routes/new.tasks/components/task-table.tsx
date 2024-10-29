import { useSuspenseQuery } from "@tanstack/react-query"
import { Card } from "~/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import { client } from "~/lib/client"
import TaskDialog from "~/routes/new.tasks/components/task-dialog"

/**
 * 連携するタスクを取得する
 * @returns
 */
export default function TaskTable() {
  const data = useSuspenseQuery({
    queryKey: ["TaskTable"],
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
            <TableHead className="w-1/5">{""}</TableHead>
            <TableHead className="w-2/5">{"名前"}</TableHead>
            <TableHead className="w-2/5">{"作業一覧"}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.map((tag) => (
            <TableRow key={tag.id}>
              <TableCell>
                <TaskDialog tagId={tag.id} />
              </TableCell>
              <TableCell>{tag.name}</TableCell>
              <TableCell>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="作業一覧" />
                  </SelectTrigger>
                  <SelectContent>
                    {tag.taskItems.map((taskItem) => (
                      <SelectItem
                        key={taskItem.id}
                        value={taskItem.id}
                        aria-readonly
                      >
                        {taskItem.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
