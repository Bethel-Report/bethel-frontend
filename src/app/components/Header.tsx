import { Button } from "@/shared/components/button"
import { useSidebar } from "@/shared/components/sidebar"
import { Avatar, AvatarFallback } from "@/shared/components/avatar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/components/breadcrumb"
import { Bell, Menu } from "lucide-react"
import { Link } from "react-router"

type HeaderProps = {
  current: string
  unread: number
}

export function Header({ current, unread }: HeaderProps) {
  const { toggleSidebar } = useSidebar()

  return (
    <header className="sticky top-0 z-20 grid h-[70px] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-card px-4 lg:px-6 xl:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Abrir menu"
          className="lg:hidden"
          onClick={toggleSidebar}
        >
          <Menu />
        </Button>
        <Breadcrumb className="hidden sm:block">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Organização</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{current}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex shrink-0 items-center gap-3 sm:gap-5">
        <Button asChild variant="ghost" size="icon" title="Notificações">
          <Link
            to="/notificacoes"
            className="relative"
            aria-label="Notificações"
          >
            <Bell size={18} />
            {unread > 0 && (
              <span className="absolute right-2 top-1.5 size-1.5 rounded-full bg-primary" />
            )}
          </Link>
        </Button>
        <Link to="/perfil" aria-label="Meu perfil">
          <Avatar className="size-8">
            <AvatarFallback className="bg-secondary text-xs font-semibold text-primary">
              MC
            </AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  )
}
