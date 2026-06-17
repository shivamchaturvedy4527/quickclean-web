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
      <PageHero title={about.title} image={about.heroImage} breadcrumb="Company" />

      <section className="section-pad">
        <Container className="max-w-3xl">
          <SectionReveal>
            {about.intro.split("\n\n").map((paragraph, i) => (
              <p key={i} className={i > 0 ? "mt-5 text-lg leading-[1.85] text-slate-600" : "text-lg leading-[1.85] text-slate-700"}>
                {paragraph}
              </p>
            ))}
          </SectionReveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <SectionReveal delay={0.1}>
              <div className="card card-premium h-full p-8">
                <div className="mb-4 h-1 w-10 rounded-full bg-accent" />
                <h2 className="font-display text-xl font-medium text-navy">{about.missionTitle}</h2>
                <div className="mt-4 space-y-4">
                  {about.mission.split("\n\n").map((paragraph, i) => (
                    <p key={i} className="text-sm leading-relaxed text-slate-600 sm:text-base">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.2}>
              <div className="card card-premium h-full p-8">
                <div className="mb-4 h-1 w-10 rounded-full bg-accent-bright" />
                <h2 className="font-display text-xl font-medium text-navy">{about.visionTitle}</h2>
                <div className="mt-4 space-y-4">
                  {about.vision.split("\n\n").map((paragraph, i) => (
                    <p key={i} className="text-sm leading-relaxed text-slate-600 sm:text-base">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>
        </Container>
      </section>

      <section className="section-alt section-pad">
        <Container className="max-w-3xl">
          <SectionReveal>
            <h2 className="font-display text-2xl font-medium text-navy sm:text-3xl">{about.journeyTitle}</h2>
          </SectionReveal>
          <div className="relative mt-12 space-y-0">
            <div className="absolute bottom-0 left-[1.65rem] top-0 w-px bg-gradient-to-b from-accent/40 via-border to-transparent" />
            {about.timeline.map((item, i) => (
              <SectionReveal key={item.year} delay={i * 0.06}>
                <div className="relative flex gap-8 pb-10 last:pb-0">
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-accent/30 bg-white text-sm font-bold text-accent shadow-sm">
                    {item.year}
                  </div>
                  <div className="pt-2">
                    <h3 className="font-semibold text-navy">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                      {item.description}
                    </p>
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
