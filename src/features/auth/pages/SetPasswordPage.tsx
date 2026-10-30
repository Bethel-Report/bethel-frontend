import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  setPasswordSchema,
  type SetPasswordFormValues,
} from "@/features/auth/schemas"
import { Brand } from "@/shared/components/brand"
import { Button } from "@/shared/components/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/form"
import { Input } from "@/shared/components/input"

export function SetPasswordPage() {
  const form = useForm<SetPasswordFormValues>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  })

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <section className="w-full max-w-96" aria-labelledby="set-password-title">
        <Brand />

        <h1
          id="set-password-title"
          className="mt-10 font-display text-[30px] leading-9 font-bold tracking-tight"
        >
          Definir senha
        </h1>
        <p className="mt-2 text-md text-muted-foreground">
          Digite e confirme a senha que deseja usar.
        </p>

        <Form {...form}>
          <form
            className="mt-9 flex flex-col gap-5"
            noValidate
            onSubmit={form.handleSubmit(() => {
              form.setError("root", {
                message: "A definição de senha ainda não está disponível.",
              })
            })}
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="new-password"
                      className="h-12 text-lg"
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Confirmar senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="new-password"
                      className="h-12 text-lg"
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.formState.errors.root?.message && (
              <p role="alert" className="text-sm text-destructive">
                {form.formState.errors.root.message}
              </p>
            )}

            <Button type="submit" className="h-12 w-full text-lg font-normal">
              Definir senha
            </Button>
          </form>
        </Form>
      </section>
    </main>
  )
}
