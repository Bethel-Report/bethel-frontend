import { describe, expect, test } from "vitest"
import { formatPostDate } from "../formatPostDate"

describe("data da postagem", () => {
  test.each([
    ["2026-01-01", "1 de jan. de 2026"],
    ["2026-12-31", "31 de dez. de 2026"],
    ["2024-02-29", "29 de fev. de 2024"],
  ])("formata %s em português preservando o dia", (date, expected) => {
    const value = date

    const result = formatPostDate(value)

    expect(result).toBe(expected)
  })
})
