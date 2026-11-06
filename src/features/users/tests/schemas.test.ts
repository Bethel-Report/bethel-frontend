import { describe, expect, test } from "vitest"
import { newUserSchema } from "../schemas"
import { validUser } from "./fixtures/users"

describe("validação de usuários", () => {
  test.each(["", "(85) 99999-0000"])(
    "aceita telefone opcional '%s'",
    (phone) => {
      const values = { ...validUser, phone }

      const result = newUserSchema.safeParse(values)

      expect(result.success).toBe(true)
    },
  )

  test("remove espaços do nome", () => {
    const values = { ...validUser, name: `  ${validUser.name}  ` }

    const result = newUserSchema.parse(values)

    expect(result).toEqual(validUser)
  })

  test.each([
    ["name", "", "Informe o nome completo."],
    ["name", "   ", "Informe o nome completo."],
    ["email", "invalido", "Informe um e-mail válido."],
    ["email", "nome@", "Informe um e-mail válido."],
    ["email", "@example.com", "Informe um e-mail válido."],
    ["email", "nome com espaco@example.com", "Informe um e-mail válido."],
    ["role", "", "Selecione um perfil."],
    ["bethel", "", "Selecione um Bethel."],
  ])("rejeita %s com valor '%s'", (field, value, message) => {
    const values = { ...validUser, [field]: value }

    const result = newUserSchema.safeParse(values)

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues).toContainEqual(
        expect.objectContaining({ path: [field], message }),
      )
    }
  })

  test("rejeita e-mail vazio", () => {
    const values = { ...validUser, email: "" }

    const result = newUserSchema.safeParse(values)

    expect(result.success).toBe(false)
    if (!result.success)
      expect(result.error.issues).toContainEqual(
        expect.objectContaining({ path: ["email"] }),
      )
  })
})
