import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { SectionReveal } from "@/components/SectionReveal";
import { getCMS } from "@/lib/cms-store";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCMS();
  return { title: cms.labels.meta.financialPlanning };
}

export default async function FinancialPlanningPage() {
  const cms = await getCMS();
  const fp = cms.financialPlanning;

  return (
    <SiteLayout>
      <PageHero title={fp.title} subtitle={fp.intro} />

      <section className="py-20">
        <div className="mx-auto max-w-3xl space-y-12 px-4 sm:px-6 lg:px-8">
          {fp.sections.map((section, i) => (
            <SectionReveal key={section.title} delay={i * 0.1}>
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="text-xl font-semibold text-primary">{section.title}</h2>
                <p className="mt-4 leading-relaxed text-slate-700">{section.content}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
