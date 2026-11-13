import { useState } from "react"
import {
  fieldTypes,
  isChoiceField,
  type Field,
  type FieldOption,
  type FieldType,
  type Section,
} from "./model"

type MoveStep = -1 | 1
type SectionChanges = Partial<Pick<Section, "name" | "description">>
type FieldChanges = Partial<Pick<Field, "name" | "required">>

function moveItem<T extends { id: string }>(
  items: T[],
  id: string,
  step: MoveStep,
) {
  const index = items.findIndex((item) => item.id === id)
  const nextIndex = index + step
  if (index < 0 || nextIndex < 0 || nextIndex >= items.length) return items

  const reordered = [...items]
  const item = reordered[index]
  reordered[index] = reordered[nextIndex]
  reordered[nextIndex] = item
  return reordered
}

function createOption(): FieldOption {
  return { id: crypto.randomUUID(), value: "" }
}

function createSection(): Section {
  return { id: crypto.randomUUID(), name: "", description: "", fields: [] }
}

function loadSections(formId: string): Section[] {
  try {
    const saved = localStorage.getItem(`form-structure:${formId}`)
    if (!saved) return []

    const sections = JSON.parse(saved) as Section[]
    if (!Array.isArray(sections)) return []

    return sections.map((section) => ({
      ...section,
      fields: section.fields.map((field) => {
        const type = fieldTypes.some(({ value }) => value === field.type)
          ? field.type
          : "text"

        return {
          ...field,
          type,
          required: field.required === true,
          options: Array.isArray(field.options)
            ? field.options
            : isChoiceField(type)
              ? [createOption(), createOption()]
              : [],
        }
      }),
    }))
  } catch {
    return []
  }
}

export function useFormStructure(formId: string) {
  const [sections, setSections] = useState<Section[]>(() => {
    const savedSections = loadSections(formId)
    return savedSections.length > 0 ? savedSections : [createSection()]
  })

  function addSection() {
    setSections((current) => [...current, createSection()])
  }

  function updateSection(sectionId: string, changes: SectionChanges) {
    setSections((current) =>
      current.map((section) =>
        section.id === sectionId ? { ...section, ...changes } : section,
      ),
    )
  }

  function removeSection(sectionId: string) {
    setSections((current) =>
      current.filter((section) => section.id !== sectionId),
    )
  }

  function moveSection(sectionId: string, step: MoveStep) {
    setSections((current) => moveItem(current, sectionId, step))
  }

  function addField(sectionId: string, type: FieldType) {
    setSections((current) =>
      current.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              fields: [
                ...section.fields,
                {
                  id: crypto.randomUUID(),
                  name: "",
                  type,
                  required: false,
                  options: isChoiceField(type)
                    ? [createOption(), createOption()]
                    : [],
                },
              ],
            }
          : section,
      ),
    )
  }

  function updateField(
    sectionId: string,
    fieldId: string,
    changes: FieldChanges,
  ) {
    setSections((current) =>
      current.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              fields: section.fields.map((field) =>
                field.id === fieldId ? { ...field, ...changes } : field,
              ),
            }
          : section,
      ),
    )
  }

  function removeField(sectionId: string, fieldId: string) {
    setSections((current) =>
      current.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              fields: section.fields.filter((field) => field.id !== fieldId),
            }
          : section,
      ),
    )
  }

  function moveField(sectionId: string, fieldId: string, step: MoveStep) {
    setSections((current) =>
      current.map((section) =>
        section.id === sectionId
          ? { ...section, fields: moveItem(section.fields, fieldId, step) }
          : section,
      ),
    )
  }

  function updateOptions(
    sectionId: string,
    fieldId: string,
    update: (options: FieldOption[]) => FieldOption[],
  ) {
    setSections((current) =>
      current.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              fields: section.fields.map((field) =>
                field.id === fieldId
                  ? { ...field, options: update(field.options) }
                  : field,
              ),
            }
          : section,
      ),
    )
  }

  function addOption(sectionId: string, fieldId: string) {
    updateOptions(sectionId, fieldId, (options) => [...options, createOption()])
  }

  function updateOption(
    sectionId: string,
    fieldId: string,
    optionId: string,
    value: string,
  ) {
    updateOptions(sectionId, fieldId, (options) =>
      options.map((option) =>
        option.id === optionId ? { ...option, value } : option,
      ),
    )
  }

  function removeOption(sectionId: string, fieldId: string, optionId: string) {
    updateOptions(sectionId, fieldId, (options) =>
      options.length > 1
        ? options.filter((option) => option.id !== optionId)
        : options,
    )
  }

  function save() {
    localStorage.setItem(`form-structure:${formId}`, JSON.stringify(sections))
  }

  return {
    sections,
    addSection,
    updateSection,
    removeSection,
    moveSection,
    addField,
    updateField,
    removeField,
    moveField,
    addOption,
    updateOption,
    removeOption,
    save,
  }
}

export type FormStructureActions = Omit<
  ReturnType<typeof useFormStructure>,
  "sections" | "save"
>
