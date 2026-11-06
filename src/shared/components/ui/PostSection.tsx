import { ArrowRight, type LucideIcon } from "lucide-react"
import { Link } from "react-router"
import { BethelPostItem } from "@/features/bethels/components/BethelPostItem"
import { postsWithBethel } from "@/features/bethels/data"
import { Button } from "@/shared/components/button"
import { Card } from "@/shared/components/card"
import { Separator } from "@/shared/components/separator"

type PostSectionProps = {
  title: string
  description: string
  emptyMessage: string
  linkLabel: string
  to: string
  icon: LucideIcon
  posts: typeof postsWithBethel
}

export function PostSection({
  title,
  description,
  emptyMessage,
  linkLabel,
  to,
  icon: Icon,
  posts,
}: PostSectionProps) {
  return (
    <section>
      <Card className="overflow-hidden rounded-lg border-border p-0 shadow-sm">
        <div className="flex items-center gap-3 p-4 sm:px-6">
          <Icon aria-hidden="true" className="size-5 text-primary" />
          <div>
            <h2 className="font-display text-lg font-bold">{title}</h2>
            <p className="mt-1 text-md text-muted-foreground">{description}</p>
          </div>
        </div>
        <Separator />
        {posts.length > 0 ? (
          <ul className="divide-y divide-border px-4 sm:px-6">
            {posts.slice(0, 5).map(({ post, bethel }) => (
              <BethelPostItem key={post.id} post={post} bethel={bethel} />
            ))}
          </ul>
        ) : (
          <div className="px-5 py-12 text-center sm:px-7">
            <Icon
              aria-hidden="true"
              className="mx-auto size-8 text-muted-foreground"
            />
            <p className="mt-3 font-display text-lg font-semibold">
              {emptyMessage}
            </p>
            <p className="mt-1 text-md text-muted-foreground">
              Ainda não há publicações cadastradas nesta categoria.
            </p>
          </div>
        )}
        <div className="flex justify-center border-t border-border p-3">
          <Button asChild variant="ghost" className="text-lg">
            <Link to={to}>
              {linkLabel}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </Button>
        </div>
      </Card>
    </section>
  )
}
