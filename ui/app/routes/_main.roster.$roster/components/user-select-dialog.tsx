import { Plus } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog"
import { UserSelect } from "~/routes/_main._index/components/user-select"

/**
 * 管理者画面(new/ページ)以外では管理者ともに自分以外のユーザを選択することはできない
 * @returns
 */
export function UserSelectDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <Plus className="w-4" />
      </DialogTrigger>
      <DialogContent>
        <p>{"担当者選択"}</p>
        <UserSelect />
      </DialogContent>
    </Dialog>
  )
}
