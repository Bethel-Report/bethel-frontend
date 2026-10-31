import { Button } from "@/shared/components/button"
import { useSidebar } from "@/shared/components/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/dropdown-menu"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/components/breadcrumb"
import { LogOut, Menu } from "lucide-react"
import { Link } from "react-router"
import { UserAvatar } from "@/features/users/components/UserAvatar"
import "./Header.css"

type HeaderProps = {
  current: string
}

export function Header({ current }: HeaderProps) {
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
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{current}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex shrink-0 items-center gap-3 sm:gap-5">
        <DropdownMenu>
          <DropdownMenuTrigger className="hover:bg-transparent" asChild>
            <Button variant="ghost" size="icon" aria-label="Menu do usuário">
              <UserAvatar name={"Mariana"} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="user-menu-content p-0" align="end">
            <DropdownMenuItem className="cursor-pointer py-2 px-4" asChild>
              <Link to="/login">
                <LogOut aria-hidden="true" />
                Sair
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
