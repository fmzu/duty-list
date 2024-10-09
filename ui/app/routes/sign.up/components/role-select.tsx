import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"

export function RoleSelect() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="役割" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{"役割"}</SelectLabel>
          <SelectItem value="0">{"管理者"}</SelectItem>
          <SelectItem value="1">{"ユーザ"}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
