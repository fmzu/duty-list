import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"

export function TimetableTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="border-r text-center">{""}</TableHead>
          <TableHead className="border-r text-center">{"月"}</TableHead>
          <TableHead className="border-r text-center">{"火"}</TableHead>
          <TableHead className="border-r text-center">{"水"}</TableHead>
          <TableHead className="border-r text-center">{"木"}</TableHead>
          <TableHead className="border-r text-center">{"金"}</TableHead>
          <TableHead className="border-r text-center">{"土"}</TableHead>
          <TableHead className="border-r text-center">{"日"}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="border-r text-center">{"1"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="border-r text-center">{"2"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="border-r text-center">{"3"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="border-r text-center">{"4"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="border-r text-center">{"5"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="border-r text-center">{"6"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="border-r text-center">{"7"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
          <TableCell className="border-r text-center">{"invoice"}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
