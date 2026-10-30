const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
})

export function formatPostDate(value: string) {
  return dateFormatter.format(new Date(`${value}T00:00:00Z`))
}
