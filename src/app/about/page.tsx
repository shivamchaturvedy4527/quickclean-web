import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { SectionReveal } from "@/components/SectionReveal";
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
      <PageHero title={about.title} image={about.heroImage} />

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <p className="text-lg leading-relaxed text-slate-700">{about.intro}</p>
          </SectionReveal>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            <SectionReveal delay={0.1}>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-[primary]">{about.missionTitle}</h2>
                <p className="mt-3 text-slate-600">{about.mission}</p>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.2}>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-[primary]">{about.visionTitle}</h2>
                <p className="mt-3 text-slate-600">{about.vision}</p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <h2 className="text-2xl font-bold text-[primary]">{about.journeyTitle}</h2>
          </SectionReveal>
          <div className="mt-10 space-y-8">
            {about.timeline.map((item, i) => (
              <SectionReveal key={item.year} delay={i * 0.08}>
                <div className="flex gap-6">
                  <div className="w-16 shrink-0 text-lg font-bold text-accent">{item.year}</div>
                  <div>
                    <h3 className="font-semibold text-[primary]">{item.title}</h3>
                    <p className="mt-1 text-slate-600">{item.description}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
