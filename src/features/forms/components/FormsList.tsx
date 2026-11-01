import { CalendarDays } from "lucide-react"
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
import { formatFormDate, type FormRecord } from "../data"

type FormsListProps = {
  items: FormRecord[]
}

export function FormsList({ items }: FormsListProps) {
  return (
    <ResponsiveRowList>
      {items.map((form) => (
        <div
          key={form.id}
          className="border-b border-muted-foreground/10 pb-4 last:border-b-0 last:pb-0"
        >
          <ResponsiveRowContainer>
            <StatusBadge status={form.status} />
            <ResponsiveRowDataContainer>
              <ResponsiveRowTitle>{form.title}</ResponsiveRowTitle>
              <ResponsiveRowSubtitle className="text-muted-foreground">
                {form.description}
              </ResponsiveRowSubtitle>
            </ResponsiveRowDataContainer>
            <ResponsiveRowHighlight title="Período de envio">
              <div className="grid w-full grid-cols-2 gap-2">
                <ResponsiveRowHighlightDetail>
                  <CalendarDays className="size-4 shrink-0" />
                  <span className="text-md">
                    {formatFormDate(form.createdAt)}
                  </span>
                </ResponsiveRowHighlightDetail>
                <ResponsiveRowHighlightDetail>
                  <CalendarDays className="size-4 shrink-0" />
                  <span className="text-md">
                    {formatFormDate(form.createdAt)}
                  </span>
                </ResponsiveRowHighlightDetail>
              </div>
            </ResponsiveRowHighlight>
          </ResponsiveRowContainer>
        </div>
      ))}
      {items.length === 0 && (
        <p className="py-8 text-center text-md text-muted-foreground">
          Nenhum formulário encontrado.
        </p>
      )}
    </ResponsiveRowList>
  )
}
