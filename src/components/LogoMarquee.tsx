"use client";

import type { BrandLogo } from "@/types/cms";
import { CmsImage } from "./CmsImage";
import { Container } from "./ui/Container";
import { SectionReveal } from "./SectionReveal";

type LogoMarqueeProps = {
  brands: BrandLogo[];
  title?: string;
  /** Show client / brand name as a small caption below each logo */
  showCaptions?: boolean;
  variant?: "default" | "clients";
};

export function LogoMarquee({
  brands,
  title,
  showCaptions = false,
  variant = "default",
}: LogoMarqueeProps) {
  if (!brands.length) return null;

  const row1 = brands.slice(0, Math.ceil(brands.length / 2));
  const row2 = brands.slice(Math.ceil(brands.length / 2));
  const isClients = variant === "clients";

  return (
    <section
      className={
        isClients
          ? "relative overflow-hidden border-y border-slate-200/80 bg-gradient-to-b from-slate-50 via-white to-indigo-50/30 py-20"
          : "border-y border-gray-200 bg-white py-20"
      }
    >
      {isClients && (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgb(79 70 229 / 12%) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
      )}

      <Container className="relative">
        {title && (
          <SectionReveal>
            {isClients && (
              <p className="mb-3 text-center text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
                Trusted by Leading Brands
              </p>
            )}
            <h2
              className={
                isClients
                  ? "mb-14 text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
                  : "mb-12 text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
              }
              dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, "<br/>") }}
            />
          </SectionReveal>
        )}
      </Container>

      <div className="marquee-row relative space-y-10">
        <MarqueeRow brands={row1} reverse={false} showCaptions={showCaptions} />
        <MarqueeRow
          brands={row2.length ? row2 : row1}
          reverse
          showCaptions={showCaptions}
        />
      </div>
    </section>
  );
}

function MarqueeRow({
  brands,
  reverse,
  showCaptions,
}: {
  brands: BrandLogo[];
  reverse?: boolean;
  showCaptions?: boolean;
}) {
  const items = [...brands, ...brands];

  return (
    <div className="overflow-hidden">
      <div className={`marquee-track gap-16 px-4 sm:gap-20 ${reverse ? "marquee-reverse" : ""}`}>
        {items.map((brand, index) => (
          <div
            key={`${brand.id}-${index}`}
            className="group flex w-36 shrink-0 flex-col items-center justify-center sm:w-40"
            title={brand.name}
          >
            <div className="flex h-16 w-full items-center justify-center rounded-lg border border-transparent px-3 transition-all duration-300 group-hover:border-indigo-100 group-hover:bg-white/80 group-hover:shadow-sm">
              {brand.image ? (
                <CmsImage
                  src={brand.image}
                  alt={brand.name}
                  width={140}
                  height={56}
                  className="max-h-12 w-auto object-contain opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 sm:max-h-14"
                />
              ) : (
                <span className="text-center text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {brand.name}
                </span>
              )}
            </div>
            {showCaptions && (
              <p className="mt-2.5 max-w-full truncate px-1 text-center text-[11px] font-medium leading-tight text-slate-500 transition-colors group-hover:text-indigo-600">
                {brand.name}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
