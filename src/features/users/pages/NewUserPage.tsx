import { UserRoundPlus } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link } from "react-router"
import { newUserSchema, type NewUserFormValues } from "@/features/users/schemas"
import { Button } from "@/shared/components/button"
import { Card, CardContent, CardHeader } from "@/shared/components/card"
import { Input } from "@/shared/components/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/select"
import { Separator } from "@/shared/components/separator"
import { Back } from "@/shared/components/ui/Back"

const bethels = Array.from(
  { length: 8 },
  (_, index) => `Bethel nº ${String(index + 1).padStart(2, "0")}`,
)

export function NewUserPage() {
  const form = useForm<NewUserFormValues>({
    resolver: zodResolver(newUserSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: "",
      bethel: "",
    },
  })

  function handleSubmit() {}

  return (
    <section aria-labelledby="new-user-title" className="w-full max-w-[1280px]">
      <Back />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} noValidate>
          <Card className="w-full rounded-lg border-border shadow-sm">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                  <UserRoundPlus aria-hidden="true" className="size-5" />
                </div>
                <div>
                  <h2
                    id="new-user-title"
                    className="font-display text-lg font-bold leading-tight tracking-[-0.02em]"
                  >
                    Adicionar membro
                  </h2>
                  <p className="text-md text-muted-foreground">
                    Informe os dados e o vínculo do novo membro.
                  </p>
                </div>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="space-y-4 p-4 sm:p-6">
              <div className="w-full flex">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-md">
                        Nome completo{" "}
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="name"
                          placeholder="Digite o nome completo"
                          className="h-11 bg-card shadow-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full flex gap-4 flex-col sm:flex-row">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-md">
                        E-mail <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          autoComplete="email"
                          placeholder="nome@exemplo.com"
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
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-md">Telefone</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          autoComplete="tel"
                          placeholder="(00) 00000-0000"
                          className="h-11 bg-card shadow-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full flex gap-4 flex-col sm:flex-row">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-md">
                        Perfil <span className="text-destructive">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-11 bg-card shadow-none mb-0">
                            <SelectValue placeholder="Selecione um perfil" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="conselho-bethel">
                            Conselho de Bethel
                          </SelectItem>
                          <SelectItem value="membro-bethel">
                            Membro de Bethel
                          </SelectItem>
                          <SelectItem value="grande-conselho">
                            Grande Conselho
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bethel"
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
                          <SelectTrigger className="h-11 bg-card shadow-none mb-0">
                            <SelectValue placeholder="Selecione um Bethel" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {bethels.map((bethel) => (
                            <SelectItem key={bethel} value={bethel}>
                              {bethel}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <Separator />
            <div className="flex flex-wrap justify-end gap-2 sm:gap-4 p-4 sm:p-6 flex-col-reverse sm:flex-row">
              <Button asChild variant="outline" className="h-11 px-5">
                <Link to="/membros">Cancelar</Link>
              </Button>
              <Button type="submit" className="h-11 px-5">
                Cadastrar membro
              </Button>
            </div>
          </Card>
        </form>
      </Form>
    </section>
  )
}
