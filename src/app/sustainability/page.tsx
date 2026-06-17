import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { CmsImage } from "@/components/CmsImage";
import { SectionReveal } from "@/components/SectionReveal";
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
      <PageHero
        title={sustainability.title}
        subtitle={sustainability.intro}
        image={sustainability.heroImage}
      />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {sustainability.metrics.map((stat, i) => (
              <SectionReveal key={stat.label} delay={i * 0.1} className="text-center">
                <div className="text-3xl font-bold text-teal-700">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-2 text-sm text-slate-600">{stat.label}</p>
              </SectionReveal>
            ))}
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {sustainability.initiatives.map((item, i) => (
              <SectionReveal key={item.title} delay={i * 0.1}>
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  {item.image && (
                    <div className="relative aspect-video">
                      <CmsImage src={item.image} alt={item.title} fill sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-semibold text-[#071525]">{item.title}</h3>
                    <p className="mt-3 text-sm text-slate-600">{item.description}</p>
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
