type PageIndicatorProps = {
  firstItem: number
  lastItem: number
  totalItems: number
}

export function PageIndicator({
  firstItem,
  lastItem,
  totalItems,
}: PageIndicatorProps) {
  return (
    <span>
      {firstItem}–{lastItem} de {totalItems} registros
    </span>
  )
}
