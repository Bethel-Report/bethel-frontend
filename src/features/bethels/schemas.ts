import { z } from "zod"

export const newBethelSchema = z.object({
  name: z.string().trim().min(1, "Informe o nome do Bethel."),
  city: z.string().trim().min(1, "Informe a cidade."),
  state: z
    .string()
    .trim()
    .regex(/^[A-Za-z]{2}$/, "Informe a sigla do estado com duas letras."),
  status: z.string().min(1, "Selecione a situação."),
})

export type NewBethelFormValues = z.infer<typeof newBethelSchema>
