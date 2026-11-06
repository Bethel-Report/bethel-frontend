import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter, Route, Routes } from "react-router"
import { describe, expect, test } from "vitest"
import { NewBethelPage } from "../../pages/NewBethelPage"
import { validBethel } from "../fixtures/bethels"

function renderPage() {
  return render(
    <MemoryRouter initialEntries={["/betheis", "/betheis/novo"]}>
      <Routes>
        <Route path="/betheis/novo" element={<NewBethelPage />} />
        <Route path="/betheis" element={<h1>Lista de unidades</h1>} />
      </Routes>
    </MemoryRouter>,
  )
}

describe("cadastro de Bethel", () => {
  test("exibe erros ao enviar o formulário vazio", async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole("button", { name: "Cadastrar bethel" }))

    expect(
      await screen.findByText("Informe o nome do Bethel."),
    ).toBeInTheDocument()
    expect(screen.getByText("Informe a cidade.")).toBeInTheDocument()
    expect(
      screen.getByText("Informe a sigla do estado com duas letras."),
    ).toBeInTheDocument()
    expect(screen.getByText("Selecione a situação.")).toBeInTheDocument()
    expect(
      screen.getByRole("textbox", { name: /Nome do Bethel/ }),
    ).toHaveAttribute("aria-invalid", "true")
  })

  test("remove os erros após corrigir os campos", async () => {
    const user = userEvent.setup()
    renderPage()
    await user.click(screen.getByRole("button", { name: "Cadastrar bethel" }))
    await screen.findByText("Informe o nome do Bethel.")

    await user.type(
      screen.getByRole("textbox", { name: /Nome do Bethel/ }),
      validBethel.name,
    )
    await user.type(
      screen.getByRole("textbox", { name: /Cidade/ }),
      validBethel.city,
    )
    await user.type(
      screen.getByRole("textbox", { name: /Estado/ }),
      validBethel.state,
    )
    await user.click(screen.getByRole("combobox", { name: /Situação/ }))
    await user.click(screen.getByRole("option", { name: validBethel.status }))
    await user.click(screen.getByRole("button", { name: "Cadastrar bethel" }))

    await waitFor(() => {
      expect(
        screen.getByRole("textbox", { name: /Nome do Bethel/ }),
      ).toHaveAttribute("aria-invalid", "false")
      expect(screen.getByRole("textbox", { name: /Cidade/ })).toHaveAttribute(
        "aria-invalid",
        "false",
      )
      expect(screen.getByRole("textbox", { name: /Estado/ })).toHaveAttribute(
        "aria-invalid",
        "false",
      )
      expect(
        screen.getByRole("combobox", { name: /Situação/ }),
      ).toHaveAttribute("aria-invalid", "false")
    })
    expect(
      screen.queryByText("Informe o nome do Bethel."),
    ).not.toBeInTheDocument()
    expect(screen.queryByText("Selecione a situação.")).not.toBeInTheDocument()
  })

  test("rejeita sigla de estado com números", async () => {
    const user = userEvent.setup()
    renderPage()

    await user.type(screen.getByRole("textbox", { name: /Estado/ }), "12")
    await user.click(screen.getByRole("button", { name: "Cadastrar bethel" }))

    expect(
      await screen.findByText("Informe a sigla do estado com duas letras."),
    ).toBeInTheDocument()
  })

  test("cancela e retorna à listagem", async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole("link", { name: "Cancelar" }))

    expect(
      screen.getByRole("heading", { name: "Lista de unidades" }),
    ).toBeInTheDocument()
  })

  test("volta para a página anterior", async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole("button", { name: "Voltar" }))

    expect(
      screen.getByRole("heading", { name: "Lista de unidades" }),
    ).toBeInTheDocument()
  })
})
