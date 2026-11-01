import { Brand } from "@/shared/components/brand"
import { Button } from "@/shared/components/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/shared/components/sheet"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/shared/components/sidebar"
import { Link } from "react-router"
import { X, type LucideIcon } from "lucide-react"

type NavItem = {
  to: string
  label: string
  icon: LucideIcon
  group: string
}

type NavbarProps = {
  profile: string
  pathname: string
  isMember: boolean
  navItems: NavItem[]
}

type NavbarContentProps = Pick<
  NavbarProps,
  "profile" | "pathname" | "isMember" | "navItems"
> & {
  onNavigate: () => void
  mobile?: boolean
}

function NavbarContent({
  profile,
  pathname,
  isMember,
  navItems,
  onNavigate,
  mobile = false,
}: NavbarContentProps) {
  const sections: { label: string; items: NavItem[] }[] = []

  for (const item of navItems) {
    if (
      (isMember &&
        !["/", "/postagens", "/eleicoes", "/materiais"].includes(item.to)) ||
      (profile !== "Grande Conselho" && item.to === "/formularios")
    ) {
      continue
    }

    if (item.group || sections.length === 0) {
      sections.push({ label: item.group, items: [] })
    }
    sections[sections.length - 1].items.push(item)
  }

  return (
    <>
      <SidebarHeader className="h-[86px] shrink-0 flex-row items-center justify-between px-6 py-0">
        <Link to="/" onClick={onNavigate}>
          <Brand />
        </Link>
        {mobile && (
          <Button
            variant="ghost"
            size="icon"
            aria-label="Fechar menu"
            onClick={onNavigate}
          >
            <X />
          </Button>
        )}
      </SidebarHeader>
      <SidebarContent className="gap-0 overflow-y-auto px-3 pb-4">
        <nav aria-label="Navegação principal">
          {sections.map((section, index) => (
            <SidebarGroup className="p-0" key={`${section.label}-${index}`}>
              {section.label && (
                <SidebarGroupLabel className="mb-2 mt-4 h-auto px-3 text-xs font-semibold tracking-[0.1em] text-muted-foreground">
                  {section.label}
                </SidebarGroupLabel>
              )}
              <SidebarGroupContent>
                <SidebarMenu className="gap-0">
                  {section.items.map((item) => (
                    <SidebarMenuItem key={item.to}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.to}
                        className="h-auto min-h-10 gap-3 px-3.5 py-2.5 text-md font-medium text-muted-foreground transition-colors data-[active=true]:font-semibold data-[active=true]:text-primary hover:bg-muted hover:text-foreground"
                      >
                        <Link to={item.to} onClick={onNavigate}>
                          <item.icon size={18} strokeWidth={1.7} />
                          <span className="min-w-0 flex-1">{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </nav>
      </SidebarContent>
    </>
  )
}

export function Navbar(props: NavbarProps) {
  const { openMobile, setOpenMobile } = useSidebar()
  const close = () => setOpenMobile(false)

  return (
    <>
      <Sidebar
        collapsible="none"
        className="sticky top-0 hidden h-svh shrink-0 border-r border-border lg:flex lg:w-[220px] xl:w-[242px]"
      >
        <NavbarContent {...props} onNavigate={close} />
      </Sidebar>
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent
          side="left"
          overlayClassName="bg-overlay lg:hidden"
          className="w-[242px] bg-card p-0 sm:max-w-none lg:hidden [&>button]:hidden"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Navegação principal</SheetTitle>
            <SheetDescription>Acesse as áreas do sistema.</SheetDescription>
          </SheetHeader>
          <div className="flex h-full flex-col">
            <NavbarContent {...props} onNavigate={close} mobile />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
