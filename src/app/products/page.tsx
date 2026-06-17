import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { CmsImage } from "@/components/CmsImage";
import { SectionReveal } from "@/components/SectionReveal";
import { getCMS } from "@/lib/cms-store";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
};

export default async function ProductsPage() {
  const cms = await getCMS();
  const { products, productsPage } = cms;

  return (
    <SiteLayout>
      <PageHero
        title={productsPage.title}
        subtitle={productsPage.intro.split("\n\n")[0]}
        image={productsPage.heroImage}
      />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {productsPage.intro && (
            <SectionReveal>
              <div className="mx-auto mb-14 max-w-3xl space-y-4 text-lg leading-relaxed text-slate-600">
                {productsPage.intro.split("\n\n").map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </SectionReveal>
          )}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <SectionReveal key={product.id} delay={i * 0.05}>
                <Link
                  href={`/products/${product.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <CmsImage
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    {product.category && (
                      <span className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-teal-700">
                        {product.category}
                      </span>
                    )}
                    <h2 className="mt-2 text-xl font-bold text-[#071525] group-hover:text-teal-800">
                      {product.title}
                    </h2>
                    <p className="mt-3 flex-1 text-sm text-slate-600">{product.shortDescription}</p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-teal-700">
                      View details <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
