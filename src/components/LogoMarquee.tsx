"use client";

import type { BrandLogo } from "@/types/cms";
import { CmsImage } from "./CmsImage";

export function LogoMarquee({ brands, title }: { brands: BrandLogo[]; title?: string }) {
  const row1 = brands.slice(0, Math.ceil(brands.length / 2));
  const row2 = brands.slice(Math.ceil(brands.length / 2));

  return (
    <section className="bg-white py-12">
      {title && (
        <h2 className="mb-8 text-center text-2xl font-semibold text-[#06163a]" dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, "<br/>") }} />
      )}
      <div className="space-y-4 overflow-hidden">
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
      <div className={`marquee-track flex gap-16 ${reverse ? "marquee-reverse" : ""}`}>
        {items.map((b, i) => (
          <div key={`${b.id}-${i}`} className="flex h-16 w-32 shrink-0 items-center justify-center">
            <CmsImage src={b.image} alt={b.name} width={120} height={48} className="max-h-12 w-auto object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
}
