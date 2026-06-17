"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { CmsImage } from "./CmsImage";
import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { SectionReveal } from "./SectionReveal";
import type { GalleryImage } from "@/types/cms";

type InstallationGalleryProps = {
  title: string;
  subtitle?: string;
  images: GalleryImage[];
};

export function InstallationGallery({ title, subtitle, images }: InstallationGalleryProps) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  if (!images.length) return null;

  return (
    <section className="section-alt section-pad">
      <Container>
        <SectionReveal>
          <SectionHeading title={title} subtitle={subtitle} />
        </SectionReveal>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {images.map((item, i) => (
            <SectionReveal key={item.src} delay={(i % 4) * 0.05}>
              <button
                type="button"
                onClick={() => setLightbox(i)}
                className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-slate-300"
              >
                <CmsImage
                  src={item.src}
                  alt={item.caption || `Installation ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/0 transition group-hover:bg-primary/10" />
              </button>
            </SectionReveal>
          ))}
        </div>
      </Container>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="relative max-h-[85vh] w-full max-w-5xl aspect-video" onClick={(e) => e.stopPropagation()}>
            <CmsImage
              src={images[lightbox].src}
              alt={images[lightbox].caption || "Installation"}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
