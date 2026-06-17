import { SiteLayout } from "@/components/SiteLayout";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { getCMS } from "@/lib/cms-store";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sustainability",
};

export default async function SustainabilityPage() {
  const cms = await getCMS();
  const { sustainability } = cms;

  return (
    <SiteLayout>
      <section className="bg-[#0c2340] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">{sustainability.title}</h1>
          <p className="mt-4 max-w-2xl text-slate-300">{sustainability.intro}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {sustainability.metrics.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-teal-700">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-2 text-sm text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {sustainability.initiatives.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-slate-200 bg-white p-6"
              >
                <h3 className="font-semibold text-[#0c2340]">{item.title}</h3>
                <p className="mt-3 text-sm text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
