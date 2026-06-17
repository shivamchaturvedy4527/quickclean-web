import Link from "next/link";
import { SiteLayout } from "@/components/SiteLayout";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { CmsImage } from "@/components/CmsImage";
import { LogoMarquee } from "@/components/LogoMarquee";
import { VideoSection } from "@/components/VideoSection";
import { NewsletterForm } from "@/components/NewsletterForm";
import { getCMS } from "@/lib/cms-store";

export default async function HomePage() {
  const cms = await getCMS();
  const { home, solutions, testimonials, brands, blog } = cms;

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative min-h-[500px] bg-[#c5dbe9]">
        <CmsImage src={home.heroImage} alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="relative mx-auto flex min-h-[500px] max-w-6xl items-center px-4 py-16">
          <div>
            <h1 className="text-4xl font-semibold text-[#06163a] md:text-5xl">{home.heroTitle}</h1>
            <h1 className="text-4xl font-semibold text-[#06163a] md:text-5xl">{home.heroTitleLine2}</h1>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-12">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 sm:grid-cols-3">
          {home.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-semibold text-[#06163a]">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-2 text-sm text-slate-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Linen + Water (4 boxes) */}
      <section className="bg-slate-50 py-12">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded border border-slate-200 bg-white p-6 text-center">
            <div className="text-sm text-slate-600">{home.linenWashedLabel}</div>
            <div className="mt-2 text-4xl font-semibold text-[#06163a]">
              <AnimatedCounter end={home.linenWashedValue} suffix={home.linenWashedSuffix} />
            </div>
            <div className="mt-1 text-sm text-slate-500">{home.linenWashedUnit}</div>
          </div>
          <div className="rounded border border-slate-200 bg-white p-6 text-center sm:col-span-1">
            <div className="text-sm text-slate-600">{home.waterComparison.title}</div>
            <div className="mt-2 text-3xl font-semibold text-[#06163a]">
              <AnimatedCounter end={home.waterComparison.industryDisplayValue} />
            </div>
            <div className="text-xs text-slate-500">{home.waterComparison.industryLabel}</div>
            <div className="mt-3 text-3xl font-semibold text-[#00b67a]">
              <AnimatedCounter end={home.waterComparison.qcDisplayValue} />
            </div>
            <div className="text-xs text-slate-500">{home.waterComparison.qcLabel}</div>
          </div>
          <div className="rounded border border-slate-200 bg-white p-6 text-center">
            <div className="text-sm text-slate-600">{home.waterComparison.monthlySavedLabel}</div>
            <div className="mt-2 text-3xl font-semibold text-[#06163a]">
              <AnimatedCounter end={home.waterComparison.monthlySaved} />
            </div>
            <div className="text-xs text-slate-500">Litres saved this month</div>
          </div>
          <div className="rounded border border-slate-200 bg-white p-6 text-center">
            <div className="text-sm text-slate-600">{home.waterComparison.yearlySavedLabel}</div>
            <div className="mt-2 text-3xl font-semibold text-[#06163a]">
              <AnimatedCounter end={home.waterComparison.yearlySaved} />
            </div>
            <div className="text-xs text-slate-500">Litres saved this year</div>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-2xl font-semibold text-[#06163a]">{home.solutionsTitle}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">{home.solutionsSubtitle}</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {solutions.map((solution) => (
              <Link
                key={solution.id}
                href={`/${solution.slug}`}
                className="block rounded border border-slate-200 bg-white p-5 text-left hover:border-[#00b67a]"
              >
                <h3 className="font-semibold text-[#06163a]">{solution.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{solution.shortDescription}</p>
                <span className="mt-3 inline-block text-sm font-medium text-[#00b67a]">Read More</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="bg-slate-50 py-12">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-square max-w-md overflow-hidden rounded">
            <CmsImage src={home.founderImage} alt={home.founderName} fill />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-[#06163a]">{home.founderTitle}</h2>
            <p className="mt-4 leading-relaxed text-slate-700">{home.founderMessage}</p>
            <p className="mt-4 font-semibold text-[#06163a]">CEO: {home.founderName}</p>
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
      <section className="relative py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 md:grid-cols-2">
          <div className="relative aspect-video overflow-hidden rounded">
            <CmsImage src="/images/sustainability-water.jpg" alt="Water saved" fill />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white">
              <div className="text-5xl font-semibold"><AnimatedCounter end={457} suffix="+" /></div>
              <div className="text-center text-lg">million liters of<br />water saved</div>
            </div>
          </div>
          <div className="relative aspect-video overflow-hidden rounded">
            <CmsImage src="/images/sustainability-carbon.jpg" alt="Carbon reduced" fill />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white">
              <div className="text-5xl font-semibold"><AnimatedCounter end={60} suffix="M kg" /></div>
              <div className="text-center text-lg">of carbon emissions reduced</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="text-sm font-semibold uppercase text-slate-500">Clients</p>
          <h2 className="mt-2 text-2xl font-semibold text-[#06163a]">{home.clientsTitle}</h2>
          {testimonials.map((t) => (
            <blockquote key={t.id} className="mt-8">
              {t.image && (
                <div className="relative mx-auto mb-4 h-16 w-16 overflow-hidden rounded-full">
                  <CmsImage src={t.image} alt={t.author} fill />
                </div>
              )}
              <p className="text-lg text-slate-700">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-4 font-semibold text-[#06163a]">— {t.author}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* News */}
      <section className="bg-slate-50 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-2xl font-semibold text-[#06163a]">{home.newsTitle}</h2>
          <p className="mt-2 text-center text-slate-600">{home.newsSubtitle}</p>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 grid gap-6 sm:grid-cols-2">
              {blog.map((post) => (
                <Link key={post.id} href={`/${post.slug}`} className="block overflow-hidden rounded border border-slate-200 bg-white">
                  <div className="relative aspect-video">
                    <CmsImage src={post.image} alt={post.title} fill />
                  </div>
                  <div className="p-4">
                    <span className="text-xs uppercase text-[#00b67a]">{post.category}</span>
                    <h3 className="mt-1 font-semibold text-[#06163a]">{post.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
            <NewsletterForm title={home.newsletterTitle} subtitle={home.newsletterSubtitle} />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
