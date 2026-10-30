import { Button } from "@/shared/components/button"
import { useSidebar } from "@/shared/components/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/components/breadcrumb"
import { Menu } from "lucide-react"
import { Link } from "react-router"
import { UserAvatar } from "@/features/users/components/UserAvatar"

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
        <Link to="/perfil" aria-label="Meu perfil">
          <UserAvatar name={"Mariana"} />
        </Link>
      </div>
    </header>
  )
}
