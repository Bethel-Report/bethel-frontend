import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, test } from "vitest"
import { CreateFormDialog } from "../../components/CreateFormDialog"
import { testForms } from "../fixtures/forms"

describe("diálogo de criação", () => {
  test("abre campos de título e descrição", async () => {
    const user = userEvent.setup()
    render(<CreateFormDialog />)

    await user.click(screen.getByRole("button", { name: "Criar formulário" }))

    expect(
      screen.getByRole("dialog", { name: "Criar formulário" }),
    ).toBeInTheDocument()
    expect(screen.getByRole("textbox", { name: /Título/ })).toHaveValue("")
    expect(screen.getByRole("textbox", { name: /Descrição/ })).toHaveValue("")
  })

  test("permite preencher os campos", async () => {
    const user = userEvent.setup()
    const form = testForms[0]
    render(<CreateFormDialog />)
    await user.click(screen.getByRole("button", { name: "Criar formulário" }))

    await user.type(screen.getByRole("textbox", { name: /Título/ }), form.title)
    await user.type(
      screen.getByRole("textbox", { name: /Descrição/ }),
      form.description,
    )

    expect(screen.getByRole("textbox", { name: /Título/ })).toHaveValue(
      form.title,
    )
    expect(screen.getByRole("textbox", { name: /Descrição/ })).toHaveValue(
      form.description,
    )
  })

  test("fecha ao cancelar", async () => {
    const user = userEvent.setup()
    render(<CreateFormDialog />)
    await user.click(screen.getByRole("button", { name: "Criar formulário" }))

    await user.click(screen.getByRole("button", { name: "Cancelar" }))

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "Criar formulário" }),
    ).toHaveFocus()
  })
})
