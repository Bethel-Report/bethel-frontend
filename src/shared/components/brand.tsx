import { Flower2 } from "lucide-react"

export function Brand() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
        <Flower2 size={23} strokeWidth={1.6} />
      </div>
      <span className="font-display text-xg font-extrabold">
        bethel<span className="font-medium text-primary"> report</span>
      </span>
    </div>
  )
}
