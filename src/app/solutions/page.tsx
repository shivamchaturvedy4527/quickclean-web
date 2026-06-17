import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { CmsImage } from "@/components/CmsImage";
import { SectionReveal } from "@/components/SectionReveal";
import { Container } from "@/components/ui/Container";
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

      <section className="section-pad">
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            {cms.solutions.map((solution, i) => (
              <SectionReveal key={solution.id} delay={i * 0.08}>
                <Link
                  href={`/solutions/${solution.slug}`}
                  className="card card-lift group flex overflow-hidden p-0"
                >
                  <div className="relative hidden aspect-[4/3] w-48 shrink-0 overflow-hidden sm:block">
                    <CmsImage src={solution.image} alt={solution.title} fill sizes="192px" className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col p-8">
                    <h2 className="text-2xl font-bold text-gray-900 transition-colors group-hover:text-accent">
                      {solution.title}
                    </h2>
                    <p className="mt-4 flex-1 text-gray-600">{solution.shortDescription}</p>
                    <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                      Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </section>
    </SiteLayout>
  );
}
