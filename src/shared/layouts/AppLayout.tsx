import { useState } from "react"
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
  const [open, setOpen] = useState(false)
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
    navItems.find((n) => n.to === pathname)?.label ??
    (pathname === "/perfil"
      ? "Meu perfil"
      : pathname === "/consolidado"
        ? "Relatório consolidado"
        : "Bethel Report")

  if (pathname === "/acesso") return <>{<Outlet />}</>

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-overlay lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <Navbar
        profile={profile}
        pathname={pathname}
        unread={unread}
        navItems={navItems}
        isMember={isMember}
        open={open}
        setOpen={setOpen}
      />
      <div className="lg:ml-[220px] xl:ml-[242px]">
        <Header current={current} unread={unread} setOpen={setOpen} />
        <Main>
          <Outlet />
        </Main>
        <Footer />
      </div>
    </>
  )
}
