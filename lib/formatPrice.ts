export const formatPrice = (price: string | null): string => {
  if (price === "Gratis") {
    return "Gratis"
  }

  const priceNumber = price ? Number.parseFloat(price.replace(",", ".")) : 0

  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(priceNumber)
}