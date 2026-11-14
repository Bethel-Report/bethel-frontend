import { expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router"
import { AuthContext } from "../contexts/AuthContext"
import type { AuthStatus, Profile, Role } from "../types"
import { AuthGate } from "../components/AuthGate"
import { AdmissionPage } from "../pages/AdmissionPage"
import { AuthErrorPage } from "../pages/AuthErrorPage"

function renderSession(
  status: AuthStatus,
  path = "/admission/complete",
  role: Role = "MEMBRO_ATIVO",
) {
  render(
    <AuthContext.Provider
      value={{
        status,
        profile: { permission: { role } } as Profile,
        updateProfile: vi.fn(),
        reload: vi.fn(),
        logout: vi.fn(),
      }}
    >
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route element={<AuthGate />}>
            <Route path="/admission/complete" element={<AdmissionPage />} />
            <Route path="/auth/error" element={<AuthErrorPage />} />
            <Route path="/login" element={<h1>Login de teste</h1>} />
            <Route path="/" element={<h1>Início de teste</h1>} />
            <Route path="/membros" element={<h1>Membros de teste</h1>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>,
  )
}

it("retorna ao login quando recebe visitante após logout", async () => {
  renderSession("guest")
  expect(await screen.findByText("Login de teste")).toBeInTheDocument()
})

it.each(["initializing", "loading"] as const)(
  "mostra o loading do sistema durante %s",
  (status) => {
    renderSession(status)
    expect(screen.getByRole("status")).toHaveTextContent("Carregando…")
    expect(screen.queryByText("Login de teste")).not.toBeInTheDocument()
  },
)

it.each(["forbidden", "no-permission", "unavailable"] as const)(
  "encaminha %s para a página de erro sem mostrar admissão",
  (status) => {
    renderSession(status)
    expect(screen.getByRole("alert")).toBeInTheDocument()
    expect(screen.queryByLabelText("Nome")).not.toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "Sair / trocar conta" }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole("button", { name: "Tentar novamente" }) !== null,
    ).toBe(status === "unavailable")
  },
)

it("encaminha cadastro pendente para admissão mesmo vindo do login", () => {
  renderSession("admission", "/login")
  expect(screen.getByLabelText("Nome")).toBeInTheDocument()
})

it.each(["/login", "/admission/complete"])(
  "encaminha usuário autenticado de %s para o início",
  (path) => {
    renderSession("authenticated", path)
    expect(screen.getByText("Início de teste")).toBeInTheDocument()
  },
)

it("encaminha acesso sem permissão para a página de erro", () => {
  renderSession("authenticated", "/membros")
  expect(screen.getByRole("alert")).toBeInTheDocument()
  expect(screen.queryByText("Membros de teste")).not.toBeInTheDocument()
})

it("libera a página quando a role possui acesso", () => {
  renderSession("authenticated", "/membros", "GRANDE_CONSELHO")
  expect(screen.getByText("Membros de teste")).toBeInTheDocument()
})
