export type CurrencyCode = "INR" | "USD" | "EUR" | "AED" | "GBP";

export interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  locale: string;
  name: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  INR: { code: "INR", symbol: "₹", locale: "en-IN", name: "Indian Rupee" },
  USD: { code: "USD", symbol: "$", locale: "en-US", name: "US Dollar" },
  EUR: { code: "EUR", symbol: "€", locale: "de-DE", name: "Euro" },
  AED: { code: "AED", symbol: "AED ", locale: "ar-AE", name: "UAE Dirham" },
  GBP: { code: "GBP", symbol: "£", locale: "en-GB", name: "British Pound" },
};

const COUNTRY_CURRENCY: Record<string, CurrencyCode> = {
  IN: "INR",
  US: "USD",
  GB: "GBP",
  AE: "AED",
  DE: "EUR",
  FR: "EUR",
  IT: "EUR",
  ES: "EUR",
  NL: "EUR",
  BE: "EUR",
  AT: "EUR",
  IE: "EUR",
  PT: "EUR",
  FI: "EUR",
  GR: "EUR",
};

const LOCALE_CURRENCY: Record<string, CurrencyCode> = {
  "en-IN": "INR",
  "hi-IN": "INR",
  "en-US": "USD",
  "en-GB": "GBP",
  "ar-AE": "AED",
  "de-DE": "EUR",
  "fr-FR": "EUR",
};

export function detectCurrencyFromLocale(locale?: string): CurrencyCode {
  if (!locale) return "INR";
  const normalized = locale.replace("_", "-");
  if (LOCALE_CURRENCY[normalized]) return LOCALE_CURRENCY[normalized];
  const region = normalized.split("-")[1]?.toUpperCase();
  if (region && COUNTRY_CURRENCY[region]) return COUNTRY_CURRENCY[region];
  return "USD";
}

export function detectCurrencyFromCountry(countryCode: string): CurrencyCode {
  return COUNTRY_CURRENCY[countryCode.toUpperCase()] ?? "USD";
}

export function formatPrice(amount: number, currency: CurrencyCode): string {
  if (amount === 0) return "Contact for pricing";
  const info = CURRENCIES[currency];
  return new Intl.NumberFormat(info.locale, {
    style: "currency",
    currency: info.code,
    maximumFractionDigits: currency === "INR" ? 0 : 2,
  }).format(amount);
}

export function getSolutionPrice(
  solution: {
    priceFromINR: number;
    priceFromUSD: number;
    priceFromEUR: number;
    priceFromAED: number;
  },
  currency: CurrencyCode
): number {
  const map: Record<CurrencyCode, number> = {
    INR: solution.priceFromINR,
    USD: solution.priceFromUSD,
    EUR: solution.priceFromEUR,
    AED: solution.priceFromAED,
    GBP: solution.priceFromUSD * 0.79,
  };
  return map[currency];
}
