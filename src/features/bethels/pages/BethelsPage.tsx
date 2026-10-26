import { useState } from "react"
import { Plus, Search } from "lucide-react"
import { normalizeSearchText } from "@/lib/utils"
import { Button } from "@/shared/components/button"
import { Input } from "@/shared/components/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/select"
import { BethelCard } from "../components/BethelCard"
import { bethels } from "../data"
import { PageIndicator } from "@/shared/components/ui/PageIndicator"
import { Pagination } from "@/shared/components/ui/Pagination"

const pageSize = 6

export function BethelsPage() {
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState("all")
  const [page, setPage] = useState(1)

  const search = normalizeSearchText(query.trim())
  const filteredBethels = bethels.filter(
    (bethel) =>
      (status === "all" || bethel.status === status) &&
      (!search || normalizeSearchText(bethel.name).includes(search)),
  )
  const totalPages = Math.max(1, Math.ceil(filteredBethels.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const firstItem = (currentPage - 1) * pageSize
  const visibleBethels = filteredBethels.slice(firstItem, firstItem + pageSize)

  return (
    <section aria-labelledby="bethels-title" className="w-full max-w-[1280px]">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row">
        <div>
          <h1
            id="bethels-title"
            className="font-display text-[20px] font-bold leading-tight tracking-[-0.02em]"
          >
            Bethéis
          </h1>
          <p className="mt-1.5 text-lg text-muted-foreground">
            Conheça as unidades e acompanhe suas atividades em um só lugar.
          </p>
        </div>
        <div className="flex w-full justify-end md:w-fit">
          <Button type="button" className="h-auto px-4 py-3 text-md">
            <Plus aria-hidden="true" />
            Criar Bethel
          </Button>
        </div>
      </div>

      <div className="mt-7 flex flex-wrap items-center justify-between gap-3 md:mt-8">
        <div className="relative w-full md:max-w-96">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            aria-label="Buscar bethéis por nome"
            className="h-11 bg-card pl-9 shadow-none"
            placeholder="Buscar nome"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setPage(1)
            }}
          />
        </div>
        <div className="flex w-full items-center gap-2 md:w-auto">
          <Select
            value={status}
            onValueChange={(value) => {
              setStatus(value)
              setPage(1)
            }}
          >
            <SelectTrigger
              aria-label="Filtrar bethéis por situação"
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
              <SelectItem value="Inativo">Inativo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {visibleBethels.length > 0 ? (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visibleBethels.map((bethel) => (
            <BethelCard key={bethel.id} bethel={bethel} />
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-lg border border-border bg-card px-6 py-12 text-center text-md text-muted-foreground shadow-sm">
          Nenhum Bethel encontrado.
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-md text-muted-foreground">
        <PageIndicator
          firstItem={filteredBethels.length === 0 ? 0 : firstItem + 1}
          lastItem={Math.min(firstItem + pageSize, filteredBethels.length)}
          totalItems={filteredBethels.length}
        />
        <Pagination
          ariaLabel="Paginação de bethéis"
          currentPage={currentPage}
          totalPages={totalPages}
          setPage={setPage}
        />
      </div>
    </section>
  )
}
