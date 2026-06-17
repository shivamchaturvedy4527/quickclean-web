import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { CmsImage } from "@/components/CmsImage";
import { LogoMarquee } from "@/components/LogoMarquee";
import { VideoSection } from "@/components/VideoSection";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SectionReveal } from "@/components/SectionReveal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getCMS } from "@/lib/cms-store";

const SUSTAINABILITY_IMAGES = [
  "/images/sustainability-water.jpg",
  "/images/sustainability-carbon.jpg",
];

export default async function HomePage() {
  const cms = await getCMS();
  const { home, solutions, testimonials, brands, blog } = cms;

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative min-h-[580px] overflow-hidden bg-hero-tint sm:min-h-[660px]">
        <CmsImage src={home.heroImage} alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/96 via-white/82 to-white/25" />
        <div className="absolute inset-0 gradient-mesh opacity-60" />
        <div className="absolute bottom-0 left-0 right-0 section-divider" />

        <Container className="relative flex min-h-[580px] flex-col justify-center py-24 sm:min-h-[660px]">
          <SectionReveal className="max-w-2xl">
            <p className="eyebrow-line mb-5 text-xs font-bold uppercase tracking-[0.22em] text-accent">
              Commercial Laundry Excellence
            </p>
            <h1 className="font-display text-[2.5rem] font-medium leading-[1.06] tracking-tight text-navy sm:text-5xl lg:text-[3.5rem]">
              {home.heroTitle}
            </h1>
            <h1 className="font-display mt-1 text-[2.5rem] font-medium leading-[1.06] tracking-tight text-navy sm:text-5xl lg:text-[3.5rem]">
              {home.heroTitleLine2}
            </h1>
            {home.heroSubtitle && (
              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                {home.heroSubtitle}
              </p>
            )}
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href={home.heroCtaLink} className="btn-primary">
                {home.heroCtaText}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={home.heroSecondaryCtaLink}
                className="btn-accent"
              >
                {home.heroSecondaryCtaText}
              </Link>
            </div>
          </SectionReveal>
        </Container>
      </section>

      {/* Stats */}
      <section className="section-alt section-pad !py-14">
        <Container>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
            {home.stats.map((stat, i) => (
              <SectionReveal key={stat.label} delay={i * 0.08}>
                <div className="group relative text-center">
                  <div className="mx-auto mb-4 h-px w-12 bg-gradient-to-r from-transparent via-accent to-transparent opacity-60 transition-all group-hover:w-20 group-hover:opacity-100" />
                  <div className="stat-value">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="mt-2 text-sm font-medium tracking-wide text-slate-500">{stat.label}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Linen + Water */}
      <section className="section-pad">
        <Container>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <SectionReveal className="card card-lift card-premium p-8 text-center">
              <div className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
                {home.linenWashedLabel}
              </div>
              <div className="stat-value mt-4">
                <AnimatedCounter end={home.linenWashedValue} suffix={home.linenWashedSuffix} />
              </div>
              <div className="mt-1 text-sm text-slate-500">{home.linenWashedUnit}</div>
            </SectionReveal>

            <SectionReveal delay={0.06} className="card card-lift card-premium p-8 text-center">
              <div className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
                {home.waterComparison.title}
              </div>
              <div className="mt-4 text-2xl font-semibold text-navy">
                <AnimatedCounter end={home.waterComparison.industryDisplayValue} />
              </div>
              <div className="text-xs text-slate-500">{home.waterComparison.industryLabel}</div>
              <div className="mx-auto my-4 h-px w-8 bg-border" />
              <div className="text-2xl font-semibold text-accent-bright">
                <AnimatedCounter end={home.waterComparison.qcDisplayValue} />
              </div>
              <div className="text-xs text-slate-500">{home.waterComparison.qcLabel}</div>
            </SectionReveal>

            <SectionReveal delay={0.12} className="card card-lift card-premium p-8 text-center">
              <div className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
                {home.waterComparison.monthlySavedLabel}
              </div>
              <div className="stat-value mt-4">
                <AnimatedCounter end={home.waterComparison.monthlySaved} />
              </div>
              <div className="mt-1 text-xs text-slate-500">Litres saved this month</div>
            </SectionReveal>

            <SectionReveal delay={0.18} className="card card-lift card-premium p-8 text-center">
              <div className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
                {home.waterComparison.yearlySavedLabel}
              </div>
              <div className="stat-value mt-4">
                <AnimatedCounter end={home.waterComparison.yearlySaved} />
              </div>
              <div className="mt-1 text-xs text-slate-500">Litres saved this year</div>
            </SectionReveal>
          </div>
        </Container>
      </section>

      {/* Solutions */}
      <section className="section-alt section-pad">
        <Container>
          <SectionReveal>
            <SectionHeading title={home.solutionsTitle} subtitle={home.solutionsSubtitle} />
          </SectionReveal>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {solutions.map((solution, i) => (
              <SectionReveal key={solution.id} delay={i * 0.06}>
                <Link
                  href={`/${solution.slug}`}
                  className="card card-lift group flex h-full flex-col overflow-hidden p-0"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <CmsImage
                      src={solution.image}
                      alt={solution.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-semibold text-navy transition-colors group-hover:text-accent">
                      {solution.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
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

      {/* Founder */}
      <section className="section-pad">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
            <SectionReveal>
              <div className="relative mx-auto aspect-square max-w-md">
                <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-accent/20 to-navy/10 blur-sm" />
                <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-navy/15 ring-1 ring-border">
                  <CmsImage src={home.founderImage} alt={home.founderName} fill className="object-cover" />
                </div>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <p className="eyebrow-line mb-4 text-xs font-bold uppercase tracking-[0.2em] text-accent">
                Leadership
              </p>
              <h2 className="font-display text-3xl font-medium text-navy sm:text-4xl">
                {home.founderTitle}
              </h2>
              <p className="mt-6 text-base leading-[1.8] text-slate-600 sm:text-lg">
                {home.founderMessage}
              </p>
              <p className="mt-8 inline-flex items-center gap-3 border-t border-border pt-6 font-semibold text-navy">
                <span className="h-8 w-0.5 rounded-full bg-accent" />
                {home.founderRole}: {home.founderName}
              </p>
            </SectionReveal>
          </div>
        </Container>
      </section>

      <VideoSection
        title={home.videoTitle}
        videoUrl={home.videoUrl}
        thumbnail={home.videoThumbnail}
        sinceYear={home.sinceYear}
      />

      <LogoMarquee brands={brands} title={home.brandsTitle} />

      {/* Sustainability impact */}
      <section className="section-pad">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {home.sustainabilityStats.map((stat, i) => (
              <SectionReveal key={stat.label} delay={i * 0.1}>
                <div className="group relative aspect-[16/10] overflow-hidden rounded-2xl shadow-xl shadow-navy/10 ring-1 ring-border">
                  <CmsImage
                    src={SUSTAINABILITY_IMAGES[i] ?? SUSTAINABILITY_IMAGES[0]}
                    alt={stat.label}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/92 via-navy/55 to-navy/20" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-white">
                    <div className="font-display text-5xl font-medium sm:text-6xl">
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="mt-4 max-w-xs text-lg leading-snug text-slate-200">{stat.label}</div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials */}
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
                <p className="font-display text-xl leading-relaxed text-slate-700 sm:text-2xl lg:text-[1.75rem]">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-8 text-sm font-semibold uppercase tracking-[0.15em] text-navy">
                  — {t.author}
                </footer>
              </blockquote>
            </SectionReveal>
          ))}
        </Container>
      </section>

      {/* News */}
      <section className="section-pad">
        <Container>
          <SectionReveal>
            <SectionHeading title={home.newsTitle} subtitle={home.newsSubtitle} />
          </SectionReveal>
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2">
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
                      <span className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-accent">
                        {post.category}
                      </span>
                      <h3 className="mt-2.5 font-semibold leading-snug text-navy transition-colors group-hover:text-accent">
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
