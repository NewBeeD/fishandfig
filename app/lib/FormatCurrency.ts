export function formatCurrency({
  amount,
  currency,
  exchangeRates,
}: {
  amount: number;
  currency: string;
  exchangeRates: Record<string, number>;
}) {
  const rate = exchangeRates[currency] || 1;
  const converted = amount * rate;

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(converted);
}
