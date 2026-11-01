import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/table"
import type { Transaction } from "../data"
import type { NewTransactionFormValues } from "../schemas"
import { formatAmount, formatDate } from "../format"
import { TransactionActions } from "./TransactionActions"
import { TypeLabel } from "./TypeLabel"

type FinancesTableProps = {
  items: Transaction[]
  onEdit: (id: number, values: NewTransactionFormValues) => void
  onRemove: (id: number) => void
}

export function FinancesTable({ items, onEdit, onRemove }: FinancesTableProps) {
  return (
    <Table className="min-w-[800px] table-fixed">
      <TableHeader className="bg-muted">
        <TableRow className="hover:bg-muted">
          <TableHead className="h-11 w-[25%] pl-5 text-lg font-medium">
            Descrição
          </TableHead>
          <TableHead className="h-11 w-[17%] text-lg font-medium">
            Bethel
          </TableHead>
          <TableHead className="h-11 w-[18%] text-lg font-medium">
            Data e hora
          </TableHead>
          <TableHead className="h-11 w-[12%] text-lg font-medium">
            Tipo
          </TableHead>
          <TableHead className="h-11 w-[14%] text-lg font-medium">
            Valor
          </TableHead>
          <TableHead className="h-11 w-[14%] pr-5 text-center text-lg font-medium">
            Ações
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
            <TableCell className="pr-5">
              <TransactionActions
                transaction={transaction}
                onEdit={onEdit}
                onRemove={onRemove}
              />
            </TableCell>
          </TableRow>
        ))}
        {items.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={6}
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
