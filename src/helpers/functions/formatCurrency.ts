export const formatCurrency = (value: number | string) => {
  if (typeof value === "string") {
    const raw = value.replace(/\D/g, "");
    const float = parseFloat(raw === "" ? "0" : raw) / 100;

    return float.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value / 100);
};
