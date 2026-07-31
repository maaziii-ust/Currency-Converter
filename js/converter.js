/**
 * Currency Conversion Calculations
 */

export function calculateConversion(amount, rate) {
  if (isNaN(amount) || isNaN(rate)) return 0;
  return amount * rate;
}

export function formatCurrency(value, currencyCode) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  }).format(value);
}