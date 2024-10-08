import { Card } from "~/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import { ProgramRegistrationCard } from "~/routes/admin.programs/components/program-registration-card"

/**
 * 管理者が授業やユーザーを管理するページ
 * @returns
 */
export default function Route() {
  return (
    <div className="p-4 space-y-2">
      <ProgramRegistrationCard />
      <Card>
        <Table className="whitespace-nowrap">
          <TableHeader>
            <TableRow>
              <TableHead className="border-r text-center">{""}</TableHead>
              <TableHead className="border-r text-center">{"講義名"}</TableHead>
              <TableHead className="border-r text-center">{"時間枠"}</TableHead>
              <TableHead className="border-r text-center">{"曜日"}</TableHead>
              <TableHead className="border-r text-center">
                {"担当教員"}
              </TableHead>
              <TableHead className="border-r text-center">{"単位数"}</TableHead>
              <TableHead className="border-r text-center">
                {"授業概要"}
              </TableHead>
              <TableHead className="border-r text-center">
                {"実施年度"}
              </TableHead>
              <TableHead className="border-r text-center">
                {"実施時期"}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="border-r text-center">{"1"}</TableCell>
              <TableCell className="border-r text-center">
                {"invoice"}
              </TableCell>
              <TableCell className="border-r text-center">
                {"invoice"}
              </TableCell>
              <TableCell className="border-r text-center">
                {"invoice"}
              </TableCell>
              <TableCell className="border-r text-center">
                {"invoice"}
              </TableCell>
              <TableCell className="border-r text-center">
                {"invoice"}
              </TableCell>
              <TableCell className="border-r text-center">
                {"invoice"}
              </TableCell>
              <TableCell className="border-r text-center">
                {"invoice"}
              </TableCell>
              <TableCell className="border-r text-center">
                {"invoice"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
