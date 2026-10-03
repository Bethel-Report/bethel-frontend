import { Outlet } from "react-router"

export function AppLayout() {
  return (
    <>
      <header>
        <h1>Olá Mundo</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}
