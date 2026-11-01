export type FormRecord = {
  id: number
  title: string
  description: string
  createdAt: string
  responses: number
  status: "Ativo" | "Pendente" | "Inativo"
}

// Dados de exemplo até a integração com o backend.
export const forms: FormRecord[] = [
  {
    id: 1,
    title: "Relatório mensal de atividades",
    description:
      "Registro das atividades realizadas pelo Bethel durante o mês.",
    createdAt: "2026-10-28",
    responses: 18,
    status: "Ativo",
  },
  {
    id: 2,
    title: "Inscrição para evento",
    description: "Inscrições para o próximo encontro regional.",
    createdAt: "2026-10-24",
    responses: 32,
    status: "Ativo",
  },
  {
    id: 3,
    title: "Pesquisa de satisfação",
    description: "Avaliação das atividades e sugestões dos membros.",
    createdAt: "2026-10-20",
    responses: 12,
    status: "Ativo",
  },
  {
    id: 4,
    title: "Cadastro de voluntários",
    description: "Levantamento de pessoas interessadas em apoiar as ações.",
    createdAt: "2026-10-16",
    responses: 9,
    status: "Pendente",
  },
  {
    id: 5,
    title: "Prestação de contas",
    description: "Envio de dados financeiros para acompanhamento.",
    createdAt: "2026-10-12",
    responses: 21,
    status: "Ativo",
  },
  {
    id: 6,
    title: "Avaliação de encontro",
    description: "Comentários sobre o encontro realizado pelo Bethel.",
    createdAt: "2026-10-08",
    responses: 26,
    status: "Inativo",
  },
  {
    id: 7,
    title: "Atualização cadastral",
    description: "Conferência das informações dos membros.",
    createdAt: "2026-10-04",
    responses: 14,
    status: "Ativo",
  },
]

const dateFormatter = new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" })

export function formatFormDate(value: string) {
  return dateFormatter.format(new Date(`${value}T12:00:00Z`))
}
