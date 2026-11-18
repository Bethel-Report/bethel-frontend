import { Brand } from "@/shared/components/brand"

export function LoadingPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-background px-6 py-12">
      <div className="flex w-full max-w-sm flex-col items-center text-center">
        <Brand />
        <div
          role="status"
          aria-live="polite"
          className="mt-10 flex flex-col items-center"
        >
          <span
            aria-hidden="true"
            className="size-12 rounded-full border-4 border-secondary border-t-primary motion-safe:animate-spin"
          />
          <h1 className="mt-6 text-xl font-semibold text-foreground">
            Carregando…
          </h1>
          <p className="mt-2 text-muted-foreground">
            Aguarde um instante, estamos preparando tudo para você.
          </p>
        </div>
      </div>
    </main>
  )
}
