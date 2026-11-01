import { Plus } from "lucide-react"
import { Button } from "@/shared/components/button"
import { Card, CardContent } from "@/shared/components/card"
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
import { FieldEditor } from "./FieldEditor"
import { ItemActions } from "./ItemActions"
import { fieldTypes, type Section } from "../model"
import type { FormStructureActions } from "../useFormStructure"

type SectionEditorProps = {
  section: Section
  sectionIndex: number
  sectionCount: number
  actions: FormStructureActions
}

export function SectionEditor({
  section,
  sectionIndex,
  sectionCount,
  actions,
}: SectionEditorProps) {
  return (
    <Card className="rounded-lg border-border shadow-sm">
      <CardContent className="space-y-5 p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-display text-lg font-bold">
            Seção {sectionIndex + 1}
          </h2>
          <ItemActions
            label={`seção ${sectionIndex + 1}`}
            canMoveUp={sectionIndex > 0}
            canMoveDown={sectionIndex < sectionCount - 1}
            onMoveUp={() => actions.moveSection(section.id, -1)}
            onMoveDown={() => actions.moveSection(section.id, 1)}
            onRemove={() => actions.removeSection(section.id)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`section-name-${section.id}`} className="text-md">
            Nome da seção <span className="text-destructive">*</span>
          </Label>
          <Input
            id={`section-name-${section.id}`}
            value={section.name}
            onChange={(event) =>
              actions.updateSection(section.id, { name: event.target.value })
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
              actions.updateSection(section.id, {
                description: event.target.value,
              })
            }
            placeholder="Descreva esta seção"
            className="min-h-24 bg-card shadow-none"
          />
        </div>

        {section.fields.map((field, fieldIndex) => (
          <FieldEditor
            key={field.id}
            sectionId={section.id}
            sectionIndex={sectionIndex}
            field={field}
            fieldIndex={fieldIndex}
            fieldCount={section.fields.length}
            actions={actions}
          />
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
                onSelect={() => actions.addField(section.id, value)}
                className="text-md"
              >
                {label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  )
}
