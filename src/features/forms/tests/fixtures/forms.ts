import type { FormRecord } from "../../data"
import type { Bethel } from "@/features/bethels/data"
import type { Section } from "../../hooks/model"

export const testForms: FormRecord[] = [
  {
    id: 101,
    title: "Avaliação de teste",
    description: "Opiniões sobre o encontro.",
    createdAt: "2026-01-15",
    responses: 12,
    status: "Ativo",
  },
  {
    id: 102,
    title: "Cadastro de teste",
    description: "Inscrições de integrantes.",
    createdAt: "2026-02-20",
    responses: 8,
    status: "Pendente",
  },
  {
    id: 103,
    title: "Relatório de teste",
    description: "Resumo das atividades.",
    createdAt: "2026-03-10",
    responses: 3,
    status: "Inativo",
  },
  ...Array.from({ length: 3 }, (_, index): FormRecord => ({
    id: 104 + index,
    title: `Pesquisa de teste ${index + 1}`,
    description: `Descrição ${index + 1}`,
    createdAt: "2026-04-01",
    responses: 0,
    status: "Ativo",
  })),
]

export const testBethels: Bethel[] = [
  {
    id: 201,
    name: "União de teste",
    city: "Cidade Alfa",
    state: "CE",
    members: 20,
    status: "Ativo",
  },
  ...Array.from({ length: 5 }, (_, index): Bethel => ({
    id: 202 + index,
    name: `Unidade de teste ${index + 1}`,
    city: "Cidade Beta",
    state: "RN",
    members: 10,
    status: "Inativo",
  })),
]

export function createSections(): Section[] {
  return [
    {
      id: "section-a",
      name: "Identificação de teste",
      description: "Descrição de teste",
      fields: [
        {
          id: "field-a",
          name: "Nome de teste",
          type: "text",
          required: false,
          options: [],
        },
        {
          id: "field-b",
          name: "Escolha de teste",
          type: "radio",
          required: true,
          options: [
            { id: "option-a", value: "Sim" },
            { id: "option-b", value: "Não" },
          ],
        },
      ],
    },
    {
      id: "section-b",
      name: "Observações de teste",
      description: "",
      fields: [],
    },
  ]
}
