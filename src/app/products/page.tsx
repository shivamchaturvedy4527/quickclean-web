import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { CmsImage } from "@/components/CmsImage";
import { PressingMachinesGrid } from "@/components/PressingMachinesGrid";
import { SectionReveal } from "@/components/SectionReveal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getCMS } from "@/lib/cms-store";
import type { Product } from "@/types/cms";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
};

export default async function ProductsPage() {
  const cms = await getCMS();
  const { products, productsPage, pressingMachines } = cms;
  const overview = products.filter((p) => p.category === "Products Portfolio");
  const machines = products.filter((p) => p.category === "Commercial Laundry");

  return (
    <SiteLayout>
      <PageHero
        title={productsPage.title}
        subtitle={productsPage.intro.split("\n\n")[0]}
        image={productsPage.heroImage}
      />

      <section className="section-pad">
        <Container>
          {productsPage.intro && (
            <SectionReveal>
              <div className="mx-auto mb-14 max-w-3xl space-y-4 text-lg leading-relaxed text-gray-600">
                {productsPage.intro.split("\n\n").map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </SectionReveal>
          )}

          {overview.length > 0 && (
            <>
              <SectionReveal>
                <SectionHeading eyebrow="Overview" title="Product Range" align="left" className="max-w-none text-left" />
              </SectionReveal>
              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                {overview.map((product, i) => (
                  <SectionReveal key={product.id} delay={i * 0.05}>
                    <ProductCard product={product} />
                  </SectionReveal>
                ))}
              </div>
            </>
          )}

          <SectionReveal>
            <SectionHeading
              eyebrow="Commercial Laundry"
              title="Machines & Equipment"
              subtitle="Full PPT specifications for each machine category."
              align="left"
              className="mt-20 max-w-none text-left"
            />
          </SectionReveal>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {machines.map((product, i) => (
              <SectionReveal key={product.id} delay={i * 0.04}>
                <ProductCard product={product} showSpecs />
              </SectionReveal>
            ))}
          </div>
        </Container>
      </section>

      {pressingMachines && pressingMachines.items.length > 0 && (
        <div className="section-alt">
          <PressingMachinesGrid content={pressingMachines} />
        </div>
      )}
    </SiteLayout>
  );
}

function ProductCard({
  product,
  showSpecs,
}: {
  product: Product;
  showSpecs?: boolean;
}) {
  const specs = product.specs?.length ? product.specs : product.features;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="card card-lift group flex h-full flex-col overflow-hidden p-0"
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
          <span className="text-xs font-bold uppercase tracking-wider text-accent">{product.category}</span>
        )}
        <h2 className="mt-2 text-xl font-bold leading-snug text-gray-900 transition-colors group-hover:text-accent">
          {product.title}
        </h2>
        <p className="mt-3 text-sm text-gray-600 line-clamp-3">{product.shortDescription}</p>
        {showSpecs && specs.length > 0 && (
          <ul className="mt-4 space-y-2 border-t border-gray-100 pt-4">
            {specs.slice(0, 3).map((spec) => (
              <li key={spec} className="flex gap-2 text-xs text-gray-500">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-accent" />
                <span className="line-clamp-2">{spec}</span>
              </li>
            ))}
          </ul>
        )}
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent">
          View details <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
