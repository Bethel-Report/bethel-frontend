import { z } from "zod"

export const newUserSchema = z.object({
  name: z.string().trim().min(1, "Informe o nome completo."),
  email: z
    .email("Informe um e-mail válido.")
    .trim()
    .min(1, "Informe o e-mail."),
  phone: z.string(),
  role: z.string().min(1, "Selecione um perfil."),
  bethel: z.string().min(1, "Selecione um Bethel."),
})

export type NewUserFormValues = z.infer<typeof newUserSchema>
