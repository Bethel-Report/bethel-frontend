import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter, Route, Routes, useLocation } from "react-router"
import { describe, expect, test, vi } from "vitest"
import { PostsPage } from "../../pages/PostsPage"
import { testPosts } from "../fixtures/posts"

vi.mock("@/features/bethels/data", async () => {
  const { testPosts, testPostsWithBethel } = await import("../fixtures/posts")
  return { bethelPosts: testPosts, postsWithBethel: testPostsWithBethel }
})

function Location() {
  const location = useLocation()
  return (
    <output aria-label="Endereço atual">
      {location.pathname}
      {location.search}
    </output>
  )
}

function renderPage(url = "/postagens") {
  return render(
    <MemoryRouter initialEntries={[url]}>
      <Location />
      <Routes>
        <Route path="/postagens" element={<PostsPage />} />
        <Route path="/postagens/novo" element={<h1>Cadastro de teste</h1>} />
        <Route path="/postagens/:id" element={<h1>Detalhes de teste</h1>} />
      </Routes>
    </MemoryRouter>,
  )
}

async function selectCategory(
  user: ReturnType<typeof userEvent.setup>,
  category: string,
) {
  await user.click(
    screen.getByRole("combobox", { name: "Filtrar postagens por categoria" }),
  )
  await user.click(screen.getByRole("option", { name: category }))
}

describe("listagem de postagens", () => {
  test("mostra a primeira página", () => {
    const post = testPosts[0]

    renderPage()

    expect(screen.getByText(post.title)).toBeInTheDocument()
    expect(screen.getAllByRole("link", { name: /Ver postagem:/ })).toHaveLength(
      6,
    )
    expect(screen.getByText("1–6 de 7 registros")).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "Página anterior" }),
    ).toBeDisabled()
  })

  test("avança até a última página", async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole("button", { name: "Próxima página" }))

    expect(screen.getByText(testPosts[6].title)).toBeInTheDocument()
    expect(screen.getByText("7–7 de 7 registros")).toBeInTheDocument()
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
    expect(screen.getByText(testPosts[0].title)).toBeInTheDocument()
  })

  test("busca por título", async () => {
    const user = userEvent.setup()
    renderPage()
    await user.click(screen.getByRole("button", { name: "Próxima página" }))

    await user.type(
      screen.getByRole("textbox", { name: /Buscar postagens/ }),
      "  DOACAO  ",
    )

    expect(screen.getByText(testPosts[0].title)).toBeInTheDocument()
    expect(screen.getByText(`1–1 de 1 registros`)).toBeInTheDocument()
  })

  test("combina busca e categoria mostrando estado vazio", async () => {
    const user = userEvent.setup()
    renderPage()
    await user.type(
      screen.getByRole("textbox", { name: /Buscar postagens/ }),
      testPosts[0].title,
    )

    await selectCategory(user, "Encontro")

    expect(screen.getByText("Nenhuma postagem encontrada.")).toBeInTheDocument()
    expect(screen.getByText("0–0 de 0 registros")).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "Próxima página" }),
    ).toBeDisabled()
  })

  test("filtra pela categoria da URL", () => {
    const url = "/postagens?categoria=Campanha"

    renderPage(url)

    expect(screen.getByText(testPosts[0].title)).toBeInTheDocument()
    expect(screen.queryByText(testPosts[1].title)).not.toBeInTheDocument()
    expect(screen.getByText("1–1 de 1 registros")).toBeInTheDocument()
  })

  test("ignora categoria desconhecida na URL", () => {
    const url = "/postagens?categoria=Inexistente"

    renderPage(url)

    expect(screen.getByText("1–6 de 7 registros")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveTextContent("Todas")
  })

  test("atualiza a URL e reinicia paginação ao filtrar", async () => {
    const user = userEvent.setup()
    renderPage()
    await user.click(screen.getByRole("button", { name: "Próxima página" }))

    await selectCategory(user, "Campanha")

    expect(screen.getByLabelText("Endereço atual")).toHaveTextContent(
      "/postagens?categoria=Campanha",
    )
    expect(screen.getByText("1–1 de 1 registros")).toBeInTheDocument()
  })

  test("remove o filtro da URL ao selecionar Todas", async () => {
    const user = userEvent.setup()
    renderPage("/postagens?categoria=Campanha")

    await selectCategory(user, "Todas")

    expect(screen.getByLabelText("Endereço atual")).toHaveTextContent(
      /^\/postagens$/,
    )
    expect(screen.getByText("1–6 de 7 registros")).toBeInTheDocument()
  })

  test("navega para criar postagem", async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole("link", { name: "Criar postagem" }))

    expect(
      screen.getByRole("heading", { name: "Cadastro de teste" }),
    ).toBeInTheDocument()
  })

  test("navega para os detalhes da postagem selecionada", async () => {
    const user = userEvent.setup()
    const post = testPosts[0]
    renderPage()

    await user.click(
      screen.getByRole("link", { name: `Ver postagem: ${post.title}` }),
    )

    expect(
      screen.getByRole("heading", { name: "Detalhes de teste" }),
    ).toBeInTheDocument()
    expect(screen.getByLabelText("Endereço atual")).toHaveTextContent(
      `/postagens/${post.id}`,
    )
  })
})
