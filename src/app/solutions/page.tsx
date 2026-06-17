import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { CmsImage } from "@/components/CmsImage";
import { SectionReveal } from "@/components/SectionReveal";
import { getCMS } from "@/lib/cms-store";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solutions",
};

export default async function SolutionsPage() {
  const cms = await getCMS();

  return (
    <SiteLayout>
      <PageHero
        title={cms.home.solutionsTitle}
        subtitle={cms.home.solutionsSubtitle}
      />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {cms.solutions.map((solution, i) => (
              <SectionReveal key={solution.id} delay={i * 0.08}>
                <Link
                  href={`/solutions/${solution.slug}`}
                  className="group flex overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative hidden w-48 shrink-0 sm:block">
                    <CmsImage src={solution.image} alt={solution.title} fill sizes="192px" />
                  </div>
                  <div className="flex flex-1 flex-col p-8">
                    <h2 className="text-2xl font-bold text-[#071525] group-hover:text-teal-800">
                      {solution.title}
                    </h2>
                    <p className="mt-4 flex-1 text-slate-600">{solution.shortDescription}</p>
                    <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-teal-700">
                      Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
