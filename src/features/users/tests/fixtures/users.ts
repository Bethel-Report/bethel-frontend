import type { User } from "../../types"
import type { NewUserFormValues } from "../../schemas"

export const testUsers: User[] = [
  {
    id: 101,
    name: "Márcia de Teste",
    email: "marcia@example.com",
    role: "Conselho de Bethel",
    bethel: "União de teste",
    status: "Ativo",
  },
  {
    id: 102,
    name: "Ana de Teste",
    email: "ana@example.com",
    role: "Membro de Bethel",
    bethel: "União de teste",
    status: "Pendente",
  },
  {
    id: 103,
    name: "Beatriz de Teste",
    email: "beatriz@example.com",
    role: "Grande Conselho",
    bethel: "Esperança de teste",
    status: "Inativo",
  },
  {
    id: 104,
    name: "Carla de Teste",
    email: "carla@example.com",
    role: "Membro de Bethel",
    bethel: "Esperança de teste",
    status: "Ativo",
  },
  {
    id: 105,
    name: "Daniela de Teste",
    email: "daniela@example.com",
    role: "Membro de Bethel",
    bethel: "Esperança de teste",
    status: "Ativo",
  },
  {
    id: 106,
    name: "Elisa de Teste",
    email: "elisa@example.com",
    role: "Conselho de Bethel",
    bethel: "Esperança de teste",
    status: "Ativo",
  },
]

export const validUser: NewUserFormValues = {
  name: "Nova integrante de teste",
  email: "integrante@example.com",
  phone: "",
  role: "membro-bethel",
  bethel: "Unidade de teste",
}
