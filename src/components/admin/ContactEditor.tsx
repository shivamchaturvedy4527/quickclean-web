"use client";

import type { CMSData } from "@/types/cms";

function linesToList(text: string): string[] {
  return text.split("\n").map((l) => l.trim()).filter(Boolean);
}

export function ContactEditor({
  contact,
  onChange,
}: {
  contact: CMSData["contact"];
  onChange: (contact: CMSData["contact"]) => void;
}) {
  const patch = (p: Partial<CMSData["contact"]>) => onChange({ ...contact, ...p });

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-slate-800">Page Title</label>
        <input value={contact.title} onChange={(e) => patch({ title: e.target.value })} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm" />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-800">Intro Text</label>
        <textarea rows={4} value={contact.intro} onChange={(e) => patch({ intro: e.target.value })} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm" />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-800">Service Centres (one city per line)</label>
        <textarea
          rows={6}
          value={(contact.serviceCentres ?? []).join("\n")}
          onChange={(e) => patch({ serviceCentres: linesToList(e.target.value) })}
          className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold text-slate-800">Get in Touch — Heading</label>
          <input value={contact.getInTouchTitle ?? ""} onChange={(e) => patch({ getInTouchTitle: e.target.value })} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-800">Send Message — Heading</label>
          <input value={contact.sendMessageTitle ?? ""} onChange={(e) => patch({ sendMessageTitle: e.target.value })} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm" />
        </div>
      </div>
    </div>
  );
}
