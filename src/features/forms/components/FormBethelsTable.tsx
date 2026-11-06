import type { Bethel } from "@/features/bethels/data"
import { Checkbox } from "@/shared/components/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/table"
import { StatusBadge } from "@/shared/components/ui/StatusBadge"

type FormBethelsTableProps = {
  items: Bethel[]
  selectedIds: number[]
  onToggle: (id: number, checked: boolean) => void
  onToggleAll: (checked: boolean) => void
}

export function FormBethelsTable({
  items,
  selectedIds,
  onToggle,
  onToggleAll,
}: FormBethelsTableProps) {
  const allSelected =
    items.length > 0 && items.every((item) => selectedIds.includes(item.id))
  const someSelected = items.some((item) => selectedIds.includes(item.id))

  return (
    <Table className="min-w-[720px] table-fixed">
      <TableHeader className="bg-muted">
        <TableRow className="hover:bg-muted">
          <TableHead className="h-11 w-[30%] pl-5 text-lg font-medium">
            Bethel
          </TableHead>
          <TableHead className="h-11 w-[25%] text-lg font-medium">
            Localização
          </TableHead>
          <TableHead className="h-11 w-[15%] text-lg font-medium">
            Membros
          </TableHead>
          <TableHead className="h-11 w-[15%] text-lg font-medium">
            Situação
          </TableHead>
          <TableHead className="h-11 w-[15%] pr-5 text-center">
            <Checkbox
              aria-label="Selecionar todos os bethéis desta página"
              checked={
                allSelected ? true : someSelected ? "indeterminate" : false
              }
              onCheckedChange={(checked) => onToggleAll(checked === true)}
              className="mx-auto"
            />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((bethel) => (
          <TableRow key={bethel.id} className="h-[69px] hover:bg-background/70">
            <TableCell className="pl-5 text-md font-semibold">
              {bethel.name}
            </TableCell>
            <TableCell className="text-md text-muted-foreground">
              {bethel.city}, {bethel.state}
            </TableCell>
            <TableCell className="text-md tabular-nums">
              {bethel.members}
            </TableCell>
            <TableCell>
              <StatusBadge status={bethel.status} />
            </TableCell>
            <TableCell className="pr-5 text-center">
              <Checkbox
                aria-label={`Selecionar ${bethel.name}`}
                checked={selectedIds.includes(bethel.id)}
                onCheckedChange={(checked) =>
                  onToggle(bethel.id, checked === true)
                }
                className="mx-auto"
              />
            </TableCell>
          </TableRow>
        ))}
        {items.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={5}
              className="h-32 text-center text-md text-muted-foreground"
            >
              Nenhum Bethel encontrado.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
