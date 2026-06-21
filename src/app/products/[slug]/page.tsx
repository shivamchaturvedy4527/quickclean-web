import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { ImageGalleryCarousel } from "@/components/ImageGalleryCarousel";
import { PressingMachinesGrid } from "@/components/PressingMachinesGrid";
import { Container } from "@/components/ui/Container";
import { getCMS } from "@/lib/cms-store";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const cms = await getCMS();
  return cms.products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cms = await getCMS();
  const product = cms.products.find((p) => p.slug === slug);
  return { title: product?.title ?? "Product" };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const cms = await getCMS();
  const product = cms.products.find((p) => p.slug === slug);

  if (!product) notFound();

  const gallery = Array.from(
    new Set([product.image, ...(product.gallery ?? [])].map((src) => src.trim()).filter(Boolean))
  );
  const specs = product.specs?.length ? product.specs : product.features;
  const isPressingPortfolio = product.slug === "pressing-machines-portfolio";
  const page = cms.productsPage;
  const { labels } = cms;

  return (
    <SiteLayout>
      <PageHero
        title={product.title}
        subtitle={product.shortDescription}
        image={product.image}
        breadcrumb={product.breadcrumb ?? labels.breadcrumbs.products}
      />

      <section className="section-pad">
        <Container>
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ImageGalleryCarousel images={gallery} alt={product.title} className="mb-10" />

              <div className="prose-legal">
                {product.description.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {specs.length > 0 && (
                <>
                  <h2 className="mt-10 text-2xl font-bold tracking-tight text-primary">
                    {product.category === "Commercial Laundry"
                      ? (product.specsHeading ?? page.specsHeading ?? labels.products.specsHeading)
                      : (product.featuresHeading ?? page.featuresHeading ?? labels.products.featuresHeading)}
                  </h2>
                  <ul className="mt-5 space-y-3">
                    {specs.map((feature) => (
                      <li key={feature} className="flex gap-3 rounded-lg border border-gray-100 bg-gray-50/80 px-4 py-3 text-gray-700">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                        <span className="text-sm leading-relaxed sm:text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            <div className="card h-fit p-6 lg:sticky lg:top-24">
              <h3 className="text-lg font-bold text-primary">
                {product.enquireTitle ?? page.enquireTitle ?? labels.products.enquireTitle}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                {product.enquireText ?? page.enquireText ?? labels.products.enquireText}
              </p>
              {product.category && (
                <p className="mt-4 text-xs font-bold uppercase tracking-wider text-accent">{product.category}</p>
              )}
              <Link href="/contact-us" className="btn-primary mt-6 w-full">
                {product.enquireCtaText ?? page.enquireCtaText ?? labels.products.enquireCta} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {isPressingPortfolio && cms.pressingMachines && (
        <PressingMachinesGrid content={cms.pressingMachines} compact />
      )}
    </SiteLayout>
  );
}
