import { describe, expect, test } from "vitest"
import { newPostSchema } from "../schemas"
import {
  createAttachment,
  createImage,
  createValidPost,
} from "./fixtures/posts"

describe("validação de postagens", () => {
  test("aceita postagem sem arquivos opcionais", () => {
    const values = createValidPost()

    const result = newPostSchema.safeParse(values)

    expect(result.success).toBe(true)
  })

  test("remove espaços do título, descrição e categoria", () => {
    const valid = createValidPost()
    const values = {
      ...valid,
      title: ` ${valid.title} `,
      summary: ` ${valid.summary} `,
      category: ` ${valid.category} `,
    }

    const result = newPostSchema.parse(values)

    expect(result).toEqual(valid)
  })

  test.each([
    ["title", "", "Informe o título da postagem."],
    ["title", "   ", "Informe o título da postagem."],
    ["summary", "", "Informe a descrição da postagem."],
    ["summary", "   ", "Informe a descrição da postagem."],
    ["bethelId", "", "Selecione um Bethel."],
    ["category", "", "Informe a categoria."],
    ["category", "   ", "Informe a categoria."],
    ["publishedAt", "", "Informe a data da publicação."],
  ])("rejeita %s com valor '%s'", (field, value, message) => {
    const values = { ...createValidPost(), [field]: value }

    const result = newPostSchema.safeParse(values)

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues).toContainEqual(
        expect.objectContaining({ path: [field], message }),
      )
    }
  })

  test("aceita uma imagem e múltiplos anexos de tipos diferentes", () => {
    const values = {
      ...createValidPost(),
      thumbnail: [createImage()],
      attachments: [createAttachment(), createImage()],
    }

    const result = newPostSchema.safeParse(values)

    expect(result.success).toBe(true)
  })

  test("rejeita múltiplas imagens de capa", () => {
    const values = {
      ...createValidPost(),
      thumbnail: [createImage(), createImage("outra.png")],
    }

    const result = newPostSchema.safeParse(values)

    expect(result.success).toBe(false)
    if (!result.success)
      expect(result.error.issues).toContainEqual(
        expect.objectContaining({
          path: ["thumbnail"],
          message: "Selecione apenas uma imagem.",
        }),
      )
  })

  test("rejeita capa que não seja uma imagem", () => {
    const values = { ...createValidPost(), thumbnail: [createAttachment()] }

    const result = newPostSchema.safeParse(values)

    expect(result.success).toBe(false)
    if (!result.success)
      expect(result.error.issues).toContainEqual(
        expect.objectContaining({
          path: ["thumbnail"],
          message: "Selecione um arquivo de imagem.",
        }),
      )
  })
})
