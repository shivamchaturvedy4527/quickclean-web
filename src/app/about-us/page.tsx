import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { SectionReveal } from "@/components/SectionReveal";
import { Container } from "@/components/ui/Container";
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

      <section className="py-16 sm:py-24">
        <Container className="max-w-3xl">
          <SectionReveal>
            <p className="text-lg leading-relaxed text-slate-700">{about.intro}</p>
          </SectionReveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <SectionReveal delay={0.1}>
              <div className="card p-7">
                <h2 className="font-display text-lg font-medium text-navy">{about.missionTitle}</h2>
                <p className="mt-3 text-slate-600">{about.mission}</p>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.2}>
              <div className="card p-7">
                <h2 className="font-display text-lg font-medium text-navy">{about.visionTitle}</h2>
                <p className="mt-3 text-slate-600">{about.vision}</p>
              </div>
            </SectionReveal>
          </div>
        </Container>
      </section>

      <section className="bg-background py-16 sm:py-24">
        <Container className="max-w-3xl">
          <SectionReveal>
            <h2 className="font-display text-2xl font-medium text-navy">{about.journeyTitle}</h2>
          </SectionReveal>
          <div className="mt-10 space-y-8">
            {about.timeline.map((item, i) => (
              <SectionReveal key={item.year} delay={i * 0.08}>
                <div className="flex gap-6 border-l-2 border-accent/30 pl-6">
                  <div className="w-14 shrink-0 text-lg font-bold text-accent">{item.year}</div>
                  <div>
                    <h3 className="font-semibold text-navy">{item.title}</h3>
                    <p className="mt-1 text-slate-600">{item.description}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </section>
    </SiteLayout>
  );
}
