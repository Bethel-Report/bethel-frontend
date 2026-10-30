import { ArrowRight, Newspaper } from "lucide-react"
import { Link } from "react-router"
import { Badge } from "@/shared/components/badge"
import { Button } from "@/shared/components/button"
import { Card, CardContent, CardTitle } from "@/shared/components/card"
import type { Bethel, BethelPost } from "@/features/bethels/data"
import { formatPostDate } from "../formatPostDate"

type PostCardProps = {
  post: BethelPost
  bethel: Bethel
}

export function PostCard({ post, bethel }: PostCardProps) {
  return (
    <Card className="relative flex h-full flex-col gap-0 overflow-hidden rounded-lg border-border shadow-sm transition-shadow hover:shadow-md">
      <div className="flex h-44 items-center justify-center bg-secondary text-primary">
        {post.image ? (
          <img
            src={post.image}
            alt={`Imagem da postagem: ${post.title}`}
            className="size-full object-cover"
            loading="lazy"
          />
        ) : (
          <Newspaper aria-hidden="true" className="size-9" />
        )}
      </div>
      <CardContent className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
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
        <CardTitle className="mt-4 font-display text-lg leading-snug">
          <Link
            to={`/postagens/${post.id}`}
            className="rounded-sm outline-none after:absolute after:inset-0 focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={`Ver postagem: ${post.title}`}
          >
            {post.title}
          </Link>
        </CardTitle>
        <p className="mt-2 flex-1 text-md leading-relaxed text-muted-foreground">
          {post.summary}
        </p>
        <p className="mt-5 border-t border-border pt-4 text-sm text-muted-foreground">
          {bethel.name} · {bethel.city}
        </p>
        <div className="z-10 mt-4 flex justify-end">
          <Button
            asChild
            variant="ghost"
            className="w-fit p-0 text-muted-foreground hover:bg-transparent hover:text-primary"
          >
            <Link to={`/postagens/${post.id}`}>
              Ver postagem
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
