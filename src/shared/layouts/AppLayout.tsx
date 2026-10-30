import {
  LayoutDashboard,
  Landmark,
  Users,
  Newspaper,
  FileText,
  ClipboardList,
  Wallet,
  FolderOpen,
} from "lucide-react"
import { matchPath, Outlet, useLocation } from "react-router"
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
  {
    to: "/materiais",
    label: "Materiais e documentos",
    icon: FolderOpen,
    group: "ORGANIZAÇÃO",
  },
]

const pageRoutes = [
  { path: "/betheis/novo", title: "Criar Bethel", navPath: "/betheis" },
  { path: "/betheis/:id", title: "Detalhes do Bethel", navPath: "/betheis" },
  { path: "/membros/novo", title: "Adicionar membro", navPath: "/membros" },
  { path: "/membros/:id", title: "Detalhes do membro", navPath: "/membros" },
  { path: "/postagens/novo", title: "Criar postagem", navPath: "/postagens" },
  {
    path: "/postagens/:id",
    title: "Detalhes da postagem",
    navPath: "/postagens",
  },
  { path: "/perfil", title: "Meu perfil" },
  { path: "/consolidado", title: "Relatório consolidado" },
]

export function AppLayout() {
  const { pathname } = useLocation()
  const profile = "Grande Conselho"
  const isMember = profile.startsWith("Membro")
  const pageRoute = pageRoutes.find(({ path }) => matchPath(path, pathname))
  const current =
    pageRoute?.title ??
    navItems.find((item) => item.to === pathname)?.label ??
    "Bethel Report"
  const navPathname = pageRoute?.navPath ?? pathname

  if (pathname === "/acesso") return <Outlet />

  return (
    <SidebarProvider mobileBreakpoint={1024}>
      <Navbar
        profile={profile}
        pathname={navPathname}
        navItems={navItems}
        isMember={isMember}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header current={current} />
        <Main>
          <Outlet />
        </Main>
        <Footer />
      </div>
    </SidebarProvider>
  )
}
