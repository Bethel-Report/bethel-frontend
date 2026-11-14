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

export const admissionSchema = z.object({
  name: z.string().trim().min(1, "Informe seu nome."),
  birthday: z.iso.date("Informe uma data de nascimento válida."),
  city: z.string().trim().min(1, "Informe sua cidade."),
  address: z.string().trim().min(1, "Informe seu endereço."),
  volunteer: z.boolean(),
  masonicRelationship: z.boolean(),
  member: z.boolean(),
  sponsorship: z.boolean(),
})
