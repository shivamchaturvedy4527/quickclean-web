"use client";

import { Plus, Trash2 } from "lucide-react";
import type { BrandLogo, HomeContent, InstallationGalleryContent, SiteLabels, Testimonial } from "@/types/cms";
import { GalleryEditor } from "./GalleryEditor";
import { ImageFieldEditor } from "./ImageFieldEditor";

function Field({ label, value, onChange, rows, hint }: { label: string; value: string; onChange: (v: string) => void; rows?: number; hint?: string }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-800">{label}</label>
      {hint && <p className="mt-0.5 text-xs text-slate-500">{hint}</p>}
      {rows ? (
        <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm" />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm" />
      )}
    </div>
  );
}

export function HomePageEditor({
  home,
  homeLabels,
  brands,
  testimonials,
  installationGallery,
  onHomeChange,
  onHomeLabelsChange,
  onBrandsChange,
  onTestimonialsChange,
  onGalleryChange,
}: {
  home: HomeContent;
  homeLabels: SiteLabels["home"];
  brands: BrandLogo[];
  testimonials: Testimonial[];
  installationGallery?: InstallationGalleryContent;
  onHomeChange: (home: HomeContent) => void;
  onHomeLabelsChange: (labels: SiteLabels["home"]) => void;
  onBrandsChange: (brands: BrandLogo[]) => void;
  onTestimonialsChange: (testimonials: Testimonial[]) => void;
  onGalleryChange: (gallery: InstallationGalleryContent) => void;
}) {
  const patch = (p: Partial<HomeContent>) => onHomeChange({ ...home, ...p });
  const gallery = installationGallery ?? { title: "", subtitle: "", images: [] };
  const heroImages =
    home.heroImages?.length ? home.heroImages : home.heroImage ? [home.heroImage] : [];

  const setHeroImages = (next: string[]) => {
    patch({ heroImages: next, heroImage: next[0] ?? "" });
  };

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h3 className="font-bold text-primary">Hero Banner</h3>
        <Field label="Top Label (pill badge)" value={home.heroEyebrow ?? ""} onChange={(heroEyebrow) => patch({ heroEyebrow })} />
        <Field label="Main Title (large blue text)" value={home.heroTitle} onChange={(heroTitle) => patch({ heroTitle })} />
        <Field label="Second Title Line (optional)" value={home.heroTitleLine2} onChange={(heroTitleLine2) => patch({ heroTitleLine2 })} />
        <Field label="Subtitle" value={home.heroSubtitle} onChange={(heroSubtitle) => patch({ heroSubtitle })} rows={3} />

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-semibold text-slate-800">Hero Images (auto slider)</label>
              <p className="mt-0.5 text-xs text-slate-500">
                Yahan apni machines / equipment ki photos upload karo — design reference image nahi.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setHeroImages([...heroImages, ""])}
              className="inline-flex items-center gap-1 rounded-lg bg-accent px-3 py-1.5 text-sm text-white"
            >
              <Plus className="h-4 w-4" /> Add Image
            </button>
          </div>
          {heroImages.length === 0 && (
            <button
              type="button"
              onClick={() => setHeroImages([""])}
              className="rounded-lg border border-dashed border-slate-300 px-4 py-3 text-sm text-slate-600 hover:border-accent hover:text-accent"
            >
              Add first hero image
            </button>
          )}
          {heroImages.map((src, i) => (
            <div key={`hero-img-${i}`} className="rounded-lg border border-slate-200 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">Slide {i + 1}</span>
                <button
                  type="button"
                  onClick={() => setHeroImages(heroImages.filter((_, idx) => idx !== i))}
                  className="text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
        <ImageFieldEditor
                  label="Image"
                  value={src}
                  onChange={(image) => {
                  const next = [...heroImages];
                  next[i] = image;
                  setHeroImages(next);
                }}
              />
            </div>
          ))}
          {heroImages.length > 1 && (
            <Field
              label="Auto-slide seconds"
              value={String(home.heroSlideInterval ?? 5)}
              onChange={(v) => patch({ heroSlideInterval: Math.max(2, Number(v) || 5) })}
            />
          )}
        </div>

        <Field label="Hero Image Alt Text" value={homeLabels.heroImageAlt} onChange={(heroImageAlt) => onHomeLabelsChange({ ...homeLabels, heroImageAlt })} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Button 1 Text" value={home.heroCtaText} onChange={(heroCtaText) => patch({ heroCtaText })} />
          <Field label="Button 1 Link" value={home.heroCtaLink} onChange={(heroCtaLink) => patch({ heroCtaLink })} />
          <Field label="Button 2 Text" value={home.heroSecondaryCtaText} onChange={(heroSecondaryCtaText) => patch({ heroSecondaryCtaText })} />
          <Field label="Button 2 Link" value={home.heroSecondaryCtaLink} onChange={(heroSecondaryCtaLink) => patch({ heroSecondaryCtaLink })} />
        </div>

        <div className="space-y-3 border-t border-slate-200 pt-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-primary">Hero Feature Bar (bottom icons)</h4>
            <button
              type="button"
              onClick={() =>
                patch({
                  heroFeatures: [...(home.heroFeatures ?? []), { line1: "", line2: "" }],
                })
              }
              className="inline-flex items-center gap-1 rounded-lg bg-accent px-3 py-1.5 text-sm text-white"
            >
              <Plus className="h-4 w-4" /> Add
            </button>
          </div>
          {(home.heroFeatures ?? []).map((feature, i) => (
            <div key={`hero-feature-${i}`} className="grid gap-2 rounded-lg border border-slate-200 p-3 sm:grid-cols-2">
              <div className="flex items-start justify-between sm:col-span-2">
                <span className="text-sm font-medium">Feature {i + 1}</span>
                <button
                  type="button"
                  onClick={() =>
                    patch({ heroFeatures: (home.heroFeatures ?? []).filter((_, idx) => idx !== i) })
                  }
                  className="text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <input
                value={feature.line1}
                onChange={(e) => {
                  const next = [...(home.heroFeatures ?? [])];
                  next[i] = { ...feature, line1: e.target.value };
                  patch({ heroFeatures: next });
                }}
                placeholder="Line 1"
                className="rounded-md border border-slate-300 px-3 py-2 text-sm"
              />
              <input
                value={feature.line2}
                onChange={(e) => {
                  const next = [...(home.heroFeatures ?? [])];
                  next[i] = { ...feature, line2: e.target.value };
                  patch({ heroFeatures: next });
                }}
                placeholder="Line 2"
                className="rounded-md border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4 border-t border-slate-200 pt-8">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-primary">Stats (numbers below hero)</h3>
          <button
            type="button"
            onClick={() => patch({ stats: [...home.stats, { value: 0, suffix: "+", label: "" }] })}
            className="inline-flex items-center gap-1 rounded-lg bg-accent px-3 py-1.5 text-sm text-white"
          >
            <Plus className="h-4 w-4" /> Add Stat
          </button>
        </div>
        {home.stats.map((stat, i) => (
          <div key={`stat-${i}`} className="rounded-lg border border-slate-200 p-3">
            <div className="mb-2 flex justify-between">
              <span className="text-sm font-medium">{stat.label || `Stat ${i + 1}`}</span>
              <button
                type="button"
                onClick={() => patch({ stats: home.stats.filter((_, idx) => idx !== i) })}
                className="text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <input
                type="number"
                value={stat.value}
                onChange={(e) => {
                  const next = [...home.stats];
                  next[i] = { ...stat, value: Number(e.target.value) || 0 };
                  patch({ stats: next });
                }}
                placeholder="Number"
                className="rounded-md border border-slate-300 px-3 py-2 text-sm"
              />
              <input
                value={stat.suffix}
                onChange={(e) => {
                  const next = [...home.stats];
                  next[i] = { ...stat, suffix: e.target.value };
                  patch({ stats: next });
                }}
                placeholder="Suffix (+)"
                className="rounded-md border border-slate-300 px-3 py-2 text-sm"
              />
              <input
                value={stat.label}
                onChange={(e) => {
                  const next = [...home.stats];
                  next[i] = { ...stat, label: e.target.value };
                  patch({ stats: next });
                }}
                placeholder="Label"
                className="rounded-md border border-slate-300 px-3 py-2 text-sm sm:col-span-1"
              />
            </div>
          </div>
        ))}
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Extra Stat Label" value={home.linenWashedLabel} onChange={(linenWashedLabel) => patch({ linenWashedLabel })} />
          <Field label="Extra Stat Number" value={String(home.linenWashedValue)} onChange={(v) => patch({ linenWashedValue: Number(v) || 0 })} />
          <Field label="Extra Stat Suffix" value={home.linenWashedSuffix} onChange={(linenWashedSuffix) => patch({ linenWashedSuffix })} />
        </div>
      </section>

      <section className="space-y-4 border-t border-slate-200 pt-8">
        <h3 className="font-bold text-primary">Section Headings</h3>
        <Field label="Solutions Section Title" value={home.solutionsTitle} onChange={(solutionsTitle) => patch({ solutionsTitle })} />
        <Field label="Solutions Section Subtitle" value={home.solutionsSubtitle} onChange={(solutionsSubtitle) => patch({ solutionsSubtitle })} rows={2} />
        <Field label="Solutions Card Link Text" value={homeLabels.readMore} onChange={(readMore) => onHomeLabelsChange({ ...homeLabels, readMore })} />
        <Field label="Products Section Title" value={home.productsTitle ?? ""} onChange={(productsTitle) => patch({ productsTitle })} />
        <Field label="Products Section Subtitle" value={home.productsSubtitle ?? ""} onChange={(productsSubtitle) => patch({ productsSubtitle })} rows={2} />
        <Field label="Products YouTube Video URL" value={home.productsVideoUrl ?? ""} onChange={(productsVideoUrl) => patch({ productsVideoUrl })} hint="Ager URL hai toh subtitle k neeche 'Watch Video' button dikhega" />
        <Field label="Products Eyebrow Label" value={homeLabels.machinesEyebrow} onChange={(machinesEyebrow) => onHomeLabelsChange({ ...homeLabels, machinesEyebrow })} />
        <Field label="View Product Link Text" value={homeLabels.viewProduct} onChange={(viewProduct) => onHomeLabelsChange({ ...homeLabels, viewProduct })} />
        <Field label="Full Catalogue Button Text" value={homeLabels.fullCatalogue} onChange={(fullCatalogue) => onHomeLabelsChange({ ...homeLabels, fullCatalogue })} />
        <Field label="Clients Marquee Title" value={home.brandsTitle} onChange={(brandsTitle) => patch({ brandsTitle })} />
        <Field label="Testimonials Section Title" value={home.clientsTitle} onChange={(clientsTitle) => patch({ clientsTitle })} />
        <Field label="Testimonials Eyebrow Label" value={homeLabels.clientsEyebrow} onChange={(clientsEyebrow) => onHomeLabelsChange({ ...homeLabels, clientsEyebrow })} />
        <Field label="News Section Title" value={home.newsTitle} onChange={(newsTitle) => patch({ newsTitle })} />
        <Field label="News Section Subtitle" value={home.newsSubtitle} onChange={(newsSubtitle) => patch({ newsSubtitle })} rows={2} />
        <Field label="Newsletter Title" value={home.newsletterTitle} onChange={(newsletterTitle) => patch({ newsletterTitle })} />
        <Field label="Newsletter Subtitle" value={home.newsletterSubtitle} onChange={(newsletterSubtitle) => patch({ newsletterSubtitle })} rows={2} />
      </section>

      <section className="space-y-4 border-t border-slate-200 pt-8">
        <h3 className="font-bold text-primary">Founder & Video</h3>
        <Field label="Section Title" value={home.founderTitle} onChange={(founderTitle) => patch({ founderTitle })} />
        <Field label="Founder Message" value={home.founderMessage} onChange={(founderMessage) => patch({ founderMessage })} rows={5} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Founder Name" value={home.founderName} onChange={(founderName) => patch({ founderName })} />
          <Field label="Founder Role" value={home.founderRole} onChange={(founderRole) => patch({ founderRole })} />
        </div>
        <Field label="Since Year" value={home.sinceYear} onChange={(sinceYear) => patch({ sinceYear })} />
        <ImageFieldEditor label="Founder Photo" value={home.founderImage} onChange={(founderImage) => patch({ founderImage })} />
        <Field label="Video Section Title" value={home.videoTitle} onChange={(videoTitle) => patch({ videoTitle })} />
        <Field label="YouTube Video URL" value={home.videoUrl} onChange={(videoUrl) => patch({ videoUrl })} />
        <ImageFieldEditor label="Video Thumbnail" value={home.videoThumbnail} onChange={(videoThumbnail) => patch({ videoThumbnail })} />
      </section>

      <section className="space-y-4 border-t border-slate-200 pt-8">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-primary">Client / Brand Logos</h3>
          <button type="button" onClick={() => onBrandsChange([...brands, { id: `b-${Date.now()}`, name: "", image: "" }])} className="inline-flex items-center gap-1 rounded-lg bg-accent px-3 py-1.5 text-sm text-white">
            <Plus className="h-4 w-4" /> Add Logo
          </button>
        </div>
        {brands.map((brand, i) => (
          <div key={brand.id} className="rounded-lg border border-slate-200 p-3">
            <div className="mb-2 flex justify-between">
              <span className="text-sm font-medium">{brand.name || `Logo ${i + 1}`}</span>
              <button type="button" onClick={() => onBrandsChange(brands.filter((b) => b.id !== brand.id))} className="text-red-500"><Trash2 className="h-4 w-4" /></button>
            </div>
            <input value={brand.name} onChange={(e) => { const next = [...brands]; next[i] = { ...brand, name: e.target.value }; onBrandsChange(next); }} placeholder="Brand name" className="mb-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
            <ImageFieldEditor label="Logo Image" value={brand.image} onChange={(image) => { const next = [...brands]; next[i] = { ...brand, image }; onBrandsChange(next); }} />
          </div>
        ))}
      </section>

      <section className="space-y-4 border-t border-slate-200 pt-8">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-primary">Testimonials</h3>
          <button type="button" onClick={() => onTestimonialsChange([...testimonials, { id: `t-${Date.now()}`, quote: "", author: "", company: "" }])} className="inline-flex items-center gap-1 rounded-lg bg-accent px-3 py-1.5 text-sm text-white">
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>
        {testimonials.map((t, i) => (
          <div key={t.id} className="rounded-lg border border-slate-200 p-3 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">{t.author || `Testimonial ${i + 1}`}</span>
              <button type="button" onClick={() => onTestimonialsChange(testimonials.filter((x) => x.id !== t.id))} className="text-red-500"><Trash2 className="h-4 w-4" /></button>
            </div>
            <textarea rows={3} value={t.quote} onChange={(e) => { const next = [...testimonials]; next[i] = { ...t, quote: e.target.value }; onTestimonialsChange(next); }} placeholder="Quote" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
            <input value={t.author} onChange={(e) => { const next = [...testimonials]; next[i] = { ...t, author: e.target.value }; onTestimonialsChange(next); }} placeholder="Name" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
            <input value={t.company} onChange={(e) => { const next = [...testimonials]; next[i] = { ...t, company: e.target.value }; onTestimonialsChange(next); }} placeholder="Company" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
          </div>
        ))}
      </section>

      <section className="border-t border-slate-200 pt-8">
        <h3 className="mb-4 font-bold text-primary">Installation Photos</h3>
        <GalleryEditor gallery={gallery} onChange={onGalleryChange} />
      </section>
    </div>
  );
}
