import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { getCMS } from "@/lib/cms-store";

export default async function HomePage() {
  const cms = await getCMS();
  const { home, solutions, testimonials, brands, blog } = cms;

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0c2340] text-white">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,118,110,0.15)_0%,transparent_50%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">
          <div className="animate-fade-up">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-teal-400">
              Since {home.sinceYear}
            </p>
            <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {home.heroTitle}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              {home.heroSubtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={home.heroCtaLink}
                className="inline-flex items-center gap-2 rounded-md bg-teal-600 px-6 py-3 text-sm font-semibold text-white hover:bg-teal-500"
              >
                {home.heroCtaText}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-md border border-slate-500 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Request Consultation
              </Link>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 shadow-2xl">
              <div className="flex h-full flex-col items-center justify-center p-8 text-center">
                <div className="mb-4 text-6xl font-bold text-teal-400">110+</div>
                <p className="text-lg text-slate-300">On-Premise Laundry Sites Nationwide</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-slate-200 bg-white py-14">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
          {home.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-[#0c2340] sm:text-4xl">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-2 text-sm text-slate-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Solutions */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[#0c2340]">
              Our Solutions
            </h2>
            <p className="mt-4 text-slate-600">
              Sustainable commercial laundry solutions that reduce water consumption,
              lower energy costs, and improve operational reliability.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {solutions.map((solution) => (
              <Link
                key={solution.id}
                href={`/solutions/${solution.slug}`}
                className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-teal-200 hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-[#0c2340] group-hover:text-teal-700">
                  {solution.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {solution.shortDescription}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-700">
                  Read More <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="bg-slate-900 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold">{home.sustainabilityTitle}</h2>
          <div className="mt-14 grid grid-cols-2 gap-8 md:grid-cols-4">
            {home.sustainabilityStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-teal-400 sm:text-4xl">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="aspect-square max-w-md rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 lg:mx-auto">
              <div className="flex h-full items-end p-8">
                <div>
                  <p className="text-2xl font-bold text-[#0c2340]">{home.founderName}</p>
                  <p className="text-sm text-slate-600">{home.founderRole}</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#0c2340]">{home.founderTitle}</h2>
              <blockquote className="mt-6 border-l-4 border-teal-600 pl-6 text-lg leading-relaxed text-slate-700">
                {home.founderMessage}
              </blockquote>
              <p className="mt-6 font-semibold text-[#0c2340]">
                — {home.founderName}, {home.founderRole}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="border-y border-slate-200 bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-xl font-semibold text-slate-600">
            {home.brandsTitle}
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
            {brands.map((brand) => (
              <div
                key={brand.id}
                className="flex h-12 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-8 text-sm font-semibold text-slate-500"
              >
                {brand.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-[#0c2340]">
            {home.clientsTitle}
          </h2>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="text-slate-700 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-4 border-t border-slate-100 pt-4">
                  <p className="font-semibold text-[#0c2340]">{t.author}</p>
                  <p className="text-sm text-slate-500">{t.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#0c2340]">{home.newsTitle}</h2>
            <p className="mt-3 text-slate-600">{home.newsSubtitle}</p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {blog.map((post) => (
              <article
                key={post.id}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300" />
                <div className="p-5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-teal-700">
                    {post.category}
                  </span>
                  <h3 className="mt-2 font-semibold text-[#0c2340]">{post.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 line-clamp-2">{post.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
