import { useState } from "react"
import { ArrowDownRight, ArrowUpRight, Search, Wallet } from "lucide-react"
import { normalizeSearchText } from "@/lib/utils"
import { Input } from "@/shared/components/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/select"
import { PageIndicator } from "@/shared/components/ui/PageIndicator"
import { Pagination } from "@/shared/components/ui/Pagination"
import { TransactionDialog } from "../components/TransactionDialog"
import { SummaryCard } from "../components/SummaryCard"
import { FinancesList } from "../components/FinancesList"
import { FinancesTable } from "../components/FinancesTable"
import { transactions } from "../data"
import type { NewTransactionFormValues } from "../schemas"

const pageSize = 5

function amountInCents(value: string) {
  return Math.round(Number(value.replace(",", ".")) * 100)
}

export function FinancesPage() {
  const [financeTransactions, setFinanceTransactions] = useState(transactions)
  const [query, setQuery] = useState("")
  const [type, setType] = useState("all")
  const [page, setPage] = useState(1)

  const search = normalizeSearchText(query.trim())
  const filteredTransactions = financeTransactions.filter(
    (transaction) =>
      (type === "all" || transaction.type === type) &&
      (!search ||
        [transaction.description, transaction.bethel].some((value) =>
          normalizeSearchText(value).includes(search),
        )),
  )
  const totalPages = Math.max(
    1,
    Math.ceil(filteredTransactions.length / pageSize),
  )
  const currentPage = Math.min(page, totalPages)
  const firstItem = (currentPage - 1) * pageSize
  const visibleTransactions = filteredTransactions.slice(
    firstItem,
    firstItem + pageSize,
  )

  const income = financeTransactions
    .filter((item) => item.type === "Receita")
    .reduce((total, item) => total + item.amountInCents, 0)
  const expenses = financeTransactions
    .filter((item) => item.type === "Despesa")
    .reduce((total, item) => total + item.amountInCents, 0)

  const cards = [
    {
      label: "Total de receitas",
      value: income,
      color: "text-success",
      icon: ArrowUpRight,
      iconClassName: "bg-success-foreground text-success",
    },
    {
      label: "Total de despesas",
      value: expenses,
      color: "text-destructive",
      icon: ArrowDownRight,
      iconClassName: "bg-destructive/10 text-destructive",
    },
    {
      label: "Saldo",
      value: income - expenses,
      color: "text-foreground",
      icon: Wallet,
      iconClassName: "bg-secondary text-primary",
    },
  ]

  function handleCreate(values: NewTransactionFormValues) {
    setFinanceTransactions((current) => [
      {
        description: values.description,
        bethel: values.bethel,
        dateTime: new Date().toISOString(),
        type: values.type,
        amountInCents: amountInCents(values.amount),
        id: Math.max(0, ...current.map((item) => item.id)) + 1,
      },
      ...current,
    ])
    setQuery("")
    setType("all")
    setPage(1)
  }

  function handleEdit(id: number, values: NewTransactionFormValues) {
    setFinanceTransactions((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              description: values.description,
              bethel: values.bethel,
              type: values.type,
              amountInCents: amountInCents(values.amount),
            }
          : item,
      ),
    )
  }

  function handleRemove(id: number) {
    setFinanceTransactions((current) =>
      current.filter((item) => item.id !== id),
    )
  }

  return (
    <section aria-labelledby="finances-title" className="w-full max-w-[1280px]">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row">
        <div>
          <h1
            id="finances-title"
            className="font-display text-[20px] font-bold leading-tight tracking-[-0.02em]"
          >
            Finanças
          </h1>
          <p className="mt-1.5 text-lg text-muted-foreground">
            Acompanhe receitas, despesas e movimentações dos bethéis em um só
            lugar.
          </p>
        </div>
        <div className="flex w-full justify-end md:w-fit">
          <TransactionDialog onSave={handleCreate} />
        </div>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-3 md:mt-8">
        {cards.map((card, index) => (
          <SummaryCard
            key={index}
            label={card.label}
            color={card.color}
            value={card.value}
            icon={card.icon}
            iconClassName={card.iconClassName}
          />
        ))}
      </div>

      <div className="mt-7 flex flex-wrap items-center justify-between gap-3 md:mt-8">
        <div className="relative w-full md:max-w-96">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            aria-label="Buscar movimentações por descrição ou Bethel"
            className="h-11 bg-card pl-9 shadow-none"
            placeholder="Buscar movimentação"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setPage(1)
            }}
          />
        </div>
        <div className="flex w-full items-center gap-2 md:w-auto">
          <Select
            value={type}
            onValueChange={(value) => {
              setType(value)
              setPage(1)
            }}
          >
            <SelectTrigger
              aria-label="Filtrar por tipo"
              className="h-11 w-full bg-card shadow-none md:w-[165px]"
            >
              <SelectValue className="text-md">
                <span className="text-muted-foreground">Tipo:</span>{" "}
                {type === "all" ? "Todos" : type}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="border-0">
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="Receita">Receita</SelectItem>
              <SelectItem value="Despesa">Despesa</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-lg border border-border bg-card shadow-sm">
        <div className="hidden md:block">
          <FinancesTable
            items={visibleTransactions}
            onEdit={handleEdit}
            onRemove={handleRemove}
          />
        </div>
        <div className="md:hidden">
          <FinancesList
            items={visibleTransactions}
            onEdit={handleEdit}
            onRemove={handleRemove}
          />
        </div>
        <div className="flex min-h-[60px] items-center justify-between gap-3 border-t border-border px-5 text-md text-muted-foreground">
          <PageIndicator
            firstItem={filteredTransactions.length === 0 ? 0 : firstItem + 1}
            lastItem={Math.min(
              firstItem + pageSize,
              filteredTransactions.length,
            )}
            totalItems={filteredTransactions.length}
          />
          <Pagination
            ariaLabel="Paginação de movimentações"
            currentPage={currentPage}
            totalPages={totalPages}
            setPage={setPage}
          />
        </div>
      </div>
    </section>
  )
}
