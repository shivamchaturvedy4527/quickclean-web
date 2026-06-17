import { SiteLayout } from "@/components/SiteLayout";
import { getCMS } from "@/lib/cms-store";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investors",
};

export default async function InvestorsPage() {
  const cms = await getCMS();
  const { investors } = cms;

  return (
    <SiteLayout>
      <section className="bg-[#0c2340] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">{investors.title}</h1>
          <p className="mt-4 max-w-2xl text-slate-300">{investors.intro}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <ul className="space-y-4">
            {investors.highlights.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-slate-200 bg-white p-5 text-slate-700"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteLayout>
  );
}
