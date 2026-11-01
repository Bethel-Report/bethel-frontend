import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/shared/components/button"
import { Checkbox } from "@/shared/components/checkbox"
import { Input } from "@/shared/components/input"
import { Label } from "@/shared/components/label"
import { ItemActions } from "./ItemActions"
import { fieldTypes, isChoiceField, type Field } from "../model"
import type { FormStructureActions } from "../useFormStructure"

type FieldEditorProps = {
  sectionId: string
  sectionIndex: number
  field: Field
  fieldIndex: number
  fieldCount: number
  actions: FormStructureActions
}

export function FieldEditor({
  sectionId,
  sectionIndex,
  field,
  fieldIndex,
  fieldCount,
  actions,
}: FieldEditorProps) {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Label htmlFor={`field-name-${field.id}`} className="text-md">
          Campo {fieldIndex + 1} <span className="text-destructive">*</span>
        </Label>
        <div className="flex items-center gap-2">
          <span className="text-md text-muted-foreground">
            {fieldTypes.find(({ value }) => value === field.type)?.label}
          </span>
          <ItemActions
            label={`campo ${fieldIndex + 1} da seção ${sectionIndex + 1}`}
            canMoveUp={fieldIndex > 0}
            canMoveDown={fieldIndex < fieldCount - 1}
            onMoveUp={() => actions.moveField(sectionId, field.id, -1)}
            onMoveDown={() => actions.moveField(sectionId, field.id, 1)}
            onRemove={() => actions.removeField(sectionId, field.id)}
          />
        </div>
      </div>
      <Input
        id={`field-name-${field.id}`}
        value={field.name}
        onChange={(event) =>
          actions.updateField(sectionId, field.id, { name: event.target.value })
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
            actions.updateField(sectionId, field.id, {
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
            <div key={option.id} className="flex items-center gap-2">
              <Input
                aria-label={`Opção ${optionIndex + 1} do campo ${fieldIndex + 1}`}
                value={option.value}
                onChange={(event) =>
                  actions.updateOption(
                    sectionId,
                    field.id,
                    option.id,
                    event.target.value,
                  )
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
                    actions.removeOption(sectionId, field.id, option.id)
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
            onClick={() => actions.addOption(sectionId, field.id)}
          >
            <Plus aria-hidden="true" />
            Adicionar opção
          </Button>
        </div>
      )}
    </div>
  )
}
