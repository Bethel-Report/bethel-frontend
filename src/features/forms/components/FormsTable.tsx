import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/table"
import { StatusBadge } from "@/shared/components/ui/StatusBadge"
import { Link } from "react-router"
import { formatFormDate, type FormRecord } from "../data"
import { Eye } from "lucide-react"
import { Button } from "@/shared/components/button"

type FormsTableProps = {
  items: FormRecord[]
}

export function FormsTable({ items }: FormsTableProps) {
  return (
    <Table className="min-w-[720px] table-fixed">
      <TableHeader className="bg-muted">
        <TableRow className="hover:bg-muted">
          <TableHead className="h-11 w-[35%] pl-5 text-lg font-medium">
            Formulário
          </TableHead>
          <TableHead className="h-11 w-[14%] text-lg font-medium">
            Aberto em
          </TableHead>
          <TableHead className="h-11 w-[14%] text-lg font-medium">
            Finaliza em
          </TableHead>
          <TableHead className="h-11 w-[12%] text-lg font-medium">
            Respostas
          </TableHead>
          <TableHead className="h-11 w-[14%] text-lg font-medium">
            Situação
          </TableHead>
          <TableHead className="h-11 w-[11%] pr-5 text-center text-lg font-medium">
            Ações
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
            <TableCell>
              <StatusBadge status={form.status} />
            </TableCell>
            <TableCell className="pr-5 text-center">
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="border border-muted-foreground/10"
              >
                <Link
                  to={`/formularios/${form.id}`}
                  aria-label={`Visualizar ${form.title}`}
                  title={`Visualizar ${form.title}`}
                >
                  <Eye aria-hidden="true" />
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
        {items.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={6}
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
