import { Card } from "~/components/ui/card"

export function DutyCard() {
  return (
    <Card className="p-4">
      <div className="flex gap-x-2 items-end">
        <p className="text-2xl">{"10月08日"}</p>
        <p className="items-center justify-center">{"火曜日"}</p>
      </div>
      <div className="flex">
        <div className="flex w-1/2 items-center">
          <p>{"午前: "}</p>
          <p className="text-lg">{"山田一郎"}</p>
        </div>
        <div className="flex w-1/2 items-center">
          <p>{"午後: "}</p>
          <p className="text-lg">{"山田一郎"}</p>
        </div>
      </div>
    </Card>
  )
}
