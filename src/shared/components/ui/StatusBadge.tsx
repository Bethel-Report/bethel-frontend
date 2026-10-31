import { Badge } from "@/shared/components/badge"

type Status = "Ativo" | "Pendente" | "Inativo"

const STATUS_BADGE_MAP: Record<Status, string> = {
  Ativo:
    "bg-success-foreground text-success shadow-none hover:bg-success-foreground",
  Pendente:
    "bg-warning-foreground text-warning shadow-none hover:bg-warning-foreground",
  Inativo: "bg-muted text-muted-foreground shadow-none hover:bg-muted",
}

type StatusBadgeProps = {
  status: Status
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge
      className={`flex w-fit items-center justify-center gap-1.5 border-0 text-sm ${STATUS_BADGE_MAP[status]}`}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      {status}
    </Badge>
  )
}
