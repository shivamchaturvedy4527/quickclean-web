"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import {
  type CurrencyCode,
  CURRENCIES,
  detectCurrencyFromLocale,
  detectCurrencyFromCountry,
} from "@/lib/currency";

interface CurrencyContextValue {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  currencies: typeof CURRENCIES;
  country: string;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

const STORAGE_KEY = "preferred_currency";

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>("INR");
  const [country, setCountry] = useState("IN");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as CurrencyCode | null;
    if (stored && CURRENCIES[stored]) {
      setCurrencyState(stored);
      return;
    }

    const locale =
      typeof navigator !== "undefined" ? navigator.language : "en-IN";
    const detected = detectCurrencyFromLocale(locale);
    setCurrencyState(detected);

    fetch("/api/geo")
      .then((r) => r.json())
      .then((data: { country?: string }) => {
        if (data.country) {
          setCountry(data.country);
          if (!stored) {
            setCurrencyState(detectCurrencyFromCountry(data.country));
          }
        }
      })
      .catch(() => {});
  }, []);

  const setCurrency = useCallback((code: CurrencyCode) => {
    setCurrencyState(code);
    localStorage.setItem(STORAGE_KEY, code);
  }, []);

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency, currencies: CURRENCIES, country }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
