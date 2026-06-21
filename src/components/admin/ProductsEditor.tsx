"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink, Plus, Trash2 } from "lucide-react";
import type { PressingMachinesContent, Product, ProductsPageContent } from "@/types/cms";
import { ImageFieldEditor } from "./ImageFieldEditor";

function linesToList(text: string): string[] {
  return text.split("\n").map((l) => l.trim()).filter(Boolean);
}

function Field({
  label,
  value,
  onChange,
  rows,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-800">{label}</label>
      {rows ? (
        <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm" />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm" />
      )}
    </div>
  );
}

export function ProductsEditor({
  productsPage,
  products,
  pressingMachines,
  onProductsPageChange,
  onProductsChange,
  onPressingMachinesChange,
}: {
  productsPage: ProductsPageContent;
  products: Product[];
  pressingMachines?: PressingMachinesContent;
  onProductsPageChange: (page: ProductsPageContent) => void;
  onProductsChange: (products: Product[]) => void;
  onPressingMachinesChange: (content: PressingMachinesContent) => void;
}) {
  const [selectedId, setSelectedId] = useState(products[0]?.id ?? "");
  const [openPage, setOpenPage] = useState(true);
  const [openPressing, setOpenPressing] = useState(false);

  const selected = useMemo(
    () => products.find((p) => p.id === selectedId) ?? products[0],
    [products, selectedId]
  );

  const pressing = pressingMachines ?? { title: "", subtitle: "", items: [] };

  if (!selected) {
    return <p className="text-slate-500">No products found.</p>;
  }

  const patchPage = (p: Partial<ProductsPageContent>) => onProductsPageChange({ ...productsPage, ...p });
  const updateProduct = (patch: Partial<Product>) => {
    onProductsChange(products.map((p) => (p.id === selected.id ? { ...p, ...patch } : p)));
  };

  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-sky-100 bg-sky-50 px-4 py-3 text-sm text-sky-950">
        Yeh ek hi page hai: <strong>/products</strong> — upar page heading, neeche har machine. Sab edit yahan →{" "}
        <strong>Publish to Website</strong>.
      </div>

      <section className="rounded-xl border border-slate-200 bg-slate-50/50">
        <button
          type="button"
          onClick={() => setOpenPage((v) => !v)}
          className="flex w-full items-center justify-between px-4 py-3 text-left font-semibold text-primary"
        >
          Products Page — Heading & Intro
          {openPage ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {openPage && (
          <div className="space-y-4 border-t border-slate-200 px-4 pb-4 pt-4">
            <Field label="Page Title" value={productsPage.title} onChange={(title) => patchPage({ title })} />
            <Field label="Page Introduction" value={productsPage.intro} onChange={(intro) => patchPage({ intro })} rows={5} />
            <ImageFieldEditor label="Page Banner Image" value={productsPage.heroImage ?? ""} onChange={(heroImage) => patchPage({ heroImage })} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Machines Section Title" value={productsPage.machinesTitle ?? ""} onChange={(machinesTitle) => patchPage({ machinesTitle })} />
              <Field label="Machines Section Subtitle" value={productsPage.machinesSubtitle ?? ""} onChange={(machinesSubtitle) => patchPage({ machinesSubtitle })} />
            </div>
          </div>
        )}
      </section>

      <section className="space-y-4 border-t border-slate-200 pt-6">
        <h3 className="font-bold text-primary">Edit Each Machine</h3>
        <div>
          <label className="block text-sm font-semibold text-slate-800">Select Machine</label>
          <select
            value={selected.id}
            onChange={(e) => setSelectedId(e.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
          >
            {products.map((product) => (
              <option key={product.id} value={product.id}>{product.title}</option>
            ))}
          </select>
        </div>

        <a href={`/products/${selected.slug}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm underline">
          Preview this machine <ExternalLink className="h-4 w-4" />
        </a>

        <ImageFieldEditor label="Machine Photo" value={selected.image} onChange={(image) => updateProduct({ image })} />

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-semibold text-slate-800">Additional Gallery Images</label>
            <button
              type="button"
              onClick={() => updateProduct({ gallery: [...(selected.gallery ?? []), ""] })}
              className="inline-flex items-center gap-1 rounded-lg bg-accent px-3 py-1.5 text-sm text-white"
            >
              <Plus className="h-4 w-4" /> Add Image
            </button>
          </div>
          {(selected.gallery ?? []).length === 0 && (
            <p className="text-xs text-slate-500">Koi gallery images nahi — sirf main photo show hoga</p>
          )}
          {(selected.gallery ?? []).map((galleryImg, i) => (
            <div key={`gallery-${i}`} className="rounded-lg border border-slate-200 bg-white p-3">
              <div className="mb-2 flex justify-between">
                <span className="text-sm font-medium">Gallery Image {i + 1}</span>
                <button
                  type="button"
                  onClick={() => updateProduct({ gallery: (selected.gallery ?? []).filter((_, idx) => idx !== i) })}
                  className="text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <ImageFieldEditor
                label="Image"
                value={galleryImg}
                onChange={(img) => {
                  const next = [...(selected.gallery ?? [])];
                  next[i] = img;
                  updateProduct({ gallery: next });
                }}
              />
            </div>
          ))}
        </div>

        <Field label="Machine Name" value={selected.title} onChange={(title) => updateProduct({ title })} />
        <Field label="Short Description" value={selected.shortDescription} onChange={(shortDescription) => updateProduct({ shortDescription })} rows={3} />
        <Field label="Full Description" value={selected.description} onChange={(description) => updateProduct({ description })} rows={6} />
        <Field
          label="Specs / Features (one per line)"
          value={(selected.specs?.length ? selected.specs : selected.features).join("\n")}
          onChange={(text) => {
            const list = linesToList(text);
            if (selected.category === "Commercial Laundry") updateProduct({ specs: list });
            else updateProduct({ features: list });
          }}
          rows={6}
        />
      </section>

      <section className="rounded-xl border border-slate-200 bg-slate-50/50">
        <button
          type="button"
          onClick={() => setOpenPressing((v) => !v)}
          className="flex w-full items-center justify-between px-4 py-3 text-left font-semibold text-primary"
        >
          Pressing Machines Section
          {openPressing ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {openPressing && (
          <div className="space-y-4 border-t border-slate-200 px-4 pb-4 pt-4">
            <Field label="Section Title" value={pressing.title} onChange={(title) => onPressingMachinesChange({ ...pressing, title })} />
            <Field label="Section Subtitle" value={pressing.subtitle ?? ""} onChange={(subtitle) => onPressingMachinesChange({ ...pressing, subtitle })} rows={2} />
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">Machines ({pressing.items.length})</span>
              <button
                type="button"
                onClick={() => onPressingMachinesChange({ ...pressing, items: [...pressing.items, { name: "", image: "" }] })}
                className="inline-flex items-center gap-1 rounded-lg bg-accent px-3 py-1.5 text-sm text-white"
              >
                <Plus className="h-4 w-4" /> Add
              </button>
            </div>
            {pressing.items.map((item, i) => (
              <div key={i} className="rounded-lg border border-slate-200 bg-white p-3">
                <div className="mb-2 flex justify-between">
                  <span className="text-sm font-medium">{item.name || `Machine ${i + 1}`}</span>
                  <button type="button" onClick={() => onPressingMachinesChange({ ...pressing, items: pressing.items.filter((_, j) => j !== i) })} className="text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <input
                  value={item.name}
                  onChange={(e) => {
                    const items = [...pressing.items];
                    items[i] = { ...items[i], name: e.target.value };
                    onPressingMachinesChange({ ...pressing, items });
                  }}
                  placeholder="Name"
                  className="mb-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                />
                <ImageFieldEditor
                  label="Photo"
                  value={item.image}
                  onChange={(image) => {
                    const items = [...pressing.items];
                    items[i] = { ...items[i], image };
                    onPressingMachinesChange({ ...pressing, items });
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
