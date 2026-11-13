import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter, Route, Routes, useParams } from "react-router"
import { describe, expect, test, vi } from "vitest"
import { FormsPage } from "../../pages/FormsPage"
import { testForms } from "../fixtures/forms"

vi.mock("../../data", async (importOriginal) => {
  const original = await importOriginal<typeof import("../../data")>()
  const { testForms } = await import("../fixtures/forms")
  return { ...original, forms: testForms }
})

function Destination() {
  const { id } = useParams()
  return <h1>Detalhes de teste {id}</h1>
}

function renderPage() {
  return render(
    <MemoryRouter initialEntries={["/formularios"]}>
      <Routes>
        <Route path="/formularios" element={<FormsPage />} />
        <Route path="/formularios/:id" element={<Destination />} />
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
    screen.getByRole("combobox", { name: "Filtrar formulários por situação" }),
  )
  await user.click(screen.getByRole("option", { name: status }))
}

describe("listagem de formulários", () => {
  test("mostra dados e limites da primeira página", () => {
    const form = testForms[0]

    renderPage()

    expect(table().getByText(form.title)).toBeInTheDocument()
    expect(table().getByText(form.description)).toBeInTheDocument()
    expect(table().getByText(String(form.responses))).toBeInTheDocument()
    expect(table().getAllByRole("row")).toHaveLength(6)
    expect(screen.getByText("1–5 de 6 registros")).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "Página anterior" }),
    ).toBeDisabled()
  })

  test("avança à última página", async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole("button", { name: "Próxima página" }))

    expect(table().getByText(testForms[5].title)).toBeInTheDocument()
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

    expect(screen.getByText("1–5 de 6 registros")).toBeInTheDocument()
    expect(table().getByText(testForms[0].title)).toBeInTheDocument()
  })

  test.each(["  AVALIACAO  ", "OPINIOES"])(
    "busca por título ou descrição sem acentos: %s",
    async (query) => {
      const user = userEvent.setup()
      renderPage()
      await user.click(screen.getByRole("button", { name: "Próxima página" }))

      await user.type(
        screen.getByRole("textbox", { name: /Buscar formulários/ }),
        query,
      )

      expect(table().getByText(testForms[0].title)).toBeInTheDocument()
      expect(screen.getByText("1–1 de 1 registros")).toBeInTheDocument()
      expect(
        screen.getByRole("button", { name: "Página anterior" }),
      ).toBeDisabled()
    },
  )

  test.each(["Ativo", "Pendente", "Inativo"])(
    "filtra por %s",
    async (status) => {
      const user = userEvent.setup()
      const expected = testForms.filter((form) => form.status === status)
      renderPage()
      await user.click(screen.getByRole("button", { name: "Próxima página" }))

      await selectStatus(user, status)

      expect(table().getAllByRole("row")).toHaveLength(expected.length + 1)
      for (const form of expected)
        expect(table().getByText(form.title)).toBeInTheDocument()
      expect(
        screen.getByRole("button", { name: "Página anterior" }),
      ).toBeDisabled()
    },
  )

  test("combina busca e filtro e mostra estado vazio", async () => {
    const user = userEvent.setup()
    renderPage()
    await user.type(
      screen.getByRole("textbox", { name: /Buscar formulários/ }),
      testForms[0].title,
    )

    await selectStatus(user, "Inativo")

    expect(
      table().getByText("Nenhum formulário encontrado."),
    ).toBeInTheDocument()
    expect(screen.getByText("0–0 de 0 registros")).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "Próxima página" }),
    ).toBeDisabled()
  })

  test("restaura resultados ao selecionar Todos", async () => {
    const user = userEvent.setup()
    renderPage()
    await selectStatus(user, "Pendente")

    await selectStatus(user, "Todos")

    expect(screen.getByText("1–5 de 6 registros")).toBeInTheDocument()
  })

  test("navega para o formulário selecionado", async () => {
    const user = userEvent.setup()
    const form = testForms[0]
    renderPage()

    await user.click(
      table().getByRole("link", { name: `Visualizar ${form.title}` }),
    )

    expect(
      screen.getByRole("heading", { name: `Detalhes de teste ${form.id}` }),
    ).toBeInTheDocument()
  })
})
