import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { CmsImage } from "@/components/CmsImage";
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
      <section className="relative overflow-hidden bg-[#071525] py-20 text-white">
        <CmsImage src={product.image} alt="" fill className="object-cover opacity-25" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071525] to-[#071525]/80" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-medium text-teal-400">
            <Link href="/products" className="hover:underline">
              Products
            </Link>{" "}
            / {product.title}
          </p>
          <h1 className="mt-4 text-4xl font-bold">{product.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">{product.shortDescription}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div className="lg:col-span-2">
            <div className="relative mb-10 aspect-video overflow-hidden rounded-2xl">
              <CmsImage src={product.image} alt={product.title} fill sizes="(max-width: 1024px) 100vw, 66vw" />
            </div>
            {product.description.split("\n\n").map((para, i) => (
              <p key={i} className={i > 0 ? "mt-4 text-lg leading-relaxed text-slate-700" : "text-lg leading-relaxed text-slate-700"}>
                {para}
              </p>
            ))}
            {product.features.length > 0 && (
              <>
                <h2 className="mt-10 text-xl font-semibold text-[#071525]">Key Features</h2>
                <ul className="mt-4 space-y-3">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {gallery.length > 1 && (
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {gallery.slice(1).map((src) => (
                  <div key={src} className="relative aspect-video overflow-hidden rounded-xl">
                    <CmsImage src={src} alt={product.title} fill sizes="50vw" className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-semibold text-[#071525]">Enquire About This Product</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Contact Pcts Infrastructures for specifications, pricing and installation support across India.
            </p>
            <Link
              href="/contact-us"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-teal-700 px-4 py-3 text-sm font-semibold text-white hover:bg-teal-800"
            >
              Contact Us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
