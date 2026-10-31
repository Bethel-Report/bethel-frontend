import { Card } from "@/shared/components/card"
import { formatAmount } from "../format"

type SummaryCardProps = {
  label: string
  color: string
  value: number
}

export function SummaryCard({ label, color, value }: SummaryCardProps) {
  return (
    <Card className="flex flex-col justify-between min-w-0 h-[140px] border-border rounded-lg p-5 shadow-sm">
      <p className="text-lg text-muted-foreground">{label}</p>
      <p
        className={`mt-2 break-words font-display text-2xl font-bold ${color}`}
      >
        {formatAmount(value)}
      </p>
    </Card>
  )
}
