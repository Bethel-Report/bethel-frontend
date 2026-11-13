import { render, screen } from "@testing-library/react"
import { describe, expect, test } from "vitest"
import { UserAvatar } from "../../components/UserAvatar"

describe("avatar do usuário", () => {
  test.each([
    ["Ana Silva", "A"],
    ["  Beatriz   Costa  ", "B"],
    ["Érica", "É"],
    ["mariana", "m"],
  ])("mostra a primeira inicial de '%s'", (name, initial) => {
    const userName = name

    render(<UserAvatar name={userName} />)

    expect(screen.getByText(initial)).toBeInTheDocument()
  })

  test("renderiza fallback vazio quando não há nome", () => {
    const name = "   "

    const { container } = render(<UserAvatar name={name} />)

    expect(container.textContent).toBe("")
  })
})
