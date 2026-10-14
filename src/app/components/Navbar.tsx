import { Button } from "@/shared/components/button"
import { Brand } from "@/shared/components/brand"
import { Link } from "react-router"
import { X, type LucideIcon } from "lucide-react"

type NavbarProps = {
  profile: string
  pathname: string
  unread: number
  isMember: boolean
  navItems: {
    to: string
    label: string
    icon: LucideIcon
    group: string
  }[]
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function Navbar({
  profile,
  pathname,
  unread,
  navItems,
  isMember,
  open,
  setOpen,
}: NavbarProps) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex w-[242px] flex-col border-r border-border bg-card transition-transform duration-200 ease-[ease] lg:w-[220px] lg:translate-x-0 lg:transition-none xl:w-[242px] ${open ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="flex h-[86px] shrink-0 items-center justify-between px-6">
        <Link to="/">
          <Brand />
        </Link>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Fechar menu"
          className="lg:hidden"
          onClick={() => setOpen(false)}
        >
          <X />
        </Button>
      </div>
      <nav
        className="flex-1 overflow-y-auto px-3 pb-4"
        aria-label="Navegação principal"
      >
        {navItems
          .filter(
            (n) =>
              !isMember ||
              [
                "/",
                "/postagens",
                "/eleicoes",
                "/materiais",
                "/notificacoes",
              ].includes(n.to),
          )
          .filter(
            (n) => profile === "Grande Conselho" || n.to !== "/formularios",
          )
          .map((n) => (
            <div key={n.to}>
              {n.group && (
                <p className="mb-2 mt-4 px-3 text-xs font-semibold tracking-[0.1em] text-muted-foreground">
                  {n.group}
                </p>
              )}
              <Link
                to={n.to}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-md px-3.5 py-2.5 transition-[background] duration-150 ease-[ease] ${pathname === n.to ? "bg-secondary font-semibold text-primary" : "font-medium text-muted-foreground hover:bg-muted hover:text-foreground"}`}
              >
                <n.icon size={18} strokeWidth={1.7} />
                <span className="min-w-0 flex-1 text-md">{n.label}</span>
                {n.to === "/notificacoes" && unread > 0 && (
                  <span className="rounded bg-secondary px-1.5 text-xs text-primary">
                    {unread}
                  </span>
                )}
              </Link>
            </div>
          ))}
      </nav>
    </aside>
  )
}
