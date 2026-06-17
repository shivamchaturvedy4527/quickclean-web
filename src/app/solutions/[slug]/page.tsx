import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { CmsImage } from "@/components/CmsImage";
import { Container } from "@/components/ui/Container";
import { getCMS } from "@/lib/cms-store";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const cms = await getCMS();
  return cms.solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cms = await getCMS();
  const solution = cms.solutions.find((s) => s.slug === slug);
  return { title: solution?.title ?? "Solution" };
}

export default async function SolutionDetailPage({ params }: Props) {
  const { slug } = await params;
  const cms = await getCMS();
  const solution = cms.solutions.find((s) => s.slug === slug);

  if (!solution) notFound();

  return (
    <SiteLayout>
      <PageHero
        title={solution.title}
        subtitle={solution.shortDescription}
        image={solution.heroImage || solution.image}
        breadcrumb="Our Solutions"
      />

      <section className="section-pad">
        <Container>
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="relative mb-10 aspect-video overflow-hidden rounded-lg border border-gray-200">
                <CmsImage src={solution.image} alt={solution.title} fill sizes="(max-width: 1024px) 100vw, 66vw" />
              </div>
              <p className="text-lg leading-relaxed text-gray-700">{solution.description}</p>
              <h2 className="mt-10 text-xl font-semibold text-gray-900">Key Benefits</h2>
              <ul className="mt-4 space-y-3">
                {solution.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-gray-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card h-fit p-6">
              <h3 className="font-semibold text-gray-900">Partner With Us</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Every on-premise laundry is unique. Speak with our solutions team for a tailored
                proposal — BOO, turnkey, linen, or equipment lease models scoped to your facility.
              </p>
              <Link
                href={solution.ctaLink ?? "/contact-us"}
                className="btn-primary mt-6 w-full"
              >
                {solution.ctaText ?? "Contact Us"} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </SiteLayout>
  );
}
