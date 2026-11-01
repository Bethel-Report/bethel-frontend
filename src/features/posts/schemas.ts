import { z } from "zod"

export const newPostSchema = z.object({
  title: z.string().trim().min(1, "Informe o título da postagem."),
  summary: z.string().trim().min(1, "Informe a descrição da postagem."),
  bethelId: z.string().min(1, "Selecione um Bethel."),
  category: z.string().trim().min(1, "Informe a categoria."),
  publishedAt: z.string().min(1, "Informe a data da publicação."),
  thumbnail: z
    .array(z.file())
    .max(1, "Selecione apenas uma imagem.")
    .refine((files) => files.every((file) => file.type.startsWith("image/")), {
      message: "Selecione um arquivo de imagem.",
    }),
  attachments: z.array(z.file()),
})

export type NewPostFormValues = z.infer<typeof newPostSchema>
