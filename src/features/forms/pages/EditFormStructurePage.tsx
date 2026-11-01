import { useState, type FormEvent } from "react"
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react"
import { Link, useNavigate, useParams } from "react-router"
import { Button } from "@/shared/components/button"
import { Card, CardContent } from "@/shared/components/card"
import { Checkbox } from "@/shared/components/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/dropdown-menu"
import { Input } from "@/shared/components/input"
import { Label } from "@/shared/components/label"
import { Separator } from "@/shared/components/separator"
import { Textarea } from "@/shared/components/textarea"
import { Back } from "@/shared/components/ui/Back"
import { forms } from "../data"

const fieldTypes = [
  { value: "text", label: "Texto curto" },
  { value: "textarea", label: "Texto longo" },
  { value: "number", label: "Número" },
  { value: "checkbox", label: "Múltipla escolha" },
  { value: "radio", label: "Única escolha" },
] as const

type FieldType = (typeof fieldTypes)[number]["value"]

type Field = {
  id: string
  name: string
  type: FieldType
  required: boolean
  options: FieldOption[]
}

type FieldOption = {
  id: string
  value: string
}

type Section = {
  id: string
  name: string
  description: string
  fields: Field[]
}

function moveItem<T extends { id: string }>(
  items: T[],
  id: string,
  step: -1 | 1,
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

type ItemActionsProps = {
  label: string
  canMoveUp: boolean
  canMoveDown: boolean
  onMoveUp: () => void
  onMoveDown: () => void
  onRemove: () => void
}

function ItemActions({
  label,
  canMoveUp,
  canMoveDown,
  onMoveUp,
  onMoveDown,
  onRemove,
}: ItemActionsProps) {
  return (
    <div className="flex shrink-0 items-center gap-1">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label={`Mover ${label} para cima`}
        title={`Mover ${label} para cima`}
        className="size-9 text-muted-foreground"
        disabled={!canMoveUp}
        onClick={onMoveUp}
      >
        <ArrowUp aria-hidden="true" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label={`Mover ${label} para baixo`}
        title={`Mover ${label} para baixo`}
        className="size-9 text-muted-foreground"
        disabled={!canMoveDown}
        onClick={onMoveDown}
      >
        <ArrowDown aria-hidden="true" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label={`Remover ${label}`}
        title={`Remover ${label}`}
        className="size-9 text-muted-foreground hover:text-destructive"
        onClick={onRemove}
      >
        <Trash2 aria-hidden="true" />
      </Button>
    </div>
  )
}

function isChoiceField(type: FieldType) {
  return type === "checkbox" || type === "radio"
}

function createOption(): FieldOption {
  return { id: crypto.randomUUID(), value: "" }
}

function loadSections(formId: string | undefined): Section[] {
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

export function EditFormStructurePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const form = forms.find((item) => String(item.id) === id)
  const [sections, setSections] = useState<Section[]>(() => loadSections(id))

  function addSection() {
    setSections((current) => [
      ...current,
      { id: crypto.randomUUID(), name: "", description: "", fields: [] },
    ])
  }

  function updateSection(sectionId: string, changes: Partial<Section>) {
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

  function moveSection(sectionId: string, step: -1 | 1) {
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
    changes: Partial<Field>,
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

  function moveField(sectionId: string, fieldId: string, step: -1 | 1) {
    setSections((current) =>
      current.map((section) =>
        section.id === sectionId
          ? { ...section, fields: moveItem(section.fields, fieldId, step) }
          : section,
      ),
    )
  }

  function saveStructure(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    localStorage.setItem(`form-structure:${id}`, JSON.stringify(sections))
    navigate(`/formularios/${id}`)
  }

  if (!form) {
    return (
      <section className="w-full max-w-[1280px]">
        <Back />
        <h1 className="font-display text-[20px] font-bold">
          Formulário não encontrado
        </h1>
        <p className="mt-1.5 text-lg text-muted-foreground">
          Não encontramos um formulário com este identificador.
        </p>
        <Button asChild variant="outline" className="mt-5 h-11 px-5">
          <Link to="/formularios">Voltar para formulários</Link>
        </Button>
      </section>
    )
  }

  return (
    <section
      aria-labelledby="edit-form-structure-title"
      className="w-full max-w-[1280px]"
    >
      <Back />
      <div>
        <h1
          id="edit-form-structure-title"
          className="font-display text-[20px] font-bold leading-tight tracking-[-0.02em]"
        >
          Editar estrutura
        </h1>
        <p className="mt-1.5 text-lg text-muted-foreground">
          Organize as seções e perguntas de {form.title}.
        </p>
      </div>

      <form onSubmit={saveStructure} className="mt-7 space-y-5 sm:mt-8">
        {sections.map((section, sectionIndex) => (
          <Card key={section.id} className="rounded-lg border-border shadow-sm">
            <CardContent className="space-y-5 p-4 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-display text-lg font-bold">
                  Seção {sectionIndex + 1}
                </h2>
                <ItemActions
                  label={`seção ${sectionIndex + 1}`}
                  canMoveUp={sectionIndex > 0}
                  canMoveDown={sectionIndex < sections.length - 1}
                  onMoveUp={() => moveSection(section.id, -1)}
                  onMoveDown={() => moveSection(section.id, 1)}
                  onRemove={() => removeSection(section.id)}
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor={`section-name-${section.id}`}
                  className="text-md"
                >
                  Nome da seção <span className="text-destructive">*</span>
                </Label>
                <Input
                  id={`section-name-${section.id}`}
                  value={section.name}
                  onChange={(event) =>
                    updateSection(section.id, { name: event.target.value })
                  }
                  placeholder="Digite o nome da seção"
                  className="h-11 bg-card shadow-none"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor={`section-description-${section.id}`}
                  className="text-md"
                >
                  Descrição
                </Label>
                <Textarea
                  id={`section-description-${section.id}`}
                  value={section.description}
                  onChange={(event) =>
                    updateSection(section.id, {
                      description: event.target.value,
                    })
                  }
                  placeholder="Descreva esta seção"
                  className="min-h-24 bg-card shadow-none"
                />
              </div>

              {section.fields.map((field, fieldIndex) => (
                <div key={field.id} className="space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Label
                      htmlFor={`field-name-${field.id}`}
                      className="text-md"
                    >
                      Campo {fieldIndex + 1}{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <div className="flex items-center gap-2">
                      <span className="text-md text-muted-foreground">
                        {
                          fieldTypes.find(({ value }) => value === field.type)
                            ?.label
                        }
                      </span>
                      <ItemActions
                        label={`campo ${fieldIndex + 1} da seção ${sectionIndex + 1}`}
                        canMoveUp={fieldIndex > 0}
                        canMoveDown={fieldIndex < section.fields.length - 1}
                        onMoveUp={() => moveField(section.id, field.id, -1)}
                        onMoveDown={() => moveField(section.id, field.id, 1)}
                        onRemove={() => removeField(section.id, field.id)}
                      />
                    </div>
                  </div>
                  <Input
                    id={`field-name-${field.id}`}
                    value={field.name}
                    onChange={(event) =>
                      updateField(section.id, field.id, {
                        name: event.target.value,
                      })
                    }
                    placeholder="Digite o nome do campo"
                    className="h-11 bg-card shadow-none"
                    required
                  />
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={`field-required-${field.id}`}
                      checked={field.required}
                      onCheckedChange={(checked) =>
                        updateField(section.id, field.id, {
                          required: checked === true,
                        })
                      }
                    />
                    <Label
                      htmlFor={`field-required-${field.id}`}
                      className="cursor-pointer text-md font-normal"
                    >
                      Campo obrigatório
                    </Label>
                  </div>
                  {isChoiceField(field.type) && (
                    <div className="space-y-3 rounded-lg border border-border p-4">
                      <p className="text-md font-medium">Opções de resposta</p>
                      {field.options.map((option, optionIndex) => (
                        <div
                          key={option.id}
                          className="flex items-center gap-2"
                        >
                          <Input
                            aria-label={`Opção ${optionIndex + 1} do campo ${fieldIndex + 1}`}
                            value={option.value}
                            onChange={(event) =>
                              updateField(section.id, field.id, {
                                options: field.options.map((item) =>
                                  item.id === option.id
                                    ? { ...item, value: event.target.value }
                                    : item,
                                ),
                              })
                            }
                            placeholder={`Opção ${optionIndex + 1}`}
                            className="h-11 bg-card shadow-none"
                            required
                          />
                          {field.options.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              aria-label={`Remover opção ${optionIndex + 1} do campo ${fieldIndex + 1}`}
                              className="h-11 w-11 shrink-0 text-muted-foreground"
                              onClick={() =>
                                updateField(section.id, field.id, {
                                  options: field.options.filter(
                                    (item) => item.id !== option.id,
                                  ),
                                })
                              }
                            >
                              <Trash2 aria-hidden="true" />
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        className="h-11 px-5"
                        onClick={() =>
                          updateField(section.id, field.id, {
                            options: [...field.options, createOption()],
                          })
                        }
                      >
                        <Plus aria-hidden="true" />
                        Adicionar opção
                      </Button>
                    </div>
                  )}
                </div>
              ))}

              <Separator />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button type="button" variant="outline" className="h-11 px-5">
                    <Plus aria-hidden="true" />
                    Criar campo
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="min-w-52">
                  {fieldTypes.map(({ value, label }) => (
                    <DropdownMenuItem
                      key={value}
                      onSelect={() => addField(section.id, value)}
                      className="text-md"
                    >
                      {label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>
        ))}

        <div className="flex flex-col gap-4 pt-3 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="button"
            variant="outline"
            className="h-11 px-5"
            onClick={addSection}
          >
            <Plus aria-hidden="true" />
            Adicionar seção
          </Button>
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:gap-4">
            <Button asChild variant="outline" className="h-11 px-5">
              <Link to={`/formularios/${form.id}`}>Cancelar</Link>
            </Button>
            <Button type="submit" className="h-11 px-5">
              Salvar
            </Button>
          </div>
        </div>
      </form>
    </section>
  )
}
