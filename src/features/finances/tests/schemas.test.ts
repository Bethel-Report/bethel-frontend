import { describe, expect, test } from "vitest"
import { newTransactionSchema } from "../schemas"

import { validTransaction } from "./fixtures/transactions"

describe("validação de movimentações", () => {
  test.each(["12", "12,5", "12,50", "12.50", "0,01", " 12,50 "])(
    "aceita o valor positivo %s",
    (amount) => {
      const values = { ...validTransaction, amount }

      const result = newTransactionSchema.safeParse(values)

      expect(result.success).toBe(true)
    },
  )

  test.each(["", "0", "0,00", "-1", "1,234", "1.000,00", "abc", "1e3", ",50"])(
    "rejeita o valor inválido %s",
    (amount) => {
      const values = { ...validTransaction, amount }

      const result = newTransactionSchema.safeParse(values)

      expect(result.success).toBe(false)
    },
  )

  test.each([
    ["description", "   ", "Informe a descrição."],
    ["bethel", "", "Selecione um Bethel."],
    ["type", "Outro", "Selecione o tipo de movimentação."],
  ])("valida o campo obrigatório %s", (field, value, message) => {
    const values = { ...validTransaction, [field]: value }

    const result = newTransactionSchema.safeParse(values)

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ path: [field], message }),
        ]),
      )
    }
  })

  test("remove espaços e aceita despesas", () => {
    const values = {
      ...validTransaction,
      description: "  Material  ",
      type: "Despesa",
    }

    const result = newTransactionSchema.parse(values)

    expect(result).toEqual({
      ...validTransaction,
      description: "Material",
      type: "Despesa",
    })
  })
})
