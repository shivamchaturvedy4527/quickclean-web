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

  const gallery = product.gallery?.length ? product.gallery : [product.image];

  return (
    <SiteLayout>
      <PageHero
        title={product.title}
        subtitle={product.shortDescription}
        image={product.image}
        breadcrumb="Products"
      />

      <section className="section-pad">
        <Container>
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="relative mb-10 aspect-video overflow-hidden rounded-lg border border-gray-200">
                <CmsImage src={product.image} alt={product.title} fill sizes="(max-width: 1024px) 100vw, 66vw" />
              </div>
              {product.description.split("\n\n").map((para, i) => (
                <p key={i} className={i > 0 ? "mt-4 text-lg leading-relaxed text-gray-700" : "text-lg leading-relaxed text-gray-700"}>
                  {para}
                </p>
              ))}
              {product.features.length > 0 && (
                <>
                  <h2 className="mt-10 text-xl font-semibold text-gray-900">Key Features</h2>
                  <ul className="mt-4 space-y-3">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex gap-3 text-gray-700">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {gallery.length > 1 && (
                <div className="mt-10 grid gap-4 sm:grid-cols-2">
                  {gallery.slice(1).map((src) => (
                    <div key={src} className="relative aspect-video overflow-hidden rounded-lg border border-gray-200">
                      <CmsImage src={src} alt={product.title} fill sizes="50vw" className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="card h-fit p-6">
              <h3 className="font-semibold text-gray-900">Enquire About This Product</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Contact Pcts Infrastructures for specifications, pricing and installation support across India.
              </p>
              <Link href="/contact-us" className="btn-primary mt-6 w-full">
                Contact Us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </SiteLayout>
  );
}
