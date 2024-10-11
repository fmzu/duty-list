import { type LoaderFunctionArgs, json } from "@remix-run/cloudflare"
import { useLoaderData } from "@remix-run/react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import { loaderClient } from "~/lib/loader-client"

export async function loader(args: LoaderFunctionArgs) {
  const client = loaderClient(
    args.context.cloudflare.env.API.fetch.bind(args.context.cloudflare.env.API),
  )

  const resp = await client.api.users.$get()

  const users = await resp.json()

  return json(users)
}

export function UserSelect() {
  const data = useLoaderData<typeof loader>()

  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="担当者" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{"ユーザ一覧"}</SelectLabel>
          {data.map((usersData) => (
            <SelectItem key={usersData.id} value={usersData.id}>
              {usersData.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
