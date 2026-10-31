import { zodResolver } from "@hookform/resolvers/zod"
import { Pencil, Plus, Wallet } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { bethels } from "@/features/bethels/data"
import { Button } from "@/shared/components/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/form"
import { Input } from "@/shared/components/input"
import { Separator } from "@/shared/components/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/select"
import type { Transaction } from "../data"
import { newTransactionSchema, type NewTransactionFormValues } from "../schemas"

type TransactionDialogProps = {
  transaction?: Transaction
  onSave: (values: NewTransactionFormValues) => void
  showLabel?: boolean
}

function formValues(
  transaction?: Transaction,
): Partial<NewTransactionFormValues> {
  return transaction
    ? {
        description: transaction.description,
        bethel: transaction.bethel,
        type: transaction.type,
        amount: (transaction.amountInCents / 100).toFixed(2).replace(".", ","),
      }
    : { description: "", bethel: "", amount: "" }
}

export function TransactionDialog({
  transaction,
  onSave,
  showLabel = false,
}: TransactionDialogProps) {
  const [open, setOpen] = useState(false)
  const form = useForm<NewTransactionFormValues>({
    resolver: zodResolver(newTransactionSchema),
    defaultValues: formValues(transaction),
  })

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen)
    form.reset(formValues(transaction))
  }

  function handleSubmit(values: NewTransactionFormValues) {
    onSave(values)
    handleOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {transaction ? (
          <Button
            type="button"
            variant="ghost"
            size={showLabel ? "default" : "icon"}
            className={
              showLabel
                ? "h-12 flex-1 border border-muted-foreground/10 bg-muted-foreground/5 text-lg"
                : "border border-muted-foreground/10"
            }
            aria-label={`Editar ${transaction.description}`}
            title={`Editar ${transaction.description}`}
          >
            <Pencil aria-hidden="true" />
            {showLabel && "Editar"}
          </Button>
        ) : (
          <Button className="h-auto px-4 py-3 text-md">
            <Plus aria-hidden="true" />
            Criar movimentação
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-xl gap-0 overflow-y-auto border-border bg-card p-0 rounded-lg">
        <DialogHeader className="p-4 pr-12 sm:p-6 sm:pr-12">
          <div className="flex items-start gap-3 text-left">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
              <Wallet aria-hidden="true" className="size-5" />
            </div>
            <div>
              <DialogTitle className="font-display text-lg font-bold leading-tight tracking-[-0.02em]">
                {transaction ? "Editar movimentação" : "Criar movimentação"}
              </DialogTitle>
              <DialogDescription className="mt-1 text-md text-muted-foreground">
                {transaction
                  ? "Atualize os dados da movimentação financeira."
                  : "Informe os dados da nova movimentação financeira."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <Separator />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} noValidate>
            <div className="space-y-4 p-4 sm:p-6">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md">
                      Descrição <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-11 bg-card shadow-none"
                        placeholder="Descreva a movimentação"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bethel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md">
                      Bethel <span className="text-destructive">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-11 bg-card shadow-none">
                          <SelectValue placeholder="Selecione um Bethel" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {bethels.map((bethel) => (
                          <SelectItem key={bethel.id} value={bethel.name}>
                            {bethel.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-4 sm:flex-row">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-md">
                        Tipo <span className="text-destructive">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-11 bg-card shadow-none">
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Receita">Receita</SelectItem>
                          <SelectItem value="Despesa">Despesa</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-md">
                        Valor <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          inputMode="decimal"
                          className="h-11 bg-card shadow-none"
                          placeholder="0,00"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Separator />
            <div className="flex flex-col-reverse justify-end gap-2 p-4 sm:flex-row sm:gap-4 sm:p-6">
              <DialogClose asChild>
                <Button type="button" variant="outline" className="h-11 px-5">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" className="h-11 px-5">
                {transaction ? "Salvar alterações" : "Cadastrar movimentação"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
