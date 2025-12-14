export const formatPrice = (price: number | string): string => {
  return new Intl.NumberFormat('fa-IR').format(Number(price));
};
