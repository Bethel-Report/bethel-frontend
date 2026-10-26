import { Camera, Landmark, Pencil, Trash, UserRound } from "lucide-react"
import { Link, useParams } from "react-router"
import { Button } from "@/shared/components/button"
import { Card, CardContent } from "@/shared/components/card"
import { Separator } from "@/shared/components/separator"
import { Back } from "@/shared/components/ui/Back"
import { StatusBadge } from "../components/StatusBadge"
import { users } from "../data"
import { UserAvatar } from "../components/UserAvatar"

export function UserDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const user = users.find((item) => String(item.id) === id)

  if (!user) {
    return (
      <section className="w-full max-w-[1280px]">
        <Card className="rounded-lg border-border p-6 shadow-sm">
          <h1 className="font-display text-lg font-bold">
            Membro não encontrado
          </h1>
          <p className="mt-2 text-md text-muted-foreground">
            Não encontramos um membro com este identificador.
          </p>
          <Button asChild variant="outline" className="mt-5 h-11 px-5">
            <Link to="/membros">Voltar para membros</Link>
          </Button>
        </Card>
      </section>
    )
  }

  return (
    <section
      aria-labelledby="user-details-title"
      className="w-full max-w-[1280px]"
    >
      <Back />

      <div className="flex flex-col lg:flex-row items-start gap-4">
        <Card className="w-full lg:w-fit flex flex-1 flex-col overflow-hidden rounded-lg border-border shadow-sm p-0">
          <CardContent className="w-full flex flex-col gap-4 p-4 sm:p-6">
            <section
              aria-labelledby="personal-data-title"
              className="w-full space-y-4"
            >
              <div className="flex items-center gap-2">
                <UserRound aria-hidden="true" className="size-5 text-primary" />
                <h2 className="font-display text-lg font-bold">
                  Dados pessoais
                </h2>
              </div>
              <dl className="space-y-4">
                <div>
                  <dt className="text-md text-muted-foreground">
                    Nome completo
                  </dt>
                  <dd className="text-lg font-medium">{user.name}</dd>
                </div>
                <div>
                  <dt className="text-md text-muted-foreground">E-mail</dt>
                  <dd className="break-all text-lg font-medium">
                    {user.email}
                  </dd>
                </div>
              </dl>
            </section>

            <Separator />

            <section
              aria-labelledby="membership-title"
              className="w-full space-y-4"
            >
              <div className="flex items-center gap-2">
                <Landmark aria-hidden="true" className="size-5 text-primary" />
                <h2 className="font-display text-lg font-bold">
                  Vínculo no sistema
                </h2>
              </div>
              <dl className="space-y-4">
                <div>
                  <dt className="text-md text-muted-foreground">Perfil</dt>
                  <dd className="text-lg font-medium">{user.role}</dd>
                </div>
                <div>
                  <dt className="text-md text-muted-foreground">Bethel</dt>
                  <dd className="text-lg font-medium">{user.bethel}</dd>
                </div>
                <div>
                  <dt className="text-md text-muted-foreground">Situação</dt>
                  <dd>
                    <StatusBadge status={user.status} />
                  </dd>
                </div>
              </dl>
            </section>
          </CardContent>
          <Separator />
          <div className="flex flex-wrap justify-end gap-2 sm:gap-4 p-4 sm:p-6 flex-col-reverse sm:flex-row">
            <Button variant="outline" className="h-11 px-5">
              <Trash className="size-5" />
              Remover membro
            </Button>
            <Button className="h-11 px-5">
              <Pencil className="size-5" />
              Editar membro
            </Button>
          </div>
        </Card>

        <Card className="w-full lg:w-fit flex flex-col gap-4 overflow-hidden rounded-lg border-border shadow-sm p-4 sm:p-6">
          <div className="flex items-center gap-2">
            <Camera aria-hidden="true" className="size-5 text-primary" />
            <h2 className="font-display text-lg font-bold">Imagem de perfil</h2>
          </div>
          <UserAvatar
            name={user.name}
            className="size-[300px] m-auto"
            fallbackClassName="text-[120px]"
          />
        </Card>
      </div>
    </section>
  )
}
