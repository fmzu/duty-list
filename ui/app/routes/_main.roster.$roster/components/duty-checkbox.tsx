import { Checkbox } from "~/components/ui/checkbox"

type Props = {
  id: string
  name: string
  overview: string | null
}

export function DutyCheckbox(props: Props) {
  return (
    <div>
      <div className="flex items-center space-x-2">
        <Checkbox id={props.id} className="items-center" />
        <label htmlFor={props.id} className="font-bold text-lg items-center">
          {props.name}
        </label>
      </div>
      <p className="text-xs opacity-80">{props.overview}</p>
    </div>
  )
}
