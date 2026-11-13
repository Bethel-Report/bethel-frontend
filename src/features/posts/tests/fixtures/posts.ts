import type { Bethel, BethelPost } from "@/features/bethels/data"
import type { NewPostFormValues } from "../../schemas"

export const testBethels: Bethel[] = [
  {
    id: 101,
    name: "União de teste",
    city: "Cidade Alfa",
    state: "CE",
    members: 10,
    status: "Ativo",
  },
  {
    id: 102,
    name: "Esperança de teste",
    city: "Cidade Beta",
    state: "RN",
    members: 15,
    status: "Ativo",
  },
]

export const testPosts: BethelPost[] = [
  {
    id: 201,
    bethelId: 101,
    title: "Doação de teste",
    summary: "Arrecadação solidária de livros.",
    category: "Campanha",
    publishedAt: "2026-01-15",
    image: "/test-cover.png",
  },
  {
    id: 202,
    bethelId: 102,
    title: "Encontro de teste",
    summary: "Planejamento das próximas atividades.",
    category: "Encontro",
    publishedAt: "2026-01-14",
  },
  ...Array.from({ length: 5 }, (_, index): BethelPost => ({
    id: 203 + index,
    bethelId: 102,
    title: `Publicação de teste ${index + 1}`,
    summary: `Resumo da publicação ${index + 1}.`,
    category: "Atividade",
    publishedAt: `2026-01-${String(13 - index).padStart(2, "0")}`,
  })),
  {
    id: 208,
    bethelId: 999,
    title: "Postagem sem unidade",
    summary: "Unidade não encontrada.",
    category: "Atividade",
    publishedAt: "2026-01-08",
  },
]

export const testPostsWithBethel = testPosts.flatMap((post) => {
  const bethel = testBethels.find((item) => item.id === post.bethelId)
  return bethel ? [{ post, bethel }] : []
})

export function createValidPost(): NewPostFormValues {
  return {
    title: "Nova publicação de teste",
    summary: "Descrição da publicação de teste.",
    bethelId: String(testBethels[0].id),
    category: "Campanha",
    publishedAt: "2026-01-15",
    thumbnail: [],
    attachments: [],
  }
}

export function createImage(name = "capa.png") {
  return new File(["image"], name, { type: "image/png" })
}

export function createAttachment() {
  return new File(["document"], "documento.pdf", { type: "application/pdf" })
}
