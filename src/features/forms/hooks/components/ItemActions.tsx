import { ArrowDown, ArrowUp, Trash2 } from "lucide-react"
import { Button } from "@/shared/components/button"

type ItemActionsProps = {
  label: string
  canMoveUp: boolean
  canMoveDown: boolean
  onMoveUp: () => void
  onMoveDown: () => void
  onRemove: () => void
}

export function ItemActions({
  label,
  canMoveUp,
  canMoveDown,
  onMoveUp,
  onMoveDown,
  onRemove,
}: ItemActionsProps) {
  return (
    <div className="flex shrink-0 items-center gap-1">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label={`Mover ${label} para cima`}
        title={`Mover ${label} para cima`}
        className="size-9 text-muted-foreground"
        disabled={!canMoveUp}
        onClick={onMoveUp}
      >
        <ArrowUp aria-hidden="true" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label={`Mover ${label} para baixo`}
        title={`Mover ${label} para baixo`}
        className="size-9 text-muted-foreground"
        disabled={!canMoveDown}
        onClick={onMoveDown}
      >
        <ArrowDown aria-hidden="true" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label={`Remover ${label}`}
        title={`Remover ${label}`}
        className="size-9 text-muted-foreground hover:text-destructive"
        onClick={onRemove}
      >
        <Trash2 aria-hidden="true" />
      </Button>
    </div>
  )
}
