import type { Bethel } from "@/features/bethels/data"
import { Checkbox } from "@/shared/components/checkbox"
import { Label } from "@/shared/components/label"
import {
  ResponsiveRowContainer,
  ResponsiveRowDataContainer,
  ResponsiveRowHighlight,
  ResponsiveRowHighlightDetail,
  ResponsiveRowList,
  ResponsiveRowSubtitle,
  ResponsiveRowTitle,
} from "@/shared/components/responsive-row"
import { StatusBadge } from "@/shared/components/ui/StatusBadge"
import { UsersRound } from "lucide-react"

type FormBethelsListProps = {
  items: Bethel[]
  selectedIds: number[]
  onToggle: (id: number, checked: boolean) => void
}

export function FormBethelsList({
  items,
  selectedIds,
  onToggle,
}: FormBethelsListProps) {
  return (
    <ResponsiveRowList>
      {items.map((bethel) => (
        <div
          key={bethel.id}
          className="border-b border-muted-foreground/10 pb-4 last:border-b-0 last:pb-0"
        >
          <ResponsiveRowContainer>
            <StatusBadge status={bethel.status} />
            <ResponsiveRowDataContainer>
              <ResponsiveRowTitle>{bethel.name}</ResponsiveRowTitle>
              <ResponsiveRowSubtitle>
                {bethel.city}, {bethel.state}
              </ResponsiveRowSubtitle>
            </ResponsiveRowDataContainer>
            <ResponsiveRowHighlight title="Membros">
              <ResponsiveRowHighlightDetail className="flex-1">
                <UsersRound aria-hidden="true" className="size-4" />
                <span className="text-md">{bethel.members} membros</span>
              </ResponsiveRowHighlightDetail>
            </ResponsiveRowHighlight>
            <div className="flex h-12 items-center gap-3 rounded-md border border-muted-foreground/10 bg-muted-foreground/5 px-4">
              <Checkbox
                id={`select-bethel-${bethel.id}`}
                checked={selectedIds.includes(bethel.id)}
                onCheckedChange={(checked) =>
                  onToggle(bethel.id, checked === true)
                }
              />
              <Label
                htmlFor={`select-bethel-${bethel.id}`}
                className="flex-1 cursor-pointer text-lg"
              >
                Selecionar para responder
              </Label>
            </div>
          </ResponsiveRowContainer>
        </div>
      ))}
      {items.length === 0 && (
        <p className="py-8 text-center text-md text-muted-foreground">
          Nenhum Bethel encontrado.
        </p>
      )}
    </ResponsiveRowList>
  )
}
