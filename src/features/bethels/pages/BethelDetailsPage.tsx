import {
  Landmark,
  MapPin,
  Newspaper,
  Pencil,
  Trash,
  UsersRound,
} from "lucide-react"
import { Link, useParams } from "react-router"
import { users } from "@/features/users/data"
import { Button } from "@/shared/components/button"
import { Card, CardContent, CardHeader } from "@/shared/components/card"
import { Separator } from "@/shared/components/separator"
import { Back } from "@/shared/components/ui/Back"
import { StatusBadge } from "@/shared/components/ui/StatusBadge"
import { BethelPostItem } from "../components/BethelPostItem"
import { bethelPosts, bethels } from "../data"

export function BethelDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const bethel = bethels.find((item) => String(item.id) === id)

  if (!bethel) {
    return (
      <section className="w-full max-w-[1280px]">
        <Card className="rounded-lg border-border p-6 shadow-sm">
          <h1 className="font-display text-lg font-bold">
            Bethel não encontrado
          </h1>
          <p className="mt-2 text-md text-muted-foreground">
            Não encontramos um Bethel com este identificador.
          </p>
          <Button asChild variant="outline" className="mt-5 h-11 px-5">
            <Link to="/betheis">Voltar para bethéis</Link>
          </Button>
        </Card>
      </section>
    )
  }

  const registeredUsers = users.filter((user) => user.bethel === bethel.name)
  const posts = bethelPosts.filter((post) => post.bethelId === bethel.id)

  return (
    <div className="w-full max-w-[1280px] space-y-5 sm:space-y-6">
      <Back />

      <section aria-labelledby="bethel-details-title">
        <Card className="overflow-hidden rounded-lg border-border shadow-sm">
          <CardHeader className="flex sm:flex-row sm:justify-between sm:items-center">
            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary sm:size-14">
                <Landmark aria-hidden="true" className="size-6" />
              </div>
              <div>
                <h1
                  id="bethel-details-title"
                  className="font-display text-2xl font-bold leading-tight tracking-[-0.02em]"
                >
                  {bethel.name}
                </h1>
                <p className="mt-1 flex items-center gap-1.5 text-md text-muted-foreground">
                  <MapPin aria-hidden="true" className="size-4" />
                  {bethel.city}, {bethel.state}
                </p>
              </div>
            </div>
            <StatusBadge status={bethel.status} />
          </CardHeader>
          <Separator />
          <CardContent className="p-4 sm:p-6">
            <div className="grid gap-5 grid-cols-2">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary">
                  <UsersRound aria-hidden="true" className="size-5" />
                </div>
                <div>
                  <p className="text-md text-muted-foreground">Membros</p>
                  <p className="font-display text-xl font-bold">
                    {bethel.members}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Newspaper aria-hidden="true" className="size-5" />
                </div>
                <div>
                  <p className="text-md text-muted-foreground">Postagens</p>
                  <p className="font-display text-xl font-bold">
                    {posts.length}
                  </p>
                </div>
              </div>
            </div>
            <Separator className="my-6" />
            <div>
              <h2
                id="bethel-internal-title"
                className="font-display text-lg font-bold"
              >
                Dados internos gerais
              </h2>
              <p className="mt-1 text-md text-muted-foreground">
                Informações de cadastro e vínculos no sistema.
              </p>
            </div>
            <dl className="mt-5 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <dt className="text-md text-muted-foreground">Identificador</dt>
                <dd className="mt-1 text-lg font-semibold">#{bethel.id}</dd>
              </div>
              <div>
                <dt className="text-md text-muted-foreground">
                  Usuários cadastrados
                </dt>
                <dd className="mt-1 text-lg font-semibold">
                  {registeredUsers.length}
                </dd>
              </div>
              <div>
                <dt className="text-md text-muted-foreground">
                  Representante cadastrado
                </dt>
                <dd className="mt-1 text-lg font-semibold">
                  {registeredUsers[0]?.name ??
                    "Nenhum representante cadastrado"}
                </dd>
              </div>
            </dl>
          </CardContent>
          <Separator />
          <div className="flex flex-col-reverse flex-wrap justify-end gap-2 p-4 sm:flex-row sm:gap-4 sm:p-6">
            <Button variant="outline" className="h-11 px-5">
              <Trash className="size-5" />
              Remover bethel
            </Button>
            <Button className="h-11 px-5">
              <Pencil className="size-5" />
              Editar bethel
            </Button>
          </div>
        </Card>
      </section>

      <section aria-labelledby="bethel-posts-title">
        <Card className="overflow-hidden rounded-lg border-border shadow-sm p-0">
          <div className="flex items-center gap-3 p-4 sm:px-6">
            <Newspaper aria-hidden="true" className="size-5 text-primary" />
            <div>
              <h2
                id="bethel-posts-title"
                className="font-display text-lg font-bold"
              >
                Postagens do Bethel
              </h2>
              <p className="mt-1 text-md text-muted-foreground">
                Publicações e atividades desta unidade.
              </p>
            </div>
          </div>
          <Separator />
          {posts.length > 0 ? (
            <>
              <ul className="divide-y divide-border px-4 sm:px-6">
                {posts.map((post) => (
                  <BethelPostItem key={post.id} post={post} bethel={bethel} />
                ))}
              </ul>
              <div className="flex justify-center border-t border-border p-3">
                <Button
                  variant="ghost"
                  className="text-lg hover:bg-transparent"
                >
                  Ver mais
                </Button>
              </div>
            </>
          ) : (
            <div className="px-5 py-12 text-center sm:px-7">
              <Newspaper
                aria-hidden="true"
                className="mx-auto size-8 text-muted-foreground"
              />
              <p className="mt-3 font-display text-lg font-semibold">
                Nenhuma postagem encontrada
              </p>
              <p className="mt-1 text-md text-muted-foreground">
                Este Bethel ainda não possui postagens cadastradas.
              </p>
            </div>
          )}
        </Card>
      </section>
    </div>
  )
}
