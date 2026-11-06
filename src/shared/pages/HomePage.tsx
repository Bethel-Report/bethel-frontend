import { Landmark, Megaphone, Newspaper, UsersRound } from "lucide-react"
import { bethels, postsWithBethel } from "@/features/bethels/data"
import { users } from "@/features/users/data"
import { Card } from "@/shared/components/card"
import { PostSection } from "../components/ui/PostSection"

const summary = [
  { label: "Total de bethéis", value: bethels.length, icon: Landmark },
  {
    label: "Usuários ativos",
    value: users.filter((user) => user.status === "Ativo").length,
    icon: UsersRound,
  },
  {
    label: "Total de postagens",
    value: postsWithBethel.length,
    icon: Newspaper,
  },
]

export function HomePage() {
  const announcements = postsWithBethel.filter(
    ({ post }) => post.category === "Comunicado",
  )

  return (
    <div className="w-full max-w-[1280px] space-y-7 md:space-y-8">
      <section aria-labelledby="overview-title">
        <h1
          id="overview-title"
          className="font-display text-[20px] font-bold leading-tight tracking-[-0.02em]"
        >
          Visão geral
        </h1>
        <p className="mt-1.5 text-lg text-muted-foreground">
          Acompanhe os bethéis, usuários e publicações do sistema.
        </p>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 md:mt-8 lg:grid-cols-3">
          {summary.map(({ label, value, icon: Icon }) => (
            <Card
              key={label}
              className="flex min-h-[140px] flex-col justify-between rounded-lg border-border p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-lg text-muted-foreground">{label}</p>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
              </div>
              <p className="mt-2 font-display text-2xl font-bold">{value}</p>
            </Card>
          ))}
        </div>
      </section>

      <PostSection
        title="Últimos comunicados"
        description="Avisos e atualizações dos bethéis."
        emptyMessage="Nenhum comunicado encontrado"
        linkLabel="Ver todos os comunicados"
        to="/postagens?categoria=Comunicado"
        icon={Megaphone}
        posts={announcements}
      />

      <PostSection
        title="Últimas postagens"
        description="Publicações e atividades dos bethéis."
        emptyMessage="Nenhuma postagem encontrada"
        linkLabel="Ver todas as postagens"
        to="/postagens"
        icon={Newspaper}
        posts={postsWithBethel}
      />
    </div>
  )
}
