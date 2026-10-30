import { zodResolver } from "@hookform/resolvers/zod"
import { Newspaper } from "lucide-react"
import { useForm } from "react-hook-form"
import { Link } from "react-router"
import { bethels } from "@/features/bethels/data"
import { Button } from "@/shared/components/button"
import { Card, CardContent, CardHeader } from "@/shared/components/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/form"
import { Input } from "@/shared/components/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/select"
import { Separator } from "@/shared/components/separator"
import { Textarea } from "@/shared/components/textarea"
import { Back } from "@/shared/components/ui/Back"
import { FileDropzone } from "@/shared/components/ui/FileDropzone"
import { newPostSchema, type NewPostFormValues } from "../schemas"

export function NewPostPage() {
  const form = useForm<NewPostFormValues>({
    resolver: zodResolver(newPostSchema),
    defaultValues: {
      title: "",
      summary: "",
      bethelId: "",
      category: "",
      publishedAt: "",
      image: "",
      attachments: [],
    },
  })

  function handleSubmit() {}

  return (
    <section aria-labelledby="new-post-title" className="w-full max-w-[1280px]">
      <Back />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} noValidate>
          <Card className="w-full rounded-lg border-border shadow-sm">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Newspaper aria-hidden="true" className="size-5" />
                </div>
                <div>
                  <h1
                    id="new-post-title"
                    className="font-display text-lg font-bold leading-tight tracking-[-0.02em]"
                  >
                    Criar postagem
                  </h1>
                  <p className="text-md text-muted-foreground">
                    Informe os dados da nova publicação.
                  </p>
                </div>
              </div>
            </CardHeader>

            <Separator />

            <CardContent className="space-y-4 p-4 sm:p-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md">
                      Título <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o título da postagem"
                        className="h-11 bg-card shadow-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="summary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md">
                      Descrição <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descreva a publicação"
                        className="min-h-32 bg-card shadow-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-4 sm:flex-row">
                <FormField
                  control={form.control}
                  name="bethelId"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-md">
                        Bethel <span className="text-destructive">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-11 bg-card shadow-none">
                            <SelectValue placeholder="Selecione um Bethel" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {bethels.map((bethel) => (
                            <SelectItem
                              key={bethel.id}
                              value={String(bethel.id)}
                            >
                              {bethel.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-md">
                        Categoria <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex.: Atividade"
                          className="h-11 bg-card shadow-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <FormField
                  control={form.control}
                  name="publishedAt"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-md">
                        Data da publicação{" "}
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          className="h-11 bg-card shadow-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-md">
                        URL da imagem (opcional)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="https://exemplo.com/imagem.jpg"
                          className="h-11 bg-card shadow-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="attachments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md">Anexos (opcional)</FormLabel>
                    <FormControl>
                      <FileDropzone
                        files={field.value}
                        onFilesChange={field.onChange}
                        name={field.name}
                        ref={field.ref}
                        onBlur={field.onBlur}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <Separator />

            <div className="flex flex-col-reverse justify-end gap-2 p-4 sm:flex-row sm:gap-4 sm:p-6">
              <Button asChild variant="outline" className="h-11 px-5">
                <Link to="/postagens">Cancelar</Link>
              </Button>
              <Button type="submit" className="h-11 px-5">
                Cadastrar postagem
              </Button>
            </div>
          </Card>
        </form>
      </Form>
    </section>
  )
}
