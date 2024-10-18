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
import UserDialog from "~/routes/new.users/components/user-dialog"

export default function UserTable() {
  const data = useSuspenseQuery({
    queryKey: ["userTable"],
    async queryFn() {
      const resp = await client.api.users.$get()
      const users = await resp.json()
      return users
    },
  })

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{""}</TableHead>
            <TableHead>{"ユーザ名"}</TableHead>
            <TableHead>{"メールアドレス"}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <UserDialog userId={user.id} />
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
