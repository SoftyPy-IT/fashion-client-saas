const formatPrice = (amount: number) => {
  const formattedPrice = Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    currencySign: "standard",
  })
    .format(Math.round(amount))
    .replace("BDT", "Tk")
    .replace(/\s+/g, " ")
    .trim();

  return formattedPrice;
};

export default formatPrice;
