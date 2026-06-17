import { SiteLayout } from "@/components/SiteLayout";
import { getCMS } from "@/lib/cms-store";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
};

export default async function AboutPage() {
  const cms = await getCMS();
  const { about } = cms;

  return (
    <SiteLayout>
      <section className="bg-[#0c2340] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">{about.title}</h1>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-lg leading-relaxed text-slate-700">{about.intro}</p>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-[#0c2340]">Our Mission</h2>
              <p className="mt-3 text-slate-600">{about.mission}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-[#0c2340]">Our Vision</h2>
              <p className="mt-3 text-slate-600">{about.vision}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#0c2340]">Our Journey</h2>
          <div className="mt-10 space-y-8">
            {about.timeline.map((item) => (
              <div key={item.year} className="flex gap-6">
                <div className="w-16 shrink-0 text-lg font-bold text-teal-700">
                  {item.year}
                </div>
                <div>
                  <h3 className="font-semibold text-[#0c2340]">{item.title}</h3>
                  <p className="mt-1 text-slate-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
