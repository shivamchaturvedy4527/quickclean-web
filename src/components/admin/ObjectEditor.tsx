"use client";

import { Plus, Trash2 } from "lucide-react";
import { ImageFieldEditor } from "./ImageFieldEditor";

const FIELD_LABELS: Record<string, string> = {
  siteName: "Site name (header text if no logo)",
  companyLegalName: "Legal company name",
  tagline: "Tagline / eyebrow text",
  logo: "Logo image path",
  logoMaxWidth: "Logo max width (px)",
  logoMaxHeight: "Logo max height (px)",
  favicon: "Favicon path",
  shortDescription: "Short description (cards & hero subtitle)",
  description: "Full description (detail page)",
  heroImage: "Hero / banner image path",
  image: "Main image path",
  gallery: "Gallery image paths (one per line)",
  features: "Feature bullets (one per line)",
  specs: "Specification bullets (one per line)",
  serviceCentres: "Service centres (one per line)",
  pptMediaArchive: "PPT media archive paths (one per line)",
  manufacturedByLabel: "Manufactured & marketed by — label",
  manufacturedByCompany: "Manufactured & marketed by — company",
  manufacturedByDivision: "Manufactured & marketed by — division",
  overviewEyebrow: "Overview section eyebrow",
  overviewTitle: "Overview section title",
  machinesEyebrow: "Machines section eyebrow",
  machinesTitle: "Machines section title",
  machinesSubtitle: "Machines section subtitle",
  enquireTitle: "Enquiry box title (page default or product override)",
  enquireText: "Enquiry box text (page default or product override)",
  enquireCtaText: "Enquiry button text (page default or product override)",
  specsHeading: "Specs section heading (page default or product override)",
  featuresHeading: "Features section heading (page default or product override)",
  productImageAspectRatio: "Product card image ratio (e.g. 4/3, 16/9)",
  productImageObjectFit: "Product image fit (cover or contain)",
  viewDetailsText: "Product card link text",
  imageAspectRatio: "Per-product card image ratio (e.g. 4/3, 16/9, 1/1)",
  imageObjectFit: "Per-product image fit: cover or contain",
  heroImageAlt: "Hero / banner image alt text",
  benefitsHeading: "Benefits section heading (override)",
  sidebarTitle: "Sidebar box title (override)",
  sidebarText: "Sidebar box text (override)",
  breadcrumb: "Breadcrumb text on page hero",
  partnersTitle: "Partners section heading",
};

const HIDDEN_KEYS = new Set([
  "id",
  "slug",
  "blogCategories",
  "pptMediaArchive",
  "priceFromINR",
  "priceFromUSD",
  "priceFromEUR",
  "priceFromAED",
  "mapEmbed",
]);

function itemTitle(item: unknown, index: number): string {
  if (item && typeof item === "object") {
    const o = item as Record<string, unknown>;
    if (typeof o.title === "string" && o.title) return o.title;
    if (typeof o.name === "string" && o.name) return o.name;
    if (typeof o.label === "string" && o.label) return o.label;
    if (typeof o.quote === "string" && o.quote) return `"${o.quote.slice(0, 50)}..."`;
  }
  return `Item ${index + 1}`;
}

function labelFor(key: string): string {
  return FIELD_LABELS[key] ?? key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
}

function isImageField(key: string): boolean {
  return /image|logo|thumbnail|hero|avatar|favicon|src$/i.test(key) && !/embed|max|fit|ratio/i.test(key);
}

function isLongText(key: string, value: string): boolean {
  return (
    value.length > 80 ||
    /desc|content|paragraph|subtitle|message|intro|body|excerpt|bio|quote|about/i.test(key)
  );
}

function isStringArray(items: unknown[]): boolean {
  return items.every((item) => typeof item === "string");
}

function FieldEditor({
  label,
  value,
  onChange,
}: {
  label: string;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  const displayLabel = labelFor(label);

  if (typeof value === "boolean") {
    return (
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} />
        {displayLabel}
      </label>
    );
  }

  if (typeof value === "number") {
    return (
      <div className="mb-3">
        <label className="block text-xs font-medium text-slate-600">{displayLabel}</label>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
      </div>
    );
  }

  if (typeof value === "string") {
    if (isImageField(label)) {
      return (
        <ImageFieldEditor
          label={displayLabel}
          value={value}
          onChange={onChange}
          hint="Upload karo ya pehle se maujood image choose karo."
        />
      );
    }
    if (isLongText(label, value)) {
      return (
        <div className="mb-3">
          <label className="block text-xs font-medium text-slate-600">{displayLabel}</label>
          <textarea
            rows={Math.max(4, Math.min(16, value.split("\n").length + 1))}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
      );
    }
    return (
      <div className="mb-3">
        <label className="block text-xs font-medium text-slate-600">{displayLabel}</label>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
      </div>
    );
  }

  return null;
}

function StringListEditor({
  label,
  items,
  onChange,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
}) {
  const text = items.join("\n");

  return (
    <div className="mb-3 rounded-lg border border-slate-200 bg-white p-3">
      <label className="block text-xs font-medium text-slate-600">{labelFor(label)}</label>
      <p className="mt-0.5 text-xs text-slate-400">One item per line. Empty lines are ignored on save.</p>
      <textarea
        rows={Math.max(4, Math.min(20, items.length + 2))}
        value={text}
        onChange={(e) =>
          onChange(
            e.target.value
              .split("\n")
              .map((line) => line.trim())
              .filter(Boolean)
          )
        }
        className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 font-mono text-sm"
      />
      <p className="mt-1 text-xs text-slate-400">{items.length} items</p>
    </div>
  );
}

function ArrayEditor({
  label,
  items,
  onChange,
}: {
  label: string;
  items: unknown[];
  onChange: (items: unknown[]) => void;
}) {
  if (isStringArray(items)) {
    return (
      <StringListEditor
        label={label}
        items={items as string[]}
        onChange={(next) => onChange(next)}
      />
    );
  }

  const addItem = () => {
    const template = items[0];
    if (template && typeof template === "object" && template !== null) {
      const blank = Object.fromEntries(
        Object.entries(template as Record<string, unknown>).map(([k, v]) => [
          k,
          typeof v === "number" ? 0 : typeof v === "boolean" ? false : Array.isArray(v) ? [] : "",
        ])
      );
      onChange([...items, { ...blank, id: `new-${Date.now()}` }]);
    } else {
      onChange([...items, ""]);
    }
  };

  return (
    <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50/50 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="font-semibold text-slate-800">
          {labelFor(label)} ({items.length})
        </h4>
        <button
          type="button"
          onClick={addItem}
          className="inline-flex items-center gap-1 rounded-md bg-accent px-2 py-1 text-xs font-medium text-white hover:bg-accent-hover"
        >
          <Plus className="h-3 w-3" /> Add
        </button>
      </div>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="rounded-lg border border-slate-200 bg-white p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">{itemTitle(item, i)}</span>
              <button
                type="button"
                onClick={() => onChange(items.filter((_, j) => j !== i))}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            {typeof item === "string" || typeof item === "number" ? (
              <FieldEditor
                label={`Item ${i + 1}`}
                value={item}
                onChange={(v) => {
                  const next = [...items];
                  next[i] = v;
                  onChange(next);
                }}
              />
            ) : item && typeof item === "object" ? (
              <ObjectEditor
                data={item as Record<string, unknown>}
                onChange={(v) => {
                  const next = [...items];
                  next[i] = v;
                  onChange(next);
                }}
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ObjectEditor({
  data,
  onChange,
}: {
  data: Record<string, unknown>;
  onChange: (d: Record<string, unknown>) => void;
}) {
  const updateKey = (key: string, val: unknown) => {
    onChange({ ...data, [key]: val });
  };

  return (
    <div className="space-y-1">
      {Object.entries(data)
        .filter(([key]) => !HIDDEN_KEYS.has(key))
        .map(([key, value]) => {
        if (Array.isArray(value)) {
          return (
            <ArrayEditor
              key={key}
              label={key}
              items={value}
              onChange={(items) => updateKey(key, items)}
            />
          );
        }

        if (value && typeof value === "object") {
          return (
            <div key={key} className="mb-3 rounded-xl border border-slate-200 bg-slate-50/50 p-4">
              <h4 className="mb-3 font-semibold text-slate-800">{labelFor(key)}</h4>
              <ObjectEditor
                data={value as Record<string, unknown>}
                onChange={(v) => updateKey(key, v)}
              />
            </div>
          );
        }

        return (
          <FieldEditor key={key} label={key} value={value} onChange={(v) => updateKey(key, v)} />
        );
      })}
    </div>
  );
}
