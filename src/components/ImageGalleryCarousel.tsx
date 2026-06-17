"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CmsImage } from "./CmsImage";
import { cn } from "@/lib/utils";

type ImageGalleryCarouselProps = {
  images: string[];
  alt: string;
  className?: string;
};

export function ImageGalleryCarousel({ images, alt, className }: ImageGalleryCarouselProps) {
  const gallery = images.filter(Boolean);
  const [index, setIndex] = useState(0);

  if (!gallery.length) return null;

  const prev = () => setIndex((i) => (i === 0 ? gallery.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === gallery.length - 1 ? 0 : i + 1));

  return (
    <div className={cn("space-y-4", className)}>
      <div className="relative aspect-video overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
        <CmsImage src={gallery[index]} alt={`${alt} ${index + 1}`} fill sizes="(max-width: 1024px) 100vw, 66vw" />
        {gallery.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-primary shadow-md transition hover:bg-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-primary shadow-md transition hover:bg-white"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white">
              {index + 1} / {gallery.length}
            </div>
          </>
        )}
      </div>
      {gallery.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {gallery.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setIndex(i)}
              className={cn(
                "relative h-16 w-24 shrink-0 overflow-hidden rounded-md border-2 transition",
                i === index ? "border-accent" : "border-transparent opacity-70 hover:opacity-100"
              )}
            >
              <CmsImage src={src} alt={`${alt} thumbnail ${i + 1}`} fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
