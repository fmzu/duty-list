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
import TaskDialog from "~/routes/new.tasks/components/task-dialog"

export default function TaskTable() {
  const data = useSuspenseQuery({
    queryKey: ["taskItemsTable"],
    async queryFn() {
      const resp = await client.api["task-items"].$get()

      const items = await resp.json()

      return items
    },
  })

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{""}</TableHead>
            <TableHead>{"作業区分"}</TableHead>
            <TableHead>{"作業名"}</TableHead>
            <TableHead>{"作業説明"}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.map((task) => (
            <TableRow key={task.id}>
              <TableCell>
                <TaskDialog itemId={task.id} />
              </TableCell>
              <TableCell>{task.tag?.name}</TableCell>
              <TableCell>{task.name}</TableCell>
              <TableCell>{task.overview}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
