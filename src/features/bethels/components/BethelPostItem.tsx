import { Newspaper } from "lucide-react"
import { Avatar, AvatarFallback } from "@/shared/components/avatar"
import { Badge } from "@/shared/components/badge"
import type { Bethel, BethelPost } from "../data"

type BethelPostItemProps = {
  post: BethelPost
  bethel: Bethel
}

const monthFormatter = new Intl.DateTimeFormat("pt-BR", {
  month: "short",
  timeZone: "UTC",
})

function formatPostDate(value: string) {
  const date = new Date(`${value}T00:00:00Z`)
  return `${date.getUTCDate()} ${monthFormatter.format(date)} ${date.getUTCFullYear()}`
}

export function BethelPostItem({ post, bethel }: BethelPostItemProps) {
  return (
    <li className="py-4 sm:py-6">
      <article className="flex flex-col gap-5 sm:flex-row">
        <div className="flex h-36 w-full shrink-0 items-center justify-center overflow-hidden rounded-md bg-secondary text-primary sm:h-32 sm:w-44">
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
        <div className="min-w-0 flex-1">
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
          <h3 className="mt-2 font-display text-lg font-bold leading-snug">
            {post.title}
          </h3>
          <p className="mt-2 text-md leading-relaxed text-muted-foreground">
            {post.summary}
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Avatar className="size-7">
              <AvatarFallback className="bg-secondary text-xs font-semibold text-primary">
                BN
              </AvatarFallback>
            </Avatar>
            <span>
              {bethel.name} · {bethel.city}
            </span>
          </div>
        </div>
      </article>
    </li>
  )
}
