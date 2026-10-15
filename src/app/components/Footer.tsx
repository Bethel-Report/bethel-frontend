import { Separator } from "@/shared/components/separator"

export function Footer() {
  return (
    <footer className="mx-4 text-[11px] text-muted-foreground sm:mx-9">
      <Separator />
      <div className="flex flex-wrap items-center justify-center gap-3 py-4">
        <span>© 2026 Bethel Report</span>
      </div>
    </footer>
  )
}
