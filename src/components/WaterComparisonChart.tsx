"use client";

import type { WaterComparison } from "@/types/cms";
import { AnimatedCounter } from "./AnimatedCounter";

interface WaterComparisonChartProps {
  data: WaterComparison;
}

export function WaterComparisonChart({ data }: WaterComparisonChartProps) {
  const maxValue = Math.max(data.industryValue, data.qcValue) * 1.2;

  return (
    <section className="relative overflow-hidden bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold tracking-tight text-[#071525]">
          {data.title}
        </h2>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <div className="space-y-8">
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium text-slate-600">{data.industryLabel}</span>
                <span className="font-bold text-red-500">
                  <AnimatedCounter end={data.industryValue} suffix={data.industryUnit} />
                </span>
              </div>
              <div className="h-4 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-red-400 to-red-500 transition-all duration-1000"
                  style={{ width: `${(data.industryValue / maxValue) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium text-slate-600">{data.qcLabel}</span>
                <span className="font-bold text-teal-600">
                  <AnimatedCounter end={data.qcValue} suffix={data.qcUnit} />
                </span>
              </div>
              <div className="h-4 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-1000"
                  style={{ width: `${(data.qcValue / maxValue) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="rounded-2xl border border-teal-100 bg-gradient-to-br from-teal-50 to-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">{data.monthlySavedLabel}</p>
              <p className="mt-2 text-3xl font-bold text-teal-700">
                <AnimatedCounter end={data.monthlySaved} suffix=" L" />
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">{data.yearlySavedLabel}</p>
              <p className="mt-2 text-3xl font-bold text-emerald-700">
                <AnimatedCounter end={data.yearlySaved} suffix=" L" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
