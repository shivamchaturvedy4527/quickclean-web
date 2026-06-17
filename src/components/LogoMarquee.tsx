"use client";

import type { BrandLogo } from "@/types/cms";
import { CmsImage } from "./CmsImage";
import { Container } from "./ui/Container";
import { SectionReveal } from "./SectionReveal";

export function LogoMarquee({ brands, title }: { brands: BrandLogo[]; title?: string }) {
  const row1 = brands.slice(0, Math.ceil(brands.length / 2));
  const row2 = brands.slice(Math.ceil(brands.length / 2));

  return (
    <section className="border-y border-border bg-white py-16 sm:py-20">
      <Container>
        {title && (
          <SectionReveal>
            <h2
              className="font-display mb-12 text-center text-2xl font-medium text-navy sm:text-3xl"
              dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, "<br/>") }}
            />
          </SectionReveal>
        )}
      </Container>
      <div className="marquee-row space-y-6">
        <MarqueeRow brands={row1} reverse={false} />
        <MarqueeRow brands={row2.length ? row2 : row1} reverse />
      </div>
    </section>
  );
}

function MarqueeRow({ brands, reverse }: { brands: BrandLogo[]; reverse?: boolean }) {
  const items = [...brands, ...brands];
  return (
    <div className="overflow-hidden">
      <div className={`marquee-track gap-20 ${reverse ? "marquee-reverse" : ""}`}>
        {items.map((b, i) => (
          <div
            key={`${b.id}-${i}`}
            className="flex h-16 w-36 shrink-0 items-center justify-center grayscale transition-all duration-300 hover:grayscale-0"
          >
            <CmsImage
              src={b.image}
              alt={b.name}
              width={120}
              height={48}
              className="max-h-12 w-auto object-contain opacity-70 transition-opacity hover:opacity-100"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
