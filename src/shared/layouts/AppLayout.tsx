import {
  LayoutDashboard,
  Landmark,
  Users,
  Newspaper,
  FileText,
  ClipboardList,
  Wallet,
  Vote,
  FolderOpen,
  Bell,
} from "lucide-react"
import { Outlet, useLocation } from "react-router"
import { Footer } from "@/app/components/Footer"
import { Main } from "@/app/components/Main"
import { Header } from "@/app/components/Header"
import { Navbar } from "@/app/components/Navbar"
import { SidebarProvider } from "@/shared/components/sidebar"

const navItems = [
  { to: "/", label: "Visão geral", icon: LayoutDashboard, group: "PRINCIPAL" },
  { to: "/betheis", label: "Bethéis", icon: Landmark, group: "" },
  { to: "/membros", label: "Usuários e membros", icon: Users, group: "" },
  { to: "/postagens", label: "Postagens", icon: Newspaper, group: "" },
  {
    to: "/relatorios",
    label: "Relatórios anuais",
    icon: FileText,
    group: "GESTÃO",
  },
  { to: "/formularios", label: "Formulários", icon: ClipboardList, group: "" },
  { to: "/financas", label: "Finanças", icon: Wallet, group: "" },
  { to: "/eleicoes", label: "Eleições", icon: Vote, group: "" },
  {
    to: "/materiais",
    label: "Materiais e documentos",
    icon: FolderOpen,
    group: "ORGANIZAÇÃO",
  },
  { to: "/notificacoes", label: "Notificações", icon: Bell, group: "" },
]

export function AppLayout() {
  const { pathname } = useLocation()
  const profile = "Grande Conselho"
  const notifications = [
    {
      id: 1,
      title: "Notificação 1",
      text: "Nova notificação",
      date: "2026-10-01",
      read: false,
    },
  ]
  const isMember = profile.startsWith("Membro")
  const unread = notifications.filter((n) => !n.read).length
  const current =
    (pathname === "/betheis/novo" ? "Criar Bethel" : undefined) ??
    (pathname === "/membros/novo" ? "Adicionar membro" : undefined) ??
    (pathname.startsWith("/membros/") ? "Detalhes do membro" : undefined) ??
    navItems.find((n) => n.to === pathname)?.label ??
    (pathname === "/perfil"
      ? "Meu perfil"
      : pathname === "/consolidado"
        ? "Relatório consolidado"
        : "Bethel Report")

  if (pathname === "/acesso") return <Outlet />

  return (
    <SidebarProvider mobileBreakpoint={1024}>
      <Navbar
        profile={profile}
        pathname={
          pathname.startsWith("/membros/")
            ? "/membros"
            : pathname.startsWith("/betheis/")
              ? "/betheis"
              : pathname
        }
        unread={unread}
        navItems={navItems}
        isMember={isMember}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header current={current} unread={unread} />
        <Main>
          <Outlet />
        </Main>
        <Footer />
      </div>
    </SidebarProvider>
  )
}
