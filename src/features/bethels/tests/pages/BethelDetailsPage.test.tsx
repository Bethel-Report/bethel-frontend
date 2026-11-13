import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter, Route, Routes } from "react-router"
import { describe, expect, test, vi } from "vitest"
import { BethelDetailsPage } from "../../pages/BethelDetailsPage"
import { testBethels, testPosts, testUsers } from "../fixtures/bethels"

vi.mock("../../data", async () => {
  const { testBethels, testPosts } = await import("../fixtures/bethels")
  return { bethels: testBethels, bethelPosts: testPosts }
})

vi.mock("@/features/users/data", async () => {
  const { testUsers } = await import("../fixtures/bethels")
  return { users: testUsers }
})

function renderDetails(id: number) {
  return render(
    <MemoryRouter initialEntries={[`/betheis/${id}`]}>
      <Routes>
        <Route path="/betheis/:id" element={<BethelDetailsPage />} />
        <Route path="/betheis" element={<h1>Lista de unidades</h1>} />
      </Routes>
    </MemoryRouter>,
  )
}

function valueFor(label: string) {
  return screen.getByText(label, { selector: "dt" }).nextElementSibling
}

describe("detalhes do Bethel", () => {
  test("mostra os dados e conta apenas os vínculos da unidade", () => {
    const bethel = testBethels[0]

    renderDetails(bethel.id)

    expect(
      screen.getByRole("heading", { name: bethel.name }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(`${bethel.city}, ${bethel.state}`),
    ).toBeInTheDocument()
    expect(screen.getByText(bethel.status)).toBeInTheDocument()
    expect(screen.getByText(String(bethel.members))).toBeInTheDocument()
    expect(valueFor("Identificador")).toHaveTextContent(`#${bethel.id}`)
    expect(valueFor("Usuários cadastrados")).toHaveTextContent(/^2$/)
    expect(valueFor("Representante cadastrado")).toHaveTextContent(
      testUsers[0].name,
    )
    expect(
      screen.getByText("Postagens", { exact: true }).nextElementSibling,
    ).toHaveTextContent(/^2$/)
  })

  test("lista somente as postagens da unidade", () => {
    const bethel = testBethels[0]

    renderDetails(bethel.id)

    const posts = within(
      screen.getByRole("region", { name: "Postagens do Bethel" }),
    )
    expect(posts.getAllByRole("listitem")).toHaveLength(2)
    expect(
      posts.getByRole("link", { name: testPosts[0].title }),
    ).toHaveAttribute("href", `/postagens/${testPosts[0].id}`)
    expect(
      posts.getByRole("link", { name: testPosts[1].title }),
    ).toBeInTheDocument()
    expect(posts.queryByText(testPosts[2].title)).not.toBeInTheDocument()
  })

  test("mostra estados vazios sem postagens ou representantes", () => {
    const bethel = testBethels[1]

    renderDetails(bethel.id)

    expect(screen.getByText("Nenhuma postagem encontrada")).toBeInTheDocument()
    expect(valueFor("Usuários cadastrados")).toHaveTextContent(/^0$/)
    expect(valueFor("Representante cadastrado")).toHaveTextContent(
      "Nenhum representante cadastrado",
    )
    expect(screen.queryByRole("list")).not.toBeInTheDocument()
  })

  test("mostra mensagem para identificador inexistente", () => {
    const unknownId = 9999

    renderDetails(unknownId)

    expect(
      screen.getByRole("heading", { name: "Bethel não encontrado" }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole("region", { name: "Postagens do Bethel" }),
    ).not.toBeInTheDocument()
  })

  test("retorna à listagem quando o Bethel não é encontrado", async () => {
    const user = userEvent.setup()
    renderDetails(9999)

    await user.click(screen.getByRole("link", { name: "Voltar para bethéis" }))

    expect(
      screen.getByRole("heading", { name: "Lista de unidades" }),
    ).toBeInTheDocument()
  })
})
