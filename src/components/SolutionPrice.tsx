"use client";

import { useCurrency } from "@/context/CurrencyContext";
import { formatPrice, getSolutionPrice } from "@/lib/currency";

interface SolutionPriceProps {
  solution: {
    priceFromINR: number;
    priceFromUSD: number;
    priceFromEUR: number;
    priceFromAED: number;
    slug: string;
  };
}

export function SolutionPrice({ solution }: SolutionPriceProps) {
  const { currency } = useCurrency();
  const price = getSolutionPrice(solution, currency);

  if (solution.slug === "build-own-operate" || price === 0) {
    return <>Contact for pricing</>;
  }

  if (solution.slug === "linen-rental") {
    return <>{formatPrice(price, currency)} / piece</>;
  }

  if (solution.slug === "equipment-on-lease") {
    return <>{formatPrice(price, currency)} / month</>;
  }

  return <>From {formatPrice(price, currency)}</>;
}
