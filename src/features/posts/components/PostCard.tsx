import { Newspaper } from "lucide-react"
import { Badge } from "@/shared/components/badge"
import { Card, CardContent, CardTitle } from "@/shared/components/card"
import type { Bethel, BethelPost } from "@/features/bethels/data"

type PostCardProps = {
  post: BethelPost
  bethel: Bethel
}

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
})

export function PostCard({ post, bethel }: PostCardProps) {
  return (
    <Card className="flex h-full flex-col gap-0 overflow-hidden rounded-lg border-border shadow-sm transition-shadow hover:shadow-md">
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
            {dateFormatter.format(new Date(`${post.publishedAt}T00:00:00Z`))}
          </time>
        </div>
        <CardTitle className="mt-4 font-display text-lg leading-snug">
          {post.title}
        </CardTitle>
        <p className="mt-2 flex-1 text-md leading-relaxed text-muted-foreground">
          {post.summary}
        </p>
        <p className="mt-5 border-t border-border pt-4 text-sm text-muted-foreground">
          {bethel.name} · {bethel.city}
        </p>
      </CardContent>
    </Card>
  )
}
