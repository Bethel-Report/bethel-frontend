import { useState, type FormEvent } from "react"
import { ClipboardList, Plus } from "lucide-react"
import { Button } from "@/shared/components/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/dialog"
import { Input } from "@/shared/components/input"
import { Label } from "@/shared/components/label"
import { Textarea } from "@/shared/components/textarea"

type CreateFormDialogProps = {
  onCreate: (title: string, description: string) => void
}

export function CreateFormDialog({ onCreate }: CreateFormDialogProps) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [formError, setFormError] = useState("")

  function resetForm() {
    setTitle("")
    setDescription("")
    setFormError("")
  }

  function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!title.trim() || !description.trim()) {
      setFormError("Preencha todos os campos obrigatórios.")
      return
    }

    onCreate(title.trim(), description.trim())
    setOpen(false)
    resetForm()
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen)
        if (!nextOpen) resetForm()
      }}
    >
      <DialogTrigger asChild>
        <Button type="button" className="h-auto px-4 py-3 text-md">
          <Plus aria-hidden="true" /> Criar formulário
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-xl gap-0 overflow-y-auto rounded-lg border-border bg-card p-0">
        <DialogHeader className="p-4 pr-12 text-left sm:p-6 sm:pr-12">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
              <ClipboardList aria-hidden="true" className="size-5" />
            </div>
            <div>
              <DialogTitle className="font-display text-lg font-bold">
                Criar formulário
              </DialogTitle>
              <DialogDescription className="mt-1 text-md">
                Cadastre as informações básicas do formulário.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <form
          onSubmit={handleCreate}
          className="border-t border-border"
          noValidate
        >
          <div className="space-y-4 p-4 sm:p-6">
            <div className="space-y-2">
              <Label htmlFor="form-title" className="text-md">
                Título <span className="text-destructive">*</span>
              </Label>
              <Input
                id="form-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Nome do formulário"
                className="h-11 bg-card shadow-none"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="form-description" className="text-md">
                Descrição <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="form-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Descreva o objetivo do formulário"
                className="min-h-24 bg-card shadow-none"
                required
              />
            </div>
            {formError && (
              <p role="alert" className="text-md text-destructive">
                {formError}
              </p>
            )}
          </div>
          <div className="flex flex-col-reverse justify-end gap-2 border-t border-border p-4 sm:flex-row sm:p-6">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="h-11 px-5">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" className="h-11 px-5">
              Cadastrar formulário
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
