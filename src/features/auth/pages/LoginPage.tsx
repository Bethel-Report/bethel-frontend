import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { loginSchema, type LoginFormValues } from "@/features/auth/schemas"
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

export function LoginPage() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  return (
    <main className="flex min-h-screen justify-center items-center px-6 py-12">
      <section className="w-full max-w-96" aria-labelledby="login-title">
        <Brand />

        <h1
          id="login-title"
          className="mt-10 font-display text-[30px] leading-9 font-bold tracking-tight"
        >
          Bem-vinda ao
          <br />
          <span className="text-[36px] text-primary">Bethel Report</span>
        </h1>

        <Form {...form}>
          <form
            className="mt-9 flex flex-col gap-5"
            noValidate
            onSubmit={form.handleSubmit(() => {
              form.setError("root", {
                message:
                  "O login por e-mail e senha ainda não está disponível.",
              })
            })}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">E-mail</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      autoComplete="email"
                      placeholder="johndoe@email.com"
                      className="h-12 text-lg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="current-password"
                      placeholder="********"
                      className="h-12 text-lg"
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
              Entrar
            </Button>
          </form>
        </Form>

        <div className="mt-8 flex flex-col gap-3">
          <Button
            type="button"
            variant="outline"
            className="h-12 w-full text-md font-normal"
            onClick={() => {}}
          >
            <span
              aria-hidden="true"
              className="font-sans text-xl font-bold leading-none"
            >
              G
            </span>
            Entrar com Google
          </Button>
        </div>
      </section>
    </main>
  )
}
