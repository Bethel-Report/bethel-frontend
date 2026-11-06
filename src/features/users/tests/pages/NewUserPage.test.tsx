import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter, Route, Routes } from "react-router"
import { describe, expect, test } from "vitest"
import { NewUserPage } from "../../pages/NewUserPage"
import { validUser } from "../fixtures/users"

function renderPage() {
  return render(
    <MemoryRouter initialEntries={["/membros", "/membros/novo"]}>
      <Routes>
        <Route path="/membros/novo" element={<NewUserPage />} />
        <Route path="/membros" element={<h1>Lista de teste</h1>} />
      </Routes>
    </MemoryRouter>,
  )
}

async function selectFirstOption(
  user: ReturnType<typeof userEvent.setup>,
  name: RegExp,
) {
  await user.click(screen.getByRole("combobox", { name }))
  await user.click(screen.getAllByRole("option")[0])
}

describe("cadastro de usuário", () => {
  test("valida campos obrigatórios ao enviar vazio", async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole("button", { name: "Cadastrar membro" }))

    expect(
      await screen.findByText("Informe o nome completo."),
    ).toBeInTheDocument()
    expect(screen.getByText("Informe um e-mail válido.")).toBeInTheDocument()
    expect(screen.getByText("Selecione um perfil.")).toBeInTheDocument()
    expect(screen.getByText("Selecione um Bethel.")).toBeInTheDocument()
    expect(screen.getByRole("textbox", { name: "Telefone" })).toHaveAttribute(
      "aria-invalid",
      "false",
    )
  })

  test("remove erros após corrigir os campos sem telefone opcional", async () => {
    const user = userEvent.setup()
    renderPage()
    await user.click(screen.getByRole("button", { name: "Cadastrar membro" }))
    await screen.findByText("Informe o nome completo.")

    await user.type(
      screen.getByRole("textbox", { name: /Nome completo/ }),
      validUser.name,
    )
    await user.type(
      screen.getByRole("textbox", { name: /E-mail/ }),
      validUser.email,
    )
    await selectFirstOption(user, /Perfil/)
    await selectFirstOption(user, /Bethel/)
    await user.click(screen.getByRole("button", { name: "Cadastrar membro" }))

    await waitFor(() => {
      expect(
        screen.getByRole("textbox", { name: /Nome completo/ }),
      ).toHaveAttribute("aria-invalid", "false")
      expect(screen.getByRole("textbox", { name: /E-mail/ })).toHaveAttribute(
        "aria-invalid",
        "false",
      )
      expect(screen.getByRole("combobox", { name: /Perfil/ })).toHaveAttribute(
        "aria-invalid",
        "false",
      )
      expect(screen.getByRole("combobox", { name: /Bethel/ })).toHaveAttribute(
        "aria-invalid",
        "false",
      )
    })
    expect(
      screen.queryByText("Informe o nome completo."),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText("Informe um e-mail válido."),
    ).not.toBeInTheDocument()
  })

  test("rejeita e-mail malformado", async () => {
    const user = userEvent.setup()
    renderPage()

    await user.type(screen.getByRole("textbox", { name: /E-mail/ }), "invalido")
    await user.click(screen.getByRole("button", { name: "Cadastrar membro" }))

    expect(
      await screen.findByText("Informe um e-mail válido."),
    ).toBeInTheDocument()
    expect(screen.getByRole("textbox", { name: /E-mail/ })).toHaveAttribute(
      "aria-invalid",
      "true",
    )
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
