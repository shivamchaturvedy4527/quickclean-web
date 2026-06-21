import Link from "next/link";
import { ArrowRight, Award, Headphones, Phone, Settings, Shield, Wrench } from "lucide-react";
import type { HomeContent, SiteSettings } from "@/types/cms";
import { HeroVisual } from "@/components/HeroVisual";
import { Container } from "@/components/ui/Container";
import { resolveHeroFeatures } from "@/lib/hero-features";
import { resolveHeroImages } from "@/lib/hero-images";

const FEATURE_ICONS = [Shield, Settings, Wrench, Headphones, Award] as const;

interface HomeHeroProps {
  home: HomeContent;
  settings: SiteSettings;
  imageAlt: string;
}

export function HomeHero({ home, settings, imageAlt }: HomeHeroProps) {
  const features = resolveHeroFeatures(home);
  const images = resolveHeroImages(home);

  return (
    <section className="hero-premium relative overflow-hidden bg-white">
      <div className="hero-premium-grid-corner pointer-events-none absolute left-0 top-0" aria-hidden />
      <div className="hero-premium-wave-bl pointer-events-none absolute" aria-hidden />
      <div className="hero-premium-wave-tr pointer-events-none absolute" aria-hidden />

      <Container className="relative z-10 pb-0 pt-6 lg:pt-7 xl:pt-8">
        <div className="hero-main-row grid gap-6 lg:grid-cols-[minmax(0,43%)_minmax(0,57%)] lg:gap-4 xl:gap-5">
          <div className="hero-text-col max-w-lg lg:max-w-none">
            {(home.heroEyebrow || settings.tagline) && (
              <span className="hero-pill">{home.heroEyebrow || settings.tagline}</span>
            )}

            <h1 className="hero-brand-title mt-5">{home.heroTitle}</h1>

            {home.heroTitleLine2 ? (
              <p className="mt-2 text-2xl font-semibold tracking-tight text-sky-700 sm:text-3xl">
                {home.heroTitleLine2}
              </p>
            ) : null}

            {home.heroSubtitle ? (
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-slate-600 sm:text-base">
                {home.heroSubtitle}
              </p>
            ) : null}

            <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
              <Link href={home.heroCtaLink} className="btn-hero-primary">
                {home.heroCtaText}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={home.heroSecondaryCtaLink} className="btn-hero-outline">
                <Phone className="h-4 w-4" />
                {home.heroSecondaryCtaText}
              </Link>
            </div>
          </div>

          <div className="hero-visual-stage">
            <HeroVisual
              images={images}
              alt={imageAlt}
              intervalSec={home.heroSlideInterval ?? 5}
              variant="premium"
            />
          </div>
        </div>
      </Container>

      <div className="hero-feature-bar-shell relative z-20 mt-5 lg:mt-2">
        <Container className="px-0 sm:px-6 lg:px-8">
          <div className="hero-feature-bar">
            {features.map((feature, index) => {
              const Icon = FEATURE_ICONS[index % FEATURE_ICONS.length];
              return (
                <div key={`${feature.line1}-${index}`} className="hero-feature-item">
                  <div className="hero-feature-icon">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <div className="leading-tight">
                    <p className="text-sm font-semibold text-slate-800">{feature.line1}</p>
                    <p className="text-xs text-slate-500">{feature.line2}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </div>
    </section>
  );
}
