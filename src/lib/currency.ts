export type Currency = 'USD' | 'KES' | 'EUR' | 'GBP' | 'AED' | 'ZAR' | 'JPY';

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  name: string;
  rate: number;
}

export const CURRENCIES: CurrencyConfig[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1 },
  { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling', rate: 153.50 },
  { code: 'EUR', symbol: '\u20AC', name: 'Euro', rate: 0.92 },
  { code: 'GBP', symbol: '\u00A3', name: 'British Pound', rate: 0.79 },
  { code: 'AED', symbol: 'AED', name: 'UAE Dirham', rate: 3.67 },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand', rate: 18.25 },
  { code: 'JPY', symbol: '\u00A5', name: 'Japanese Yen', rate: 149.50 },
];

export function convertPrice(amountUSD: number, toCurrency: Currency): number {
  const config = CURRENCIES.find(c => c.code === toCurrency);
  if (!config || toCurrency === 'USD') return amountUSD;
  return Math.round(amountUSD * config.rate);
}

export function formatPrice(amount: number, currency: Currency): string {
  const config = CURRENCIES.find(c => c.code === currency);
  if (!config) return `$${amount.toLocaleString()}`;
  if (currency === 'JPY' || currency === 'KES') {
    return `${config.symbol}${Math.round(amount).toLocaleString()}`;
  }
  if (currency === 'AED') {
    return `${amount.toLocaleString()} AED`;
  }
  return `${config.symbol}${amount.toLocaleString()}`;
}

export function getPriceInCurrency(priceUSD: number, currency: Currency): string {
  const converted = convertPrice(priceUSD, currency);
  return formatPrice(converted, currency);
}
