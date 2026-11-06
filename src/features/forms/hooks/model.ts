export const fieldTypes = [
  { value: "text", label: "Texto curto" },
  { value: "textarea", label: "Texto longo" },
  { value: "number", label: "Número" },
  { value: "checkbox", label: "Múltipla escolha" },
  { value: "radio", label: "Única escolha" },
] as const

export type FieldType = (typeof fieldTypes)[number]["value"]

export type FieldOption = {
  id: string
  value: string
}

export type Field = {
  id: string
  name: string
  type: FieldType
  required: boolean
  options: FieldOption[]
}

export type Section = {
  id: string
  name: string
  description: string
  fields: Field[]
}

export function isChoiceField(type: FieldType) {
  return type === "checkbox" || type === "radio"
}
