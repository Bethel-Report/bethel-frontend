export type Transaction = {
  id: number
  description: string
  bethel: string
  dateTime: string
  type: "Receita" | "Despesa"
  amountInCents: number
}

// Dados de exemplo até a integração com o backend.
export const transactions: Transaction[] = [
  {
    id: 1,
    description: "Contribuição mensal",
    bethel: "Bethel nº 01",
    dateTime: "2026-10-28T14:30:00",
    type: "Receita",
    amountInCents: 120000,
  },
  {
    id: 2,
    description: "Material para atividades",
    bethel: "Bethel nº 02",
    dateTime: "2026-10-26T10:15:00",
    type: "Despesa",
    amountInCents: 32550,
  },
  {
    id: 3,
    description: "Doação recebida",
    bethel: "Bethel nº 03",
    dateTime: "2026-10-24T16:45:00",
    type: "Receita",
    amountInCents: 75000,
  },
  {
    id: 4,
    description: "Aluguel do espaço",
    bethel: "Bethel nº 01",
    dateTime: "2026-10-21T09:00:00",
    type: "Despesa",
    amountInCents: 60000,
  },
  {
    id: 5,
    description: "Arrecadação de evento",
    bethel: "Bethel nº 04",
    dateTime: "2026-10-18T18:20:00",
    type: "Receita",
    amountInCents: 98000,
  },
  {
    id: 6,
    description: "Compra de suprimentos",
    bethel: "Bethel nº 05",
    dateTime: "2026-10-15T11:40:00",
    type: "Despesa",
    amountInCents: 21990,
  },
  {
    id: 7,
    description: "Contribuição mensal",
    bethel: "Bethel nº 02",
    dateTime: "2026-10-12T13:10:00",
    type: "Receita",
    amountInCents: 85000,
  },
  {
    id: 8,
    description: "Transporte para encontro",
    bethel: "Bethel nº 03",
    dateTime: "2026-10-09T08:30:00",
    type: "Despesa",
    amountInCents: 45000,
  },
]
