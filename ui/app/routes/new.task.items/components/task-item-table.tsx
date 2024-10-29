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
import TaskItemDialog from "~/routes/new.task.items/components/task-item-dialog"

export default function TaskItemTable() {
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
            <TableHead className="w-1/12">{""}</TableHead>
            <TableHead className="w-3/12">{"作業区分"}</TableHead>
            <TableHead className="w-4/12">{"作業名"}</TableHead>
            <TableHead className="w-4/12">{"作業説明"}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.map((task) => (
            <TableRow key={task.id}>
              <TableCell>
                <TaskItemDialog itemId={task.id} />
              </TableCell>
              <TableCell>{task.tag?.name}</TableCell>
              <TableCell>{task.name}</TableCell>
              <TableCell className="whitespace-nowrap">
                {task.overview}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
