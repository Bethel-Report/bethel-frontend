import { Button } from "@/shared/components/button"
import { Bell, ChevronRight, Menu } from "lucide-react"
import { Link } from "react-router"

type HeaderProps = {
  current: string
  unread: number
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function Header({ current, unread, setOpen }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 grid h-[70px] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-card px-4 lg:px-6 xl:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Abrir menu"
          className="lg:hidden"
          onClick={() => setOpen(true)}
        >
          <Menu />
        </Button>
        <div className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
          <span>Organização</span>
          <ChevronRight size={12} />
          <span className="text-foreground">{current}</span>
        </div>
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
        <Link
          to="/perfil"
          className="grid size-8 place-items-center rounded-full bg-secondary text-xs font-semibold text-primary"
          aria-label="Meu perfil"
        >
          MC
        </Link>
      </div>
    </header>
  )
}
