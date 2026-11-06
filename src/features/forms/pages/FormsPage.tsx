import { useState } from "react"
import { Search } from "lucide-react"
import { normalizeSearchText } from "@/lib/utils"
import { Input } from "@/shared/components/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/select"
import { PageIndicator } from "@/shared/components/ui/PageIndicator"
import { Pagination } from "@/shared/components/ui/Pagination"
import { CreateFormDialog } from "../components/CreateFormDialog"
import { FormsList } from "../components/FormsList"
import { FormsTable } from "../components/FormsTable"
import { forms } from "../data"

const pageSize = 5

export function FormsPage() {
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState("all")
  const [page, setPage] = useState(1)

  const search = normalizeSearchText(query.trim())
  const filteredForms = forms.filter(
    (form) =>
      (status === "all" || form.status === status) &&
      (!search ||
        [form.title, form.description].some((value) =>
          normalizeSearchText(value).includes(search),
        )),
  )
  const totalPages = Math.max(1, Math.ceil(filteredForms.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const firstItem = (currentPage - 1) * pageSize
  const visibleForms = filteredForms.slice(firstItem, firstItem + pageSize)

  return (
    <section aria-labelledby="forms-title" className="w-full max-w-[1280px]">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row">
        <div>
          <h1
            id="forms-title"
            className="font-display text-[20px] font-bold leading-tight tracking-[-0.02em]"
          >
            Formulários
          </h1>
          <p className="mt-1.5 text-lg text-muted-foreground">
            Crie e acompanhe os formulários dos bethéis em um só lugar.
          </p>
        </div>
        <div className="flex w-full justify-end md:w-fit">
          <CreateFormDialog />
        </div>
      </div>

      <div className="mt-7 flex flex-wrap items-center justify-between gap-3 md:mt-8">
        <div className="relative w-full md:max-w-96">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            aria-label="Buscar formulários por título ou descrição"
            className="h-11 bg-card pl-9 shadow-none"
            placeholder="Buscar formulário"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setPage(1)
            }}
          />
        </div>
        <Select
          value={status}
          onValueChange={(value) => {
            setStatus(value)
            setPage(1)
          }}
        >
          <SelectTrigger
            aria-label="Filtrar formulários por situação"
            className="h-11 w-full bg-card shadow-none md:w-[165px]"
          >
            <SelectValue className="text-md">
              <span className="text-muted-foreground">Situação:</span>{" "}
              {status === "all" ? "Todos" : status}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="border-0">
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="Ativo">Ativo</SelectItem>
            <SelectItem value="Pendente">Pendente</SelectItem>
            <SelectItem value="Inativo">Inativo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-5 overflow-hidden rounded-lg border border-border bg-card shadow-sm">
        <div className="hidden md:block">
          <FormsTable items={visibleForms} />
        </div>
        <div className="md:hidden">
          <FormsList items={visibleForms} />
        </div>
        <div className="flex min-h-[60px] items-center justify-between gap-3 border-t border-border px-5 text-md text-muted-foreground">
          <PageIndicator
            firstItem={filteredForms.length === 0 ? 0 : firstItem + 1}
            lastItem={Math.min(firstItem + pageSize, filteredForms.length)}
            totalItems={filteredForms.length}
          />
          <Pagination
            ariaLabel="Paginação de formulários"
            currentPage={currentPage}
            totalPages={totalPages}
            setPage={setPage}
          />
        </div>
      </div>
    </section>
  )
}
