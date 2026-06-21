"use client";

import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import type { NavItem, SiteSettings } from "@/types/cms";

function Field({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-800">{label}</label>
      {hint && <p className="mt-0.5 text-xs text-slate-500">{hint}</p>}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
      />
    </div>
  );
}

function NavItemEditor({
  item,
  onChange,
  onRemove,
  depth = 0,
}: {
  item: NavItem;
  onChange: (item: NavItem) => void;
  onRemove: () => void;
  depth?: number;
}) {
  const children = item.children ?? [];

  return (
    <div className={`rounded-lg border border-slate-200 bg-white p-3 ${depth > 0 ? "ml-4" : ""}`}>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {depth === 0 ? "Menu item" : "Submenu item"}
        </span>
        <button type="button" onClick={onRemove} className="text-red-500" aria-label="Remove menu item">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Label" value={item.label} onChange={(label) => onChange({ ...item, label })} />
        <Field label="Link" value={item.href} onChange={(href) => onChange({ ...item, href })} />
      </div>

      {depth === 0 && (
        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-600">Dropdown links (optional)</span>
            <button
              type="button"
              onClick={() => onChange({ ...item, children: [...children, { label: "", href: "" }] })}
              className="inline-flex items-center gap-1 text-xs font-medium text-accent"
            >
              <Plus className="h-3.5 w-3.5" /> Add submenu
            </button>
          </div>
          {children.map((child, i) => (
            <NavItemEditor
              key={`${item.label}-child-${i}`}
              item={child}
              depth={1}
              onChange={(next) => {
                const nextChildren = [...children];
                nextChildren[i] = next;
                onChange({ ...item, children: nextChildren });
              }}
              onRemove={() =>
                onChange({
                  ...item,
                  children: children.filter((_, idx) => idx !== i),
                })
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function HeaderEditor({
  settings,
  navigation,
  onSettingsChange,
  onNavigationChange,
}: {
  settings: SiteSettings;
  navigation: NavItem[];
  onSettingsChange: (settings: SiteSettings) => void;
  onNavigationChange: (navigation: NavItem[]) => void;
}) {
  const patch = (p: Partial<SiteSettings>) => onSettingsChange({ ...settings, ...p });

  const moveNav = (index: number, direction: -1 | 1) => {
    const next = [...navigation];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onNavigationChange(next);
  };

  return (
    <section className="space-y-4 border-t border-slate-200 pt-8">
      <div>
        <h3 className="text-base font-bold text-primary">Header & Menu</h3>
        <p className="mt-1 text-xs text-slate-500">
          Top blue bar (phone, timing) — upar &quot;Contact (site-wide)&quot; section se edit hota hai.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Header Button Text"
          value={settings.headerCtaText}
          onChange={(headerCtaText) => patch({ headerCtaText })}
          hint='Right side button, e.g. "Contact Us"'
        />
        <Field
          label="Header Button Link"
          value={settings.headerCtaLink}
          onChange={(headerCtaLink) => patch({ headerCtaLink })}
          hint='e.g. "/contact-us"'
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-semibold text-slate-800">Navigation Menu</label>
          <button
            type="button"
            onClick={() => onNavigationChange([...navigation, { label: "", href: "" }])}
            className="inline-flex items-center gap-1 rounded-lg bg-accent px-3 py-1.5 text-sm text-white"
          >
            <Plus className="h-4 w-4" /> Add menu item
          </button>
        </div>

        {navigation.map((item, i) => (
          <div key={`nav-${i}`} className="space-y-2">
            <div className="flex justify-end gap-1">
              <button
                type="button"
                onClick={() => moveNav(i, -1)}
                disabled={i === 0}
                className="rounded border border-slate-200 p-1 text-slate-500 disabled:opacity-30"
                aria-label="Move menu item up"
              >
                <ChevronUp className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => moveNav(i, 1)}
                disabled={i === navigation.length - 1}
                className="rounded border border-slate-200 p-1 text-slate-500 disabled:opacity-30"
                aria-label="Move menu item down"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
            <NavItemEditor
              item={item}
              onChange={(next) => {
                const updated = [...navigation];
                updated[i] = next;
                onNavigationChange(updated);
              }}
              onRemove={() => onNavigationChange(navigation.filter((_, idx) => idx !== i))}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
