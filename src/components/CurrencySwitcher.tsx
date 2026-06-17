"use client";

import { useCurrency } from "@/context/CurrencyContext";
import type { CurrencyCode } from "@/lib/currency";
import { ChevronDown, Globe } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CurrencySwitcherProps {
  variant?: "default" | "footer";
}

export function CurrencySwitcher({ variant = "default" }: CurrencySwitcherProps) {
  const { currency, setCurrency, currencies } = useCurrency();
  const [open, setOpen] = useState(false);
  const isFooter = variant === "footer";

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center gap-1.5 text-sm font-medium transition-colors",
          isFooter
            ? "rounded-md border border-white/15 bg-white/5 px-2.5 py-1.5 text-slate-400 hover:border-white/25 hover:text-slate-200"
            : "rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-slate-700 hover:bg-slate-50"
        )}
        aria-label="Select currency"
      >
        {isFooter ? (
          <Globe className="h-3.5 w-3.5 opacity-70" aria-hidden />
        ) : null}
        <span>
          {currencies[currency].symbol}
          {currency}
        </span>
        <ChevronDown className="h-3.5 w-3.5 opacity-60" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div
            className={cn(
              "absolute right-0 top-full z-50 mt-1 min-w-[148px] rounded-md border py-1 shadow-lg",
              isFooter
                ? "border-white/15 bg-navy-light text-slate-200 shadow-black/30"
                : "border-slate-200 bg-white"
            )}
          >
            {(Object.keys(currencies) as CurrencyCode[]).map((code) => (
              <button
                key={code}
                onClick={() => {
                  setCurrency(code);
                  setOpen(false);
                }}
                className={cn(
                  "block w-full px-3 py-2 text-left text-sm transition-colors",
                  isFooter ? "hover:bg-white/8" : "hover:bg-slate-50",
                  code === currency
                    ? isFooter
                      ? "font-semibold text-[#48CAE4]"
                      : "font-semibold text-[#0077B6]"
                    : isFooter
                      ? "text-slate-300"
                      : "text-slate-700"
                )}
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
