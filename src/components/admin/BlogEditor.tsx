"use client";

import { useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";
import type { BlogPost } from "@/types/cms";
import { ImageFieldEditor } from "./ImageFieldEditor";

export function BlogEditor({
  posts,
  onChange,
}: {
  posts: BlogPost[];
  onChange: (posts: BlogPost[]) => void;
}) {
  const [selectedId, setSelectedId] = useState(posts[0]?.id ?? "");
  const selected = useMemo(
    () => posts.find((p) => p.id === selectedId) ?? posts[0],
    [posts, selectedId]
  );

  if (!selected) return <p className="text-slate-500">No news articles yet.</p>;

  const update = (patch: Partial<BlogPost>) => {
    onChange(posts.map((p) => (p.id === selected.id ? { ...p, ...patch } : p)));
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-slate-800">Select Article</label>
        <select
          value={selected.id}
          onChange={(e) => setSelectedId(e.target.value)}
          className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
        >
          {posts.map((p) => (
            <option key={p.id} value={p.id}>{p.title}</option>
          ))}
        </select>
      </div>

      <a href={`/news/${selected.slug}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm underline">
        Preview on website <ExternalLink className="h-4 w-4" />
      </a>

      <ImageFieldEditor label="Article Photo" value={selected.image} onChange={(image) => update({ image })} />

      <div>
        <label className="block text-sm font-semibold text-slate-800">Title</label>
        <input value={selected.title} onChange={(e) => update({ title: e.target.value })} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold text-slate-800">Category</label>
          <input value={selected.category} onChange={(e) => update({ category: e.target.value })} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-800">Date</label>
          <input value={selected.date} onChange={(e) => update({ date: e.target.value })} placeholder="2025-01-15" className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-800">Short Summary (card text)</label>
        <textarea rows={3} value={selected.excerpt} onChange={(e) => update({ excerpt: e.target.value })} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm" />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-800">Full Article</label>
        <textarea rows={12} value={selected.content} onChange={(e) => update({ content: e.target.value })} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm" />
      </div>
    </div>
  );
}
