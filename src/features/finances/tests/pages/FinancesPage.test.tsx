import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, test, vi } from "vitest"
import { FinancesPage } from "../../pages/FinancesPage"
import { testTransactions, validTransaction } from "../fixtures/transactions"

vi.mock("../../data", async () => {
  const { testTransactions } = await import("../fixtures/transactions")
  return { transactions: testTransactions }
})

vi.mock("@/features/bethels/data", async () => {
  const { testBethels } = await import("../fixtures/transactions")
  return { bethels: testBethels }
})

function table() {
  return within(screen.getByRole("table"))
}

async function selectOption(
  user: ReturnType<typeof userEvent.setup>,
  name: RegExp,
  option: string,
) {
  await user.click(screen.getByRole("combobox", { name }))
  await user.click(screen.getByRole("option", { name: option }))
}

describe("Finanças — integração local", () => {
  test("mostra os totais das movimentações", () => {
    render(<FinancesPage />)

    const income = screen.getByText("R$ 200,00")
    const expenses = screen.getByText("R$ 60,00")
    const balance = screen.getByText("R$ 140,00")

    expect(income).toBeInTheDocument()
    expect(expenses).toBeInTheDocument()
    expect(balance).toBeInTheDocument()
    expect(table().getAllByRole("row")).toHaveLength(6)
    expect(screen.getByText("1–5 de 6 registros")).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "Página anterior" }),
    ).toBeDisabled()
  })

  test("avança para a última página", async () => {
    const user = userEvent.setup()
    render(<FinancesPage />)

    await user.click(screen.getByRole("button", { name: "Próxima página" }))

    expect(screen.getByText("6–6 de 6 registros")).toBeInTheDocument()
    expect(
      table().getByText(testTransactions[5].description),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "Próxima página" }),
    ).toBeDisabled()
  })

  test("retorna à página anterior", async () => {
    const user = userEvent.setup()
    render(<FinancesPage />)
    await user.click(screen.getByRole("button", { name: "Próxima página" }))

    await user.click(screen.getByRole("button", { name: "Página anterior" }))

    expect(screen.getByText("1–5 de 6 registros")).toBeInTheDocument()
    expect(
      table().getByText(testTransactions[0].description),
    ).toBeInTheDocument()
  })

  test("busca sem acentos ou distinção de caixa e reinicia a paginação", async () => {
    const user = userEvent.setup()
    render(<FinancesPage />)
    await user.click(screen.getByRole("button", { name: "Próxima página" }))
    const search = screen.getByRole("textbox", { name: /Buscar movimentações/ })

    await user.type(search, "  DOACAO  ")

    expect(screen.getByText("1–2 de 2 registros")).toBeInTheDocument()
    expect(
      table().getByText(testTransactions[0].description),
    ).toBeInTheDocument()
    expect(
      table().getByText(testTransactions[5].description),
    ).toBeInTheDocument()
  })

  test("combina busca e tipo e mostra o estado vazio", async () => {
    const user = userEvent.setup()
    render(<FinancesPage />)
    await user.type(
      screen.getByRole("textbox", { name: /Buscar movimentações/ }),
      "doacao",
    )

    await selectOption(user, /Filtrar por tipo/, "Despesa")

    expect(
      table().getByText("Nenhuma movimentação encontrada."),
    ).toBeInTheDocument()
    expect(screen.getByText("0–0 de 0 registros")).toBeInTheDocument()
    expect(screen.getByText("R$ 200,00")).toBeInTheDocument()
  })

  test("impede cadastro com campos obrigatórios vazios", async () => {
    const user = userEvent.setup()
    render(<FinancesPage />)
    await user.click(screen.getByRole("button", { name: "Criar movimentação" }))

    await user.click(
      screen.getByRole("button", { name: "Cadastrar movimentação" }),
    )

    expect(await screen.findByText("Informe a descrição.")).toBeInTheDocument()
    expect(screen.getByRole("dialog")).toBeInTheDocument()
  })

  test("cadastra uma despesa e atualiza listagem e saldo", async () => {
    const user = userEvent.setup()
    render(<FinancesPage />)
    await user.click(screen.getByRole("button", { name: "Criar movimentação" }))

    await user.type(
      screen.getByRole("textbox", { name: /Descrição/ }),
      `  ${validTransaction.description}  `,
    )
    await selectOption(user, /Bethel/, validTransaction.bethel)
    await selectOption(user, /Tipo/, validTransaction.type)
    await user.type(
      screen.getByRole("textbox", { name: /Valor/ }),
      validTransaction.amount,
    )
    await user.click(
      screen.getByRole("button", { name: "Cadastrar movimentação" }),
    )

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    expect(table().getByText(validTransaction.description)).toBeInTheDocument()
    expect(table().getByText("R$ 0,29")).toBeInTheDocument()
    expect(screen.getByText("1–5 de 7 registros")).toBeInTheDocument()
    expect(screen.getByText("R$ 60,29")).toBeInTheDocument()
    expect(screen.getByText("R$ 139,71")).toBeInTheDocument()
  })

  test("preenche o formulário com a movimentação existente", async () => {
    const user = userEvent.setup()
    const transaction = testTransactions[0]
    render(<FinancesPage />)

    await user.click(
      table().getByRole("button", {
        name: `Editar ${transaction.description}`,
      }),
    )

    expect(screen.getByRole("textbox", { name: /Descrição/ })).toHaveValue(
      transaction.description,
    )
    expect(screen.getByRole("textbox", { name: /Valor/ })).toHaveValue("100,00")
    expect(screen.getByRole("combobox", { name: /Bethel/ })).toHaveTextContent(
      transaction.bethel,
    )
    expect(screen.getByRole("combobox", { name: /Tipo/ })).toHaveTextContent(
      transaction.type,
    )
  })

  test("salva uma edição e recalcula os totais", async () => {
    const user = userEvent.setup()
    const transaction = testTransactions[0]
    const updatedDescription = "Doação atualizada de teste"
    render(<FinancesPage />)
    await user.click(
      table().getByRole("button", {
        name: `Editar ${transaction.description}`,
      }),
    )
    const description = screen.getByRole("textbox", { name: /Descrição/ })
    const amount = screen.getByRole("textbox", { name: /Valor/ })

    await user.clear(description)
    await user.type(description, updatedDescription)
    await user.clear(amount)
    await user.type(amount, "150.50")
    await user.click(screen.getByRole("button", { name: "Salvar alterações" }))

    expect(table().getByText(updatedDescription)).toBeInTheDocument()
    expect(table().queryByText(transaction.description)).not.toBeInTheDocument()
    expect(screen.getByText("R$ 250,50")).toBeInTheDocument()
    expect(screen.getByText("R$ 190,50")).toBeInTheDocument()
    expect(screen.getByText("1–5 de 6 registros")).toBeInTheDocument()
  })

  test("descarta alterações ao cancelar e restaura os dados ao reabrir", async () => {
    const user = userEvent.setup()
    const transaction = testTransactions[0]
    render(<FinancesPage />)
    await user.click(
      table().getByRole("button", {
        name: `Editar ${transaction.description}`,
      }),
    )

    await user.clear(screen.getByRole("textbox", { name: /Descrição/ }))
    await user.click(screen.getByRole("button", { name: "Cancelar" }))
    await user.click(
      table().getByRole("button", {
        name: `Editar ${transaction.description}`,
      }),
    )

    expect(screen.getByRole("textbox", { name: /Descrição/ })).toHaveValue(
      transaction.description,
    )
  })

  test("preserva a movimentação ao cancelar a remoção", async () => {
    const user = userEvent.setup()
    const transaction = testTransactions[0]
    render(<FinancesPage />)
    await user.click(
      table().getByRole("button", {
        name: `Remover ${transaction.description}`,
      }),
    )

    await user.click(screen.getByRole("button", { name: "Cancelar" }))

    expect(table().getByText(transaction.description)).toBeInTheDocument()
    expect(screen.getByText("1–5 de 6 registros")).toBeInTheDocument()
  })

  test("remove após confirmação e recalcula os totais", async () => {
    const user = userEvent.setup()
    const transaction = testTransactions[0]
    render(<FinancesPage />)
    await user.click(
      table().getByRole("button", {
        name: `Remover ${transaction.description}`,
      }),
    )

    await user.click(
      screen.getByRole("button", { name: "Remover movimentação" }),
    )

    expect(table().queryByText(transaction.description)).not.toBeInTheDocument()
    expect(screen.getByText("R$ 100,00")).toBeInTheDocument()
    expect(screen.getByText("R$ 40,00")).toBeInTheDocument()
    expect(screen.getByText("1–5 de 5 registros")).toBeInTheDocument()
  })
})
