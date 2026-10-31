import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/table"
import type { Transaction } from "../data"
import { formatAmount, formatDate } from "../format"
import { TypeLabel } from "./TypeLabel"

type FinancesTableProps = {
  items: Transaction[]
}

export function FinancesTable({ items }: FinancesTableProps) {
  return (
    <Table className="min-w-[720px] table-fixed">
      <TableHeader className="bg-muted">
        <TableRow className="hover:bg-muted">
          <TableHead className="h-11 w-[30%] pl-5 text-lg font-medium">
            Descrição
          </TableHead>
          <TableHead className="h-11 w-[20%] text-lg font-medium">
            Bethel
          </TableHead>
          <TableHead className="h-11 w-[20%] text-lg font-medium">
            Data e hora
          </TableHead>
          <TableHead className="h-11 w-[15%] text-lg font-medium">
            Tipo
          </TableHead>
          <TableHead className="h-11 w-[15%] pr-5 text-lg font-medium">
            Valor
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((transaction) => (
          <TableRow
            key={transaction.id}
            className="h-[69px] hover:bg-background/70"
          >
            <TableCell className="truncate pl-5 text-md font-semibold">
              {transaction.description}
            </TableCell>
            <TableCell className="text-md text-muted-foreground">
              {transaction.bethel}
            </TableCell>
            <TableCell className="text-md text-muted-foreground">
              {formatDate(transaction.dateTime)}
            </TableCell>
            <TableCell>
              <TypeLabel type={transaction.type} />
            </TableCell>
            <TableCell className="pr-5 text-md font-semibold tabular-nums">
              {formatAmount(transaction.amountInCents)}
            </TableCell>
          </TableRow>
        ))}
        {items.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={5}
              className="h-32 text-center text-md text-muted-foreground"
            >
              Nenhuma movimentação encontrada.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
