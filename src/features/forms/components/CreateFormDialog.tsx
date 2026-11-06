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

export function CreateFormDialog() {
  return (
    <Dialog>
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
        <div className="border-t border-border">
          <div className="space-y-4 p-4 sm:p-6">
            <div className="space-y-2">
              <Label htmlFor="form-title" className="text-md">
                Título <span className="text-destructive">*</span>
              </Label>
              <Input
                id="form-title"
                placeholder="Nome do formulário"
                className="h-11 bg-card shadow-none"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="form-description" className="text-md">
                Descrição <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="form-description"
                placeholder="Descreva o objetivo do formulário"
                className="min-h-24 bg-card shadow-none"
              />
            </div>
          </div>
          <div className="flex flex-col-reverse justify-end gap-2 border-t border-border p-4 sm:flex-row sm:p-6">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="h-11 px-5">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="button" className="h-11 px-5">
              Cadastrar formulário
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
