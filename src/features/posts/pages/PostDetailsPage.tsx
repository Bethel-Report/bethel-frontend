import { Landmark, Newspaper, Pencil, Trash } from "lucide-react"
import { Link, useParams } from "react-router"
import { bethelPosts, bethels } from "@/features/bethels/data"
import { Badge } from "@/shared/components/badge"
import { Button } from "@/shared/components/button"
import { Card, CardContent } from "@/shared/components/card"
import { Separator } from "@/shared/components/separator"
import { Back } from "@/shared/components/ui/Back"
import { formatPostDate } from "../formatPostDate"

export function PostDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const post = bethelPosts.find((item) => String(item.id) === id)

  if (!post) {
    return (
      <section className="w-full max-w-[1280px]">
        <Card className="rounded-lg border-border p-6 shadow-sm">
          <h1 className="font-display text-lg font-bold">
            Postagem não encontrada
          </h1>
          <p className="mt-2 text-md text-muted-foreground">
            Não encontramos uma postagem com este identificador.
          </p>
          <Button asChild variant="outline" className="mt-5 h-11 px-5">
            <Link to="/postagens">Voltar para postagens</Link>
          </Button>
        </Card>
      </section>
    )
  }

  const bethel = bethels.find((item) => item.id === post.bethelId)

  return (
    <section
      aria-labelledby="post-details-title"
      className="w-full max-w-[1280px]"
    >
      <Back />
      <Card className="overflow-hidden rounded-lg border-border shadow-sm">
        <div className="flex h-52 items-center justify-center bg-secondary text-primary sm:h-72 lg:h-80">
          {post.image ? (
            <img
              src={post.image}
              alt={`Imagem da postagem: ${post.title}`}
              className="size-full object-cover"
            />
          ) : (
            <Newspaper aria-hidden="true" className="size-12" />
          )}
        </div>
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge className="border-0 bg-secondary px-2 py-1 text-xs uppercase text-primary shadow-none hover:bg-secondary">
              {post.category}
            </Badge>
            <time
              dateTime={post.publishedAt}
              className="text-sm text-muted-foreground"
            >
              {formatPostDate(post.publishedAt)}
            </time>
          </div>
          <h1
            id="post-details-title"
            className="mt-4 font-display text-2xl font-bold leading-tight tracking-[-0.02em] sm:text-3xl"
          >
            {post.title}
          </h1>
          <p className="mt-5 whitespace-pre-line text-lg leading-relaxed text-muted-foreground">
            {post.summary}
          </p>

          {bethel && (
            <>
              <Separator className="my-7" />
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Landmark aria-hidden="true" className="size-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Publicado por</p>
                  <Link
                    to={`/betheis/${bethel.id}`}
                    className="font-semibold text-primary hover:underline"
                  >
                    {bethel.name} · {bethel.city}, {bethel.state}
                  </Link>
                </div>
              </div>
            </>
          )}
        </CardContent>
        <Separator />
        <div className="flex flex-col-reverse flex-wrap justify-end gap-2 p-4 sm:flex-row sm:gap-4 sm:p-6">
          <Button type="button" variant="outline" className="h-11 px-5">
            <Trash aria-hidden="true" className="size-5" />
            Remover postagem
          </Button>
          <Button type="button" className="h-11 px-5">
            <Pencil aria-hidden="true" className="size-5" />
            Editar postagem
          </Button>
        </div>
      </Card>
    </section>
  )
}
