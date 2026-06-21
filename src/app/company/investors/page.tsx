import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { CmsImage } from "@/components/CmsImage";
import { SectionReveal } from "@/components/SectionReveal";
import { getCMS } from "@/lib/cms-store";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCMS();
  return { title: cms.labels.meta.investors };
}

export default async function InvestorsPage() {
  const cms = await getCMS();
  const { investors } = cms;

  return (
    <SiteLayout>
      <PageHero title={investors.title} subtitle={investors.intro} />

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <ul className="space-y-4">
            {investors.highlights.map((item, i) => (
              <SectionReveal key={item} delay={i * 0.08}>
                <li className="rounded-xl border border-slate-200 bg-white p-5 text-slate-700 shadow-sm">
                  {item}
                </li>
              </SectionReveal>
            ))}
          </ul>
        </div>
      </section>

      {investors.partners.length > 0 && (
        <section className="bg-slate-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-2xl font-bold text-primary">
              {investors.partnersTitle ?? "Our Partners"}
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {investors.partners.map((partner, i) => (
                <SectionReveal key={partner.id} delay={i * 0.1}>
                  <div className="flex gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="relative h-16 w-32 shrink-0 overflow-hidden rounded-lg">
                      <CmsImage src={partner.logo} alt={partner.name} fill className="object-contain p-2" sizes="128px" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary">{partner.name}</h3>
                      <p className="mt-1 text-sm text-slate-600">{partner.description}</p>
                    </div>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
