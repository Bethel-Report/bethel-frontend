import { useState, type ReactNode } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import {
  Bold,
  ChevronRight,
  Code2,
  Info,
  Italic,
  MoreHorizontal,
  Search,
} from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/shared/components/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/components/alert-dialog"
import { AspectRatio } from "@/shared/components/aspect-ratio"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/avatar"
import { Badge } from "@/shared/components/badge"
import { Brand } from "@/shared/components/brand"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/components/breadcrumb"
import { Button } from "@/shared/components/button"
import { Calendar } from "@/shared/components/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/components/carousel"
import { Checkbox } from "@/shared/components/checkbox"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/components/collapsible"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/shared/components/context-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/components/drawer"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/dropdown-menu"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/form"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/shared/components/hover-card"
import { Input } from "@/shared/components/input"
import { Label } from "@/shared/components/label"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/shared/components/menubar"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/shared/components/navigation-menu"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/components/pagination"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/popover"
import { Progress } from "@/shared/components/progress"
import { RadioGroup, RadioGroupItem } from "@/shared/components/radio-group"
import { ScrollArea } from "@/shared/components/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/select"
import { Separator } from "@/shared/components/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/sheet"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/shared/components/sidebar"
import { Skeleton } from "@/shared/components/skeleton"
import { Slider } from "@/shared/components/slider"
import { Toaster } from "@/shared/components/sonner"
import { Switch } from "@/shared/components/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/tabs"
import { Textarea } from "@/shared/components/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/shared/components/toggle-group"
import { Toggle } from "@/shared/components/toggle"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/tooltip"

type Example = {
  name: string
  description: string
  preview: ReactNode
  usage: string
}

type Category = {
  id: string
  title: string
  description: string
  examples: Example[]
}

function ExampleCard({ name, description, preview, usage }: Example) {
  return (
    <article
      id={name.toLowerCase().replaceAll(" ", "-")}
      className="min-w-0 scroll-mt-6 rounded-xl border border-border bg-card shadow-sm"
    >
      <div className="border-b border-border px-5 py-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base font-semibold">{name}</h3>
          <code className="shrink-0 rounded bg-secondary px-2 py-1 text-xs text-secondary-foreground">
            {name.toLowerCase().replaceAll(" ", "-")}.tsx
          </code>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex min-h-28 items-center overflow-x-auto px-5 py-5">
        {preview}
      </div>
      <div className="border-t border-border bg-muted/50 px-5 py-3">
        <code className="block overflow-x-auto whitespace-pre text-xs text-muted-foreground">
          {usage}
        </code>
      </div>
    </article>
  )
}

function FormExample() {
  const form = useForm<{ email: string }>({ defaultValues: { email: "" } })

  return (
    <Form {...form}>
      <form
        className="w-full max-w-xs space-y-3"
        onSubmit={form.handleSubmit(({ email }) =>
          toast.success(`E-mail salvo: ${email}`),
        )}
      >
        <FormField
          control={form.control}
          name="email"
          rules={{
            required: "Informe um e-mail.",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Informe um e-mail válido.",
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail de contato</FormLabel>
              <FormControl>
                <Input type="email" placeholder="nome@exemplo.com" {...field} />
              </FormControl>
              <FormDescription>
                Usado para receber notificações.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="sm">
          Salvar
        </Button>
      </form>
    </Form>
  )
}

export function ComponentsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [sliderValue, setSliderValue] = useState([40])
  const [page, setPage] = useState(1)
  const [progress, setProgress] = useState(65)

  const categories: Category[] = [
    {
      id: "fundamentos",
      title: "Fundamentos e exibição",
      description:
        "Peças para identidade visual, estados e organização de conteúdo.",
      examples: [
        {
          name: "Brand",
          description:
            "Identidade do produto para cabeçalhos e áreas de navegação.",
          preview: <Brand />,
          usage: "<Brand />",
        },
        {
          name: "Button",
          description:
            "Ação principal, secundária ou discreta em formulários e painéis.",
          preview: (
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => toast.success("Ação executada")}>
                Primário
              </Button>
              <Button variant="secondary">Secundário</Button>
              <Button variant="outline">Contorno</Button>
              <Button variant="ghost">Discreto</Button>
            </div>
          ),
          usage: '<Button variant="secondary">Secundário</Button>',
        },
        {
          name: "Badge",
          description: "Marca status e categorias em listas ou cartões.",
          preview: (
            <div className="flex flex-wrap gap-2">
              <Badge>Ativo</Badge>
              <Badge variant="secondary">Pendente</Badge>
              <Badge variant="outline">Rascunho</Badge>
            </div>
          ),
          usage: '<Badge variant="secondary">Pendente</Badge>',
        },
        {
          name: "Card",
          description:
            "Agrupa informações relacionadas com título, conteúdo e rodapé.",
          preview: (
            <Card className="w-full max-w-xs">
              <CardHeader>
                <CardTitle>Relatório anual</CardTitle>
                <CardDescription>Resumo do período</CardDescription>
              </CardHeader>
              <CardContent>12 formulários enviados</CardContent>
              <CardFooter>
                <Badge variant="secondary">Em análise</Badge>
              </CardFooter>
            </Card>
          ),
          usage:
            "<Card><CardHeader>…</CardHeader><CardContent>…</CardContent></Card>",
        },
        {
          name: "Alert",
          description: "Exibe mensagens importantes dentro da página.",
          preview: (
            <Alert className="max-w-sm">
              <Info className="h-4 w-4" />
              <AlertTitle>Atenção</AlertTitle>
              <AlertDescription>
                Confira os dados antes de enviar.
              </AlertDescription>
            </Alert>
          ),
          usage:
            "<Alert><AlertTitle>Atenção</AlertTitle><AlertDescription>…</AlertDescription></Alert>",
        },
        {
          name: "Avatar",
          description:
            "Representa uma pessoa, com iniciais quando a imagem não está disponível.",
          preview: (
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/avatar-inexistente.png" alt="" />
                <AvatarFallback>GC</AvatarFallback>
              </Avatar>
              <span>Grande Conselho</span>
            </div>
          ),
          usage: "<Avatar><AvatarFallback>GC</AvatarFallback></Avatar>",
        },
        {
          name: "Aspect Ratio",
          description: "Mantém a proporção de capas, imagens e vídeos.",
          preview: (
            <div className="w-56">
              <AspectRatio ratio={16 / 9}>
                <div className="grid h-full place-items-center rounded-lg bg-secondary text-secondary-foreground">
                  Capa 16:9
                </div>
              </AspectRatio>
            </div>
          ),
          usage: "<AspectRatio ratio={16 / 9}>…</AspectRatio>",
        },
        {
          name: "Progress",
          description: "Mostra o avanço de uma tarefa com valor percentual.",
          preview: (
            <div className="w-full max-w-xs space-y-3">
              <Progress value={progress} aria-label="Progresso do cadastro" />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{progress}% concluído</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    setProgress((value) => (value >= 100 ? 0 : value + 10))
                  }
                >
                  Avançar
                </Button>
              </div>
            </div>
          ),
          usage: "<Progress value={65} />",
        },
        {
          name: "Separator",
          description: "Cria uma divisão visual entre blocos de conteúdo.",
          preview: (
            <div className="w-full max-w-xs">
              <div>Dados gerais</div>
              <Separator className="my-3" />
              <div>Permissões</div>
            </div>
          ),
          usage: "<Separator />",
        },
        {
          name: "Skeleton",
          description: "Reserva espaço enquanto dados estão carregando.",
          preview: (
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          ),
          usage: '<Skeleton className="h-3 w-28" />',
        },
      ],
    },
    {
      id: "formularios",
      title: "Formulários e seleção",
      description:
        "Entradas de dados com rótulos, estados e escolhas acessíveis.",
      examples: [
        {
          name: "Label",
          description: "Associa texto descritivo a um campo de formulário.",
          preview: (
            <div className="w-full max-w-xs space-y-2">
              <Label htmlFor="demo-label">Nome do Bethel</Label>
              <Input id="demo-label" placeholder="Digite o nome" />
            </div>
          ),
          usage: '<Label htmlFor="nome">Nome</Label>',
        },
        {
          name: "Input",
          description:
            "Recebe textos curtos, busca, e-mail e outros valores de uma linha.",
          preview: (
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                aria-label="Buscar membros"
                className="pl-9"
                placeholder="Buscar membros"
              />
            </div>
          ),
          usage: '<Input type="search" placeholder="Buscar membros" />',
        },
        {
          name: "Textarea",
          description: "Recebe descrições e observações em várias linhas.",
          preview: (
            <Textarea
              className="max-w-xs"
              aria-label="Observações"
              placeholder="Escreva uma observação…"
            />
          ),
          usage: '<Textarea placeholder="Observações" />',
        },
        {
          name: "Checkbox",
          description: "Marca uma ou mais opções independentes.",
          preview: (
            <div className="flex items-center gap-2">
              <Checkbox id="demo-checkbox" defaultChecked />
              <Label htmlFor="demo-checkbox">Receber atualizações</Label>
            </div>
          ),
          usage: '<Checkbox id="atualizacoes" />',
        },
        {
          name: "Switch",
          description: "Liga ou desliga uma preferência imediatamente.",
          preview: (
            <div className="flex items-center gap-2">
              <Switch id="demo-switch" defaultChecked />
              <Label htmlFor="demo-switch">Notificações</Label>
            </div>
          ),
          usage: '<Switch id="notificacoes" defaultChecked />',
        },
        {
          name: "Radio Group",
          description: "Escolhe uma opção entre alternativas exclusivas.",
          preview: (
            <RadioGroup defaultValue="mensal" className="flex gap-5">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="mensal" id="mensal" />
                <Label htmlFor="mensal">Mensal</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="anual" id="anual" />
                <Label htmlFor="anual">Anual</Label>
              </div>
            </RadioGroup>
          ),
          usage:
            '<RadioGroup defaultValue="mensal"><RadioGroupItem value="mensal" /></RadioGroup>',
        },
        {
          name: "Select",
          description: "Escolhe um valor em uma lista compacta.",
          preview: (
            <Select defaultValue="ativo">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ativo">Ativo</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="inativo">Inativo</SelectItem>
              </SelectContent>
            </Select>
          ),
          usage:
            "<Select><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>…</SelectContent></Select>",
        },
        {
          name: "Slider",
          description: "Ajusta um valor em um intervalo contínuo.",
          preview: (
            <div className="w-full max-w-xs space-y-3">
              <Slider
                value={sliderValue}
                onValueChange={setSliderValue}
                max={100}
                step={5}
                aria-label="Meta percentual"
              />
              <span className="text-xs text-muted-foreground">
                Meta: {sliderValue[0]}%
              </span>
            </div>
          ),
          usage: "<Slider defaultValue={[40]} max={100} step={5} />",
        },
        {
          name: "Calendar",
          description: "Seleciona uma data em um calendário mensal.",
          preview: (
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          ),
          usage:
            '<Calendar mode="single" selected={date} onSelect={setDate} />',
        },
        {
          name: "Form",
          description:
            "Integra campos, validação e mensagens ao React Hook Form.",
          preview: <FormExample />,
          usage:
            '<Form {...form}><form><FormField name="email" control={form.control} render={…} /></form></Form>',
        },
        {
          name: "Toggle",
          description: "Alterna uma opção de formatação ou visualização.",
          preview: (
            <Toggle variant="outline" aria-label="Negrito">
              <Bold />
            </Toggle>
          ),
          usage: '<Toggle aria-label="Negrito"><Bold /></Toggle>',
        },
        {
          name: "Toggle Group",
          description:
            "Agrupa opções de alternância em uma escolha única ou múltipla.",
          preview: (
            <ToggleGroup
              type="multiple"
              variant="outline"
              aria-label="Formatação"
            >
              <ToggleGroupItem value="bold" aria-label="Negrito">
                <Bold />
              </ToggleGroupItem>
              <ToggleGroupItem value="italic" aria-label="Itálico">
                <Italic />
              </ToggleGroupItem>
            </ToggleGroup>
          ),
          usage:
            '<ToggleGroup type="multiple"><ToggleGroupItem value="bold">…</ToggleGroupItem></ToggleGroup>',
        },
      ],
    },
    {
      id: "navegacao",
      title: "Navegação",
      description: "Caminhos, menus e troca de visualizações.",
      examples: [
        {
          name: "Breadcrumb",
          description: "Mostra a posição atual em uma hierarquia de páginas.",
          preview: (
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Início</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Componentes</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          ),
          usage: "<Breadcrumb><BreadcrumbList>…</BreadcrumbList></Breadcrumb>",
        },
        {
          name: "Tabs",
          description: "Alterna painéis relacionados sem sair da página.",
          preview: (
            <Tabs defaultValue="resumo" className="w-full max-w-xs">
              <TabsList>
                <TabsTrigger value="resumo">Resumo</TabsTrigger>
                <TabsTrigger value="detalhes">Detalhes</TabsTrigger>
              </TabsList>
              <TabsContent value="resumo" className="pt-2">
                Visão resumida dos dados.
              </TabsContent>
              <TabsContent value="detalhes" className="pt-2">
                Dados detalhados do registro.
              </TabsContent>
            </Tabs>
          ),
          usage:
            '<Tabs defaultValue="resumo"><TabsList>…</TabsList><TabsContent value="resumo">…</TabsContent></Tabs>',
        },
        {
          name: "Pagination",
          description: "Navega entre páginas de uma lista de resultados.",
          preview: (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#pagination"
                    onClick={(event) => {
                      event.preventDefault()
                      setPage((value) => Math.max(1, value - 1))
                    }}
                  />
                </PaginationItem>
                {[1, 2, 3].map((value) => (
                  <PaginationItem key={value}>
                    <PaginationLink
                      href="#pagination"
                      isActive={page === value}
                      onClick={(event) => {
                        event.preventDefault()
                        setPage(value)
                      }}
                    >
                      {value}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#pagination"
                    onClick={(event) => {
                      event.preventDefault()
                      setPage((value) => Math.min(3, value + 1))
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          ),
          usage:
            "<Pagination><PaginationContent><PaginationItem>…</PaginationItem></PaginationContent></Pagination>",
        },
        {
          name: "Navigation Menu",
          description:
            "Organiza destinos e grupos de links em um menu superior.",
          preview: (
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Explorar</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-48 gap-2 p-3">
                      <NavigationMenuLink href="/">
                        Visão geral
                      </NavigationMenuLink>
                      <NavigationMenuLink href="/componentes">
                        Componentes
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          ),
          usage:
            "<NavigationMenu><NavigationMenuList><NavigationMenuItem>…</NavigationMenuItem></NavigationMenuList></NavigationMenu>",
        },
        {
          name: "Menubar",
          description: "Menu de comandos para ações frequentes de uma área.",
          preview: (
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>Arquivo</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem onSelect={() => toast.info("Novo relatório")}>
                    Novo relatório
                  </MenubarItem>
                  <MenubarItem onSelect={() => toast.info("Exportar")}>
                    Exportar
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger>Ajuda</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem onSelect={() => toast.info("Central de ajuda")}>
                    Central de ajuda
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          ),
          usage:
            "<Menubar><MenubarMenu><MenubarTrigger>Arquivo</MenubarTrigger>…</MenubarMenu></Menubar>",
        },
        {
          name: "Sidebar",
          description:
            "Navegação lateral composta com provedor, grupos e itens.",
          preview: (
            <div className="h-40 w-full max-w-sm overflow-hidden rounded-lg border">
              <SidebarProvider className="!min-h-0 h-full">
                <Sidebar collapsible="none" className="!w-44 border-r bg-card">
                  <SidebarHeader className="font-semibold">
                    Área interna
                  </SidebarHeader>
                  <SidebarContent>
                    <SidebarGroup>
                      <SidebarGroupLabel>Principal</SidebarGroupLabel>
                      <SidebarGroupContent>
                        <SidebarMenu>
                          <SidebarMenuItem>
                            <SidebarMenuButton isActive>
                              Painel
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                          <SidebarMenuItem>
                            <SidebarMenuButton>Relatórios</SidebarMenuButton>
                          </SidebarMenuItem>
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </SidebarGroup>
                  </SidebarContent>
                </Sidebar>
                <SidebarInset className="p-4 text-sm text-muted-foreground">
                  Conteúdo
                </SidebarInset>
              </SidebarProvider>
            </div>
          ),
          usage:
            "<SidebarProvider><Sidebar><SidebarContent>…</SidebarContent></Sidebar><SidebarInset>…</SidebarInset></SidebarProvider>",
        },
      ],
    },
    {
      id: "conteudo",
      title: "Conteúdo e dados",
      description:
        "Componentes para mostrar informação detalhada em pouco espaço.",
      examples: [
        {
          name: "Accordion",
          description: "Expande perguntas e respostas em seções independentes.",
          preview: (
            <Accordion type="single" collapsible className="w-full max-w-sm">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  Quem pode enviar relatórios?
                </AccordionTrigger>
                <AccordionContent>
                  Usuários com permissão de gestão.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ),
          usage:
            '<Accordion type="single" collapsible><AccordionItem value="item-1">…</AccordionItem></Accordion>',
        },
        {
          name: "Collapsible",
          description: "Revela detalhes extras sob demanda.",
          preview: (
            <Collapsible className="w-full max-w-sm">
              <CollapsibleTrigger asChild>
                <Button variant="outline" size="sm">
                  Mostrar detalhes
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-3 text-sm text-muted-foreground">
                Última atualização em outubro de 2026.
              </CollapsibleContent>
            </Collapsible>
          ),
          usage:
            "<Collapsible><CollapsibleTrigger>Mostrar</CollapsibleTrigger><CollapsibleContent>…</CollapsibleContent></Collapsible>",
        },
        {
          name: "Carousel",
          description: "Percorre cartões ou imagens horizontalmente.",
          preview: (
            <Carousel className="mx-10 w-full max-w-52">
              <CarouselContent>
                {[1, 2, 3].map((value) => (
                  <CarouselItem key={value}>
                    <div className="grid h-24 place-items-center rounded-lg bg-secondary font-semibold text-secondary-foreground">
                      Destaque {value}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          ),
          usage:
            "<Carousel><CarouselContent><CarouselItem>…</CarouselItem></CarouselContent><CarouselNext /></Carousel>",
        },
        {
          name: "Scroll Area",
          description: "Limita uma lista longa a uma área com rolagem própria.",
          preview: (
            <ScrollArea className="h-32 w-full max-w-xs rounded-md border">
              <div className="p-3">
                {Array.from({ length: 10 }, (_, index) => (
                  <div key={index} className="border-b py-1.5 text-sm">
                    Documento {index + 1}
                  </div>
                ))}
              </div>
            </ScrollArea>
          ),
          usage: '<ScrollArea className="h-32">…</ScrollArea>',
        },
        {
          name: "Table",
          description:
            "Apresenta dados tabulares com cabeçalhos e linhas semânticas.",
          preview: (
            <div className="w-full overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bethel</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Bethel 01</TableCell>
                    <TableCell>Ativo</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Bethel 02</TableCell>
                    <TableCell>Pendente</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          ),
          usage:
            "<Table><TableHeader>…</TableHeader><TableBody>…</TableBody></Table>",
        },
      ],
    },
    {
      id: "sobreposicoes",
      title: "Menus e sobreposições",
      description: "Ajuda contextual, ações flutuantes e confirmações.",
      examples: [
        {
          name: "Tooltip",
          description:
            "Explica brevemente um controle ao passar o mouse ou focar.",
          preview: (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="Mais informações"
                  >
                    <Info />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Mais informações</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ),
          usage:
            "<TooltipProvider><Tooltip><TooltipTrigger>…</TooltipTrigger><TooltipContent>Ajuda</TooltipContent></Tooltip></TooltipProvider>",
        },
        {
          name: "Hover Card",
          description: "Mostra uma prévia rica ao passar o mouse em um link.",
          preview: (
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="link">Sobre o conselho</Button>
              </HoverCardTrigger>
              <HoverCardContent>
                <strong>Grande Conselho</strong>
                <p className="mt-1 text-sm text-muted-foreground">
                  Responsável pela gestão geral.
                </p>
              </HoverCardContent>
            </HoverCard>
          ),
          usage:
            "<HoverCard><HoverCardTrigger>Sobre</HoverCardTrigger><HoverCardContent>…</HoverCardContent></HoverCard>",
        },
        {
          name: "Popover",
          description: "Abre conteúdo interativo junto a um botão.",
          preview: (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Filtrar período</Button>
              </PopoverTrigger>
              <PopoverContent className="w-48">
                <Label htmlFor="demo-year">Ano</Label>
                <Input
                  id="demo-year"
                  type="number"
                  defaultValue="2026"
                  className="mt-2"
                />
              </PopoverContent>
            </Popover>
          ),
          usage:
            "<Popover><PopoverTrigger>Filtrar</PopoverTrigger><PopoverContent>…</PopoverContent></Popover>",
        },
        {
          name: "Dropdown Menu",
          description: "Exibe ações associadas a um item ou botão.",
          preview: (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Ações <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Relatório</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => toast.info("Abrir relatório")}
                >
                  Abrir
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => toast.info("Compartilhar relatório")}
                >
                  Compartilhar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ),
          usage:
            "<DropdownMenu><DropdownMenuTrigger>…</DropdownMenuTrigger><DropdownMenuContent>…</DropdownMenuContent></DropdownMenu>",
        },
        {
          name: "Context Menu",
          description:
            "Oferece ações ao clicar com o botão direito em uma área.",
          preview: (
            <ContextMenu>
              <ContextMenuTrigger className="grid h-20 w-full max-w-xs place-items-center rounded-lg border border-dashed text-sm text-muted-foreground">
                Clique com o botão direito aqui
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem onSelect={() => toast.info("Copiado")}>
                  Copiar
                </ContextMenuItem>
                <ContextMenuItem onSelect={() => toast.info("Detalhes")}>
                  Ver detalhes
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          ),
          usage:
            "<ContextMenu><ContextMenuTrigger>Área</ContextMenuTrigger><ContextMenuContent>…</ContextMenuContent></ContextMenu>",
        },
        {
          name: "Dialog",
          description: "Abre um formulário ou conteúdo em uma janela modal.",
          preview: (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Abrir diálogo</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Novo registro</DialogTitle>
                  <DialogDescription>
                    Preencha os dados do novo registro.
                  </DialogDescription>
                </DialogHeader>
                <Input aria-label="Nome do registro" placeholder="Nome" />
                <DialogFooter>
                  <Button onClick={() => toast.success("Registro de exemplo")}>
                    Salvar
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ),
          usage:
            "<Dialog><DialogTrigger>Adicionar</DialogTrigger><DialogContent>…</DialogContent></Dialog>",
        },
        {
          name: "Alert Dialog",
          description: "Pede confirmação antes de uma ação importante.",
          preview: (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">Confirmar ação</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Enviar relatório?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Confira as informações antes de continuar.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => toast.success("Relatório enviado")}
                  >
                    Confirmar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ),
          usage:
            "<AlertDialog><AlertDialogTrigger>Enviar</AlertDialogTrigger><AlertDialogContent>…</AlertDialogContent></AlertDialog>",
        },
        {
          name: "Sheet",
          description:
            "Mostra um painel lateral para detalhes e tarefas rápidas.",
          preview: (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Abrir painel</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Detalhes do membro</SheetTitle>
                  <SheetDescription>
                    Informações rápidas sem sair da página.
                  </SheetDescription>
                </SheetHeader>
                <p className="mt-6 text-sm">
                  Nome, função e contato podem aparecer aqui.
                </p>
              </SheetContent>
            </Sheet>
          ),
          usage:
            '<Sheet><SheetTrigger>Detalhes</SheetTrigger><SheetContent side="right">…</SheetContent></Sheet>',
        },
        {
          name: "Drawer",
          description:
            "Abre um painel pela borda inferior, útil para ações rápidas.",
          preview: (
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline">Abrir gaveta</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Filtros</DrawerTitle>
                  <DrawerDescription>
                    Escolha como visualizar os resultados.
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button>Aplicar</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          ),
          usage:
            "<Drawer><DrawerTrigger>Filtros</DrawerTrigger><DrawerContent>…</DrawerContent></Drawer>",
        },
        {
          name: "Sonner",
          description: "Mostra uma confirmação temporária após uma ação.",
          preview: (
            <Button
              variant="secondary"
              onClick={() => toast.success("Alterações salvas com sucesso")}
            >
              Mostrar notificação
            </Button>
          ),
          usage: 'toast.success("Alterações salvas") + <Toaster />',
        },
      ],
    },
  ]

  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-10">
      <header className="rounded-2xl border border-border bg-card px-6 py-8 sm:px-8">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary">
          <Code2 className="h-4 w-4" /> Referência visual
        </div>
        <h1 className="text-2xl font-bold sm:text-3xl">
          Componentes do projeto
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Exemplos interativos dos componentes em{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
            src/shared/components
          </code>
          . Use os exemplos para conhecer os estados e copiar a estrutura básica
          de cada componente.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Badge variant="secondary">
            {categories.reduce(
              (total, category) => total + category.examples.length,
              0,
            )}{" "}
            componentes
          </Badge>
          <span className="text-xs text-muted-foreground">
            Clique, selecione ou passe o mouse nos exemplos para testar.
          </span>
        </div>
      </header>

      <nav
        aria-label="Categorias de componentes"
        className="flex flex-wrap gap-2"
      >
        {categories.map((category) => (
          <a
            key={category.id}
            href={`#${category.id}`}
            className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-2 text-sm font-medium hover:border-primary hover:text-primary"
          >
            {category.title}
            <ChevronRight className="h-3.5 w-3.5" />
          </a>
        ))}
      </nav>

      {categories.map((category) => (
        <section
          key={category.id}
          id={category.id}
          className="scroll-mt-6 space-y-4"
          aria-labelledby={`${category.id}-title`}
        >
          <div>
            <h2 id={`${category.id}-title`} className="text-xl font-bold">
              {category.title}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {category.description}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {category.examples.map((example) => (
              <ExampleCard key={example.name} {...example} />
            ))}
          </div>
        </section>
      ))}
      <Toaster richColors position="bottom-right" />
    </div>
  )
}
