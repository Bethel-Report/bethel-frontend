import { Badge } from "@/shared/components/badge"
import type { UserStatus } from "../types"

const STATUS_BADGE_MAP: Record<UserStatus, string> = {
  Ativo:
    "bg-success-foreground text-success shadow-none hover:bg-success-foreground",
  Pendente:
    "bg-warning-foreground text-warning shadow-none hover:bg-warning-foreground",
  Inativo: "bg-muted text-muted-foreground shadow-none hover:bg-muted",
}

type StatusBadgeProps = {
  status: UserStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge
      className={`w-fit gap-1.5 flex justify-center items-center border-0 text-sm ${STATUS_BADGE_MAP[status]}`}
    >
      <span aria-hidden="true" className="m size-1.5 rounded-full bg-current" />
      {status}
    </Badge>
  )
}
