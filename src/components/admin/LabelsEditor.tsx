"use client";

import type { SiteLabels } from "@/types/cms";

const GROUPS: { title: string; keys: { path: string; label: string }[] }[] = [
  {
    title: "Home Page Buttons",
    keys: [
      { path: "home.readMore", label: "Read More button" },
      { path: "home.viewProduct", label: "View Product button" },
      { path: "home.fullCatalogue", label: "Full catalogue link" },
    ],
  },
  {
    title: "Solutions Page",
    keys: [
      { path: "solutions.learnMore", label: "Learn more link" },
      { path: "solutions.benefitsHeading", label: "Benefits heading" },
      { path: "solutions.partnerTitle", label: "Sidebar title" },
      { path: "solutions.partnerText", label: "Sidebar text" },
      { path: "solutions.contactCta", label: "Contact button" },
    ],
  },
  {
    title: "Products Page",
    keys: [
      { path: "products.viewDetails", label: "View details link" },
      { path: "products.enquireTitle", label: "Enquiry box title" },
      { path: "products.enquireText", label: "Enquiry box text" },
      { path: "products.enquireCta", label: "Enquiry button" },
    ],
  },
  {
    title: "Contact Form",
    keys: [
      { path: "contact.formName", label: "Name field label" },
      { path: "contact.formEmail", label: "Email field label" },
      { path: "contact.formPhone", label: "Phone field label" },
      { path: "contact.formMessage", label: "Message field label" },
      { path: "contact.formSubmit", label: "Submit button" },
      { path: "contact.formSuccess", label: "Success message" },
    ],
  },
  {
    title: "Newsletter",
    keys: [
      { path: "newsletter.subscribe", label: "Subscribe button" },
      { path: "newsletter.namePlaceholder", label: "Name placeholder" },
      { path: "newsletter.emailPlaceholder", label: "Email placeholder" },
    ],
  },
];

function getNested(obj: SiteLabels, path: string): string {
  const parts = path.split(".");
  let cur: unknown = obj;
  for (const p of parts) {
    if (!cur || typeof cur !== "object") return "";
    cur = (cur as Record<string, unknown>)[p];
  }
  return typeof cur === "string" ? cur : "";
}

function setNested(labels: SiteLabels, path: string, value: string): SiteLabels {
  const parts = path.split(".");
  const clone = structuredClone(labels) as unknown as Record<string, unknown>;
  let cur: Record<string, unknown> = clone;
  for (let i = 0; i < parts.length - 1; i++) {
    cur = cur[parts[i]] as Record<string, unknown>;
  }
  cur[parts[parts.length - 1]] = value;
  return clone as unknown as SiteLabels;
}

export function LabelsEditor({
  labels,
  onChange,
}: {
  labels: SiteLabels;
  onChange: (labels: SiteLabels) => void;
}) {
  return (
    <div className="space-y-8">
      {GROUPS.map((group) => (
        <section key={group.title} className="space-y-4">
          <h3 className="font-bold text-primary">{group.title}</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {group.keys.map(({ path, label }) => (
              <div key={path}>
                <label className="block text-sm font-medium text-slate-700">{label}</label>
                <input
                  value={getNested(labels, path)}
                  onChange={(e) => onChange(setNested(labels, path, e.target.value))}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
