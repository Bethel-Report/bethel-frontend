import { z } from "zod"

export const loginSchema = z.object({
  email: z.email("Informe um e-mail válido.").min(1, "Informe seu e-mail."),
  password: z.string().min(1, "Informe sua senha."),
})

export type LoginFormValues = z.infer<typeof loginSchema>

export const setPasswordSchema = z
  .object({
    password: z.string().min(1, "Informe sua senha."),
    confirmPassword: z.string().min(1, "Confirme sua senha."),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "As senhas devem ser iguais.",
    path: ["confirmPassword"],
  })

export type SetPasswordFormValues = z.infer<typeof setPasswordSchema>
