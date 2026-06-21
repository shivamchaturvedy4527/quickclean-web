import { getCMS } from "@/lib/cms-store";
import { SiteLayout } from "@/components/SiteLayout";
import { CmsImage } from "@/components/CmsImage";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateSolutionMetadata(slug: string): Promise<Metadata> {
  const cms = await getCMS();
  const solution = cms.solutions.find((s) => s.slug === slug);
  return { title: solution?.title ?? cms.labels.meta.solutions };
}

export async function SolutionDetail({ slug }: { slug: string }) {
  const cms = await getCMS();
  const solution = cms.solutions.find((s) => s.slug === slug);
  const { labels } = cms;
  if (!solution) notFound();

  return (
    <SiteLayout>
      <PageHero
        title={solution.title}
        subtitle={solution.shortDescription}
        image={solution.image}
        breadcrumb={solution.breadcrumb ?? labels.breadcrumbs.ourSolutions}
      />
      <section className="section-pad">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {solution.image && (
              <div className="relative aspect-video overflow-hidden rounded-lg border border-gray-200 shadow-lg">
                <CmsImage src={solution.image} alt={solution.title} fill className="object-cover" />
              </div>
            )}
            <div>
              <div className="prose-legal space-y-4">
                {solution.description.split("\n\n").map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              {solution.features.length > 0 && (
                <>
                  <h2 className="mt-10 text-2xl font-bold tracking-tight text-gray-900">
                    {solution.benefitsHeading ?? labels.solutions.keyPointsHeading}
                  </h2>
                  <ul className="mt-5 space-y-3">
                    {solution.features.map((f) => (
                      <li key={f} className="flex gap-3 text-gray-700">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <Link href={solution.ctaLink ?? "/contact-us"} className="btn-secondary mt-10 inline-flex">
                {solution.ctaText ?? labels.solutions.contactCta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </SiteLayout>
  );
}
