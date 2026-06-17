"use client";

import type { BrandLogo } from "@/types/cms";
import { CmsImage } from "./CmsImage";

interface LogoMarqueeProps {
  brands: BrandLogo[];
  title?: string;
}

function MarqueeRow({
  brands,
  reverse,
}: {
  brands: BrandLogo[];
  reverse?: boolean;
}) {
  const doubled = [...brands, ...brands];
  return (
    <div className="marquee-row overflow-hidden py-4">
      <div
        className={`marquee-track flex gap-12 ${reverse ? "marquee-reverse" : ""}`}
      >
        {doubled.map((brand, i) => (
          <div
            key={`${brand.id}-${i}`}
            className="flex h-16 w-36 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 backdrop-blur-sm"
          >
            {brand.image ? (
              <CmsImage
                src={brand.image}
                alt={brand.name}
                width={120}
                height={48}
                className="max-h-10 w-auto object-contain brightness-0 invert opacity-80"
              />
            ) : (
              <span className="text-sm font-semibold text-white/70">
                {brand.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function LogoMarquee({ brands, title }: LogoMarqueeProps) {
  const row1 = brands.filter((_, i) => i % 2 === 0);
  const row2 = brands.filter((_, i) => i % 2 === 1);

  return (
    <section className="relative overflow-hidden bg-[#071525] py-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.08)_0%,transparent_70%)]" />
      {title && (
        <h2 className="relative mb-10 text-center text-xl font-semibold tracking-wide text-white/80">
          {title}
        </h2>
      )}
      <div className="relative space-y-2">
        <MarqueeRow brands={row1.length ? row1 : brands} />
        <MarqueeRow brands={row2.length ? row2 : brands} reverse />
      </div>
    </section>
  );
}
