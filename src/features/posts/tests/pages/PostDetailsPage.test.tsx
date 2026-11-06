import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter, Route, Routes } from "react-router"
import { describe, expect, test, vi } from "vitest"
import { PostDetailsPage } from "../../pages/PostDetailsPage"
import { testBethels, testPosts } from "../fixtures/posts"

vi.mock("@/features/bethels/data", async () => {
  const { testPosts, testBethels } = await import("../fixtures/posts")
  return { bethelPosts: testPosts, bethels: testBethels }
})

function renderDetails(id: number) {
  return render(
    <MemoryRouter initialEntries={["/postagens", `/postagens/${id}`]}>
      <Routes>
        <Route path="/postagens/:id" element={<PostDetailsPage />} />
        <Route path="/postagens" element={<h1>Lista de teste</h1>} />
        <Route path="/betheis/:id" element={<h1>Unidade de teste</h1>} />
      </Routes>
    </MemoryRouter>,
  )
}

describe("detalhes de postagem", () => {
  test("mostra estado de postagem inexistente", () => {
    const unknownId = 9999

    renderDetails(unknownId)

    expect(
      screen.getByRole("heading", { name: "Postagem não encontrada" }),
    ).toBeInTheDocument()
    expect(screen.queryByText("Publicado por")).not.toBeInTheDocument()
  })

  test("retorna à lista a partir de postagem inexistente", async () => {
    const user = userEvent.setup()
    renderDetails(9999)

    await user.click(
      screen.getByRole("link", { name: "Voltar para postagens" }),
    )

    expect(
      screen.getByRole("heading", { name: "Lista de teste" }),
    ).toBeInTheDocument()
  })

  test("navega para a unidade responsável", async () => {
    const user = userEvent.setup()
    const bethel = testBethels[0]
    renderDetails(testPosts[0].id)

    await user.click(
      screen.getByRole("link", {
        name: `${bethel.name} · ${bethel.city}, ${bethel.state}`,
      }),
    )

    expect(
      screen.getByRole("heading", { name: "Unidade de teste" }),
    ).toBeInTheDocument()
  })

  test("volta à página anterior", async () => {
    const user = userEvent.setup()
    renderDetails(testPosts[0].id)

    await user.click(screen.getByRole("button", { name: "Voltar" }))

    expect(
      screen.getByRole("heading", { name: "Lista de teste" }),
    ).toBeInTheDocument()
  })
})
