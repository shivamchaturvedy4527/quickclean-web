import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SiteLayout } from "@/components/SiteLayout";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { CmsImage } from "@/components/CmsImage";
import { HomeHero } from "@/components/HomeHero";
import { ClientsMarquee } from "@/components/ClientsMarquee";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SectionReveal } from "@/components/SectionReveal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InstallationGallery } from "@/components/InstallationGallery";
import { PressingMachinesGrid } from "@/components/PressingMachinesGrid";
import { getCMS } from "@/lib/cms-store";

const FALLBACK_PRODUCTS_VIDEO_URL =
  "https://www.youtube.com/watch?si=SonCvHpacSdRzxjL&v=G4Dxr3UFHpY&feature=youtu.be";

function toYouTubeEmbedUrl(url?: string): string {
  if (!url) return "";
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtube.com")) {
      if (parsed.pathname === "/watch") {
        const id = parsed.searchParams.get("v");
        return id ? `https://www.youtube.com/embed/${id}` : "";
      }
      if (parsed.pathname.startsWith("/embed/")) {
        return url;
      }
      if (parsed.pathname.startsWith("/shorts/")) {
        const id = parsed.pathname.split("/")[2];
        return id ? `https://www.youtube.com/embed/${id}` : "";
      }
    }
    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.replace(/^\//, "");
      return id ? `https://www.youtube.com/embed/${id}` : "";
    }
  } catch {
    return "";
  }
  return "";
}

export default async function HomePage() {
  const cms = await getCMS();
  const { home, solutions, testimonials, brands, blog, products, installationGallery, pressingMachines, labels } = cms;
  const machineProducts = products.filter((p) => p.category === "Commercial Laundry");
  const stripVideoUrl = home.productsVideoUrl || home.videoUrl || FALLBACK_PRODUCTS_VIDEO_URL;
  const stripVideoFileUrl = home.productsVideoFileUrl;
  const stripVideoEmbedUrl = toYouTubeEmbedUrl(stripVideoUrl);

  return (
    <SiteLayout>
      <HomeHero home={home} settings={cms.settings} imageAlt={labels.home.heroImageAlt} />

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
                    className="card card-lift group flex h-full flex-col overflow-hidden rounded-2xl p-0"
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
                      {labels.home.readMore}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Products Portfolio — all machines */}
      {machineProducts.length > 0 && home.productsTitle && (
        <section className="section-alt section-pad">
          <Container>
            <SectionReveal>
              <div className="flex flex-col items-center justify-between sm:flex-row sm:items-end">
                <SectionHeading
                  eyebrow={labels.home.machinesEyebrow}
                  title={home.productsTitle}
                  subtitle={home.productsSubtitle}
                />
                {stripVideoUrl && (
                  <a
                    href={stripVideoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary whitespace-nowrap mt-4 sm:mt-0"
                  >
                    Watch Video
                    <ArrowRight className="h-4 w-4" />
                  </a>
                )}
              </div>
            </SectionReveal>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {machineProducts.map((product, i) => (
                <SectionReveal key={product.id} delay={(i % 4) * 0.04}>
                  <Link
                    href={`/products/${product.slug}`}
                    className="card card-lift group flex h-full flex-col overflow-hidden rounded-2xl p-0"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden" style={{ aspectRatio: cms.productsPage.productImageAspectRatio ?? "4/3" }}>
                      <CmsImage
                        src={product.image}
                        alt={product.heroImageAlt ?? product.title}
                        fill
                        className="transition-transform duration-500 group-hover:scale-[1.03]"
                        style={{ objectFit: cms.productsPage.productImageObjectFit ?? "cover" }}
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-semibold leading-snug text-primary transition-colors group-hover:text-accent">
                        {product.title}
                      </h3>
                      {product.specs && product.specs.length > 0 && (
                        <ul className="mt-3 space-y-1.5 text-xs text-gray-500">
                          {product.specs.slice(0, 2).map((spec) => (
                            <li key={spec} className="flex gap-2">
                              <span className="text-accent">•</span>
                              <span className="line-clamp-2">{spec}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                        {labels.home.viewProduct}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </SectionReveal>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link href="/products" className="btn-outline">
                {labels.home.fullCatalogue}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Container>
        </section>
      )}

      {/* Pressing machines */}
      {pressingMachines && pressingMachines.items.length > 0 && (
        <PressingMachinesGrid content={pressingMachines} />
      )}

      {/* Installation gallery from slides 23-29 */}
      {installationGallery && installationGallery.images.length > 0 && (
        <InstallationGallery
          title={installationGallery.title}
          subtitle={installationGallery.subtitle}
          videoUrl={stripVideoUrl}
          images={installationGallery.images}
        />
      )}

      {/* Clients */}
      <ClientsMarquee items={brands} title={home.brandsTitle} />

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="section-alt section-pad">
          <Container>
            <SectionReveal>
              <SectionHeading eyebrow={labels.home.clientsEyebrow} title={home.clientsTitle} />
            </SectionReveal>
            {testimonials.map((t, i) => (
              <SectionReveal key={t.id} delay={i * 0.1}>
                <blockquote className="mx-auto mt-12 max-w-4xl text-center">
                  {t.image && (
                    <div className="relative mx-auto mb-8 h-20 w-20 overflow-hidden rounded-full ring-4 ring-accent/20">
                      <CmsImage src={t.image} alt={t.author} fill />
                    </div>
                  )}
                  <p className="text-balance text-xl font-medium leading-relaxed text-primary sm:text-2xl lg:text-3xl">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer className="mt-8 text-sm font-bold uppercase tracking-widest text-accent">
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
                  <Link href={`/${post.slug}`} className="card card-lift group block overflow-hidden rounded-2xl">
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

      {/* Video strip above footer */}
      <section className="gradient-primary section-pad text-center text-white">
        <Container>
          <SectionReveal>
            <p className="text-lg text-gray-300">{cms.settings.tagline}</p>
            {stripVideoFileUrl ? (
              <div className="mx-auto mt-6 max-w-4xl overflow-hidden rounded-2xl border border-white/20 bg-black/30 p-3">
                <video
                  src={stripVideoFileUrl}
                  controls
                  preload="metadata"
                  className="w-full rounded-xl"
                />
              </div>
            ) : stripVideoEmbedUrl ? (
              <div className="mx-auto mt-6 max-w-4xl overflow-hidden rounded-2xl border border-white/20 bg-black/30 p-3">
                <div className="relative aspect-video overflow-hidden rounded-xl">
                  <iframe
                    src={stripVideoEmbedUrl}
                    title="Laundrex video"
                    className="h-full w-full"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>
            ) : (
              stripVideoUrl && (
                <a
                  href={stripVideoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary mt-6 inline-flex"
                >
                  Watch Video
                  <ArrowRight className="h-4 w-4" />
                </a>
              )
            )}
          </SectionReveal>
        </Container>
      </section>
    </SiteLayout>
  );
}
