function formatearMoneda(valor, moneda = "ARS", locale = "es-AR") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: moneda,
  }).format(valor);
}
module.exports = { formatearMoneda };
