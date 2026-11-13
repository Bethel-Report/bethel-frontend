import { act, renderHook } from "@testing-library/react"
import { beforeEach, describe, expect, test, vi } from "vitest"
import { useFormStructure } from "../../hooks/useFormStructure"
import { createSections } from "../fixtures/forms"
import type { FieldType } from "../../hooks/model"

const formId = "test-form"
const storageKey = `form-structure:${formId}`

function renderSavedStructure() {
  localStorage.setItem(storageKey, JSON.stringify(createSections()))
  return renderHook(() => useFormStructure(formId))
}

beforeEach(() => localStorage.clear())

describe("estrutura do formulário", () => {
  test("inicia com uma seção vazia sem persistir automaticamente", () => {
    const id = formId

    const { result } = renderHook(() => useFormStructure(id))

    expect(result.current.sections).toEqual([
      expect.objectContaining({ name: "", description: "", fields: [] }),
    ])
    expect(localStorage.getItem(storageKey)).toBeNull()
  })

  test("carrega a estrutura salva", () => {
    const sections = createSections()
    localStorage.setItem(storageKey, JSON.stringify(sections))

    const { result } = renderHook(() => useFormStructure(formId))

    expect(result.current.sections).toEqual(sections)
  })

  test.each(["invalid-json", "{}", "null", "[]", '[{"fields":null}]'])(
    "recupera armazenamento inválido: %s",
    (saved) => {
      localStorage.setItem(storageKey, saved)

      const { result } = renderHook(() => useFormStructure(formId))

      expect(result.current.sections).toEqual([
        expect.objectContaining({ name: "", fields: [] }),
      ])
    },
  )

  test("normaliza campos antigos sem tipo válido ou opções", () => {
    const sections = [
      {
        id: "legacy",
        fields: [
          { id: "a", type: "unknown", required: "true" },
          { id: "b", type: "checkbox" },
        ],
      },
    ]
    localStorage.setItem(storageKey, JSON.stringify(sections))

    const { result } = renderHook(() => useFormStructure(formId))

    expect(result.current.sections[0].fields[0]).toMatchObject({
      type: "text",
      required: false,
      options: [],
    })
    expect(result.current.sections[0].fields[1].options).toHaveLength(2)
  })

  test("recupera falha de leitura do armazenamento", () => {
    const getItem = vi
      .spyOn(Storage.prototype, "getItem")
      .mockImplementationOnce(() => {
        throw new Error("unavailable")
      })

    const { result } = renderHook(() => useFormStructure(formId))
    getItem.mockRestore()

    expect(result.current.sections).toHaveLength(1)
    expect(result.current.sections[0].fields).toEqual([])
  })

  test("adiciona uma seção com identificador único", () => {
    const { result } = renderSavedStructure()

    act(() => result.current.addSection())

    expect(result.current.sections).toHaveLength(3)
    expect(
      new Set(result.current.sections.map((section) => section.id)).size,
    ).toBe(3)
    expect(result.current.sections[2]).toMatchObject({
      name: "",
      description: "",
      fields: [],
    })
  })

  test("atualiza somente a seção indicada", () => {
    const { result } = renderSavedStructure()
    const original = createSections()

    act(() =>
      result.current.updateSection("section-a", {
        name: "Novo nome",
        description: "Nova descrição",
      }),
    )

    expect(result.current.sections[0]).toMatchObject({
      name: "Novo nome",
      description: "Nova descrição",
      fields: original[0].fields,
    })
    expect(result.current.sections[1]).toEqual(original[1])
  })

  test("remove somente a seção indicada", () => {
    const { result } = renderSavedStructure()

    act(() => result.current.removeSection("section-a"))

    expect(result.current.sections).toEqual([createSections()[1]])
  })

  test.each<[-1 | 1, string]>([
    [1, "section-a"],
    [-1, "section-b"],
  ])("move seção com passo %i", (step, id) => {
    const { result } = renderSavedStructure()

    act(() => result.current.moveSection(id, step))

    expect(result.current.sections.map((section) => section.id)).toEqual([
      "section-b",
      "section-a",
    ])
  })

  test.each<[-1 | 1, string]>([
    [-1, "section-a"],
    [1, "section-b"],
    [1, "missing"],
  ])("ignora movimento inválido de seção %i %s", (step, id) => {
    const { result } = renderSavedStructure()

    act(() => result.current.moveSection(id, step))

    expect(result.current.sections).toEqual(createSections())
  })

  test.each<[FieldType, number]>([
    ["text", 0],
    ["textarea", 0],
    ["number", 0],
    ["checkbox", 2],
    ["radio", 2],
  ])("adiciona campo %s", (type, optionCount) => {
    const { result } = renderSavedStructure()

    act(() => result.current.addField("section-a", type))

    const fields = result.current.sections[0].fields
    expect(fields).toHaveLength(3)
    expect(fields[2]).toMatchObject({ name: "", required: false, type })
    expect(fields[2].options).toHaveLength(optionCount)
    expect(new Set(fields[2].options.map((option) => option.id)).size).toBe(
      optionCount,
    )
    expect(result.current.sections[1]).toEqual(createSections()[1])
  })

  test("atualiza nome e obrigatoriedade do campo", () => {
    const { result } = renderSavedStructure()

    act(() =>
      result.current.updateField("section-a", "field-a", {
        name: "Nome atualizado",
        required: true,
      }),
    )

    expect(result.current.sections[0].fields[0]).toMatchObject({
      name: "Nome atualizado",
      required: true,
    })
    expect(result.current.sections[0].fields[1]).toEqual(
      createSections()[0].fields[1],
    )
  })

  test("remove campo preservando os demais", () => {
    const { result } = renderSavedStructure()

    act(() => result.current.removeField("section-a", "field-a"))

    expect(result.current.sections[0].fields).toEqual([
      createSections()[0].fields[1],
    ])
  })

  test.each<[-1 | 1, string]>([
    [1, "field-a"],
    [-1, "field-b"],
  ])("move campo com passo %i", (step, id) => {
    const { result } = renderSavedStructure()

    act(() => result.current.moveField("section-a", id, step))

    expect(result.current.sections[0].fields.map((field) => field.id)).toEqual([
      "field-b",
      "field-a",
    ])
  })

  test.each<[-1 | 1, string]>([
    [-1, "field-a"],
    [1, "field-b"],
    [1, "missing"],
  ])("ignora movimento inválido de campo %i %s", (step, id) => {
    const { result } = renderSavedStructure()

    act(() => result.current.moveField("section-a", id, step))

    expect(result.current.sections).toEqual(createSections())
  })

  test("adiciona uma opção vazia", () => {
    const { result } = renderSavedStructure()

    act(() => result.current.addOption("section-a", "field-b"))

    const options = result.current.sections[0].fields[1].options
    expect(options).toHaveLength(3)
    expect(options[2]).toMatchObject({ value: "" })
    expect(new Set(options.map((option) => option.id)).size).toBe(3)
  })

  test("atualiza somente a opção indicada", () => {
    const { result } = renderSavedStructure()

    act(() =>
      result.current.updateOption("section-a", "field-b", "option-a", "Talvez"),
    )

    expect(result.current.sections[0].fields[1].options).toEqual([
      { id: "option-a", value: "Talvez" },
      { id: "option-b", value: "Não" },
    ])
  })

  test("remove uma opção", () => {
    const { result } = renderSavedStructure()

    act(() => result.current.removeOption("section-a", "field-b", "option-a"))

    expect(result.current.sections[0].fields[1].options).toEqual([
      { id: "option-b", value: "Não" },
    ])
  })

  test("preserva a última opção", () => {
    const { result } = renderSavedStructure()
    act(() => result.current.removeOption("section-a", "field-b", "option-a"))

    act(() => result.current.removeOption("section-a", "field-b", "option-b"))

    expect(result.current.sections[0].fields[1].options).toEqual([
      { id: "option-b", value: "Não" },
    ])
  })

  test("salva e restaura alterações somente no formulário indicado", () => {
    const { result } = renderSavedStructure()
    localStorage.setItem(
      "form-structure:other",
      JSON.stringify(createSections()),
    )
    act(() => result.current.updateSection("section-a", { name: "Persistido" }))

    act(() => result.current.save())
    const restored = renderHook(() => useFormStructure(formId))

    expect(restored.result.current.sections).toEqual(result.current.sections)
    expect(JSON.parse(localStorage.getItem("form-structure:other")!)).toEqual(
      createSections(),
    )
  })
})
