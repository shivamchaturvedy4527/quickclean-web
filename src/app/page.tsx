import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { SiteLayout } from "@/components/SiteLayout";

import { AnimatedCounter } from "@/components/AnimatedCounter";

import { CmsImage } from "@/components/CmsImage";

import { HeroVisual } from "@/components/HeroVisual";

import { LogoMarquee } from "@/components/LogoMarquee";

import { clientsToMarqueeBrands } from "@/lib/clients-marquee";

import { VideoSection } from "@/components/VideoSection";

import { NewsletterForm } from "@/components/NewsletterForm";

import { SectionReveal } from "@/components/SectionReveal";

import { Container } from "@/components/ui/Container";

import { SectionHeading } from "@/components/ui/SectionHeading";

import { getCMS } from "@/lib/cms-store";



export default async function HomePage() {

  const cms = await getCMS();

  const { home, solutions, testimonials, brands, blog, products, clients } = cms;



  return (

    <SiteLayout>

      {/* Hero */}

      <section className="relative overflow-hidden hero-pattern">

        <div className="absolute inset-0 gradient-mesh" />

        <div className="absolute bottom-0 left-0 right-0 section-divider" />



        <Container className="relative grid min-h-[32rem] items-center gap-12 py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">

          <SectionReveal>

            <p className="eyebrow-line mb-5 text-xs font-bold uppercase tracking-wider text-accent">

              {cms.settings.tagline || "Commercial Laundry Excellence"}

            </p>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">

              {home.heroTitle}

            </h1>

            <h1 className="mt-1 text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">

              {home.heroTitleLine2}

            </h1>

            {home.heroSubtitle && (

              <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">

                {home.heroSubtitle}

              </p>

            )}

            <div className="mt-9 flex flex-wrap gap-4">

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

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">

            {home.stats.map((stat, i) => (

              <SectionReveal key={stat.label} delay={i * 0.08}>

                <div className="group relative text-center">

                  <div className="mx-auto mb-4 h-px w-12 bg-gradient-to-r from-transparent via-accent to-transparent opacity-60 transition-all group-hover:w-20 group-hover:opacity-100" />

                  <div className="stat-value">

                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />

                  </div>

                  <p className="mt-2 text-sm font-medium tracking-wide text-gray-500">{stat.label}</p>

                </div>

              </SectionReveal>

            ))}

            {home.linenWashedValue > 0 && (

              <SectionReveal key={home.linenWashedLabel} delay={home.stats.length * 0.08}>

                <div className="group relative text-center">

                  <div className="mx-auto mb-4 h-px w-12 bg-gradient-to-r from-transparent via-accent to-transparent opacity-60 transition-all group-hover:w-20 group-hover:opacity-100" />

                  <div className="stat-value">

                    <AnimatedCounter end={home.linenWashedValue} suffix={home.linenWashedSuffix} />

                  </div>

                  <p className="mt-2 text-sm font-medium tracking-wide text-gray-500">{home.linenWashedLabel}</p>

                </div>

              </SectionReveal>

            )}

          </div>

        </Container>

      </section>



      {/* Linen + Water */}

      {home.waterComparison.monthlySaved > 0 && (

      <section className="section-pad">

        <Container>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">

            <SectionReveal delay={0.06} className="card card-lift card-premium p-8 text-center">

              <div className="text-xs font-bold uppercase tracking-wider text-gray-400">

                {home.waterComparison.title}

              </div>

              <div className="mt-4 text-2xl font-semibold text-gray-900">

                <AnimatedCounter end={home.waterComparison.industryDisplayValue} />

              </div>

              <div className="text-xs text-gray-500">{home.waterComparison.industryLabel}</div>

              <div className="mx-auto my-4 h-px w-8 bg-border" />

              <div className="text-2xl font-semibold text-accent">

                <AnimatedCounter end={home.waterComparison.qcDisplayValue} />

              </div>

              <div className="text-xs text-gray-500">{home.waterComparison.qcLabel}</div>

            </SectionReveal>



            <SectionReveal delay={0.12} className="card card-lift card-premium p-8 text-center">

              <div className="text-xs font-bold uppercase tracking-wider text-gray-400">

                {home.waterComparison.monthlySavedLabel}

              </div>

              <div className="stat-value mt-4">

                <AnimatedCounter end={home.waterComparison.monthlySaved} />

              </div>

              <div className="mt-1 text-xs text-gray-500">Litres saved this month</div>

            </SectionReveal>



            <SectionReveal delay={0.18} className="card card-lift card-premium p-8 text-center">

              <div className="text-xs font-bold uppercase tracking-wider text-gray-400">

                {home.waterComparison.yearlySavedLabel}

              </div>

              <div className="stat-value mt-4">

                <AnimatedCounter end={home.waterComparison.yearlySaved} />

              </div>

              <div className="mt-1 text-xs text-gray-500">Litres saved this year</div>

            </SectionReveal>

          </div>

        </Container>

      </section>

      )}



      {/* Solutions */}

      <section className="section-alt section-pad">

        <Container>

          <SectionReveal>

            <SectionHeading title={home.solutionsTitle} subtitle={home.solutionsSubtitle} />

          </SectionReveal>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

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

                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"

                      sizes="(max-width: 768px) 100vw, 25vw"

                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  </div>

                  <div className="flex flex-1 flex-col p-6">

                    <h3 className="font-semibold text-gray-900 transition-colors group-hover:text-accent">

                      {solution.title}

                    </h3>

                    <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600">

                      {solution.shortDescription}

                    </p>

                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">

                      Read More

                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />

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

        <section className="section-pad">

          <Container>

            <SectionReveal>

              <SectionHeading title={home.productsTitle} subtitle={home.productsSubtitle} />

            </SectionReveal>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

              {products.slice(0, 8).map((product, i) => (

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

                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"

                        sizes="(max-width: 768px) 100vw, 25vw"

                      />

                    </div>

                    <div className="flex flex-1 flex-col p-6">

                      <h3 className="font-semibold text-gray-900 transition-colors group-hover:text-accent">

                        {product.title}

                      </h3>

                      <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600">

                        {product.shortDescription}

                      </p>

                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">

                        View Product

                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />

                      </span>

                    </div>

                  </Link>

                </SectionReveal>

              ))}

            </div>

            {products.length > 8 && (

              <div className="mt-12 text-center">

                <Link href="/products" className="btn-primary">

                  View All Products

                  <ArrowRight className="h-4 w-4" />

                </Link>

              </div>

            )}

          </Container>

        </section>

      )}



      {/* Founder */}

      {home.founderName && (

      <section className="section-pad">

        <Container>

          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">

            <SectionReveal>

              <div className="relative mx-auto aspect-square max-w-md">

                <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-accent/15 to-primary/5 blur-sm" />

                <div className="relative overflow-hidden rounded-xl shadow-xl shadow-primary/10 ring-1 ring-gray-200">

                  <CmsImage src={home.founderImage} alt={home.founderName} fill className="object-cover" />

                </div>

              </div>

            </SectionReveal>

            <SectionReveal delay={0.1}>

              <p className="eyebrow-line mb-4 text-xs font-bold uppercase tracking-wider text-accent">

                Leadership

              </p>

              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">

                {home.founderTitle}

              </h2>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">

                {home.founderMessage}

              </p>

              <p className="mt-8 inline-flex items-center gap-3 border-t border-gray-200 pt-6 font-semibold text-gray-900">

                <span className="h-8 w-0.5 rounded-full bg-accent" />

                {home.founderRole}: {home.founderName}

              </p>

            </SectionReveal>

          </div>

        </Container>

      </section>

      )}



      {home.videoUrl && (

      <VideoSection

        title={home.videoTitle}

        videoUrl={home.videoUrl}

        thumbnail={home.videoThumbnail}

        sinceYear={home.sinceYear}

      />

      )}



      <LogoMarquee brands={brands} title={home.brandsTitle} />

      <LogoMarquee
        brands={clientsToMarqueeBrands(clients)}
        title={home.clientsTitle}
        showCaptions
        variant="clients"
      />



      {/* Sustainability impact */}

      {home.sustainabilityStats.length > 0 && (

      <section className="section-pad">

        <Container>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

            {home.sustainabilityStats.map((stat, i) => (

              <SectionReveal key={stat.label} delay={i * 0.1}>

                <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-br from-primary via-primary-light to-primary shadow-lg">

                  <div className="absolute inset-0 opacity-30">

                    <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-accent/20 blur-2xl" />

                    <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-indigo-400/10 blur-2xl" />

                  </div>

                  <div className="relative flex flex-col items-center justify-center p-12 text-center text-white">

                    <div className="text-5xl font-bold tracking-tight sm:text-6xl">

                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />

                    </div>

                    <div className="mt-4 max-w-xs text-lg leading-snug text-gray-300">{stat.label}</div>

                  </div>

                </div>

              </SectionReveal>

            ))}

          </div>

        </Container>

      </section>

      )}



      {/* Testimonials */}

      {testimonials.length > 0 && (

      <section className="section-alt section-pad">

        <Container>

          <SectionReveal>

            <SectionHeading eyebrow="Clients" title={home.clientsTitle} />

          </SectionReveal>

          {testimonials.map((t, i) => (

            <SectionReveal key={t.id} delay={i * 0.1}>

              <blockquote className="mx-auto mt-14 max-w-3xl text-center">

                {t.image && (

                  <div className="relative mx-auto mb-8 h-20 w-20 overflow-hidden rounded-full ring-4 ring-accent/15 ring-offset-4 ring-offset-white">

                    <CmsImage src={t.image} alt={t.author} fill />

                  </div>

                )}

                <p className="text-xl leading-relaxed text-gray-700 sm:text-2xl">

                  &ldquo;{t.quote}&rdquo;

                </p>

                <footer className="mt-8 text-sm font-semibold uppercase tracking-wider text-gray-900">

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

          <div className="mt-16 grid gap-8 lg:grid-cols-3">

            <div className="grid gap-8 sm:grid-cols-2 lg:col-span-2">

              {blog.map((post, i) => (

                <SectionReveal key={post.id} delay={i * 0.06}>

                  <Link

                    href={`/${post.slug}`}

                    className="card card-lift group block overflow-hidden"

                  >

                    <div className="relative aspect-video overflow-hidden">

                      <CmsImage

                        src={post.image}

                        alt={post.title}

                        fill

                        className="object-cover transition-transform duration-700 group-hover:scale-105"

                      />

                    </div>

                    <div className="p-6">

                      <span className="text-xs font-bold uppercase tracking-wider text-accent">

                        {post.category}

                      </span>

                      <h3 className="mt-2.5 font-semibold leading-snug text-gray-900 transition-colors group-hover:text-accent">

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

    </SiteLayout>

  );

}

