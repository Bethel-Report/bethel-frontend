import { ArrowRight, Landmark, MapPin, UsersRound } from "lucide-react"
import { Link } from "react-router"
import { Button } from "@/shared/components/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/card"
import { StatusBadge } from "@/shared/components/ui/StatusBadge"
import type { Bethel } from "../data"

type BethelCardProps = {
  bethel: Bethel
}

export function BethelCard({ bethel }: BethelCardProps) {
  return (
    <Card className="relative flex h-full flex-col gap-0 overflow-hidden rounded-lg border-border shadow-sm transition-shadow hover:shadow-md">
      <CardHeader className="flex-row items-start justify-between gap-3 space-y-0 p-5 pb-4 sm:p-6 sm:pb-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
          <Landmark aria-hidden="true" className="size-5" />
        </div>
        <StatusBadge status={bethel.status} />
      </CardHeader>
      <CardContent className="flex flex-1 flex-col px-5 pb-5 pt-0 sm:px-6 sm:pb-6">
        <CardTitle className="font-display text-lg leading-snug">
          <Link
            to={`/betheis/${bethel.id}`}
            className="rounded-sm outline-none after:absolute after:inset-0 focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={`Ver detalhes de ${bethel.name}`}
          >
            {bethel.name}
          </Link>
        </CardTitle>
        <dl className="mt-5 space-y-3 border-t border-border pt-4 text-md">
          <div className="flex items-center justify-between gap-3">
            <dt className="flex items-center gap-2 text-muted-foreground">
              <MapPin aria-hidden="true" className="size-4" />
              Localização
            </dt>
            <dd className="text-right font-semibold">
              {bethel.city}, {bethel.state}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="flex items-center gap-2 text-muted-foreground">
              <UsersRound aria-hidden="true" className="size-4" />
              Membros
            </dt>
            <dd className="font-semibold">{bethel.members}</dd>
          </div>
        </dl>
        <div className="flex justify-end z-10 mt-5">
          <Button
            variant="ghost"
            className="w-fit flex justify-center items-center text-muted-foreground p-0 hover:bg-transparent hover:text-primary"
            asChild
          >
            <Link to={`/betheis/${bethel.id}`}>
              Ver bethel
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
