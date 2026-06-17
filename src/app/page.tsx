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
      <section className="relative min-h-[560px] overflow-hidden bg-hero-tint sm:min-h-[620px]">
        <CmsImage src={home.heroImage} alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/30" />
        <div className="absolute inset-0 gradient-mesh opacity-40" />
        <Container className="relative flex min-h-[560px] items-center py-20 sm:min-h-[620px]">
          <SectionReveal className="max-w-2xl">
            <h1 className="font-display text-4xl font-medium leading-[1.1] tracking-tight text-navy sm:text-5xl lg:text-6xl">
              {home.heroTitle}
            </h1>
            <h1 className="font-display mt-1 text-4xl font-medium leading-[1.1] tracking-tight text-navy sm:text-5xl lg:text-6xl">
              {home.heroTitleLine2}
            </h1>
          </SectionReveal>
        </Container>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-white py-16">
        <Container>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
            {home.stats.map((stat, i) => (
              <SectionReveal key={stat.label} delay={i * 0.08}>
                <div className="text-center">
                  <div className="stat-value">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="mt-2 text-sm font-medium text-slate-600">{stat.label}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Linen + Water */}
      <section className="bg-background py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <SectionReveal className="card card-lift p-7 text-center">
              <div className="text-sm font-medium text-slate-500">{home.linenWashedLabel}</div>
              <div className="stat-value mt-3">
                <AnimatedCounter end={home.linenWashedValue} suffix={home.linenWashedSuffix} />
              </div>
              <div className="mt-1 text-sm text-slate-500">{home.linenWashedUnit}</div>
            </SectionReveal>

            <SectionReveal delay={0.06} className="card card-lift p-7 text-center">
              <div className="text-sm font-medium text-slate-500">{home.waterComparison.title}</div>
              <div className="mt-3 text-2xl font-semibold text-navy">
                <AnimatedCounter end={home.waterComparison.industryDisplayValue} />
              </div>
              <div className="text-xs text-slate-500">{home.waterComparison.industryLabel}</div>
              <div className="mt-4 text-2xl font-semibold text-accent-bright">
                <AnimatedCounter end={home.waterComparison.qcDisplayValue} />
              </div>
              <div className="text-xs text-slate-500">{home.waterComparison.qcLabel}</div>
            </SectionReveal>

            <SectionReveal delay={0.12} className="card card-lift p-7 text-center">
              <div className="text-sm font-medium text-slate-500">{home.waterComparison.monthlySavedLabel}</div>
              <div className="stat-value mt-3">
                <AnimatedCounter end={home.waterComparison.monthlySaved} />
              </div>
              <div className="text-xs text-slate-500">Litres saved this month</div>
            </SectionReveal>

            <SectionReveal delay={0.18} className="card card-lift p-7 text-center">
              <div className="text-sm font-medium text-slate-500">{home.waterComparison.yearlySavedLabel}</div>
              <div className="stat-value mt-3">
                <AnimatedCounter end={home.waterComparison.yearlySaved} />
              </div>
              <div className="text-xs text-slate-500">Litres saved this year</div>
            </SectionReveal>
          </div>
        </Container>
      </section>

      {/* Solutions */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionReveal>
            <SectionHeading
              title={home.solutionsTitle}
              subtitle={home.solutionsSubtitle}
            />
          </SectionReveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
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
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Founder */}
      <section className="bg-white py-16 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <SectionReveal>
              <div className="relative mx-auto aspect-square max-w-md overflow-hidden rounded-2xl shadow-xl shadow-navy/10">
                <CmsImage src={home.founderImage} alt={home.founderName} fill className="object-cover" />
              </div>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <h2 className="font-display text-3xl font-medium text-navy sm:text-4xl">
                {home.founderTitle}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg">
                {home.founderMessage}
              </p>
              <p className="mt-6 font-semibold text-navy">
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
      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {home.sustainabilityStats.map((stat, i) => (
              <SectionReveal key={stat.label} delay={i * 0.1}>
                <div className="group relative aspect-[16/10] overflow-hidden rounded-2xl shadow-lg">
                  <CmsImage
                    src={SUSTAINABILITY_IMAGES[i] ?? SUSTAINABILITY_IMAGES[0]}
                    alt={stat.label}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/50 to-transparent" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
                    <div className="font-display text-5xl font-medium sm:text-6xl">
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="mt-3 max-w-xs text-lg leading-snug text-slate-200">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="border-y border-border bg-white py-16 sm:py-24">
        <Container>
          <SectionReveal>
            <SectionHeading eyebrow="Clients" title={home.clientsTitle} />
          </SectionReveal>
          {testimonials.map((t, i) => (
            <SectionReveal key={t.id} delay={i * 0.1}>
              <blockquote className="mx-auto mt-12 max-w-3xl text-center">
                {t.image && (
                  <div className="relative mx-auto mb-6 h-20 w-20 overflow-hidden rounded-full ring-4 ring-accent/20">
                    <CmsImage src={t.image} alt={t.author} fill />
                  </div>
                )}
                <p className="font-display text-xl leading-relaxed text-slate-700 sm:text-2xl">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-6 text-sm font-semibold uppercase tracking-wider text-navy">
                  — {t.author}
                </footer>
              </blockquote>
            </SectionReveal>
          ))}
        </Container>
      </section>

      {/* News */}
      <section className="bg-background py-16 sm:py-24">
        <Container>
          <SectionReveal>
            <SectionHeading title={home.newsTitle} subtitle={home.newsSubtitle} />
          </SectionReveal>
          <div className="mt-14 grid gap-8 lg:grid-cols-3">
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
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                        {post.category}
                      </span>
                      <h3 className="mt-2 font-semibold text-navy transition-colors group-hover:text-accent">
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
