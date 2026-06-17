import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SiteLayout } from "@/components/SiteLayout";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { CmsImage } from "@/components/CmsImage";
import { HeroVisual } from "@/components/HeroVisual";
import { ClientsMarquee } from "@/components/ClientsMarquee";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SectionReveal } from "@/components/SectionReveal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getCMS } from "@/lib/cms-store";

export default async function HomePage() {
  const cms = await getCMS();
  const { home, solutions, testimonials, brands, blog, products } = cms;

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="hero-pattern border-b border-gray-200">
        <Container className="grid min-h-[28rem] items-center gap-10 py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <SectionReveal>
            <p className="eyebrow-line mb-4 text-xs font-bold uppercase tracking-wider text-accent">
              {cms.settings.tagline}
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-primary sm:text-5xl lg:text-6xl">
              {home.heroTitle}
              <br />
              <span className="text-primary">{home.heroTitleLine2}</span>
            </h1>
            {home.heroSubtitle && (
              <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
                {home.heroSubtitle}
              </p>
            )}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={home.heroCtaLink} className="btn-primary">
                {home.heroCtaText}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={home.heroSecondaryCtaLink} className="btn-outline">
                {home.heroSecondaryCtaText}
              </Link>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <HeroVisual image={home.heroImage} />
          </SectionReveal>
        </Container>
      </section>

      {/* Stats */}
      <section className="section-alt section-pad">
        <Container>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {home.stats.map((stat, i) => (
              <SectionReveal key={stat.label} delay={i * 0.08}>
                <div className="text-center">
                  <div className="stat-value">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="mt-2 text-sm font-medium text-gray-500">{stat.label}</p>
                </div>
              </SectionReveal>
            ))}
            {home.linenWashedValue > 0 && (
              <SectionReveal key={home.linenWashedLabel} delay={home.stats.length * 0.08}>
                <div className="text-center">
                  <div className="stat-value">
                    <AnimatedCounter end={home.linenWashedValue} suffix={home.linenWashedSuffix} />
                  </div>
                  <p className="mt-2 text-sm font-medium text-gray-500">{home.linenWashedLabel}</p>
                </div>
              </SectionReveal>
            )}
          </div>
        </Container>
      </section>

      {/* Solutions */}
      <section className="section-pad">
        <Container>
          <SectionReveal>
            <SectionHeading title={home.solutionsTitle} subtitle={home.solutionsSubtitle} />
          </SectionReveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {solutions.map((solution, i) => (
              <SectionReveal key={solution.id} delay={i * 0.06}>
                <Link
                  href={`/solutions/${solution.slug}`}
                  className="card card-lift group flex h-full flex-col overflow-hidden p-0"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <CmsImage
                      src={solution.image}
                      alt={solution.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-semibold text-primary transition-colors group-hover:text-accent">
                      {solution.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
                      {solution.shortDescription}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                      Read More
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Products */}
      {products?.length > 0 && home.productsTitle && (
        <section className="section-alt section-pad">
          <Container>
            <SectionReveal>
              <SectionHeading title={home.productsTitle} subtitle={home.productsSubtitle} />
            </SectionReveal>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.slice(0, 4).map((product, i) => (
                <SectionReveal key={product.id} delay={i * 0.06}>
                  <Link
                    href={`/products/${product.slug}`}
                    className="card card-lift group flex h-full flex-col overflow-hidden p-0"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <CmsImage
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, 25vw"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-semibold text-primary transition-colors group-hover:text-accent">
                        {product.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
                        {product.shortDescription}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                        View Product
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </SectionReveal>
              ))}
            </div>
            {products.length > 4 && (
              <div className="mt-10 text-center">
                <Link href="/products" className="btn-outline">
                  View All Products
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </Container>
        </section>
      )}

      {/* Clients */}
      <ClientsMarquee items={brands} title={home.brandsTitle} />

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="section-alt section-pad">
          <Container>
            <SectionReveal>
              <SectionHeading eyebrow="Clients" title={home.clientsTitle} />
            </SectionReveal>
            {testimonials.map((t, i) => (
              <SectionReveal key={t.id} delay={i * 0.1}>
                <blockquote className="mx-auto mt-12 max-w-3xl text-center">
                  {t.image && (
                    <div className="relative mx-auto mb-6 h-16 w-16 overflow-hidden rounded-full ring-2 ring-accent/20">
                      <CmsImage src={t.image} alt={t.author} fill />
                    </div>
                  )}
                  <p className="text-lg leading-relaxed text-gray-700 sm:text-xl">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer className="mt-6 text-sm font-semibold uppercase tracking-wider text-primary">
                    — {t.author}
                  </footer>
                </blockquote>
              </SectionReveal>
            ))}
          </Container>
        </section>
      )}

      {/* News */}
      <section className="section-pad">
        <Container>
          <SectionReveal>
            <SectionHeading title={home.newsTitle} subtitle={home.newsSubtitle} />
          </SectionReveal>
          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2">
              {blog.map((post, i) => (
                <SectionReveal key={post.id} delay={i * 0.06}>
                  <Link href={`/${post.slug}`} className="card card-lift group block overflow-hidden">
                    <div className="relative aspect-video overflow-hidden">
                      <CmsImage
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <span className="text-xs font-bold uppercase tracking-wider text-accent">
                        {post.category}
                      </span>
                      <h3 className="mt-2 font-semibold leading-snug text-primary transition-colors group-hover:text-accent">
                        {post.title}
                      </h3>
                    </div>
                  </Link>
                </SectionReveal>
              ))}
            </div>
            <SectionReveal delay={0.15}>
              <NewsletterForm title={home.newsletterTitle} subtitle={home.newsletterSubtitle} />
            </SectionReveal>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="gradient-primary section-pad text-center text-white">
        <Container>
          <SectionReveal>
            <p className="text-lg text-gray-300">{cms.settings.tagline}</p>
            <Link href={home.heroSecondaryCtaLink} className="btn-primary mt-6">
              {home.heroSecondaryCtaText}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </SectionReveal>
        </Container>
      </section>
    </SiteLayout>
  );
}
