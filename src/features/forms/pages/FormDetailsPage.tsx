import { useState } from "react"
import {
  CalendarDays,
  ClipboardList,
  Landmark,
  ListTree,
  MessageSquareText,
  Pencil,
  Search,
  Trash,
} from "lucide-react"
import { Link, useParams } from "react-router"
import { bethels } from "@/features/bethels/data"
import { normalizeSearchText } from "@/lib/utils"
import { Button } from "@/shared/components/button"
import { Card, CardContent, CardHeader } from "@/shared/components/card"
import { Input } from "@/shared/components/input"
import { Separator } from "@/shared/components/separator"
import { Back } from "@/shared/components/ui/Back"
import { PageIndicator } from "@/shared/components/ui/PageIndicator"
import { Pagination } from "@/shared/components/ui/Pagination"
import { StatusBadge } from "@/shared/components/ui/StatusBadge"
import { FormBethelsTable } from "../components/FormBethelsTable"
import { FormBethelsList } from "../components/FormBethelsList"
import { formatFormDate, forms } from "../data"

const pageSize = 5

export function FormDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const form = forms.find((item) => String(item.id) === id)
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)

  if (!form) {
    return (
      <section className="w-full max-w-[1280px]">
        <Card className="rounded-lg border-border p-6 shadow-sm">
          <h1 className="font-display text-lg font-bold">
            Formulário não encontrado
          </h1>
          <p className="mt-2 text-md text-muted-foreground">
            Não encontramos um formulário com este identificador.
          </p>
          <Button asChild variant="outline" className="mt-5 h-11 px-5">
            <Link to="/formularios">Voltar para formulários</Link>
          </Button>
        </Card>
      </section>
    )
  }

  const search = normalizeSearchText(query.trim())
  const filteredBethels = bethels.filter(
    (bethel) =>
      !search ||
      normalizeSearchText(
        `${bethel.name} ${bethel.city} ${bethel.state}`,
      ).includes(search),
  )
  const totalPages = Math.max(1, Math.ceil(filteredBethels.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const firstItem = (currentPage - 1) * pageSize
  const visibleBethels = filteredBethels.slice(firstItem, firstItem + pageSize)

  function toggleBethel(bethelId: number, checked: boolean) {
    setSelectedIds((current) =>
      checked
        ? [...current, bethelId]
        : current.filter((item) => item !== bethelId),
    )
  }

  function toggleAll(checked: boolean) {
    const visibleIds = visibleBethels.map((bethel) => bethel.id)
    setSelectedIds((current) =>
      checked
        ? [...new Set([...current, ...visibleIds])]
        : current.filter((item) => !visibleIds.includes(item)),
    )
  }

  return (
    <div className="w-full max-w-[1280px] space-y-5 sm:space-y-6">
      <Back />
      <section aria-labelledby="form-details-title">
        <Card className="overflow-hidden rounded-lg border-border shadow-sm">
          <CardHeader className="flex gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary sm:size-14">
                <ClipboardList aria-hidden="true" className="size-6" />
              </div>
              <div>
                <h1
                  id="form-details-title"
                  className="font-display text-2xl font-bold leading-tight tracking-[-0.02em]"
                >
                  {form.title}
                </h1>
                <p className="mt-1 text-md text-muted-foreground">
                  {form.description}
                </p>
              </div>
            </div>
            <StatusBadge status={form.status} />
          </CardHeader>
          <Separator />
          <CardContent className="p-4 sm:p-6">
            <div className="grid gap-5 sm:grid-cols-3">
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                  <CalendarDays aria-hidden="true" className="size-5" />
                </div>
                <div>
                  <p className="text-md text-muted-foreground">Criado em</p>
                  <p className="font-display text-lg font-bold">
                    {formatFormDate(form.createdAt)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                  <MessageSquareText aria-hidden="true" className="size-5" />
                </div>
                <div>
                  <p className="text-md text-muted-foreground">Respostas</p>
                  <p className="font-display text-lg font-bold">
                    {form.responses}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Landmark aria-hidden="true" className="size-5" />
                </div>
                <div>
                  <p className="text-md text-muted-foreground">
                    Bethéis selecionados
                  </p>
                  <p className="font-display text-lg font-bold">
                    {selectedIds.length}
                  </p>
                </div>
              </div>
            </div>
            <Separator className="my-6" />
            <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
              <div>
                <dt className="text-md text-muted-foreground">Identificador</dt>
                <dd className="mt-1 text-lg font-semibold">#{form.id}</dd>
              </div>
              <div>
                <dt className="text-md text-muted-foreground">Situação</dt>
                <dd className="mt-1 text-lg font-semibold">{form.status}</dd>
              </div>
            </dl>
          </CardContent>
          <Separator />
          <div className="flex flex-col-reverse flex-wrap justify-end gap-2 p-4 sm:flex-row sm:gap-4 sm:p-6">
            <Button type="button" variant="outline" className="h-11 px-5">
              <Trash aria-hidden="true" className="size-5" />
              Remover formulário
            </Button>
            <Button type="button" variant="outline" className="h-11 px-5">
              <Pencil aria-hidden="true" className="size-5" />
              Editar formulário
            </Button>
            <Button type="button" className="h-11 px-5">
              <ListTree aria-hidden="true" className="size-5" />
              Editar estrutura
            </Button>
          </div>
        </Card>
      </section>

      <section aria-labelledby="form-bethels-title">
        <Card className="overflow-hidden rounded-lg border-border p-0 shadow-sm">
          <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <h2
                id="form-bethels-title"
                className="font-display text-lg font-bold"
              >
                Bethéis responsáveis
              </h2>
              <p className="mt-1 text-md text-muted-foreground">
                Selecione os bethéis que deverão responder a este formulário.
              </p>
            </div>
            <div className="relative w-full sm:max-w-64">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                aria-label="Buscar bethéis por nome ou localização"
                placeholder="Buscar Bethel"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value)
                  setPage(1)
                }}
                className="h-11 bg-card pl-9 shadow-none"
              />
            </div>
          </div>
          <div className="mx-4 mb-4 overflow-hidden rounded-lg border border-border sm:mx-6 sm:mb-6">
            <div className="hidden md:block">
              <FormBethelsTable
                items={visibleBethels}
                selectedIds={selectedIds}
                onToggle={toggleBethel}
                onToggleAll={toggleAll}
              />
            </div>
            <div className="md:hidden">
              <FormBethelsList
                items={visibleBethels}
                selectedIds={selectedIds}
                onToggle={toggleBethel}
              />
            </div>
            <div className="flex min-h-[60px] items-center justify-between gap-3 border-t border-border px-5 text-md text-muted-foreground">
              <PageIndicator
                firstItem={filteredBethels.length === 0 ? 0 : firstItem + 1}
                lastItem={Math.min(
                  firstItem + pageSize,
                  filteredBethels.length,
                )}
                totalItems={filteredBethels.length}
              />
              <Pagination
                ariaLabel="Paginação de bethéis do formulário"
                currentPage={currentPage}
                totalPages={totalPages}
                setPage={setPage}
              />
            </div>
          </div>
          <div className="border-t border-border p-4 sm:px-6">
            <p className="text-md text-muted-foreground">
              {selectedIds.length} de {bethels.length} bethéis selecionados
            </p>
          </div>
        </Card>
      </section>
    </div>
  )
}
