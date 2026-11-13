import type { Bethel, BethelPost } from "../../data"
import type { NewBethelFormValues } from "../../schemas"
import type { User } from "@/features/users/types"

export const testBethels: Bethel[] = [
  {
    id: 101,
    name: "União de teste",
    city: "Cidade Alfa",
    state: "CE",
    members: 24,
    status: "Ativo",
  },
  {
    id: 102,
    name: "União inativa de teste",
    city: "Cidade Beta",
    state: "RN",
    members: 12,
    status: "Inativo",
  },
  ...Array.from({ length: 5 }, (_, index): Bethel => ({
    id: 103 + index,
    name: `Unidade de teste ${index + 1}`,
    city: "Cidade Gama",
    state: "PE",
    members: 15,
    status: "Ativo",
  })),
]

export const testPosts: BethelPost[] = [
  {
    id: 201,
    bethelId: 101,
    title: "Campanha de teste",
    summary: "Resumo da campanha de teste.",
    publishedAt: "2026-01-15",
    category: "Campanha",
    image: "/test-image.png",
  },
  {
    id: 202,
    bethelId: 101,
    title: "Reunião de teste",
    summary: "Resumo da reunião de teste.",
    publishedAt: "2026-02-20",
    category: "Encontro",
  },
  {
    id: 203,
    bethelId: 103,
    title: "Publicação de outra unidade",
    summary: "Resumo de outra unidade.",
    publishedAt: "2026-03-10",
    category: "Atividade",
  },
]

export const testUsers: User[] = [
  {
    id: 301,
    name: "Representante de teste",
    email: "representante@example.com",
    role: "Conselho de Bethel",
    bethel: testBethels[0].name,
    status: "Ativo",
  },
  {
    id: 302,
    name: "Membro de teste",
    email: "membro@example.com",
    role: "Conselho de Bethel",
    bethel: testBethels[0].name,
    status: "Ativo",
  },
  {
    id: 303,
    name: "Outro representante",
    email: "outro@example.com",
    role: "Conselho de Bethel",
    bethel: testBethels[2].name,
    status: "Ativo",
  },
]

export const validBethel: NewBethelFormValues = {
  name: "Nova unidade de teste",
  city: "Cidade de teste",
  state: "CE",
  status: "Ativo",
}
