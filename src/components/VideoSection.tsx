"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { CmsImage } from "./CmsImage";
import { Container } from "./ui/Container";
import { SectionReveal } from "./SectionReveal";

interface VideoSectionProps {
  title: string;
  videoUrl: string;
  thumbnail: string;
  sinceYear: string;
}

export function VideoSection({ title, videoUrl, thumbnail, sinceYear }: VideoSectionProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="relative overflow-hidden gradient-primary py-20 text-white sm:py-24">
      <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
      <Container className="relative">
        <SectionReveal>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent-bright">
              {title}
            </p>
            <h2 className="mt-4 text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
              {sinceYear}
            </h2>
          </div>
        </SectionReveal>
        <SectionReveal delay={0.15}>
          <div className="relative mx-auto mt-14 aspect-video max-w-5xl overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-black/40 ring-1 ring-white/5">
            {playing ? (
              <iframe
                src={`${videoUrl}?autoplay=1`}
                title={title}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                onClick={() => setPlaying(true)}
                className="group relative h-full w-full"
                aria-label="Play video"
              >
                <CmsImage
                  src={thumbnail}
                  alt={title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/50 transition-colors group-hover:bg-primary/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent shadow-lg shadow-accent/40 transition-all duration-300 group-hover:scale-110 group-hover:shadow-accent/60">
                    <Play className="ml-1 h-8 w-8 fill-white text-white" />
                  </div>
                </div>
              </button>
            )}
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
