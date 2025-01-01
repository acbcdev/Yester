export interface Currency {
  code: string;
  name: string;
  symbol: string;
  decimals: number;
  type: 'fiat' | 'crypto';
}

export const SUPPORTED_CURRENCIES: Currency[] = [
  // European currencies
  { code: 'EUR', name: 'Euro', symbol: '€', decimals: 2, type: 'fiat' },
  { code: 'CHF', name: 'Franco Suizo', symbol: 'CHF', decimals: 2, type: 'fiat' },
  { code: 'NOK', name: 'Corona Noruega', symbol: 'kr', decimals: 2, type: 'fiat' },
  { code: 'SEK', name: 'Corona Sueca', symbol: 'kr', decimals: 2, type: 'fiat' },
  { code: 'DKK', name: 'Corona Danesa', symbol: 'kr', decimals: 2, type: 'fiat' },
  { code: 'PLN', name: 'Złoty Polaco', symbol: 'zł', decimals: 2, type: 'fiat' },
  { code: 'CZK', name: 'Corona Checa', symbol: 'Kč', decimals: 2, type: 'fiat' },
  { code: 'RON', name: 'Leu Rumano', symbol: 'lei', decimals: 2, type: 'fiat' },
  { code: 'HUF', name: 'Forinto Húngaro', symbol: 'Ft', decimals: 2, type: 'fiat' },
  // Americas
  { code: 'USD', name: 'Dólar', symbol: '$', decimals: 2, type: 'fiat' },
  { code: 'CAD', name: 'Dólar Canadiense', symbol: 'C$', decimals: 2, type: 'fiat' },
  { code: 'MXN', name: 'Peso Mexicano', symbol: '$', decimals: 2, type: 'fiat' },
  { code: 'BRL', name: 'Real Brasileño', symbol: 'R$', decimals: 2, type: 'fiat' },
  { code: 'ARS', name: 'Peso Argentino', symbol: '$', decimals: 2, type: 'fiat' },
  { code: 'CLP', name: 'Peso Chileno', symbol: '$', decimals: 0, type: 'fiat' },
  { code: 'COP', name: 'Peso Colombiano', symbol: '$', decimals: 2, type: 'fiat' },
  { code: 'PEN', name: 'Sol Peruano', symbol: 'S/', decimals: 2, type: 'fiat' },
  // Asia & Pacific
  { code: 'GBP', name: 'Libra', symbol: '£', decimals: 2, type: 'fiat' },
  { code: 'JPY', name: 'Yen Japonés', symbol: '¥', decimals: 0, type: 'fiat' },
  { code: 'CNY', name: 'Yuan Chino', symbol: '¥', decimals: 2, type: 'fiat' },
  { code: 'KRW', name: 'Won Surcoreano', symbol: '₩', decimals: 0, type: 'fiat' },
  { code: 'INR', name: 'Rupia India', symbol: '₹', decimals: 2, type: 'fiat' },
  { code: 'AUD', name: 'Dólar Australiano', symbol: 'A$', decimals: 2, type: 'fiat' },
  { code: 'NZD', name: 'Dólar Neozelandés', symbol: 'NZ$', decimals: 2, type: 'fiat' },
  { code: 'SGD', name: 'Dólar de Singapur', symbol: 'S$', decimals: 2, type: 'fiat' },
  { code: 'HKD', name: 'Dólar de Hong Kong', symbol: 'HK$', decimals: 2, type: 'fiat' },
  { code: 'TWD', name: 'Dólar Taiwanés', symbol: 'NT$', decimals: 2, type: 'fiat' },
  // Middle East & Africa
  { code: 'AED', name: 'Dírham EAU', symbol: 'د.إ', decimals: 2, type: 'fiat' },
  { code: 'SAR', name: 'Riyal Saudí', symbol: '﷼', decimals: 2, type: 'fiat' },
  { code: 'ZAR', name: 'Rand Sudafricano', symbol: 'R', decimals: 2, type: 'fiat' },
  { code: 'TRY', name: 'Lira Turca', symbol: '₺', decimals: 2, type: 'fiat' },
  { code: 'EGP', name: 'Libra Egipcia', symbol: 'E£', decimals: 2, type: 'fiat' },
  { code: 'ILS', name: 'Nuevo Séquel Israelí', symbol: '₪', decimals: 2, type: 'fiat' },
  { code: 'QAR', name: 'Riyal Catarí', symbol: 'ر.ق', decimals: 2, type: 'fiat' },
  { code: 'KWD', name: 'Dinar Kuwaití', symbol: 'د.ك', decimals: 3, type: 'fiat' },
  { code: 'MAD', name: 'Dírham Marroquí', symbol: 'د.م.', decimals: 2, type: 'fiat' },
  { code: 'NGN', name: 'Naira Nigeriano', symbol: '₦', decimals: 2, type: 'fiat' },
  // Cryptocurrencies
  { code: 'BTC', name: 'Bitcoin', symbol: '₿', decimals: 8, type: 'crypto' },
  { code: 'ETH', name: 'Ethereum', symbol: 'Ξ', decimals: 18, type: 'crypto' },
  { code: 'USDT', name: 'Tether', symbol: '₮', decimals: 6, type: 'crypto' },
  { code: 'BNB', name: 'Binance Coin', symbol: 'BNB', decimals: 8, type: 'crypto' },
  { code: 'ADA', name: 'Cardano', symbol: '₳', decimals: 6, type: 'crypto' },
  { code: 'SOL', name: 'Solana', symbol: 'SOL', decimals: 9, type: 'crypto' },
  { code: 'DOT', name: 'Polkadot', symbol: 'DOT', decimals: 10, type: 'crypto' },
  { code: 'XRP', name: 'Ripple', symbol: 'XRP', decimals: 6, type: 'crypto' },
  { code: 'DOGE', name: 'Dogecoin', symbol: 'Ð', decimals: 8, type: 'crypto' },
  { code: 'MATIC', name: 'Polygon', symbol: 'MATIC', decimals: 18, type: 'crypto' },
  { code: 'LINK', name: 'Chainlink', symbol: 'LINK', decimals: 18, type: 'crypto' },
  { code: 'UNI', name: 'Uniswap', symbol: 'UNI', decimals: 18, type: 'crypto' },
  { code: 'AVAX', name: 'Avalanche', symbol: 'AVAX', decimals: 18, type: 'crypto' },
  { code: 'ATOM', name: 'Cosmos', symbol: 'ATOM', decimals: 6, type: 'crypto' },
  { code: 'MOAS', name: 'Moas Coin', symbol: 'MOAS', decimals: 8, type: 'crypto' },
];