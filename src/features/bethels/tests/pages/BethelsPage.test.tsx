import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter, Route, Routes } from "react-router"
import { describe, expect, test, vi } from "vitest"
import { BethelsPage } from "../../pages/BethelsPage"
import { testBethels } from "../fixtures/bethels"

vi.mock("../../data", async () => {
  const { testBethels } = await import("../fixtures/bethels")
  return { bethels: testBethels }
})

function renderPage() {
  return render(
    <MemoryRouter initialEntries={["/betheis"]}>
      <Routes>
        <Route path="/betheis" element={<BethelsPage />} />
        <Route path="/betheis/novo" element={<h1>Destino de cadastro</h1>} />
        <Route path="/betheis/:id" element={<h1>Destino de detalhes</h1>} />
      </Routes>
    </MemoryRouter>,
  )
}

describe("listagem de bethéis", () => {
  test("mostra a primeira página e os dados dos cartões", () => {
    const bethel = testBethels[0]

    renderPage()

    expect(screen.getByText("1–6 de 7 registros")).toBeInTheDocument()
    expect(
      screen.getAllByRole("link", { name: /Ver detalhes de/ }),
    ).toHaveLength(6)
    expect(screen.getByText(bethel.name)).toBeInTheDocument()
    expect(
      screen.getByText(`${bethel.city}, ${bethel.state}`),
    ).toBeInTheDocument()
    expect(screen.getByText(String(bethel.members))).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "Página anterior" }),
    ).toBeDisabled()
  })

  test("avança até a última página", async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole("button", { name: "Próxima página" }))

    expect(screen.getByText("7–7 de 7 registros")).toBeInTheDocument()
    expect(screen.getByText(testBethels[6].name)).toBeInTheDocument()
    expect(screen.queryByText(testBethels[0].name)).not.toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "Próxima página" }),
    ).toBeDisabled()
  })

  test("retorna à primeira página", async () => {
    const user = userEvent.setup()
    renderPage()
    await user.click(screen.getByRole("button", { name: "Próxima página" }))

    await user.click(screen.getByRole("button", { name: "Página anterior" }))

    expect(screen.getByText("1–6 de 7 registros")).toBeInTheDocument()
    expect(screen.getByText(testBethels[0].name)).toBeInTheDocument()
  })

  test("busca sem acentos e reinicia a paginação", async () => {
    const user = userEvent.setup()
    renderPage()
    await user.click(screen.getByRole("button", { name: "Próxima página" }))

    await user.type(
      screen.getByRole("textbox", { name: "Buscar bethéis por nome" }),
      "  UNIAO  ",
    )

    expect(screen.getByText("1–2 de 2 registros")).toBeInTheDocument()
    expect(screen.getByText(testBethels[0].name)).toBeInTheDocument()
    expect(screen.getByText(testBethels[1].name)).toBeInTheDocument()
  })

  test("combina busca e situação", async () => {
    const user = userEvent.setup()
    renderPage()
    await user.type(
      screen.getByRole("textbox", { name: "Buscar bethéis por nome" }),
      "uniao",
    )

    await user.click(
      screen.getByRole("combobox", { name: "Filtrar bethéis por situação" }),
    )
    await user.click(screen.getByRole("option", { name: "Inativo" }))

    expect(screen.getByText(testBethels[1].name)).toBeInTheDocument()
    expect(screen.queryByText(testBethels[0].name)).not.toBeInTheDocument()
    expect(screen.getByText("1–1 de 1 registros")).toBeInTheDocument()
  })

  test("mostra estado vazio para busca sem resultados", async () => {
    const user = userEvent.setup()
    renderPage()

    await user.type(
      screen.getByRole("textbox", { name: "Buscar bethéis por nome" }),
      "inexistente",
    )

    expect(screen.getByText("Nenhum Bethel encontrado.")).toBeInTheDocument()
    expect(screen.getByText("0–0 de 0 registros")).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "Próxima página" }),
    ).toBeDisabled()
  })

  test("navega para o cadastro", async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole("link", { name: "Criar Bethel" }))

    expect(
      screen.getByRole("heading", { name: "Destino de cadastro" }),
    ).toBeInTheDocument()
  })

  test("navega para os detalhes de um cartão", async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(
      screen.getByRole("link", {
        name: `Ver detalhes de ${testBethels[0].name}`,
      }),
    )

    expect(
      screen.getByRole("heading", { name: "Destino de detalhes" }),
    ).toBeInTheDocument()
  })
})
