import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../button"

type PaginationProps = {
  currentPage: number
  totalPages: number
  setPage: (page: number) => void
  ariaLabel?: string
}

export function Pagination({
  currentPage,
  totalPages,
  setPage,
  ariaLabel = "Paginação",
}: PaginationProps) {
  return (
    <nav aria-label={ariaLabel} className="flex items-center gap-1">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-8"
        aria-label="Página anterior"
        disabled={currentPage === 1}
        onClick={() => setPage(currentPage - 1)}
      >
        <ChevronLeft aria-hidden="true" />
      </Button>
      <span className="min-w-10 text-md text-center">
        {currentPage} / {totalPages}
      </span>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-8"
        aria-label="Próxima página"
        disabled={currentPage === totalPages}
        onClick={() => setPage(currentPage + 1)}
      >
        <ChevronRight aria-hidden="true" />
      </Button>
    </nav>
  )
}
