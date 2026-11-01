import {
  ResponsiveRowContainer,
  ResponsiveRowDataContainer,
  ResponsiveRowHighlight,
  ResponsiveRowHighlightDetail,
  ResponsiveRowList,
  ResponsiveRowSubtitle,
  ResponsiveRowTitle,
} from "@/shared/components/responsive-row"
import type { Transaction } from "../data"
import type { NewTransactionFormValues } from "../schemas"
import { TypeLabel } from "./TypeLabel"
import { TransactionActions } from "./TransactionActions"
import React from "react"
import { Banknote, Calendar } from "lucide-react"
import { formatAmount, formatDate } from "../format"

type FinancesListProps = {
  items: Transaction[]
  onEdit: (id: number, values: NewTransactionFormValues) => void
  onRemove: (id: number) => void
}

export function FinancesList({ items, onEdit, onRemove }: FinancesListProps) {
  return (
    <ResponsiveRowList>
      {items.map((transaction) => (
        <React.Fragment key={transaction.id}>
          <ResponsiveRowContainer>
            <TypeLabel type={transaction.type} />
            <ResponsiveRowDataContainer>
              <ResponsiveRowTitle>{transaction.bethel}</ResponsiveRowTitle>
              <ResponsiveRowSubtitle>
                {transaction.description}
              </ResponsiveRowSubtitle>
            </ResponsiveRowDataContainer>
            <ResponsiveRowHighlight title="Data e Valor">
              <ResponsiveRowHighlightDetail className="flex-1">
                <Calendar className="w-4 h-4" />
                <p className="text-md">{formatDate(transaction.dateTime)}</p>
              </ResponsiveRowHighlightDetail>
              <ResponsiveRowHighlightDetail className="flex-1">
                <Banknote className="w-4 h-4" />
                <p className="text-md">
                  {formatAmount(transaction.amountInCents)}
                </p>
              </ResponsiveRowHighlightDetail>
            </ResponsiveRowHighlight>
            <TransactionActions
              transaction={transaction}
              onEdit={onEdit}
              onRemove={onRemove}
              showLabels
            />
          </ResponsiveRowContainer>
          <div className="w-full border-t-1 border-muted-foreground/10"></div>
        </React.Fragment>
      ))}
    </ResponsiveRowList>
  )
}
