export type UserStatus = "Ativo" | "Pendente" | "Inativo"

export type User = {
  id: number
  name: string
  email: string
  role: string
  bethel: string
  status: UserStatus
}
