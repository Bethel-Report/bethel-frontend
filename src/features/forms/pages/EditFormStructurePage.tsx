import type { FormEvent } from "react"
import { Plus } from "lucide-react"
import { Link, useNavigate, useParams } from "react-router"
import { Button } from "@/shared/components/button"
import { Back } from "@/shared/components/ui/Back"
import { SectionEditor } from "../hooks/components/SectionEditor"
import { useFormStructure } from "../hooks/useFormStructure"
import { forms } from "../data"

export function EditFormStructurePage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const form = forms.find((item) => String(item.id) === id)
  const { sections, save, ...actions } = useFormStructure(id ?? "")

  function saveStructure(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    save()
    navigate(`/formularios/${id}`)
  }

  if (!form || !id) {
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
          <SectionEditor
            key={section.id}
            section={section}
            sectionIndex={sectionIndex}
            sectionCount={sections.length}
            actions={actions}
          />
        ))}

        <div className="flex flex-col gap-4 pt-3 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="button"
            variant="outline"
            className="h-11 px-5"
            onClick={actions.addSection}
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
