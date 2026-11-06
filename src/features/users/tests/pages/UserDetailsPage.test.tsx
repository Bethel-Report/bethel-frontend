import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter, Route, Routes } from "react-router"
import { describe, expect, test, vi } from "vitest"
import { UserDetailsPage } from "../../pages/UserDetailsPage"
import { testUsers } from "../fixtures/users"

vi.mock("../../data", async () => {
  const { testUsers } = await import("../fixtures/users")
  return { users: testUsers }
})

function renderDetails(id: number) {
  return render(
    <MemoryRouter initialEntries={["/membros", `/membros/${id}`]}>
      <Routes>
        <Route path="/membros/:id" element={<UserDetailsPage />} />
        <Route path="/membros" element={<h1>Lista de teste</h1>} />
      </Routes>
    </MemoryRouter>,
  )
}

function valueFor(label: string) {
  return screen.getByText(label, { selector: "dt" }).nextElementSibling
}

describe("detalhes do usuário", () => {
  test.each(testUsers.slice(0, 3))(
    "mostra dados e situação de $name",
    (member) => {
      const id = member.id

      renderDetails(id)

      expect(valueFor("Nome completo")).toHaveTextContent(member.name)
      expect(valueFor("E-mail")).toHaveTextContent(member.email)
      expect(valueFor("Perfil")).toHaveTextContent(member.role)
      expect(valueFor("Bethel")).toHaveTextContent(member.bethel)
      expect(valueFor("Situação")).toHaveTextContent(member.status)
    },
  )

  test("mostra estado de membro inexistente", () => {
    const unknownId = 9999

    renderDetails(unknownId)

    expect(
      screen.getByRole("heading", { name: "Membro não encontrado" }),
    ).toBeInTheDocument()
    expect(screen.queryByText("Nome completo")).not.toBeInTheDocument()
  })

  test("retorna à lista a partir de membro inexistente", async () => {
    const user = userEvent.setup()
    renderDetails(9999)

    await user.click(screen.getByRole("link", { name: "Voltar para membros" }))

    expect(
      screen.getByRole("heading", { name: "Lista de teste" }),
    ).toBeInTheDocument()
  })

  test("volta à página anterior", async () => {
    const user = userEvent.setup()
    renderDetails(testUsers[0].id)

    await user.click(screen.getByRole("button", { name: "Voltar" }))

    expect(
      screen.getByRole("heading", { name: "Lista de teste" }),
    ).toBeInTheDocument()
  })
})
