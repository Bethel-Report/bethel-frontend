import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter, Route, Routes } from "react-router"
import { beforeEach, describe, expect, test, vi } from "vitest"
import { EditFormStructurePage } from "../../pages/EditFormStructurePage"
import { createSections, testForms } from "../fixtures/forms"

vi.mock("../../data", async () => {
  const { testForms } = await import("../fixtures/forms")
  return { forms: testForms }
})

const formId = testForms[0].id
const storageKey = `form-structure:${formId}`

function renderPage(id = formId) {
  return render(
    <MemoryRouter initialEntries={[`/formularios/${id}/estrutura`]}>
      <Routes>
        <Route
          path="/formularios/:id/estrutura"
          element={<EditFormStructurePage />}
        />
        <Route path="/formularios/:id" element={<h1>Detalhes de teste</h1>} />
        <Route path="/formularios" element={<h1>Lista de teste</h1>} />
      </Routes>
    </MemoryRouter>,
  )
}

beforeEach(() => localStorage.clear())

describe("edição da estrutura", () => {
  test("inicia com seção vazia e movimentos desabilitados", () => {
    const id = formId

    renderPage(id)

    expect(screen.getByRole("textbox", { name: /Nome da seção/ })).toHaveValue(
      "",
    )
    expect(
      screen.getByRole("button", { name: "Mover seção 1 para cima" }),
    ).toBeDisabled()
    expect(
      screen.getByRole("button", { name: "Mover seção 1 para baixo" }),
    ).toBeDisabled()
  })

  test("adiciona uma seção", async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole("button", { name: "Adicionar seção" }))

    expect(
      screen.getAllByRole("textbox", { name: /Nome da seção/ }),
    ).toHaveLength(2)
    expect(
      screen.getByRole("button", { name: "Mover seção 1 para baixo" }),
    ).toBeEnabled()
  })

  test.each([
    "Texto curto",
    "Texto longo",
    "Número",
    "Múltipla escolha",
    "Única escolha",
  ])("cria campo do tipo %s", async (type) => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole("button", { name: "Criar campo" }))
    await user.click(screen.getByRole("menuitem", { name: type }))

    expect(screen.getByRole("textbox", { name: /Campo 1/ })).toHaveValue("")
    expect(screen.getByText(type)).toBeInTheDocument()
    expect(
      screen.getByRole("checkbox", { name: "Campo obrigatório" }),
    ).not.toBeChecked()
    expect(
      screen.getByRole("button", {
        name: "Mover campo 1 da seção 1 para cima",
      }),
    ).toBeDisabled()
  })

  test("edita campo, obrigatoriedade e opções e salva a estrutura", async () => {
    const user = userEvent.setup()
    renderPage()
    await user.type(
      screen.getByRole("textbox", { name: /Nome da seção/ }),
      "Seção de teste",
    )
    await user.click(screen.getByRole("button", { name: "Criar campo" }))
    await user.click(screen.getByRole("menuitem", { name: "Única escolha" }))

    await user.type(
      screen.getByRole("textbox", { name: /^Campo 1/ }),
      "Pergunta de teste",
    )
    await user.click(
      screen.getByRole("checkbox", { name: "Campo obrigatório" }),
    )
    await user.type(
      screen.getByRole("textbox", { name: "Opção 1 do campo 1" }),
      "Sim",
    )
    await user.type(
      screen.getByRole("textbox", { name: "Opção 2 do campo 1" }),
      "Não",
    )
    await user.click(screen.getByRole("button", { name: "Salvar" }))

    expect(
      screen.getByRole("heading", { name: "Detalhes de teste" }),
    ).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem(storageKey)!)).toEqual([
      expect.objectContaining({
        name: "Seção de teste",
        fields: [
          expect.objectContaining({
            name: "Pergunta de teste",
            type: "radio",
            required: true,
            options: [
              expect.objectContaining({ value: "Sim" }),
              expect.objectContaining({ value: "Não" }),
            ],
          }),
        ],
      }),
    ])
  })

  test("adiciona opção de resposta", async () => {
    const user = userEvent.setup()
    localStorage.setItem(storageKey, JSON.stringify(createSections()))
    renderPage()

    await user.click(screen.getByRole("button", { name: "Adicionar opção" }))

    expect(
      screen.getByRole("textbox", { name: "Opção 3 do campo 2" }),
    ).toHaveValue("")
  })

  test("remove opção e protege a última restante", async () => {
    const user = userEvent.setup()
    localStorage.setItem(storageKey, JSON.stringify(createSections()))
    renderPage()

    await user.click(
      screen.getByRole("button", { name: "Remover opção 1 do campo 2" }),
    )

    expect(
      screen.getByRole("textbox", { name: "Opção 1 do campo 2" }),
    ).toHaveValue("Não")
    expect(
      screen.queryByRole("button", { name: /Remover opção/ }),
    ).not.toBeInTheDocument()
  })

  test("reordena seções preservando os campos", async () => {
    const user = userEvent.setup()
    localStorage.setItem(storageKey, JSON.stringify(createSections()))
    renderPage()

    await user.click(
      screen.getByRole("button", { name: "Mover seção 1 para baixo" }),
    )

    const names = screen.getAllByRole("textbox", { name: /Nome da seção/ })
    expect(names[0]).toHaveValue(createSections()[1].name)
    expect(names[1]).toHaveValue(createSections()[0].name)
    expect(screen.getByRole("textbox", { name: /^Campo 1/ })).toHaveValue(
      createSections()[0].fields[0].name,
    )
  })

  test("reordena campos preservando suas opções", async () => {
    const user = userEvent.setup()
    localStorage.setItem(storageKey, JSON.stringify(createSections()))
    renderPage()

    await user.click(
      screen.getByRole("button", {
        name: "Mover campo 2 da seção 1 para cima",
      }),
    )

    expect(screen.getByRole("textbox", { name: /^Campo 1/ })).toHaveValue(
      createSections()[0].fields[1].name,
    )
    expect(
      screen.getByRole("textbox", { name: "Opção 1 do campo 1" }),
    ).toHaveValue("Sim")
  })

  test("remove um campo", async () => {
    const user = userEvent.setup()
    localStorage.setItem(storageKey, JSON.stringify(createSections()))
    renderPage()

    await user.click(
      screen.getByRole("button", { name: "Remover campo 1 da seção 1" }),
    )

    expect(screen.getByRole("textbox", { name: /^Campo 1/ })).toHaveValue(
      createSections()[0].fields[1].name,
    )
    expect(
      screen.queryByRole("textbox", { name: /^Campo 2/ }),
    ).not.toBeInTheDocument()
  })

  test("remove uma seção", async () => {
    const user = userEvent.setup()
    localStorage.setItem(storageKey, JSON.stringify(createSections()))
    renderPage()

    await user.click(screen.getByRole("button", { name: "Remover seção 1" }))

    expect(screen.getByRole("textbox", { name: /Nome da seção/ })).toHaveValue(
      createSections()[1].name,
    )
    expect(
      screen.queryByRole("textbox", { name: /^Campo/ }),
    ).not.toBeInTheDocument()
  })

  test("cancela sem sobrescrever a estrutura salva", async () => {
    const user = userEvent.setup()
    const saved = JSON.stringify(createSections())
    localStorage.setItem(storageKey, saved)
    renderPage()
    await user.clear(
      screen.getAllByRole("textbox", { name: /Nome da seção/ })[0],
    )

    await user.click(screen.getByRole("link", { name: "Cancelar" }))

    expect(
      screen.getByRole("heading", { name: "Detalhes de teste" }),
    ).toBeInTheDocument()
    expect(localStorage.getItem(storageKey)).toBe(saved)
  })

  test("mostra formulário inexistente", () => {
    const unknownId = 9999

    renderPage(unknownId)

    expect(
      screen.getByRole("heading", { name: "Formulário não encontrado" }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole("button", { name: "Salvar" }),
    ).not.toBeInTheDocument()
  })
})
