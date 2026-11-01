const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
})
const dateTime = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
})

export function formatAmount(amountInCents: number) {
  return currency.format(amountInCents / 100)
}

export function formatDate(value: string) {
  return dateTime.format(new Date(value))
}
