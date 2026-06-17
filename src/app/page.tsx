import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { CmsImage } from "@/components/CmsImage";
import { LogoMarquee } from "@/components/LogoMarquee";
import { WaterComparisonChart } from "@/components/WaterComparisonChart";
import { VideoSection } from "@/components/VideoSection";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SectionReveal } from "@/components/SectionReveal";
import { getCMS } from "@/lib/cms-store";

export default async function HomePage() {
  const cms = await getCMS();
  const { home, solutions, testimonials, brands, blog } = cms;

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative min-h-[85vh] overflow-hidden bg-[#071525] text-white">
        <div className="absolute inset-0">
          <CmsImage
            src={home.heroImage}
            alt=""
            fill
            priority
            className="object-cover opacity-30"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071525] via-[#071525]/90 to-[#071525]/60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(20,184,166,0.15)_0%,transparent_60%)]" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-32">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal-400">
              Since {home.sinceYear}
            </p>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              {home.heroTitle}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
              {home.heroSubtitle}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href={home.heroCtaLink}
                className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-900/30 transition-all hover:bg-teal-500 hover:shadow-teal-800/40"
              >
                {home.heroCtaText}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={home.heroSecondaryCtaLink}
                className="inline-flex items-center rounded-lg border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
              >
                {home.heroSecondaryCtaText}
              </Link>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <CmsImage src={home.heroImage} alt="Commercial laundry operations" fill className="object-cover" sizes="50vw" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mt-8 z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:grid-cols-3 lg:p-8">
          {home.stats.map((stat, i) => (
            <SectionReveal key={stat.label} delay={i * 0.1}>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#071525] sm:text-4xl">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-2 text-sm text-slate-600">{stat.label}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* Linen washed */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <SectionReveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-teal-700">
              {home.linenWashedLabel}
            </p>
            <p className="mt-2 font-serif text-6xl font-light text-[#071525] sm:text-7xl">
              <AnimatedCounter end={home.linenWashedValue} suffix={home.linenWashedSuffix} />
            </p>
            {home.linenWashedUnit && (
              <p className="mt-2 text-lg text-slate-600">{home.linenWashedUnit}</p>
            )}
          </SectionReveal>
        </div>
      </section>

      <WaterComparisonChart data={home.waterComparison} />

      {/* Solutions */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[#071525] sm:text-4xl">
              {home.solutionsTitle}
            </h2>
            <p className="mt-4 text-lg text-slate-600">{home.solutionsSubtitle}</p>
          </SectionReveal>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {solutions.map((solution, i) => (
              <SectionReveal key={solution.id} delay={i * 0.08}>
                <Link
                  href={`/solutions/${solution.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <CmsImage
                      src={solution.image}
                      alt={solution.title}
                      fill
                      className="transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-semibold text-[#071525] group-hover:text-teal-800">
                      {solution.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                      {solution.shortDescription}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-700">
                      Read More <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <SectionReveal>
              <div className="relative aspect-square max-w-md overflow-hidden rounded-2xl shadow-2xl lg:mx-auto">
                <CmsImage src={home.founderImage} alt={home.founderName} fill sizes="(max-width: 1024px) 100vw, 400px" />
              </div>
            </SectionReveal>
            <SectionReveal delay={0.15}>
              <h2 className="font-serif text-4xl font-light text-[#071525]">{home.founderTitle}</h2>
              <blockquote className="mt-6 text-lg leading-relaxed text-slate-700">
                {home.founderMessage}
              </blockquote>
              <p className="mt-8 font-semibold text-[#071525]">
                — {home.founderName}, {home.founderRole}
              </p>
            </SectionReveal>
          </div>
        </div>
      </section>

      <VideoSection
        title={home.videoTitle}
        videoUrl={home.videoUrl}
        thumbnail={home.videoThumbnail}
        sinceYear={home.sinceYear}
      />

      <LogoMarquee brands={brands} title={home.brandsTitle} />

      {/* Sustainability impact */}
      <section className="bg-gradient-to-br from-teal-900 to-[#071525] py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center">
            <h2 className="text-3xl font-bold">{home.sustainabilityTitle}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-teal-100">{home.sustainabilityImpactTitle}</p>
          </SectionReveal>
          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {home.sustainabilityStats.map((stat, i) => (
              <SectionReveal key={stat.label} delay={i * 0.1} className="text-center">
                <div className="text-3xl font-bold text-teal-300 sm:text-4xl">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-teal-700">Clients</p>
            <h2 className="mt-2 text-3xl font-bold text-[#071525]">{home.clientsTitle}</h2>
          </SectionReveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <SectionReveal key={t.id} delay={i * 0.1}>
                <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                  {t.rating && (
                    <div className="mb-4 flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  )}
                  <p className="flex-1 leading-relaxed text-slate-700">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-6 border-t border-slate-100 pt-4">
                    <p className="font-semibold text-[#071525]">{t.author}</p>
                    <p className="text-sm text-slate-500">{t.company}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Blog + Newsletter */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <SectionReveal>
                <h2 className="text-3xl font-bold text-[#071525]">{home.newsTitle}</h2>
                <p className="mt-3 text-slate-600">{home.newsSubtitle}</p>
              </SectionReveal>
              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                {blog.slice(0, 4).map((post, i) => (
                  <SectionReveal key={post.id} delay={i * 0.08}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <CmsImage
                          src={post.image}
                          alt={post.title}
                          fill
                          className="transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <div className="p-5">
                        <span className="text-xs font-semibold uppercase tracking-wider text-teal-700">
                          {post.category}
                        </span>
                        <h3 className="mt-2 font-semibold text-[#071525] group-hover:text-teal-800">
                          {post.title}
                        </h3>
                        <p className="mt-2 line-clamp-2 text-sm text-slate-600">{post.excerpt}</p>
                      </div>
                    </Link>
                  </SectionReveal>
                ))}
              </div>
              <Link
                href="/blog"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-900"
              >
                View all news <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <SectionReveal delay={0.2}>
              <NewsletterForm
                title={home.newsletterTitle}
                subtitle={home.newsletterSubtitle}
              />
            </SectionReveal>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
