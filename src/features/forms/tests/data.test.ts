import { describe, expect, test } from "vitest"
import { formatFormDate } from "../data"
import { isChoiceField, type FieldType } from "../hooks/model"

describe("formatação de datas de formulários", () => {
  test.each([
    ["2026-01-01", "01/01/2026"],
    ["2026-12-31", "31/12/2026"],
    ["2024-02-29", "29/02/2024"],
  ])("formata %s", (date, expected) => {
    const value = date

    const result = formatFormDate(value)

    expect(result).toBe(expected)
  })
})

describe("tipos de campo", () => {
  test.each<[FieldType, boolean]>([
    ["text", false],
    ["textarea", false],
    ["number", false],
    ["checkbox", true],
    ["radio", true],
  ])("identifica campo %s", (type, expected) => {
    const fieldType = type

    const result = isChoiceField(fieldType)

    expect(result).toBe(expected)
  })
})
