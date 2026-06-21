"use client";

import { useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";
import type { Solution } from "@/types/cms";
import { ImageFieldEditor } from "./ImageFieldEditor";

function linesToList(text: string): string[] {
  return text.split("\n").map((l) => l.trim()).filter(Boolean);
}

export function SolutionsEditor({
  solutions,
  onChange,
}: {
  solutions: Solution[];
  onChange: (solutions: Solution[]) => void;
}) {
  const [selectedId, setSelectedId] = useState(solutions[0]?.id ?? "");
  const selected = useMemo(
    () => solutions.find((s) => s.id === selectedId) ?? solutions[0],
    [solutions, selectedId]
  );

  if (!selected) return <p className="text-slate-500">No solutions found.</p>;

  const update = (patch: Partial<Solution>) => {
    onChange(solutions.map((s) => (s.id === selected.id ? { ...s, ...patch } : s)));
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-slate-800">Select Solution</label>
        <select
          value={selected.id}
          onChange={(e) => setSelectedId(e.target.value)}
          className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
        >
          {solutions.map((s) => (
            <option key={s.id} value={s.id}>{s.title}</option>
          ))}
        </select>
      </div>

      <a
        href={`/solutions/${selected.slug}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1 text-sm text-slate-600 underline"
      >
        Preview on website <ExternalLink className="h-4 w-4" />
      </a>

      <ImageFieldEditor label="Solution Image" value={selected.image} onChange={(image) => update({ image })} />

      <div>
        <label className="block text-sm font-semibold text-slate-800">Title</label>
        <input
          value={selected.title}
          onChange={(e) => update({ title: e.target.value })}
          className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-800">Short Description</label>
        <textarea
          rows={2}
          value={selected.shortDescription}
          onChange={(e) => update({ shortDescription: e.target.value })}
          className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-800">Full Description</label>
        <textarea
          rows={8}
          value={selected.description}
          onChange={(e) => update({ description: e.target.value })}
          className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-800">Key Points (one per line)</label>
        <textarea
          rows={6}
          value={selected.features.join("\n")}
          onChange={(e) => update({ features: linesToList(e.target.value) })}
          className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold text-slate-800">Contact Button Text</label>
          <input
            value={selected.ctaText ?? ""}
            onChange={(e) => update({ ctaText: e.target.value })}
            placeholder="Contact Us"
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-800">Contact Button Link</label>
          <input
            value={selected.ctaLink ?? ""}
            onChange={(e) => update({ ctaLink: e.target.value })}
            placeholder="/contact-us"
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
          />
        </div>
      </div>
    </div>
  );
}
