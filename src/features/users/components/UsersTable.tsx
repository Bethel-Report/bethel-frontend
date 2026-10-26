import { Eye } from "lucide-react"
import { Button } from "@/shared/components/button"
import { Link } from "react-router"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/table"
import { StatusBadge } from "@/shared/components/ui/StatusBadge"
import type { User } from "../types"
import { UserAvatar } from "./UserAvatar"

type UsersTableProps = {
  items: User[]
}

export function UsersTable({ items }: UsersTableProps) {
  return (
    <Table className="min-w-[720px] table-fixed">
      <TableHeader className="bg-muted">
        <TableRow className="hover:bg-muted">
          <TableHead className="h-11 w-[26%] pl-5 text-lg font-medium">
            Usuário
          </TableHead>
          <TableHead className="h-11 w-[20%] text-lg font-medium">
            Bethel
          </TableHead>
          <TableHead className="h-11 w-[16%] text-lg font-medium">
            Perfil
          </TableHead>
          <TableHead className="h-11 w-[12%] text-lg font-medium">
            Situação
          </TableHead>
          <TableHead className="h-11 w-[10%] text-lg font-medium pr-5">
            Ações
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((user) => (
          <TableRow key={user.id} className="h-[69px] hover:bg-background/70">
            <TableCell className="pl-5">
              <div className="flex min-w-0 items-center gap-3">
                <UserAvatar name={user.name} />
                <div className="min-w-0 leading-tight">
                  <div className="truncate text-md font-semibold">
                    {user.name}
                  </div>
                  <div className="mt-0.5 truncate text-md text-muted-foreground">
                    {user.email}
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell className="text-md text-muted-foreground">
              {user.bethel}
            </TableCell>
            <TableCell className="text-md">{user.role}</TableCell>
            <TableCell>
              <StatusBadge status={user.status} />
            </TableCell>
            <TableCell className="pr-5">
              <div className="flex items-center justify-center gap-1">
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className="border border-muted-foreground/10"
                >
                  <Link
                    to={`/membros/${user.id}`}
                    aria-label={`Visualizar ${user.name}`}
                    title={`Visualizar ${user.name}`}
                  >
                    <Eye aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
        {items.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={5}
              className="h-32 text-md text-center text-muted-foreground hover:bg-card"
            >
              Nenhum usuário encontrado.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
