import type { LucideIcon } from "lucide-react"
import { Card } from "@/shared/components/card"
import { formatAmount } from "../format"

type SummaryCardProps = {
  label: string
  color: string
  value: number
  icon: LucideIcon
  iconClassName: string
}

export function SummaryCard({
  label,
  color,
  value,
  icon: Icon,
  iconClassName,
}: SummaryCardProps) {
  return (
    <Card className="flex flex-col justify-between min-w-0 h-[140px] border-border rounded-lg p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <p className="text-lg text-muted-foreground">{label}</p>
        <span
          className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${iconClassName}`}
        >
          <Icon aria-hidden="true" className="size-5" />
        </span>
      </div>
      <p
        className={`mt-2 break-words font-display text-2xl font-bold ${color}`}
      >
        {formatAmount(value)}
      </p>
    </Card>
  )
}
