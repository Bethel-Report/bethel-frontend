import bookDonationImage from "@/assets/book-donation.png"

export type Bethel = {
  id: number
  name: string
  city: string
  state: string
  members: number
  status: "Ativo" | "Inativo"
}

export const bethels: Bethel[] = [
  {
    id: 1,
    name: "Bethel nº 01",
    city: "Fortaleza",
    state: "CE",
    members: 24,
    status: "Ativo",
  },
  {
    id: 2,
    name: "Bethel nº 02",
    city: "Caucaia",
    state: "CE",
    members: 18,
    status: "Ativo",
  },
  {
    id: 3,
    name: "Bethel nº 03",
    city: "Maracanaú",
    state: "CE",
    members: 21,
    status: "Ativo",
  },
  {
    id: 4,
    name: "Bethel nº 04",
    city: "Sobral",
    state: "CE",
    members: 16,
    status: "Ativo",
  },
  {
    id: 5,
    name: "Bethel nº 05",
    city: "Juazeiro do Norte",
    state: "CE",
    members: 20,
    status: "Ativo",
  },
  {
    id: 6,
    name: "Bethel nº 06",
    city: "Crato",
    state: "CE",
    members: 14,
    status: "Ativo",
  },
  {
    id: 7,
    name: "Bethel nº 07",
    city: "Quixadá",
    state: "CE",
    members: 12,
    status: "Inativo",
  },
  {
    id: 8,
    name: "Bethel nº 08",
    city: "Iguatu",
    state: "CE",
    members: 17,
    status: "Ativo",
  },
]

export type BethelPost = {
  id: number
  bethelId: number
  title: string
  summary: string
  publishedAt: string
  category: string
  image?: string
}

export const bethelPosts: BethelPost[] = [
  {
    id: 1,
    bethelId: 1,
    title: "Juntas, fazemos a diferença",
    summary:
      "O Bethel nº 01 realizou uma ação de arrecadação de livros para a comunidade. Um dia de união, cuidado e solidariedade.",
    publishedAt: "2026-10-12",
    category: "Atividade",
    image: bookDonationImage,
  },
  {
    id: 2,
    bethelId: 1,
    title: "Campanha de arrecadação de alimentos",
    summary: "A unidade reuniu doações para apoiar famílias da comunidade.",
    publishedAt: "2026-09-28",
    category: "Campanha",
  },
  {
    id: 3,
    bethelId: 1,
    title: "Reunião mensal de atividades",
    summary: "Confira um resumo das ações e dos próximos encontros do Bethel.",
    publishedAt: "2026-09-12",
    category: "Encontro",
  },
  {
    id: 4,
    bethelId: 2,
    title: "Ação comunitária em Caucaia",
    summary:
      "Integrantes do Bethel participaram de uma atividade com a comunidade.",
    publishedAt: "2026-10-05",
    category: "Atividade",
  },
]
