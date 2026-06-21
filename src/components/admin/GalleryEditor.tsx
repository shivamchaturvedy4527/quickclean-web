"use client";

import { Plus, Trash2 } from "lucide-react";
import type { InstallationGalleryContent } from "@/types/cms";
import { ImageFieldEditor } from "./ImageFieldEditor";

export function GalleryEditor({
  gallery,
  onChange,
}: {
  gallery: InstallationGalleryContent;
  onChange: (gallery: InstallationGalleryContent) => void;
}) {
  const patch = (p: Partial<InstallationGalleryContent>) => onChange({ ...gallery, ...p });

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-slate-800">Gallery Title</label>
        <input
          value={gallery.title}
          onChange={(e) => patch({ title: e.target.value })}
          className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-800">Gallery Subtitle</label>
        <textarea
          rows={2}
          value={gallery.subtitle ?? ""}
          onChange={(e) => patch({ subtitle: e.target.value })}
          className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
        />
      </div>

      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-slate-800">Photos ({gallery.images.length})</h3>
        <button
          type="button"
          onClick={() => patch({ images: [...gallery.images, { src: "", caption: "" }] })}
          className="inline-flex items-center gap-1 rounded-lg bg-accent px-3 py-2 text-sm font-medium text-white"
        >
          <Plus className="h-4 w-4" /> Add Photo
        </button>
      </div>

      <div className="space-y-6">
        {gallery.images.map((img, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-700">Photo {i + 1}</span>
              <button
                type="button"
                onClick={() => patch({ images: gallery.images.filter((_, j) => j !== i) })}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <ImageFieldEditor
              label="Photo"
              value={img.src}
              onChange={(src) => {
                const images = [...gallery.images];
                images[i] = { ...images[i], src };
                patch({ images });
              }}
            />
            <div className="mt-3">
              <label className="block text-xs font-medium text-slate-600">Caption (optional)</label>
              <input
                value={img.caption ?? ""}
                onChange={(e) => {
                  const images = [...gallery.images];
                  images[i] = { ...images[i], caption: e.target.value };
                  patch({ images });
                }}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
