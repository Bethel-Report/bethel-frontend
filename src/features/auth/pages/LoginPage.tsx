import { Brand } from "@/shared/components/brand"
import { Button } from "@/shared/components/button"

export function LoginPage() {
  return (
    <main className="flex min-h-screen justify-center items-center px-6 py-12">
      <section className="w-full max-w-96" aria-labelledby="login-title">
        <Brand />

        <h1 className="mt-10 font-display text-[30px] leading-9 font-bold tracking-tight">
          Bem-vinda ao
          <br />
          Bethel Report
        </h1>
        <p className="mt-2 text-md text-muted-foreground">
          Filhas de Jó Internacional · Rio Grande do Norte
        </p>

        <div className="mt-9 flex flex-col gap-3">
          <Button
            type="button"
            className="h-12 w-full text-md font-normal"
            onClick={() => {}}
          >
            <span
              aria-hidden="true"
              className="font-sans text-xl font-bold leading-none"
            >
              G
            </span>
            Entrar com Google
          </Button>
        </div>
      </section>
    </main>
  )
}
