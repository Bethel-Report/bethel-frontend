import { useState } from "react"
import { Plus, Search } from "lucide-react"
import { Link } from "react-router"
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
import { PageIndicator } from "@/shared/components/ui/PageIndicator"
import { Pagination } from "@/shared/components/ui/Pagination"
import { UsersTable } from "../components/UsersTable"
import { UsersList } from "../components/UsersList"
import { users } from "../data"

const pageSize = 5

export function UsersPage() {
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState("all")
  const [page, setPage] = useState(1)

  const search = normalizeSearchText(query.trim())
  const filteredUsers = users.filter(
    (user) =>
      (status === "all" || user.status === status) &&
      (!search ||
        [user.name, user.email, user.bethel].some((value) =>
          normalizeSearchText(value).includes(search),
        )),
  )
  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const firstItem = (currentPage - 1) * pageSize
  const visibleUsers = filteredUsers.slice(firstItem, firstItem + pageSize)

  return (
    <section aria-labelledby="users-title" className="w-full max-w-[1280px]">
      <div className="flex flex-col md:flex-row items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-[20px] font-bold leading-tight tracking-[-0.02em]">
            Usuários e membros
          </h1>
          <p className="mt-1.5 text-lg text-muted-foreground">
            Pessoas, vínculos e responsabilidades em um só lugar.
          </p>
        </div>
        <div className="w-full md:w-fit flex justify-end">
          <Button asChild className="h-auto text-md px-4 py-3">
            <Link to="/membros/novo">
              <Plus aria-hidden="true" />
              Adicionar membro
            </Link>
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
            aria-label="Buscar usuários por nome"
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
              aria-label="Filtrar por situação"
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
      </div>

      <div className="mt-5 overflow-hidden rounded-lg border border-border bg-card shadow-sm">
        <div className="hidden md:block">
          <UsersTable items={visibleUsers} />
        </div>
        <div className="block md:hidden">
          <UsersList items={visibleUsers} />
        </div>
        <div className="flex min-h-[60px] items-center justify-between gap-3 border-t border-border px-5 text-md text-muted-foreground">
          <PageIndicator
            firstItem={filteredUsers.length === 0 ? 0 : firstItem + 1}
            lastItem={Math.min(firstItem + pageSize, filteredUsers.length)}
            totalItems={filteredUsers.length}
          />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            setPage={setPage}
          />
        </div>
      </div>
    </section>
  )
}
