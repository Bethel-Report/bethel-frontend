import { zodResolver } from "@hookform/resolvers/zod"
import { Landmark } from "lucide-react"
import { useForm } from "react-hook-form"
import { Link } from "react-router"
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
import { Back } from "@/shared/components/ui/Back"
import { newBethelSchema, type NewBethelFormValues } from "../schemas"

export function NewBethelPage() {
  const form = useForm<NewBethelFormValues>({
    resolver: zodResolver(newBethelSchema),
    defaultValues: {
      name: "",
      city: "",
      state: "",
      status: "",
    },
  })

  function handleSubmit() {}

  return (
    <section
      aria-labelledby="new-bethel-title"
      className="w-full max-w-[1280px]"
    >
      <Back />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} noValidate>
          <Card className="w-full rounded-lg border-border shadow-sm">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Landmark aria-hidden="true" className="size-5" />
                </div>
                <div>
                  <h1
                    id="new-bethel-title"
                    className="font-display text-lg font-bold leading-tight tracking-[-0.02em]"
                  >
                    Criar bethel
                  </h1>
                  <p className="text-md text-muted-foreground">
                    Informe os dados da nova unidade.
                  </p>
                </div>
              </div>
            </CardHeader>

            <Separator />

            <CardContent className="space-y-4 p-4 sm:p-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md">
                      Nome do Bethel <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex.: Bethel nº 01"
                        className="h-11 bg-card shadow-none"
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
                  name="city"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-md">
                        Cidade <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite a cidade"
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
                  name="state"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-md">
                        Estado <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex.: CE"
                          maxLength={2}
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
                name="status"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-md">
                      Situação <span className="text-destructive">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-11 bg-card shadow-none">
                          <SelectValue placeholder="Selecione a situação" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Ativo">Ativo</SelectItem>
                        <SelectItem value="Inativo">Inativo</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <Separator />

            <div className="flex flex-col-reverse justify-end gap-2 p-4 sm:flex-row sm:gap-4 sm:p-6">
              <Button asChild variant="outline" className="h-11 px-5">
                <Link to="/betheis">Cancelar</Link>
              </Button>
              <Button type="submit" className="h-11 px-5">
                Cadastrar bethel
              </Button>
            </div>
          </Card>
        </form>
      </Form>
    </section>
  )
}
