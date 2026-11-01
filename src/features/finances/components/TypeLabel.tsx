type LabelType = "Receita" | "Despesa"

const LABEL_TYPE_MAP: Record<LabelType, string> = {
  Receita: "bg-success-foreground text-success",
  Despesa: "bg-destructive/10 text-destructive",
}

type TypeLabelProps = {
  type: LabelType
}

export function TypeLabel({ type }: TypeLabelProps) {
  return (
    <span
      className={`w-fit rounded-full px-2.5 py-1 text-sm font-semibold ${LABEL_TYPE_MAP[type]}`}
    >
      {type}
    </span>
  )
}
