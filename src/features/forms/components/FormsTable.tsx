import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/table"
import { StatusBadge } from "@/shared/components/ui/StatusBadge"
import { formatFormDate, type FormRecord } from "../data"

type FormsTableProps = {
  items: FormRecord[]
}

export function FormsTable({ items }: FormsTableProps) {
  return (
    <Table className="min-w-[720px] table-fixed">
      <TableHeader className="bg-muted">
        <TableRow className="hover:bg-muted">
          <TableHead className="h-11 w-[45%] pl-5 text-lg font-medium">
            Formulário
          </TableHead>
          <TableHead className="h-11 w-[15%] text-lg font-medium">
            Aberto em
          </TableHead>
          <TableHead className="h-11 w-[15%] text-lg font-medium">
            Finaliza em
          </TableHead>
          <TableHead className="h-11 w-[13%] text-lg font-medium">
            Respostas
          </TableHead>
          <TableHead className="h-11 w-[15%] pr-5 text-lg font-medium">
            Situação
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((form) => (
          <TableRow key={form.id} className="h-[69px] hover:bg-background/70">
            <TableCell className="pl-5">
              <div className="truncate text-md font-semibold">{form.title}</div>
              <div className="mt-0.5 truncate text-md text-muted-foreground">
                {form.description}
              </div>
            </TableCell>
            <TableCell className="text-md text-muted-foreground">
              {formatFormDate(form.createdAt)}
            </TableCell>
            <TableCell className="text-md text-muted-foreground">
              {formatFormDate(form.createdAt)}
            </TableCell>
            <TableCell className="text-md tabular-nums">
              {form.responses}
            </TableCell>
            <TableCell className="pr-5">
              <StatusBadge status={form.status} />
            </TableCell>
          </TableRow>
        ))}
        {items.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={4}
              className="h-32 text-center text-md text-muted-foreground"
            >
              Nenhum formulário encontrado.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
