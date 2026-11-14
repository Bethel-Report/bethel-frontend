import { useState } from "react"
import { Brand } from "@/shared/components/brand"
import { Button } from "@/shared/components/button"
import { login, resetPassword } from "../session"
import { useAuth } from "../hooks/useAuth"

export function LoginPage() {
  const { status } = useAuth()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(false)

  async function enter(callback: () => Promise<void>) {
    setBusy(true)
    try {
      await callback()
    } catch {
      setError(true)
      setBusy(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <section className="w-full max-w-96 space-y-6">
        <div className="space-y-6">
          <Brand />
          <h1 className="text-3xl font-bold">Bem-vinda ao Bethel Report</h1>
          {error && (
            <p role="alert">
              Não foi possível abrir a autenticação. Tente novamente.
            </p>
          )}
        </div>
        <div className="space-y-4">
          <Button
            className="w-full h-fit py-4"
            variant="default"
            disabled={busy || status === "initializing"}
            onClick={() => void enter(login)}
          >
            {busy ? "Redirecionando…" : "Entrar"}
          </Button>
          <Button
            className="w-full h-fit py-4"
            variant="outline"
            disabled={busy || status === "initializing"}
            onClick={() => void enter(resetPassword)}
          >
            Esqueci minha senha
          </Button>
        </div>
      </section>
    </main>
  )
}
