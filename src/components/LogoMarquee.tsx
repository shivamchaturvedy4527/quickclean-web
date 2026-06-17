"use client";

import type { BrandLogo } from "@/types/cms";
import { resolveBrandLogoUrl } from "@/lib/brand-logos";
import { Container } from "./ui/Container";
import { SectionReveal } from "./SectionReveal";

type LogoMarqueeProps = {
  brands: BrandLogo[];
  title?: string;
};

export function LogoMarquee({ brands, title }: LogoMarqueeProps) {
  if (!brands.length) return null;

  const row1 = brands.slice(0, Math.ceil(brands.length / 2));
  const row2 = brands.slice(Math.ceil(brands.length / 2));

  return (
    <section className="border-y border-gray-200 bg-white py-20">
      <Container>
        {title && (
          <SectionReveal>
            <h2
              className="mb-12 text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
              dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, "<br/>") }}
            />
          </SectionReveal>
        )}
      </Container>

      <div className="marquee-row space-y-8">
        <MarqueeRow brands={row1} reverse={false} />
        <MarqueeRow brands={row2.length ? row2 : row1} reverse />
      </div>
    </section>
  );
}

function MarqueeRow({
  brands,
  reverse,
}: {
  brands: BrandLogo[];
  reverse?: boolean;
}) {
  const items = [...brands, ...brands];

  return (
    <div className="overflow-hidden">
      <div className={`marquee-track gap-16 px-4 sm:gap-20 ${reverse ? "marquee-reverse" : ""}`}>
        {items.map((brand, index) => {
          const src = resolveBrandLogoUrl(brand.image, index % brands.length);
          return (
            <div
              key={`${brand.id}-${index}`}
              className="group flex h-20 w-36 shrink-0 items-center justify-center sm:w-40"
              title={brand.name}
            >
              <img
                src={src}
                alt={brand.name}
                width={140}
                height={56}
                loading="lazy"
                decoding="async"
                className="max-h-12 w-auto object-contain opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 sm:max-h-14"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
