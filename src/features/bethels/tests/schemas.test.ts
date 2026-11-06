import { describe, expect, test } from "vitest"
import { newBethelSchema } from "../schemas"
import { validBethel } from "./fixtures/bethels"

describe("validação de bethéis", () => {
  test.each(["Ativo", "Inativo"])("aceita a situação %s", (status) => {
    const values = { ...validBethel, status }

    const result = newBethelSchema.safeParse(values)

    expect(result.success).toBe(true)
  })

  test("remove espaços dos campos de texto", () => {
    const values = {
      ...validBethel,
      name: ` ${validBethel.name} `,
      city: ` ${validBethel.city} `,
      state: " CE ",
    }

    const result = newBethelSchema.parse(values)

    expect(result).toEqual(validBethel)
  })

  test.each([
    ["name", "", "Informe o nome do Bethel."],
    ["name", "   ", "Informe o nome do Bethel."],
    ["city", "", "Informe a cidade."],
    ["city", "   ", "Informe a cidade."],
    ["status", "", "Selecione a situação."],
    ["state", "", "Informe a sigla do estado com duas letras."],
    ["state", "C", "Informe a sigla do estado com duas letras."],
    ["state", "CEA", "Informe a sigla do estado com duas letras."],
    ["state", "12", "Informe a sigla do estado com duas letras."],
    ["state", "ÇE", "Informe a sigla do estado com duas letras."],
  ])("rejeita %s com valor '%s'", (field, value, message) => {
    const values = { ...validBethel, [field]: value }

    const result = newBethelSchema.safeParse(values)

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues).toContainEqual(
        expect.objectContaining({ path: [field], message }),
      )
    }
  })

  test("aceita sigla em minúsculas", () => {
    const values = { ...validBethel, state: "ce" }

    const result = newBethelSchema.parse(values)

    expect(result.state).toBe("ce")
  })
})
