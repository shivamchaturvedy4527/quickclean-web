"use client";

import type { FooterContent, NavItem, SiteSettings } from "@/types/cms";
import { ImageFieldEditor } from "./ImageFieldEditor";
import { HeaderEditor } from "./HeaderEditor";
import {
  clampLogoHeight,
  estimateHeaderLogoWidth,
  headerLogoDisplayStyle,
  HEADER_LOGO_MAX_HEIGHT,
  HEADER_LOGO_MIN_HEIGHT,
  parseHeaderLogoHeight,
  scaleLogoWidth,
} from "@/lib/logo-size";

function Field({
  label,
  value,
  onChange,
  type = "text",
  hint,
  rows,
}: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  type?: string;
  hint?: string;
  rows?: number;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-800">{label}</label>
      {hint && <p className="mt-0.5 text-xs text-slate-500">{hint}</p>}
      {rows ? (
        <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm" />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm" />
      )}
    </div>
  );
}

export function SiteSettingsEditor({
  settings,
  footer,
  navigation,
  onSettingsChange,
  onFooterChange,
  onNavigationChange,
}: {
  settings: SiteSettings;
  footer: FooterContent;
  navigation: NavItem[];
  onSettingsChange: (settings: SiteSettings) => void;
  onFooterChange: (footer: FooterContent) => void;
  onNavigationChange: (navigation: NavItem[]) => void;
}) {
  const patch = (p: Partial<SiteSettings>) => onSettingsChange({ ...settings, ...p });
  const patchFooter = (p: Partial<FooterContent>) => onFooterChange({ ...footer, ...p });

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h3 className="text-base font-bold text-primary">Logo</h3>
        <ImageFieldEditor
          label="Website Logo"
          value={settings.logo}
          onChange={(logo) => patch({ logo })}
          forceOutputFormat="image/png"
          hint="PNG upload karein transparent background ke liye. Crop hamesha PNG mein save hota hai."
        />
        <div>
          <label className="block text-sm font-semibold text-slate-800">
            Logo Size — Height: {parseHeaderLogoHeight(settings)}px · Width: ~{estimateHeaderLogoWidth(settings)}px
          </label>
          <input
            type="range"
            min={HEADER_LOGO_MIN_HEIGHT}
            max={HEADER_LOGO_MAX_HEIGHT}
            value={parseHeaderLogoHeight(settings)}
            onChange={(e) => {
              const height = clampLogoHeight(Number(e.target.value));
              patch({
                logoMaxHeight: height,
                logoMaxWidth: scaleLogoWidth(height, settings),
              });
            }}
            className="mt-3 w-full"
          />
          <input
            type="number"
            min={HEADER_LOGO_MIN_HEIGHT}
            max={HEADER_LOGO_MAX_HEIGHT}
            value={parseHeaderLogoHeight(settings)}
            onChange={(e) => {
              const height = clampLogoHeight(Number(e.target.value) || parseHeaderLogoHeight(settings));
              patch({
                logoMaxHeight: height,
                logoMaxWidth: scaleLogoWidth(height, settings),
              });
            }}
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
          />
        </div>
        {settings.logo && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="mb-3 text-xs font-medium text-slate-500">Header preview</p>
              <div className="relative h-16 overflow-visible border border-slate-200 bg-white px-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={settings.logo}
                  alt=""
                  className="absolute left-3 top-1/2 -translate-y-1/2 object-contain object-left"
                  style={headerLogoDisplayStyle(settings)}
                />
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-primary p-4">
              <p className="mb-3 text-xs font-medium text-slate-300">Footer preview — same logo as header</p>
              <div className="inline-flex rounded-lg bg-white px-3 py-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={settings.logo}
                  alt=""
                  className="object-contain object-left"
                  style={headerLogoDisplayStyle(settings)}
                />
              </div>
            </div>
          </div>
        )}
      </section>

      <HeaderEditor
        settings={settings}
        navigation={navigation}
        onSettingsChange={onSettingsChange}
        onNavigationChange={onNavigationChange}
      />

      <section className="space-y-4 border-t border-slate-200 pt-8">
        <h3 className="text-base font-bold text-primary">Site Name & Tagline</h3>
        <Field label="Site Name" value={settings.siteName} onChange={(siteName) => patch({ siteName })} hint="Used for logo alt text and browser title" />
        <Field label="Default Tagline" value={settings.tagline} onChange={(tagline) => patch({ tagline })} hint="Shows in hero only if Top Label is empty (Home Page tab)" />
      </section>

      <section className="space-y-4 border-t border-slate-200 pt-8">
        <h3 className="text-base font-bold text-primary">Contact (site-wide)</h3>
        <Field label="Phone" value={settings.contactPhone} onChange={(contactPhone) => patch({ contactPhone })} hint="Top blue bar mein dikhta hai" />
        <Field label="Business Hours" value={settings.businessHours} onChange={(businessHours) => patch({ businessHours })} hint="Top blue bar — right side timing" />
        <Field label="Email" value={settings.contactEmail} onChange={(contactEmail) => patch({ contactEmail })} />
        <Field label="Address Line 1" value={settings.addressLine1} onChange={(addressLine1) => patch({ addressLine1 })} />
        <Field label="Address Line 2" value={settings.addressLine2} onChange={(addressLine2) => patch({ addressLine2 })} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="City" value={settings.city} onChange={(city) => patch({ city })} />
          <Field label="Country" value={settings.country} onChange={(country) => patch({ country })} />
        </div>
        <div className="rounded-lg border border-blue-100 bg-blue-50 p-3 text-sm text-blue-900 mb-4">
          <p className="font-semibold mb-2">📍 Google Maps Coordinates (Footer address link ke liye)</p>
          <p className="text-xs mb-3">Address ko footer mein click kar payenga footer mein, iska link open hoga Google Maps mein.</p>
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className="block text-xs font-semibold text-blue-800 mb-1">Latitude</label>
              <input type="number" step="0.000001" value={settings.mapLatitude ?? ""} onChange={(e) => patch({ mapLatitude: e.target.value ? Number(e.target.value) : undefined })} placeholder="e.g. 28.5244" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-blue-800 mb-1">Longitude</label>
              <input type="number" step="0.000001" value={settings.mapLongitude ?? ""} onChange={(e) => patch({ mapLongitude: e.target.value ? Number(e.target.value) : undefined })} placeholder="e.g. 77.1362" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-blue-800 mb-1">Zoom Level (1-21)</label>
              <input type="number" min="1" max="21" value={settings.mapZoom ?? 15} onChange={(e) => patch({ mapZoom: Number(e.target.value) || 15 })} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
            </div>
          </div>
        </div>
        <Field label="WhatsApp Number" value={settings.whatsappNumber} onChange={(whatsappNumber) => patch({ whatsappNumber })} hint="With country code, e.g. 919821354872" />
      </section>

      <section className="space-y-4 border-t border-slate-200 pt-8">
        <h3 className="text-base font-bold text-primary">Footer</h3>
        <Field label="Footer About Text" value={footer.aboutText} onChange={(aboutText) => patchFooter({ aboutText })} rows={3} />
        <Field label="Manufactured By — Label" value={footer.manufacturedByLabel ?? ""} onChange={(manufacturedByLabel) => patchFooter({ manufacturedByLabel })} />
        <Field label="Manufactured By — Company" value={footer.manufacturedByCompany ?? ""} onChange={(manufacturedByCompany) => patchFooter({ manufacturedByCompany })} />
        <Field label="Copyright Text" value={footer.copyright} onChange={(copyright) => patchFooter({ copyright })} />
      </section>
    </div>
  );
}
