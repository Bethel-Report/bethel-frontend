import type { Transaction } from "../../data"
import type { NewTransactionFormValues } from "../../schemas"

export const testBethels = [{ id: 101, name: "Bethel de teste Alfa" }]

export const testTransactions: Transaction[] = [
  {
    id: 101,
    description: "Doação de teste",
    bethel: testBethels[0].name,
    dateTime: "2026-01-10T10:00:00",
    type: "Receita",
    amountInCents: 10000,
  },
  {
    id: 102,
    description: "Material de teste",
    bethel: "Bethel de teste Beta",
    dateTime: "2026-01-11T10:00:00",
    type: "Despesa",
    amountInCents: 2000,
  },
  {
    id: 103,
    description: "Evento de teste",
    bethel: testBethels[0].name,
    dateTime: "2026-01-12T10:00:00",
    type: "Receita",
    amountInCents: 5000,
  },
  {
    id: 104,
    description: "Aluguel de teste",
    bethel: "Bethel de teste Beta",
    dateTime: "2026-01-13T10:00:00",
    type: "Despesa",
    amountInCents: 3000,
  },
  {
    id: 105,
    description: "Transporte de teste",
    bethel: testBethels[0].name,
    dateTime: "2026-01-14T10:00:00",
    type: "Despesa",
    amountInCents: 1000,
  },
  {
    id: 106,
    description: "Doação extra de teste",
    bethel: "Bethel de teste Beta",
    dateTime: "2026-01-15T10:00:00",
    type: "Receita",
    amountInCents: 5000,
  },
]

export const validTransaction: NewTransactionFormValues = {
  description: "Nova despesa de teste",
  bethel: testBethels[0].name,
  type: "Despesa",
  amount: "0,29",
}
