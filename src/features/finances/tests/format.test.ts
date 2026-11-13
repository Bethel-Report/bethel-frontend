import { describe, expect, test } from "vitest"
import { formatAmount, formatDate } from "../format"

describe("formatação de finanças", () => {
  test.each([
    [0, "R$ 0,00"],
    [1, "R$ 0,01"],
    [32550, "R$ 325,50"],
    [120000, "R$ 1.200,00"],
    [-4500, "-R$ 45,00"],
  ])("formata %i centavos em reais", (amount, expected) => {
    const amountInCents = amount

    const result = formatAmount(amountInCents)

    expect(result.replace(/\u00a0/g, " ")).toBe(expected)
  })

  test("formata a data e a hora locais em português", () => {
    const date = "2026-10-28T14:30:00"

    const result = formatDate(date)

    expect(result).toBe("28/10/2026, 14:30")
  })
})
