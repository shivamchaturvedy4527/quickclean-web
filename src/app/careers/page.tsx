import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { SectionReveal } from "@/components/SectionReveal";
import { getCMS } from "@/lib/cms-store";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
};

export default async function CareersPage() {
  const cms = await getCMS();
  const { careers } = cms;

  return (
    <SiteLayout>
      <PageHero title={careers.title} subtitle={careers.intro} />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <h2 className="text-2xl font-bold text-[#071525]">{careers.benefitsTitle}</h2>
          </SectionReveal>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {careers.benefits.map((benefit, i) => (
              <SectionReveal key={benefit} delay={i * 0.08}>
                <li className="rounded-xl border border-slate-200 bg-white p-4 text-slate-700 shadow-sm">
                  {benefit}
                </li>
              </SectionReveal>
            ))}
          </ul>

          <SectionReveal className="mt-14">
            <h2 className="text-2xl font-bold text-[#071525]">{careers.openingsTitle}</h2>
          </SectionReveal>
          <div className="mt-6 space-y-4">
            {careers.openings.map((job, i) => (
              <SectionReveal key={job.id} delay={i * 0.08}>
                <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
                  <div>
                    <h3 className="font-semibold text-[#071525]">{job.title}</h3>
                    <p className="text-sm text-slate-500">
                      {job.location} · {job.type}
                    </p>
                    {job.description && (
                      <p className="mt-2 text-sm text-slate-600">{job.description}</p>
                    )}
                  </div>
                  <a
                    href={`mailto:${cms.settings.contactEmail}?subject=Application: ${job.title}`}
                    className="inline-flex shrink-0 rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-800"
                  >
                    Apply Now
                  </a>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
