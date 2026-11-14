import { Link } from "react-router"
import { Brand } from "@/shared/components/brand"
import { Button } from "@/shared/components/button"
import { useAuth } from "../hooks/useAuth"

export function AuthErrorPage() {
  const { status, logout, reload } = useAuth()
  const message =
    status === "no-permission"
      ? "Seu cadastro não tem permissão ativa. Consulte a administração."
      : status === "unavailable"
        ? "Não foi possível conectar ao serviço. Tente novamente."
        : "Você não tem permissão para acessar esta página. Consulte a administração ou troque de conta."

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <section className="w-full max-w-96 space-y-6">
        <Brand />
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Não foi possível continuar</h1>
          <p role="alert" className="text-muted-foreground">
            {message}
          </p>
        </div>
        <div className="space-y-4">
          {status === "unavailable" && (
            <Button className="w-full h-fit py-4" onClick={() => void reload()}>
              Tentar novamente
            </Button>
          )}
          {status === "authenticated" && (
            <Button asChild className="w-full h-fit py-4">
              <Link to="/">Voltar ao início</Link>
            </Button>
          )}
          <Button
            className="w-full h-fit py-4"
            variant="outline"
            onClick={() => void logout()}
          >
            Sair / trocar conta
          </Button>
        </div>
      </section>
    </main>
  )
}
