import { useNavigate } from "react-router"
import { Button } from "../button"
import { ArrowLeft } from "lucide-react"

export function Back() {
  const navigate = useNavigate()

  return (
    <Button
      variant="ghost"
      onClick={() => navigate(-1)}
      className="px-0 mb-4 text-lg text-muted-foreground hover:bg-transparent"
    >
      <ArrowLeft aria-hidden="true" className="min-w-5 min-h-5 w-5 h-5" />
      Voltar
    </Button>
  )
}
