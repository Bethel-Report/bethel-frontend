import { z } from "zod"

export const newTransactionSchema = z.object({
  description: z.string().trim().min(1, "Informe a descrição."),
  bethel: z.string().min(1, "Selecione um Bethel."),
  type: z.enum(["Receita", "Despesa"], {
    error: "Selecione o tipo de movimentação.",
  }),
  amount: z
    .string()
    .trim()
    .regex(/^\d+(?:[,.]\d{1,2})?$/, "Informe um valor válido.")
    .refine(
      (value) => Number(value.replace(",", ".")) > 0,
      "O valor deve ser maior que zero.",
    ),
})

export type NewTransactionFormValues = z.infer<typeof newTransactionSchema>
