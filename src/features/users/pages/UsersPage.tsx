import { useState } from "react"
import { Plus, Search } from "lucide-react"
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
import type { User } from "../types"
import { UsersList } from "../components/UsersList"

const users: User[] = [
  {
    id: 1,
    name: "Mariana Costa",
    email: "membro1@example.com",
    role: "Conselho de Bethel",
    bethel: "Bethel nº 01",
    status: "Ativo",
  },
  {
    id: 2,
    name: "Beatriz Almeida",
    email: "membro2@example.com",
    role: "Conselho de Bethel",
    bethel: "Bethel nº 02",
    status: "Ativo",
  },
  {
    id: 3,
    name: "Camila Santos",
    email: "membro3@example.com",
    role: "Conselho de Bethel",
    bethel: "Bethel nº 03",
    status: "Ativo",
  },
  {
    id: 4,
    name: "Isabela Lima",
    email: "membro4@example.com",
    role: "Conselho de Bethel",
    bethel: "Bethel nº 04",
    status: "Ativo",
  },
  {
    id: 5,
    name: "Ana Oliveira",
    email: "membro5@example.com",
    role: "Conselho de Bethel",
    bethel: "Bethel nº 05",
    status: "Ativo",
  },
  {
    id: 6,
    name: "Larissa Ferreira",
    email: "membro6@example.com",
    role: "Conselho de Bethel",
    bethel: "Bethel nº 06",
    status: "Pendente",
  },
  {
    id: 7,
    name: "Juliana Martins",
    email: "membro7@example.com",
    role: "Conselho de Bethel",
    bethel: "Bethel nº 07",
    status: "Inativo",
  },
  {
    id: 8,
    name: "Rafaela Souza",
    email: "membro8@example.com",
    role: "Conselho de Bethel",
    bethel: "Bethel nº 08",
    status: "Ativo",
  },
]

const pageSize = 5

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
}

export function UsersPage() {
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState("all")
  const [page, setPage] = useState(1)

  const search = normalize(query.trim())
  const filteredUsers = users.filter(
    (user) =>
      (status === "all" || user.status === status) &&
      (!search ||
        [user.name, user.email, user.bethel].some((value) =>
          normalize(value).includes(search),
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
          <Button type="button" className="h-auto text-md px-4 py-3">
            <Plus aria-hidden="true" />
            Convidar usuário
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
