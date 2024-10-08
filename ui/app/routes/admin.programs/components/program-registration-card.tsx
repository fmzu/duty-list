import { useNavigate } from "@remix-run/react"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Card } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import { client } from "~/lib/client"

export function ProgramRegistrationCard() {
  const navigate = useNavigate()

  const [name, setName] = useState("")

  const [timeSlot, setTimeSlot] = useState(0)

  const [weekSlot, setWeekSlot] = useState(0)

  const [ownerId, setOwnerId] = useState("")

  const [unitsCount, setUnitsCount] = useState(0)

  const [overview, setOverview] = useState("")

  const [year, setYear] = useState(0)

  const [period, setPeriod] = useState(0)

  const mutation = useMutation({
    async mutationFn() {
      const resp = await client.api.admin.programs.$post({
        json: {
          name: name,
          timeSlot: timeSlot,
          weekSlot: weekSlot,
          ownerId: ownerId,
          unitsCount: unitsCount,
          overview: overview,
          year: year,
          period: period,
        },
      })
      const json = await resp.json()
      return json
    },
  })

  const onSubmit = () => {
    const result = mutation.mutate()
    if (result === null) {
      navigate("/admin")
      return
    }
  }

  return (
    <Card className="p-4">
      <p>{"新規授業登録"}</p>
      <form
        className="space-y-2"
        onSubmit={(event) => {
          event.preventDefault()
          onSubmit()
        }}
      >
        <Input
          type={"text"}
          placeholder="講義名"
          value={name}
          onChange={(event) => {
            setName(event.target.value)
          }}
        />
        <Input
          type={"number"}
          placeholder="時間枠（時間）"
          value={timeSlot}
          onChange={(event) => {
            setTimeSlot(event.target.valueAsNumber)
          }}
        />
        <Input
          type={"number"}
          placeholder="時間枠（曜日）"
          value={weekSlot}
          onChange={(event) => {
            setWeekSlot(event.target.valueAsNumber)
          }}
        />
        <Input
          type={"text"}
          placeholder="担当教員ID"
          value={ownerId}
          onChange={(event) => {
            setOwnerId(event.target.value)
          }}
        />
        <Input
          type={"number"}
          placeholder="単位数"
          value={unitsCount}
          onChange={(event) => {
            setUnitsCount(event.target.valueAsNumber)
          }}
        />
        <Textarea
          placeholder="授業概要"
          value={overview}
          onChange={(event) => {
            setOverview(event.target.value)
          }}
        />
        <Input
          type={"number"}
          placeholder="実施時期（年度）"
          value={year}
          onChange={(event) => {
            setYear(event.target.valueAsNumber)
          }}
        />
        <Input
          type={"number"}
          placeholder="実施時期（前期後期）"
          value={period}
          onChange={(event) => {
            setPeriod(event.target.valueAsNumber)
          }}
        />
        <Button type={"submit"} className="w-full">
          {"登録する"}
        </Button>
      </form>
    </Card>
  )
}
