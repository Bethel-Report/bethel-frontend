import { Eye, Landmark } from "lucide-react"
import type { User } from "../types"
import { StatusBadge } from "./StatusBadge"
import { Button } from "@/shared/components/button"
import React from "react"
import { Link } from "react-router"
import {
  ResponsiveRowContainer,
  ResponsiveRowDataContainer,
  ResponsiveRowHighlight,
  ResponsiveRowHighlightDetail,
  ResponsiveRowList,
  ResponsiveRowSubtitle,
  ResponsiveRowTitle,
} from "@/shared/components/responsive-row"

type UsersListProps = {
  items: User[]
}

export function UsersList({ items }: UsersListProps) {
  return (
    <ResponsiveRowList>
      {items.map((user) => (
        <React.Fragment key={user.id}>
          <ResponsiveRowContainer>
            <StatusBadge status={user.status} />
            <ResponsiveRowDataContainer>
              <ResponsiveRowTitle>{user.name}</ResponsiveRowTitle>
              <ResponsiveRowSubtitle>{user.role}</ResponsiveRowSubtitle>
            </ResponsiveRowDataContainer>
            <ResponsiveRowHighlight title="Bethel">
              <ResponsiveRowHighlightDetail className="flex-1">
                <Landmark className="w-4 h-4" />
                <p className="text-md">{user.bethel}</p>
              </ResponsiveRowHighlightDetail>
            </ResponsiveRowHighlight>
            <Button
              asChild
              variant="ghost"
              className="h-12 bg-muted-foreground/5 text-lg border border-muted-foreground/10"
            >
              <Link
                to={`/membros/${user.id}`}
                aria-label={`Visualizar ${user.name}`}
                title={`Visualizar ${user.name}`}
              >
                <Eye className="w-4 h-4" />
                Visualizar
              </Link>
            </Button>
          </ResponsiveRowContainer>
          <div className="w-full border-t-1 border-muted-foreground/10"></div>
        </React.Fragment>
      ))}
    </ResponsiveRowList>
  )
}
