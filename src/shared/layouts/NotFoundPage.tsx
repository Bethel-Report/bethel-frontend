import { Link } from "react-router"

export function NotFoundPage() {
  return (
    <main className="flex flex-col min-h-screen h-screen items-center justify-center px-6 py-12">
      <div className="flex flex-col text-center">
        <p className="font-display text-7xl font-bold text-primary">404</p>
        <h1 className="mt-4 text-2xl font-semibold">Página não encontrada</h1>
        <p className="mt-2 text-muted-foreground">
          A página que você procura não existe.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-md bg-primary px-5 py-2.5 font-semibold text-primary-foreground hover:opacity-90"
        >
          Voltar para o início
        </Link>
      </div>
    </main>
  )
}
