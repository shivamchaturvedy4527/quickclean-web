"use client";

import type { BrandLogo } from "@/types/cms";
import { resolveBrandLogoUrl } from "@/lib/brand-logos";
import { Container } from "./ui/Container";
import { SectionReveal } from "./SectionReveal";

type ClientsMarqueeProps = {
  items: BrandLogo[];
  title?: string;
  subtitle?: string;
};

export function ClientsMarquee({ items, title, subtitle }: ClientsMarqueeProps) {
  if (!items.length) return null;

  const row1 = items.slice(0, Math.ceil(items.length / 2));
  const row2 = items.slice(Math.ceil(items.length / 2));

  return (
    <section className="relative overflow-hidden border-y border-slate-800 bg-slate-900 py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgb(99 102 241 / 18%) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

      <Container className="relative">
        {title && (
          <SectionReveal>
            <p className="mb-3 text-center text-xs font-bold uppercase tracking-[0.22em] text-indigo-400">
              Prestigious Clients
            </p>
            <h2
              className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl"
              dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, "<br/>") }}
            />
            {subtitle && (
              <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-slate-400 sm:text-base">
                {subtitle}
              </p>
            )}
          </SectionReveal>
        )}
      </Container>

      <div className="marquee-row relative mt-14 space-y-8">
        <MarqueeRow items={row1} reverse={false} />
        <MarqueeRow items={row2.length ? row2 : row1} reverse />
      </div>
    </section>
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
      <div className={`marquee-track gap-14 px-6 sm:gap-20 ${reverse ? "marquee-reverse" : ""}`}>
        {loop.map((item, index) => {
          const src = resolveBrandLogoUrl(item.image, index % items.length);
          return (
            <div
              key={`${item.id}-${index}`}
              className="group relative flex h-24 w-40 shrink-0 flex-col items-center justify-center sm:w-44"
              title={item.name}
            >
              <div className="flex h-16 w-full items-center justify-center rounded-xl border border-slate-700/60 bg-slate-800/50 px-4 transition-all duration-300 group-hover:border-indigo-500/50 group-hover:bg-slate-800 group-hover:shadow-lg group-hover:shadow-indigo-500/10">
                <img
                  src={src}
                  alt={item.name}
                  width={140}
                  height={56}
                  loading="lazy"
                  decoding="async"
                  className="max-h-12 w-auto object-contain opacity-80 brightness-0 invert transition-all duration-300 group-hover:scale-105 group-hover:opacity-100 group-hover:brightness-100 group-hover:invert-0 sm:max-h-14"
                />
              </div>
              <p className="pointer-events-none absolute -bottom-1 left-1/2 z-10 max-w-[11rem] -translate-x-1/2 translate-y-full truncate rounded-md bg-slate-950/90 px-2 py-1 text-center text-[10px] font-medium text-slate-300 opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
                {item.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
