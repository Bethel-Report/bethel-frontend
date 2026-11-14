import { Checkbox } from "@/shared/components/checkbox"
import { Brand } from "@/shared/components/brand"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/form"
import { Button } from "@/shared/components/button"
import { Input } from "@/shared/components/input"
import { useAdmissionForm } from "../hooks/useAdmissionForm"
import { useAuth } from "../hooks/useAuth"
import { Label } from "@/shared/components/label"

export function AdmissionPage() {
  const { logout } = useAuth()
  const { form, status, message, submit, retryProfile } = useAdmissionForm()

  const isBusy = status === "submitting" || status === "checking"
  const canCheckProfile = status === "saved" || status === "uncertain"

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <section className="w-full max-w-96 space-y-6">
        <header className="space-y-6">
          <Brand />
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Concluir cadastro</h1>
            <p className="text-muted-foreground">
              Conclua seu cadastro para acessar o sistema.
            </p>
          </div>
        </header>

        <Form {...form}>
          <form
            className="space-y-6"
            noValidate
            onSubmit={(event) => void form.handleSubmit(submit)(event)}
          >
            <fieldset className="space-y-4" disabled={status !== "editing"}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md">Nome</FormLabel>
                    <FormControl>
                      <Input
                        className="h-11 px-3 py-1 text-base"
                        placeholder="John Doe"
                        autoComplete="name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="birthday"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md">
                      Data de nascimento
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-11 px-3 py-1 text-base"
                        type="date"
                        autoComplete="bday"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md">Cidade</FormLabel>
                    <FormControl>
                      <Input
                        className="h-11 px-3 py-1 text-base"
                        placeholder="Ex.: Pau dos Ferros"
                        autoComplete="address-level2"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md">Endereço</FormLabel>
                    <FormControl>
                      <Input
                        className="h-11 px-3 py-1 text-base"
                        autoComplete="street-address"
                        placeholder="Ex.: Rua 13 de Maio, 173"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Label className="text-md">Tipos do perfil</Label>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="volunteer"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={(checked) =>
                              field.onChange(checked === true)
                            }
                            onBlur={field.onBlur}
                            name={field.name}
                            ref={field.ref}
                            disabled={status !== "editing"}
                          />
                        </FormControl>
                        <FormLabel className="text-md">Voluntária</FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="masonicRelationship"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={(checked) =>
                              field.onChange(checked === true)
                            }
                            onBlur={field.onBlur}
                            name={field.name}
                            ref={field.ref}
                            disabled={status !== "editing"}
                          />
                        </FormControl>
                        <FormLabel className="text-md">
                          Vínculo maçônico
                        </FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="member"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={(checked) =>
                              field.onChange(checked === true)
                            }
                            onBlur={field.onBlur}
                            name={field.name}
                            ref={field.ref}
                            disabled={status !== "editing"}
                          />
                        </FormControl>
                        <FormLabel className="text-md">Membro</FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sponsorship"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={(checked) =>
                              field.onChange(checked === true)
                            }
                            onBlur={field.onBlur}
                            name={field.name}
                            ref={field.ref}
                            disabled={status !== "editing"}
                          />
                        </FormControl>
                        <FormLabel className="text-md">Patrocínio</FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </fieldset>

            {message && <p role="alert">{message}</p>}

            <div className="space-y-4">
              <Button
                className="w-full h-fit py-4"
                disabled={status !== "editing"}
                type="submit"
              >
                {isBusy ? "Aguarde…" : "Concluir cadastro"}
              </Button>

              {canCheckProfile && (
                <Button
                  className="w-full h-fit py-4"
                  type="button"
                  variant="outline"
                  onClick={() => void retryProfile()}
                >
                  {status === "saved" ? "Continuar" : "Verificar resultado"}
                </Button>
              )}

              <Button
                className="w-full h-fit py-4"
                type="button"
                variant="outline"
                onClick={() => void logout()}
              >
                Sair / trocar conta
              </Button>
            </div>
          </form>
        </Form>
      </section>
    </main>
  )
}
