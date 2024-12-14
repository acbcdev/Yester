import { Currency, SUPPORTED_CURRENCIES } from '../types/currency';

export function formatCurrency(amount: number, currencyCode: string): string {
  const currency = SUPPORTED_CURRENCIES.find((c) => c.code === currencyCode);
  
  if (!currency) {
    throw new Error(`Unsupported currency: ${currencyCode}`);
  }

  if (currency.type === 'crypto') {
    // For crypto, show fewer decimals for large amounts
    const displayDecimals = amount >= 1000 ? 2 : currency.decimals;
    return `${currency.symbol} ${amount.toFixed(displayDecimals)}`;
  }

  return amount.toLocaleString('es-ES', {
    style: 'currency',
    currency: currency.code,
    minimumFractionDigits: currency.decimals,
    maximumFractionDigits: currency.decimals,
  });
}