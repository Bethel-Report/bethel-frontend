import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter, Route, Routes, useParams } from "react-router"
import { describe, expect, test, vi } from "vitest"
import { UsersPage } from "../../pages/UsersPage"
import { testUsers } from "../fixtures/users"

vi.mock("../../data", async () => {
  const { testUsers } = await import("../fixtures/users")
  return { users: testUsers }
})

function DetailsDestination() {
  const { id } = useParams()
  return <h1>Detalhes de teste {id}</h1>
}

function renderPage() {
  return render(
    <MemoryRouter initialEntries={["/membros"]}>
      <Routes>
        <Route path="/membros" element={<UsersPage />} />
        <Route path="/membros/novo" element={<h1>Cadastro de teste</h1>} />
        <Route path="/membros/:id" element={<DetailsDestination />} />
      </Routes>
    </MemoryRouter>,
  )
}

function table() {
  return within(screen.getByRole("table"))
}

async function selectStatus(
  user: ReturnType<typeof userEvent.setup>,
  status: string,
) {
  await user.click(
    screen.getByRole("combobox", { name: "Filtrar por situação" }),
  )
  await user.click(screen.getByRole("option", { name: status }))
}

describe("listagem de usuários", () => {
  test("mostra dados e limites da primeira página", () => {
    const member = testUsers[0]

    renderPage()

    expect(table().getAllByRole("row")).toHaveLength(6)
    expect(table().getByText(member.name)).toBeInTheDocument()
    expect(table().getByText(member.email)).toBeInTheDocument()
    expect(screen.getByText("1–5 de 6 registros")).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "Página anterior" }),
    ).toBeDisabled()
  })

  test("avança para a última página", async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole("button", { name: "Próxima página" }))

    expect(table().getByText(testUsers[5].name)).toBeInTheDocument()
    expect(table().queryByText(testUsers[0].name)).not.toBeInTheDocument()
    expect(screen.getByText("6–6 de 6 registros")).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "Próxima página" }),
    ).toBeDisabled()
  })

  test("retorna à primeira página", async () => {
    const user = userEvent.setup()
    renderPage()
    await user.click(screen.getByRole("button", { name: "Próxima página" }))

    await user.click(screen.getByRole("button", { name: "Página anterior" }))

    expect(table().getByText(testUsers[0].name)).toBeInTheDocument()
    expect(screen.getByText("1–5 de 6 registros")).toBeInTheDocument()
  })

  test("busca por e-mail", async () => {
    const user = userEvent.setup()
    renderPage()
    await user.click(screen.getByRole("button", { name: "Próxima página" }))

    await user.type(
      screen.getByRole("textbox", { name: "Buscar usuários por email" }),
      testUsers[0].email,
    )

    expect(table().getByText(testUsers[0].name)).toBeInTheDocument()
    expect(table().getAllByRole("row")).toHaveLength(2)
    expect(screen.getByText(`1–1 de 1 registros`)).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "Página anterior" }),
    ).toBeDisabled()
  })

  test.each(["Ativo", "Pendente", "Inativo"])(
    "filtra a situação %s e reinicia a paginação",
    async (status) => {
      const user = userEvent.setup()
      const expectedUsers = testUsers.filter(
        (member) => member.status === status,
      )
      renderPage()
      await user.click(screen.getByRole("button", { name: "Próxima página" }))

      await selectStatus(user, status)

      expect(table().getAllByRole("row")).toHaveLength(expectedUsers.length + 1)
      for (const member of expectedUsers)
        expect(table().getByText(member.name)).toBeInTheDocument()
      expect(
        screen.getByRole("button", { name: "Página anterior" }),
      ).toBeDisabled()
    },
  )

  test("combina busca e situação", async () => {
    const user = userEvent.setup()
    renderPage()
    await user.type(
      screen.getByRole("textbox", { name: "Buscar usuários por email" }),
      testUsers[1].email,
    )

    await selectStatus(user, "Pendente")

    expect(table().getByText(testUsers[1].email)).toBeInTheDocument()
    expect(table().queryByText(testUsers[0].email)).not.toBeInTheDocument()
    expect(screen.getByText("1–1 de 1 registros")).toBeInTheDocument()
  })

  test("mostra estado vazio sem resultados", async () => {
    const user = userEvent.setup()
    renderPage()

    await user.type(
      screen.getByRole("textbox", { name: "Buscar usuários por email" }),
      "inexistente",
    )

    expect(table().getByText("Nenhum usuário encontrado.")).toBeInTheDocument()
    expect(screen.getByText("0–0 de 0 registros")).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "Próxima página" }),
    ).toBeDisabled()
  })

  test("restaura os resultados ao selecionar Todos", async () => {
    const user = userEvent.setup()
    renderPage()
    await selectStatus(user, "Pendente")

    await selectStatus(user, "Todos")

    expect(screen.getByText("1–5 de 6 registros")).toBeInTheDocument()
    expect(table().getAllByRole("row")).toHaveLength(6)
  })

  test("navega para o cadastro", async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole("link", { name: "Adicionar membro" }))

    expect(
      screen.getByRole("heading", { name: "Cadastro de teste" }),
    ).toBeInTheDocument()
  })

  test("navega para o membro selecionado", async () => {
    const user = userEvent.setup()
    const member = testUsers[0]
    renderPage()

    await user.click(
      table().getByRole("link", { name: `Visualizar ${member.name}` }),
    )

    expect(
      screen.getByRole("heading", { name: `Detalhes de teste ${member.id}` }),
    ).toBeInTheDocument()
  })
})
