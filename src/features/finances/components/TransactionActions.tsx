import { Trash } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/components/alert-dialog"
import { Button } from "@/shared/components/button"
import type { Transaction } from "../data"
import type { NewTransactionFormValues } from "../schemas"
import { TransactionDialog } from "./TransactionDialog"

type TransactionActionsProps = {
  transaction: Transaction
  onEdit: (id: number, values: NewTransactionFormValues) => void
  onRemove: (id: number) => void
  showLabels?: boolean
}

export function TransactionActions({
  transaction,
  onEdit,
  onRemove,
  showLabels = false,
}: TransactionActionsProps) {
  return (
    <div
      className={
        showLabels
          ? "flex w-full gap-2"
          : "flex items-center justify-center gap-1"
      }
    >
      <TransactionDialog
        transaction={transaction}
        onSave={(values) => onEdit(transaction.id, values)}
        showLabel={showLabels}
      />
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size={showLabels ? "default" : "icon"}
            className={
              showLabels
                ? "h-12 flex-1 border border-destructive/20 bg-destructive/5 text-lg text-destructive"
                : "border border-muted-foreground/10 text-destructive"
            }
            aria-label={`Remover ${transaction.description}`}
            title={`Remover ${transaction.description}`}
          >
            <Trash aria-hidden="true" />
            {showLabels && "Remover"}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-[calc(100%-2rem)] rounded-lg border-border bg-card">
          <AlertDialogHeader>
            <AlertDialogTitle>Remover movimentação?</AlertDialogTitle>
            <AlertDialogDescription>
              A movimentação “{transaction.description}” será removida da
              listagem.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => onRemove(transaction.id)}
            >
              Remover movimentação
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
