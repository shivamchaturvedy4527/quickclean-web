"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const DEFAULT_HERO = "/images/ppt/slide10_img01.png";

interface HeroVisualProps {
  images: string[];
  alt?: string;
  intervalSec?: number;
  variant?: "default" | "premium";
}

export function HeroVisual({ images, alt, intervalSec = 5, variant = "default" }: HeroVisualProps) {
  const slides = (images.length ? images : [DEFAULT_HERO]).filter(Boolean);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalMs = Math.max(2000, (intervalSec || 5) * 1000);

  useEffect(() => {
    if (slides.length <= 1 || paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [slides.length, intervalMs, paused]);

  const prev = () => setIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === slides.length - 1 ? 0 : i + 1));

  const premium = variant === "premium";

  if (premium) {
    return (
      <div
        className="group relative flex h-full min-h-[300px] w-full items-center justify-end sm:min-h-[360px] lg:min-h-[420px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {slides.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className={cn(
              "hero-visual-slide absolute inset-0 flex items-center justify-end overflow-visible transition-opacity duration-700 ease-in-out",
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={slides.length > 1 ? `${alt || "Hero"} ${i + 1}` : alt || "Commercial laundry equipment"}
              className="hero-premium-image max-w-none select-none"
              draggable={false}
            />
          </div>
        ))}

        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute bottom-[18%] left-2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-sky-600 opacity-0 shadow transition hover:bg-white group-hover:opacity-100 lg:left-4"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute bottom-[18%] right-2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-sky-600 opacity-0 shadow transition hover:bg-white group-hover:opacity-100"
              aria-label="Next slide"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <div
      className="group relative w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-accent to-accent-bright opacity-20 blur-xl transition-all duration-1000 group-hover:opacity-40" />
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl shadow-primary/20 ring-1 ring-gray-900/5 lg:aspect-auto lg:h-[600px]">
        {slides.map((src, i) => (
          <img
            key={`${src}-${i}`}
            src={src}
            alt={slides.length > 1 ? `${alt || "Hero"} ${i + 1}` : alt || "Commercial laundry equipment"}
            className={cn(
              "absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ease-in-out",
              i === index ? "opacity-100" : "opacity-0"
            )}
          />
        ))}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />

        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-primary opacity-0 shadow-md transition hover:bg-white group-hover:opacity-100"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-primary opacity-0 shadow-md transition hover:bg-white group-hover:opacity-100"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    i === index ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
