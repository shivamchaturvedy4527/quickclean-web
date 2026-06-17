"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Save,
  LogOut,
  Home,
  Settings,
  Users,
  MessageSquare,
  FileText,
  Leaf,
  Briefcase,
  Phone,
} from "lucide-react";
import type { CMSData } from "@/types/cms";

type Tab =
  | "settings"
  | "home"
  | "solutions"
  | "about"
  | "team"
  | "testimonials"
  | "blog"
  | "sustainability"
  | "careers"
  | "contact"
  | "submissions"
  | "integrations";

export default function AdminDashboard() {
  const router = useRouter();
  const [cms, setCms] = useState<CMSData | null>(null);
  const [tab, setTab] = useState<Tab>("settings");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/cms");
    if (res.status === 401) {
      router.push("/admin");
      return;
    }
    const data = (await res.json()) as CMSData;
    setCms(data);
  }, [router]);

  useEffect(() => {
    load();
  }, [load]);

  async function save() {
    if (!cms) return;
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/admin/cms", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cms),
    });
    setSaving(false);
    setMessage(res.ok ? "Saved successfully" : "Save failed");
  }

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin");
  }

  if (!cms) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-slate-500">Loading...</p>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "settings", label: "Site Settings", icon: <Settings className="h-4 w-4" /> },
    { id: "home", label: "Home Page", icon: <Home className="h-4 w-4" /> },
    { id: "solutions", label: "Solutions", icon: <Briefcase className="h-4 w-4" /> },
    { id: "about", label: "About", icon: <FileText className="h-4 w-4" /> },
    { id: "team", label: "Team", icon: <Users className="h-4 w-4" /> },
    { id: "testimonials", label: "Testimonials", icon: <MessageSquare className="h-4 w-4" /> },
    { id: "blog", label: "Blog / News", icon: <FileText className="h-4 w-4" /> },
    { id: "sustainability", label: "Sustainability", icon: <Leaf className="h-4 w-4" /> },
    { id: "careers", label: "Careers", icon: <Briefcase className="h-4 w-4" /> },
    { id: "contact", label: "Contact Page", icon: <Phone className="h-4 w-4" /> },
    { id: "submissions", label: "Form Submissions", icon: <MessageSquare className="h-4 w-4" /> },
    { id: "integrations", label: "WhatsApp & Chat", icon: <Phone className="h-4 w-4" /> },
  ];

  function Field({
    label,
    value,
    onChange,
    multiline,
  }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    multiline?: boolean;
  }) {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700">{label}</label>
        {multiline ? (
          <textarea
            rows={4}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        ) : (
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        )}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className="w-64 shrink-0 border-r border-slate-200 bg-white">
        <div className="border-b border-slate-200 p-4">
          <h1 className="font-bold text-[#0c2340]">CMS Admin</h1>
          <p className="text-xs text-slate-500">ProLaundry Solutions</p>
        </div>
        <nav className="p-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`mb-0.5 flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm ${
                tab === t.id
                  ? "bg-teal-50 font-medium text-teal-800"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </nav>
        <div className="border-t border-slate-200 p-2">
          <button
            onClick={logout}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
          <h2 className="text-lg font-semibold text-[#0c2340]">
            {tabs.find((t) => t.id === tab)?.label}
          </h2>
          <div className="flex items-center gap-3">
            {message && (
              <span className={`text-sm ${message.includes("failed") ? "text-red-600" : "text-teal-700"}`}>
                {message}
              </span>
            )}
            <button
              onClick={save}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800 disabled:opacity-60"
            >
              <Save className="h-4 w-4" />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        <div className="p-6">
          {tab === "settings" && (
            <div className="max-w-2xl rounded-xl border border-slate-200 bg-white p-6">
              <Field label="Site Name" value={cms.settings.siteName} onChange={(v) => setCms({ ...cms, settings: { ...cms.settings, siteName: v } })} />
              <Field label="Tagline" value={cms.settings.tagline} onChange={(v) => setCms({ ...cms, settings: { ...cms.settings, tagline: v } })} />
              <Field label="Contact Email" value={cms.settings.contactEmail} onChange={(v) => setCms({ ...cms, settings: { ...cms.settings, contactEmail: v } })} />
              <Field label="Contact Phone" value={cms.settings.contactPhone} onChange={(v) => setCms({ ...cms, settings: { ...cms.settings, contactPhone: v } })} />
              <Field label="Address Line 1" value={cms.settings.addressLine1} onChange={(v) => setCms({ ...cms, settings: { ...cms.settings, addressLine1: v } })} />
              <Field label="Address Line 2" value={cms.settings.addressLine2} onChange={(v) => setCms({ ...cms, settings: { ...cms.settings, addressLine2: v } })} />
              <Field label="City" value={cms.settings.city} onChange={(v) => setCms({ ...cms, settings: { ...cms.settings, city: v } })} />
              <Field label="Footer About Text" value={cms.footer.aboutText} onChange={(v) => setCms({ ...cms, footer: { ...cms.footer, aboutText: v } })} multiline />
              <Field label="Copyright" value={cms.footer.copyright} onChange={(v) => setCms({ ...cms, footer: { ...cms.footer, copyright: v } })} />
            </div>
          )}

          {tab === "home" && (
            <div className="max-w-2xl rounded-xl border border-slate-200 bg-white p-6">
              <Field label="Hero Title" value={cms.home.heroTitle} onChange={(v) => setCms({ ...cms, home: { ...cms.home, heroTitle: v } })} />
              <Field label="Hero Subtitle" value={cms.home.heroSubtitle} onChange={(v) => setCms({ ...cms, home: { ...cms.home, heroSubtitle: v } })} multiline />
              <Field label="Founder Title" value={cms.home.founderTitle} onChange={(v) => setCms({ ...cms, home: { ...cms.home, founderTitle: v } })} />
              <Field label="Founder Message" value={cms.home.founderMessage} onChange={(v) => setCms({ ...cms, home: { ...cms.home, founderMessage: v } })} multiline />
              <Field label="Founder Name" value={cms.home.founderName} onChange={(v) => setCms({ ...cms, home: { ...cms.home, founderName: v } })} />
              <Field label="Founder Role" value={cms.home.founderRole} onChange={(v) => setCms({ ...cms, home: { ...cms.home, founderRole: v } })} />
              <Field label="Brands Title" value={cms.home.brandsTitle} onChange={(v) => setCms({ ...cms, home: { ...cms.home, brandsTitle: v } })} />
              <Field label="News Title" value={cms.home.newsTitle} onChange={(v) => setCms({ ...cms, home: { ...cms.home, newsTitle: v } })} />
            </div>
          )}

          {tab === "solutions" && (
            <div className="space-y-6">
              {cms.solutions.map((sol, i) => (
                <div key={sol.id} className="rounded-xl border border-slate-200 bg-white p-6">
                  <h3 className="mb-4 font-semibold text-[#0c2340]">{sol.title}</h3>
                  <Field label="Title" value={sol.title} onChange={(v) => { const s = [...cms.solutions]; s[i] = { ...sol, title: v }; setCms({ ...cms, solutions: s }); }} />
                  <Field label="Short Description" value={sol.shortDescription} onChange={(v) => { const s = [...cms.solutions]; s[i] = { ...sol, shortDescription: v }; setCms({ ...cms, solutions: s }); }} multiline />
                  <Field label="Full Description" value={sol.description} onChange={(v) => { const s = [...cms.solutions]; s[i] = { ...sol, description: v }; setCms({ ...cms, solutions: s }); }} multiline />
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Price INR" value={String(sol.priceFromINR)} onChange={(v) => { const s = [...cms.solutions]; s[i] = { ...sol, priceFromINR: Number(v) }; setCms({ ...cms, solutions: s }); }} />
                    <Field label="Price USD" value={String(sol.priceFromUSD)} onChange={(v) => { const s = [...cms.solutions]; s[i] = { ...sol, priceFromUSD: Number(v) }; setCms({ ...cms, solutions: s }); }} />
                    <Field label="Price EUR" value={String(sol.priceFromEUR)} onChange={(v) => { const s = [...cms.solutions]; s[i] = { ...sol, priceFromEUR: Number(v) }; setCms({ ...cms, solutions: s }); }} />
                    <Field label="Price AED" value={String(sol.priceFromAED)} onChange={(v) => { const s = [...cms.solutions]; s[i] = { ...sol, priceFromAED: Number(v) }; setCms({ ...cms, solutions: s }); }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "about" && (
            <div className="max-w-2xl rounded-xl border border-slate-200 bg-white p-6">
              <Field label="Title" value={cms.about.title} onChange={(v) => setCms({ ...cms, about: { ...cms.about, title: v } })} />
              <Field label="Introduction" value={cms.about.intro} onChange={(v) => setCms({ ...cms, about: { ...cms.about, intro: v } })} multiline />
              <Field label="Mission" value={cms.about.mission} onChange={(v) => setCms({ ...cms, about: { ...cms.about, mission: v } })} multiline />
              <Field label="Vision" value={cms.about.vision} onChange={(v) => setCms({ ...cms, about: { ...cms.about, vision: v } })} multiline />
            </div>
          )}

          {tab === "team" && (
            <div className="space-y-4">
              <Field label="Section Title" value={cms.team.title} onChange={(v) => setCms({ ...cms, team: { ...cms.team, title: v } })} />
              <Field label="Introduction" value={cms.team.intro} onChange={(v) => setCms({ ...cms, team: { ...cms.team, intro: v } })} multiline />
              {cms.team.members.map((m, i) => (
                <div key={m.id} className="rounded-xl border border-slate-200 bg-white p-4">
                  <Field label="Name" value={m.name} onChange={(v) => { const members = [...cms.team.members]; members[i] = { ...m, name: v }; setCms({ ...cms, team: { ...cms.team, members } }); }} />
                  <Field label="Role" value={m.role} onChange={(v) => { const members = [...cms.team.members]; members[i] = { ...m, role: v }; setCms({ ...cms, team: { ...cms.team, members } }); }} />
                  <Field label="Bio" value={m.bio} onChange={(v) => { const members = [...cms.team.members]; members[i] = { ...m, bio: v }; setCms({ ...cms, team: { ...cms.team, members } }); }} multiline />
                </div>
              ))}
            </div>
          )}

          {tab === "testimonials" && (
            <div className="space-y-4">
              {cms.testimonials.map((t, i) => (
                <div key={t.id} className="rounded-xl border border-slate-200 bg-white p-4">
                  <Field label="Quote" value={t.quote} onChange={(v) => { const items = [...cms.testimonials]; items[i] = { ...t, quote: v }; setCms({ ...cms, testimonials: items }); }} multiline />
                  <Field label="Author" value={t.author} onChange={(v) => { const items = [...cms.testimonials]; items[i] = { ...t, author: v }; setCms({ ...cms, testimonials: items }); }} />
                  <Field label="Company" value={t.company} onChange={(v) => { const items = [...cms.testimonials]; items[i] = { ...t, company: v }; setCms({ ...cms, testimonials: items }); }} />
                </div>
              ))}
            </div>
          )}

          {tab === "blog" && (
            <div className="space-y-4">
              {cms.blog.map((post, i) => (
                <div key={post.id} className="rounded-xl border border-slate-200 bg-white p-4">
                  <Field label="Title" value={post.title} onChange={(v) => { const items = [...cms.blog]; items[i] = { ...post, title: v }; setCms({ ...cms, blog: items }); }} />
                  <Field label="Excerpt" value={post.excerpt} onChange={(v) => { const items = [...cms.blog]; items[i] = { ...post, excerpt: v }; setCms({ ...cms, blog: items }); }} multiline />
                  <Field label="Category" value={post.category} onChange={(v) => { const items = [...cms.blog]; items[i] = { ...post, category: v }; setCms({ ...cms, blog: items }); }} />
                </div>
              ))}
            </div>
          )}

          {tab === "sustainability" && (
            <div className="max-w-2xl rounded-xl border border-slate-200 bg-white p-6">
              <Field label="Title" value={cms.sustainability.title} onChange={(v) => setCms({ ...cms, sustainability: { ...cms.sustainability, title: v } })} />
              <Field label="Introduction" value={cms.sustainability.intro} onChange={(v) => setCms({ ...cms, sustainability: { ...cms.sustainability, intro: v } })} multiline />
            </div>
          )}

          {tab === "careers" && (
            <div className="max-w-2xl rounded-xl border border-slate-200 bg-white p-6">
              <Field label="Title" value={cms.careers.title} onChange={(v) => setCms({ ...cms, careers: { ...cms.careers, title: v } })} />
              <Field label="Introduction" value={cms.careers.intro} onChange={(v) => setCms({ ...cms, careers: { ...cms.careers, intro: v } })} multiline />
            </div>
          )}

          {tab === "contact" && (
            <div className="max-w-2xl rounded-xl border border-slate-200 bg-white p-6">
              <Field label="Page Title" value={cms.contact.title} onChange={(v) => setCms({ ...cms, contact: { ...cms.contact, title: v } })} />
              <Field label="Introduction" value={cms.contact.intro} onChange={(v) => setCms({ ...cms, contact: { ...cms.contact, intro: v } })} multiline />
            </div>
          )}

          {tab === "submissions" && (
            <div className="space-y-4">
              {cms.contactSubmissions.length === 0 ? (
                <p className="text-slate-500">No submissions yet.</p>
              ) : (
                cms.contactSubmissions.map((sub) => (
                  <div key={sub.id} className="rounded-xl border border-slate-200 bg-white p-4">
                    <div className="flex justify-between">
                      <strong>{sub.name}</strong>
                      <span className="text-xs text-slate-400">{new Date(sub.createdAt).toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-slate-600">{sub.email} · {sub.phone}</p>
                    {sub.company && <p className="text-sm text-slate-500">{sub.company}</p>}
                    <p className="mt-2 text-sm">{sub.message}</p>
                  </div>
                ))
              )}
            </div>
          )}

          {tab === "integrations" && (
            <div className="max-w-2xl rounded-xl border border-slate-200 bg-white p-6">
              <Field label="WhatsApp Number (with country code, no +)" value={cms.settings.whatsappNumber} onChange={(v) => setCms({ ...cms, settings: { ...cms.settings, whatsappNumber: v } })} />
              <Field label="WhatsApp Default Message" value={cms.settings.whatsappMessage} onChange={(v) => setCms({ ...cms, settings: { ...cms.settings, whatsappMessage: v } })} multiline />
              <Field label="Live Chat Embed Code (Tawk.to / Crisp)" value={cms.settings.liveChatEmbed} onChange={(v) => setCms({ ...cms, settings: { ...cms.settings, liveChatEmbed: v } })} multiline />
              <p className="text-xs text-slate-500">
                Paste the full embed script from Tawk.to or Crisp dashboard. Leave empty to disable.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
