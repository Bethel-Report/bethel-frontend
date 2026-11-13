import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter, Route, Routes } from "react-router"
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"
import { NewPostPage } from "../../pages/NewPostPage"
import {
  createAttachment,
  createImage,
  createValidPost,
  testBethels,
} from "../fixtures/posts"

vi.mock("@/features/bethels/data", async () => {
  const { testBethels } = await import("../fixtures/posts")
  return { bethels: testBethels }
})

function renderPage() {
  return render(
    <MemoryRouter initialEntries={["/postagens", "/postagens/novo"]}>
      <Routes>
        <Route path="/postagens/novo" element={<NewPostPage />} />
        <Route path="/postagens" element={<h1>Lista de teste</h1>} />
      </Routes>
    </MemoryRouter>,
  )
}

describe("cadastro de postagem", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "URL",
      class extends URL {
        static createObjectURL = vi.fn(() => "blob:test-image")
        static revokeObjectURL = vi.fn()
      },
    )
  })

  afterEach(() => vi.unstubAllGlobals())

  test("valida os campos obrigatórios ao enviar vazio", async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole("button", { name: "Cadastrar postagem" }))

    expect(
      await screen.findByText("Informe o título da postagem."),
    ).toBeInTheDocument()
    expect(
      screen.getByText("Informe a descrição da postagem."),
    ).toBeInTheDocument()
    expect(screen.getByText("Selecione um Bethel.")).toBeInTheDocument()
    expect(screen.getByText("Informe a categoria.")).toBeInTheDocument()
    expect(
      screen.getByText("Informe a data da publicação."),
    ).toBeInTheDocument()
  })

  test("remove erros ao preencher os campos sem arquivos opcionais", async () => {
    const user = userEvent.setup()
    const values = createValidPost()
    renderPage()
    await user.click(screen.getByRole("button", { name: "Cadastrar postagem" }))
    await screen.findByText("Informe o título da postagem.")

    await user.type(
      screen.getByRole("textbox", { name: /Título/ }),
      values.title,
    )
    await user.type(
      screen.getByRole("textbox", { name: /Descrição/ }),
      values.summary,
    )
    await user.click(screen.getByRole("combobox", { name: /Bethel/ }))
    await user.click(screen.getByRole("option", { name: testBethels[0].name }))
    await user.type(
      screen.getByRole("textbox", { name: /Categoria/ }),
      values.category,
    )
    await user.type(
      screen.getByLabelText(/Data da publicação/),
      values.publishedAt,
    )
    await user.click(screen.getByRole("button", { name: "Cadastrar postagem" }))

    await waitFor(() => {
      expect(screen.getByRole("textbox", { name: /Título/ })).toHaveAttribute(
        "aria-invalid",
        "false",
      )
      expect(
        screen.getByRole("textbox", { name: /Descrição/ }),
      ).toHaveAttribute("aria-invalid", "false")
      expect(
        screen.getByRole("textbox", { name: /Categoria/ }),
      ).toHaveAttribute("aria-invalid", "false")
      expect(screen.getByRole("combobox", { name: /Bethel/ })).toHaveAttribute(
        "aria-invalid",
        "false",
      )
      expect(screen.getByLabelText(/Data da publicação/)).toHaveAttribute(
        "aria-invalid",
        "false",
      )
    })
    expect(
      screen.queryByText("Informe o título da postagem."),
    ).not.toBeInTheDocument()
  })

  test("seleciona uma imagem de capa e mostra a prévia", async () => {
    const user = userEvent.setup()
    const image = createImage()
    renderPage()

    await user.upload(screen.getByLabelText("Thumbnail (opcional)"), image)

    expect(screen.getByText(image.name)).toBeInTheDocument()
    expect(
      screen.getByRole("img", { name: `Prévia de ${image.name}` }),
    ).toHaveAttribute("src", "blob:test-image")
  })

  test("substitui a imagem de capa existente", async () => {
    const user = userEvent.setup()
    const original = createImage()
    const replacement = createImage("outra-capa.png")
    renderPage()
    await user.upload(screen.getByLabelText("Thumbnail (opcional)"), original)

    await user.upload(
      screen.getByLabelText("Thumbnail (opcional)"),
      replacement,
    )

    expect(screen.getByText(replacement.name)).toBeInTheDocument()
    expect(screen.queryByText(original.name)).not.toBeInTheDocument()
    expect(screen.getAllByRole("img")).toHaveLength(1)
  })

  test("remove a imagem de capa selecionada", async () => {
    const user = userEvent.setup()
    const image = createImage()
    renderPage()
    await user.upload(screen.getByLabelText("Thumbnail (opcional)"), image)

    await user.click(
      screen.getByRole("button", { name: `Remover ${image.name}` }),
    )

    expect(screen.queryByText(image.name)).not.toBeInTheDocument()
    expect(screen.queryByRole("img")).not.toBeInTheDocument()
  })

  test("seleciona múltiplos anexos", async () => {
    const user = userEvent.setup()
    const attachment = createAttachment()
    const image = createImage()
    renderPage()

    await user.upload(screen.getByLabelText("Anexos (opcional)"), [
      attachment,
      image,
    ])

    expect(screen.getByText(attachment.name)).toBeInTheDocument()
    expect(screen.getByText(image.name)).toBeInTheDocument()
  })

  test("remove somente o anexo selecionado", async () => {
    const user = userEvent.setup()
    const attachment = createAttachment()
    const image = createImage()
    renderPage()
    await user.upload(screen.getByLabelText("Anexos (opcional)"), [
      attachment,
      image,
    ])

    await user.click(
      screen.getByRole("button", { name: `Remover ${attachment.name}` }),
    )

    expect(screen.queryByText(attachment.name)).not.toBeInTheDocument()
    expect(screen.getByText(image.name)).toBeInTheDocument()
  })

  test("cancela e retorna à lista", async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole("link", { name: "Cancelar" }))

    expect(
      screen.getByRole("heading", { name: "Lista de teste" }),
    ).toBeInTheDocument()
  })

  test("retorna à página anterior", async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole("button", { name: "Voltar" }))

    expect(
      screen.getByRole("heading", { name: "Lista de teste" }),
    ).toBeInTheDocument()
  })
})
