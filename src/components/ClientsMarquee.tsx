"use client";

import { useState } from "react";

import type { BrandLogo } from "@/types/cms";
import { brandLogoUrlForIndex, resolveBrandLogoUrl } from "@/lib/brand-logos";
import { Container } from "./ui/Container";
import { SectionReveal } from "./SectionReveal";

type ClientsMarqueeProps = {
  items: BrandLogo[];
  title?: string;
};

export function ClientsMarquee({ items, title }: ClientsMarqueeProps) {
  if (!items.length) return null;

  const row1 = items.slice(0, Math.ceil(items.length / 2));
  const row2 = items.slice(Math.ceil(items.length / 2));

  return (
    <section className="border-y border-gray-200 bg-surface-alt py-20">
      <Container>
        {title && (
          <SectionReveal>
            <h2
              className="mb-14 text-center text-2xl font-bold tracking-tight text-primary sm:text-3xl"
              dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, "<br/>") }}
            />
          </SectionReveal>
        )}
      </Container>

      <div className="marquee-row space-y-10">
        <MarqueeRow items={row1} reverse={false} />
        <MarqueeRow items={row2.length ? row2 : row1} reverse />
      </div>
    </section>
  );
}

function BrandLogoImg({
  src,
  alt,
  fallbackIndex,
}: {
  src: string;
  alt: string;
  fallbackIndex: number;
}) {
  const fallback = brandLogoUrlForIndex(fallbackIndex);
  const [currentSrc, setCurrentSrc] = useState(src);

  return (
    <img
      src={currentSrc}
      alt={alt}
      width={140}
      height={56}
      loading="lazy"
      decoding="async"
      className="max-h-12 w-auto object-contain opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 sm:max-h-14"
      onError={() => {
        if (currentSrc !== fallback) setCurrentSrc(fallback);
      }}
    />
  );
}

function MarqueeRow({
  items,
  reverse,
}: {
  items: BrandLogo[];
  reverse?: boolean;
}) {
  const loop = [...items, ...items];

  return (
    <div className="overflow-hidden">
      <div className={`marquee-track gap-16 px-4 sm:gap-20 ${reverse ? "marquee-reverse" : ""}`}>
        {loop.map((item, index) => {
          const brandIndex = index % items.length;
          const src = resolveBrandLogoUrl(item.image, brandIndex);
          return (
            <div
              key={`${item.id}-${index}`}
              className="group flex h-20 w-36 shrink-0 items-center justify-center sm:w-40"
              title={item.name}
            >
              <BrandLogoImg src={src} alt={item.name} fallbackIndex={brandIndex} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
