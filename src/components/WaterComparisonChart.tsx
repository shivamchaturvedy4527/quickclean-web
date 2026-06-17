"use client";

import type { WaterComparison } from "@/types/cms";
import { AnimatedCounter } from "./AnimatedCounter";

function fmt(n: number) {
  if (n >= 1e9) return `${(n / 1e9).toFixed(1).replace(/\.0$/, "")}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1e3) return `${Math.round(n / 1e3)}K`;
  return n.toLocaleString();
}

export function WaterComparisonChart({ data }: { data: WaterComparison }) {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded border border-slate-200 p-6 text-center">
          <div className="text-sm font-medium text-slate-600">{data.title}</div>
          <div className="mt-2 text-4xl font-semibold text-[#06163a]">
            <AnimatedCounter end={data.industryDisplayValue || 2400000} />
          </div>
          <div className="mt-2 text-sm text-slate-500">{data.industryLabel}</div>
          <div className="mt-4 text-4xl font-semibold text-[#00b67a]">
            <AnimatedCounter end={data.qcDisplayValue || 800000} />
          </div>
          <div className="mt-2 text-sm text-slate-500">{data.qcLabel}</div>
        </div>
        <div className="rounded border border-slate-200 p-6 text-center sm:col-span-1">
          <div className="text-sm font-medium text-slate-600">{data.monthlySavedLabel}</div>
          <div className="mt-2 text-4xl font-semibold text-[#06163a]">
            <AnimatedCounter end={data.monthlySaved} />
          </div>
          <div className="mt-2 text-sm text-slate-500">Litres saved this month</div>
        </div>
        <div className="rounded border border-slate-200 p-6 text-center sm:col-span-1">
          <div className="text-sm font-medium text-slate-600">{data.yearlySavedLabel}</div>
          <div className="mt-2 text-4xl font-semibold text-[#06163a]">
            <AnimatedCounter end={data.yearlySaved} />
          </div>
          <div className="mt-2 text-sm text-slate-500">Litres saved this year</div>
        </div>
      </div>
    </section>
  );
}
