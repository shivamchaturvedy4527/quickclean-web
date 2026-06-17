import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { LogoMarquee } from "@/components/LogoMarquee";
import { SectionReveal } from "@/components/SectionReveal";
import { getCMS } from "@/lib/cms-store";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ReWeave 360",
};

export default async function Reweave360Page() {
  const cms = await getCMS();
  const r = cms.reweave360;

  return (
    <SiteLayout>
      <PageHero title={r.heroTitle} subtitle={r.heroSubtitle} />

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8">
          {r.stats.map((stat, i) => (
            <SectionReveal key={stat.label} delay={i * 0.1} className="text-center">
              <div className="text-4xl font-bold text-[#071525]">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} decimals={stat.value % 1 !== 0 ? 1 : 0} />
              </div>
              <p className="mt-2 text-sm text-slate-600">{stat.label}</p>
            </SectionReveal>
          ))}
        </div>
      </section>

      <LogoMarquee brands={cms.brands} title={r.partnersTitle} />

      <section className="py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <h2 className="text-3xl font-bold text-[#071525]">{r.wakeUpTitle}</h2>
            <div className="mt-8 space-y-6">
              {r.wakeUpParagraphs.map((p, i) => (
                <p key={i} className="text-lg leading-relaxed text-slate-700">
                  {p}
                </p>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-[#071525]">{r.programTitle}</h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-700">{r.programDescription}</p>
          </SectionReveal>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center">
            <h2 className="text-3xl font-bold text-[#071525]">{r.howItWorksTitle}</h2>
          </SectionReveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {r.steps.map((step, i) => (
              <SectionReveal key={step.title} delay={i * 0.1}>
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-800">
                    {i + 1}
                  </div>
                  <h3 className="font-semibold text-[#071525]">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{step.description}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#071525] py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center">
            <h2 className="text-3xl font-bold">{r.benefitsTitle}</h2>
          </SectionReveal>
          <ul className="mx-auto mt-12 grid max-w-3xl gap-4">
            {r.benefits.map((b, i) => (
              <SectionReveal key={i} delay={i * 0.08}>
                <li className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-400" />
                  <span>{b.title}</span>
                </li>
              </SectionReveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <SectionReveal>
            <h2 className="text-3xl font-bold text-[#071525]">{r.wasteToWorthTitle}</h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-700">{r.wasteToWorthDescription}</p>
          </SectionReveal>
        </div>
      </section>

      <section className="bg-teal-50 py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <SectionReveal>
            <h2 className="text-3xl font-bold text-[#071525]">{r.getStartedTitle}</h2>
            <p className="mt-4 text-slate-700">{r.getStartedDescription}</p>
            <div className="mt-8 space-y-2 text-slate-600">
              <p>{r.contactPhone}</p>
              <p>{r.contactEmail}</p>
              <p>{r.contactWebsite}</p>
            </div>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-teal-700 px-6 py-3 text-sm font-semibold text-white hover:bg-teal-800"
            >
              {r.ctaText} <ArrowRight className="h-4 w-4" />
            </Link>
          </SectionReveal>
        </div>
      </section>
    </SiteLayout>
  );
}
