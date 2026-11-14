import { matchRoutes } from "react-router"
import type { Role } from "./types"

export const roleNames: Record<Role, string> = {
  GRANDE_CONSELHO: "Grande Conselho",
  CONSELHO_DE_BETHEL: "Conselho de Bethel",
  MEMBRO_ATIVO: "Membro ativo",
  MEMBRO_DE_MAIORIDADE: "Membro de maioridade",
}

export const pagesByRole: Record<Role, readonly string[]> = {
  GRANDE_CONSELHO: [
    "/",
    "/betheis",
    "/betheis/novo",
    "/betheis/:id",
    "/postagens",
    "/postagens/novo",
    "/postagens/:id",
    "/membros",
    "/membros/novo",
    "/membros/:id",
    "/financas",
    "/formularios",
    "/formularios/:id",
    "/formularios/:id/estrutura",
  ],
  CONSELHO_DE_BETHEL: [
    "/",
    "/betheis",
    "/betheis/novo",
    "/betheis/:id",
    "/postagens",
    "/postagens/novo",
    "/postagens/:id",
    "/membros",
    "/membros/novo",
    "/membros/:id",
    "/financas",
  ],
  MEMBRO_ATIVO: ["/", "/postagens", "/postagens/:id"],
  MEMBRO_DE_MAIORIDADE: ["/", "/postagens", "/postagens/:id"],
}

const pageRoutes = [...new Set(Object.values(pagesByRole).flat())].map(
  (path) => ({ path }),
)

export function canAccess(role: Role | undefined, path: string) {
  if (!role) return false

  const page = matchRoutes(pageRoutes, path)?.[0]?.route.path

  return page !== undefined && pagesByRole[role].includes(page)
}
