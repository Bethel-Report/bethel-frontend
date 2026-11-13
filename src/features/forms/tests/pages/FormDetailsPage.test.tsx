import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter, Route, Routes } from "react-router"
import { describe, expect, test, vi } from "vitest"
import { FormDetailsPage } from "../../pages/FormDetailsPage"
import { testForms, testBethels } from "../fixtures/forms"

vi.mock("../../data", async (importOriginal) => {
  const original = await importOriginal<typeof import("../../data")>()
  const { testForms } = await import("../fixtures/forms")
  return { ...original, forms: testForms }
})

vi.mock("@/features/bethels/data", async () => {
  const { testBethels } = await import("../fixtures/forms")
  return { bethels: testBethels }
})

function renderDetails(id = testForms[0].id) {
  return render(
    <MemoryRouter initialEntries={["/formularios", `/formularios/${id}`]}>
      <Routes>
        <Route path="/formularios/:id" element={<FormDetailsPage />} />
        <Route path="/formularios" element={<h1>Lista de teste</h1>} />
        <Route
          path="/formularios/:id/estrutura"
          element={<h1>Editor de teste</h1>}
        />
      </Routes>
    </MemoryRouter>,
  )
}

function table() {
  return within(screen.getByRole("table"))
}

function checkbox(index: number) {
  return table().getByRole("checkbox", {
    name: `Selecionar ${testBethels[index].name}`,
  })
}

const selectAllName = "Selecionar todos os bethéis desta página"

describe("detalhes do formulário", () => {
  test("mostra dados e seleção inicialmente vazia", () => {
    const form = testForms[0]

    renderDetails(form.id)

    expect(
      screen.getByRole("heading", { name: form.title }),
    ).toBeInTheDocument()
    expect(screen.getByText(form.description)).toBeInTheDocument()
    expect(screen.getByText(`#${form.id}`)).toBeInTheDocument()
    expect(screen.getByText("15/01/2026")).toBeInTheDocument()
    expect(screen.getByText("Respostas").nextElementSibling).toHaveTextContent(
      String(form.responses),
    )
    expect(screen.getByText("0 de 6 bethéis selecionados")).toBeInTheDocument()
    expect(table().getAllByRole("row")).toHaveLength(6)
  })

  test("seleciona um Bethel e indica seleção parcial", async () => {
    const user = userEvent.setup()
    renderDetails()

    await user.click(checkbox(0))

    expect(checkbox(0)).toBeChecked()
    expect(
      table().getByRole("checkbox", { name: selectAllName }),
    ).toBePartiallyChecked()
    expect(screen.getByText("1 de 6 bethéis selecionados")).toBeInTheDocument()
  })

  test("desmarca um Bethel", async () => {
    const user = userEvent.setup()
    renderDetails()
    await user.click(checkbox(0))

    await user.click(checkbox(0))

    expect(checkbox(0)).not.toBeChecked()
    expect(screen.getByText("0 de 6 bethéis selecionados")).toBeInTheDocument()
  })

  test("seleciona todos apenas da página atual", async () => {
    const user = userEvent.setup()
    renderDetails()

    await user.click(table().getByRole("checkbox", { name: selectAllName }))

    expect(table().getAllByRole("checkbox")).toHaveLength(6)
    for (const item of table().getAllByRole("checkbox"))
      expect(item).toBeChecked()
    expect(screen.getByText("5 de 6 bethéis selecionados")).toBeInTheDocument()
  })

  test("preserva seleções de outras páginas ao desmarcar a atual", async () => {
    const user = userEvent.setup()
    renderDetails()
    await user.click(table().getByRole("checkbox", { name: selectAllName }))
    await user.click(screen.getByRole("button", { name: "Próxima página" }))
    await user.click(checkbox(5))
    await user.click(screen.getByRole("button", { name: "Página anterior" }))

    await user.click(table().getByRole("checkbox", { name: selectAllName }))

    expect(screen.getByText("1 de 6 bethéis selecionados")).toBeInTheDocument()
    for (const item of table().getAllByRole("checkbox"))
      expect(item).not.toBeChecked()
  })

  test("não duplica seleções ao selecionar todos após seleção parcial", async () => {
    const user = userEvent.setup()
    renderDetails()
    await user.click(checkbox(0))

    await user.click(table().getByRole("checkbox", { name: selectAllName }))

    expect(screen.getByText("5 de 6 bethéis selecionados")).toBeInTheDocument()
  })

  test.each(["  UNIAO  ", "ALFA", "CE"])(
    "busca por nome e reinicia página: %s",
    async (query) => {
      const user = userEvent.setup()
      renderDetails()
      await user.click(screen.getByRole("button", { name: "Próxima página" }))

      await user.type(
        screen.getByRole("textbox", { name: /Buscar bethéis/ }),
        query,
      )

      expect(table().getByText(testBethels[0].name)).toBeInTheDocument()
      expect(screen.getByText("1–1 de 1 registros")).toBeInTheDocument()
    },
  )

  test("preserva seleção ao filtrar e permite selecionar só resultados", async () => {
    const user = userEvent.setup()
    renderDetails()
    await user.click(checkbox(1))
    await user.type(
      screen.getByRole("textbox", { name: /Buscar bethéis/ }),
      testBethels[0].name,
    )

    await user.click(table().getByRole("checkbox", { name: selectAllName }))

    expect(screen.getByText("2 de 6 bethéis selecionados")).toBeInTheDocument()
    expect(checkbox(0)).toBeChecked()
  })

  test("mostra estado vazio sem bethéis correspondentes", async () => {
    const user = userEvent.setup()
    renderDetails()

    await user.type(
      screen.getByRole("textbox", { name: /Buscar bethéis/ }),
      "inexistente",
    )

    expect(table().getByText("Nenhum Bethel encontrado.")).toBeInTheDocument()
    expect(screen.getByText("0–0 de 0 registros")).toBeInTheDocument()
  })

  test("navega para editar estrutura", async () => {
    const user = userEvent.setup()
    renderDetails()

    await user.click(screen.getByRole("link", { name: "Editar estrutura" }))

    expect(
      screen.getByRole("heading", { name: "Editor de teste" }),
    ).toBeInTheDocument()
  })

  test("mostra formulário inexistente", () => {
    const unknownId = 9999

    renderDetails(unknownId)

    expect(
      screen.getByRole("heading", { name: "Formulário não encontrado" }),
    ).toBeInTheDocument()
    expect(screen.queryByRole("table")).not.toBeInTheDocument()
  })

  test("retorna à lista a partir de identificador inexistente", async () => {
    const user = userEvent.setup()
    renderDetails(9999)

    await user.click(
      screen.getByRole("link", { name: "Voltar para formulários" }),
    )

    expect(
      screen.getByRole("heading", { name: "Lista de teste" }),
    ).toBeInTheDocument()
  })
})
