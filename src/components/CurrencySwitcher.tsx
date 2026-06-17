"use client";

import { useCurrency } from "@/context/CurrencyContext";
import type { CurrencyCode } from "@/lib/currency";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function CurrencySwitcher() {
  const { currency, setCurrency, currencies } = useCurrency();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
        aria-label="Select currency"
      >
        {currencies[currency].symbol}
        {currency}
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full z-50 mt-1 min-w-[140px] rounded-md border border-slate-200 bg-white py-1 shadow-lg">
            {(Object.keys(currencies) as CurrencyCode[]).map((code) => (
              <button
                key={code}
                onClick={() => {
                  setCurrency(code);
                  setOpen(false);
                }}
                className={`block w-full px-3 py-2 text-left text-sm hover:bg-slate-50 ${
                  code === currency ? "font-semibold text-teal-700" : "text-slate-700"
                }`}
              >
                {currencies[code].symbol}
                {code} — {currencies[code].name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
