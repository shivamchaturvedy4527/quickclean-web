"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { CmsImage } from "./CmsImage";

interface VideoSectionProps {
  title: string;
  videoUrl: string;
  thumbnail: string;
  sinceYear: string;
}

export function VideoSection({ title, videoUrl, thumbnail, sinceYear }: VideoSectionProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="relative overflow-hidden bg-[#071525] py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(20,184,166,0.12)_0%,transparent_50%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-400">
            {title}
          </p>
          <h2 className="mt-4 font-serif text-5xl font-light tracking-tight sm:text-6xl">
            {sinceYear}
          </h2>
        </div>
        <div className="relative mx-auto mt-14 aspect-video max-w-4xl overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-teal-900/30">
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
              <CmsImage src={thumbnail} alt={title} fill className="transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-teal-500/90 shadow-lg shadow-teal-500/40 transition-transform group-hover:scale-110">
                  <Play className="ml-1 h-8 w-8 fill-white text-white" />
                </div>
              </div>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
