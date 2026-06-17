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
  Navigation,
  Image,
  Scale,
  Recycle,
  Mail,
  Cookie,
} from "lucide-react";
import { ObjectEditor } from "@/components/admin/ObjectEditor";
import type { CMSData } from "@/types/cms";

type Tab =
  | "settings"
  | "navigation"
  | "home"
  | "solutions"
  | "brands"
  | "about"
  | "team"
  | "testimonials"
  | "blog"
  | "sustainability"
  | "investors"
  | "careers"
  | "contact"
  | "footer"
  | "reweave360"
  | "financial"
  | "legal"
  | "cookie"
  | "submissions"
  | "newsletter"
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
    { id: "navigation", label: "Navigation", icon: <Navigation className="h-4 w-4" /> },
    { id: "home", label: "Home Page", icon: <Home className="h-4 w-4" /> },
    { id: "solutions", label: "Solutions", icon: <Briefcase className="h-4 w-4" /> },
    { id: "brands", label: "Brand Logos", icon: <Image className="h-4 w-4" /> },
    { id: "about", label: "About", icon: <FileText className="h-4 w-4" /> },
    { id: "team", label: "Team", icon: <Users className="h-4 w-4" /> },
    { id: "testimonials", label: "Testimonials", icon: <MessageSquare className="h-4 w-4" /> },
    { id: "blog", label: "Blog / News", icon: <FileText className="h-4 w-4" /> },
    { id: "sustainability", label: "Sustainability", icon: <Leaf className="h-4 w-4" /> },
    { id: "investors", label: "Investors", icon: <Briefcase className="h-4 w-4" /> },
    { id: "careers", label: "Careers", icon: <Briefcase className="h-4 w-4" /> },
    { id: "reweave360", label: "ReWeave 360", icon: <Recycle className="h-4 w-4" /> },
    { id: "financial", label: "Financial Planning", icon: <Scale className="h-4 w-4" /> },
    { id: "contact", label: "Contact Page", icon: <Phone className="h-4 w-4" /> },
    { id: "footer", label: "Footer", icon: <FileText className="h-4 w-4" /> },
    { id: "legal", label: "Legal Pages", icon: <Scale className="h-4 w-4" /> },
    { id: "cookie", label: "Cookie Consent", icon: <Cookie className="h-4 w-4" /> },
    { id: "submissions", label: "Contact Forms", icon: <MessageSquare className="h-4 w-4" /> },
    { id: "newsletter", label: "Newsletter", icon: <Mail className="h-4 w-4" /> },
    { id: "integrations", label: "WhatsApp & Chat", icon: <Phone className="h-4 w-4" /> },
  ];

  function renderEditor(data: CMSData) {
    switch (tab) {
      case "settings":
        return (
          <ObjectEditor
            data={data.settings as unknown as Record<string, unknown>}
            onChange={(v) => setCms({ ...data, settings: v as unknown as CMSData["settings"] })}
          />
        );
      case "navigation":
        return (
          <ObjectEditor
            data={{ navigation: data.navigation } as unknown as Record<string, unknown>}
            onChange={(v) => setCms({ ...data, navigation: v.navigation as CMSData["navigation"] })}
          />
        );
      case "home":
        return (
          <ObjectEditor
            data={data.home as unknown as Record<string, unknown>}
            onChange={(v) => setCms({ ...data, home: v as unknown as CMSData["home"] })}
          />
        );
      case "solutions":
        return (
          <ObjectEditor
            data={{ solutions: data.solutions } as unknown as Record<string, unknown>}
            onChange={(v) => setCms({ ...data, solutions: v.solutions as CMSData["solutions"] })}
          />
        );
      case "brands":
        return (
          <ObjectEditor
            data={{ brands: data.brands } as unknown as Record<string, unknown>}
            onChange={(v) => setCms({ ...data, brands: v.brands as CMSData["brands"] })}
          />
        );
      case "about":
        return (
          <ObjectEditor
            data={data.about as unknown as Record<string, unknown>}
            onChange={(v) => setCms({ ...data, about: v as unknown as CMSData["about"] })}
          />
        );
      case "team":
        return (
          <ObjectEditor
            data={data.team as unknown as Record<string, unknown>}
            onChange={(v) => setCms({ ...data, team: v as unknown as CMSData["team"] })}
          />
        );
      case "testimonials":
        return (
          <ObjectEditor
            data={{ testimonials: data.testimonials } as unknown as Record<string, unknown>}
            onChange={(v) => setCms({ ...data, testimonials: v.testimonials as CMSData["testimonials"] })}
          />
        );
      case "blog":
        return (
          <ObjectEditor
            data={{ blogCategories: data.blogCategories, blog: data.blog } as unknown as Record<string, unknown>}
            onChange={(v) =>
              setCms({
                ...data,
                blogCategories: v.blogCategories as CMSData["blogCategories"],
                blog: v.blog as CMSData["blog"],
              })
            }
          />
        );
      case "sustainability":
        return (
          <ObjectEditor
            data={data.sustainability as unknown as Record<string, unknown>}
            onChange={(v) => setCms({ ...data, sustainability: v as unknown as CMSData["sustainability"] })}
          />
        );
      case "investors":
        return (
          <ObjectEditor
            data={data.investors as unknown as Record<string, unknown>}
            onChange={(v) => setCms({ ...data, investors: v as unknown as CMSData["investors"] })}
          />
        );
      case "careers":
        return (
          <ObjectEditor
            data={data.careers as unknown as Record<string, unknown>}
            onChange={(v) => setCms({ ...data, careers: v as unknown as CMSData["careers"] })}
          />
        );
      case "reweave360":
        return (
          <ObjectEditor
            data={data.reweave360 as unknown as Record<string, unknown>}
            onChange={(v) => setCms({ ...data, reweave360: v as unknown as CMSData["reweave360"] })}
          />
        );
      case "financial":
        return (
          <ObjectEditor
            data={data.financialPlanning as unknown as Record<string, unknown>}
            onChange={(v) => setCms({ ...data, financialPlanning: v as unknown as CMSData["financialPlanning"] })}
          />
        );
      case "contact":
        return (
          <ObjectEditor
            data={data.contact as unknown as Record<string, unknown>}
            onChange={(v) => setCms({ ...data, contact: v as unknown as CMSData["contact"] })}
          />
        );
      case "footer":
        return (
          <ObjectEditor
            data={data.footer as unknown as Record<string, unknown>}
            onChange={(v) => setCms({ ...data, footer: v as unknown as CMSData["footer"] })}
          />
        );
      case "legal":
        return (
          <ObjectEditor
            data={data.legal as unknown as Record<string, unknown>}
            onChange={(v) => setCms({ ...data, legal: v as unknown as CMSData["legal"] })}
          />
        );
      case "cookie":
        return (
          <ObjectEditor
            data={data.cookieConsent as unknown as Record<string, unknown>}
            onChange={(v) => setCms({ ...data, cookieConsent: v as unknown as CMSData["cookieConsent"] })}
          />
        );
      case "submissions":
        return (
          <div className="space-y-4">
            {data.contactSubmissions.length === 0 ? (
              <p className="text-slate-500">No submissions yet.</p>
            ) : (
              data.contactSubmissions.map((sub) => (
                <div key={sub.id} className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="flex justify-between">
                    <strong>{sub.name}</strong>
                    <span className="text-xs text-slate-400">
                      {new Date(sub.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">
                    {sub.email} · {sub.phone}
                  </p>
                  {sub.company && <p className="text-sm text-slate-500">{sub.company}</p>}
                  <p className="mt-2 text-sm">{sub.message}</p>
                </div>
              ))
            )}
          </div>
        );
      case "newsletter":
        return (
          <div className="space-y-4">
            {data.newsletterSubmissions.length === 0 ? (
              <p className="text-slate-500">No newsletter subscribers yet.</p>
            ) : (
              data.newsletterSubmissions.map((sub) => (
                <div key={sub.id} className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="flex justify-between">
                    <strong>{sub.name}</strong>
                    <span className="text-xs text-slate-400">
                      {new Date(sub.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">{sub.email}</p>
                </div>
              ))
            )}
          </div>
        );
      case "integrations":
        return (
          <ObjectEditor
            data={{
              whatsappNumber: data.settings.whatsappNumber,
              whatsappMessage: data.settings.whatsappMessage,
              liveChatEmbed: data.settings.liveChatEmbed,
            }}
            onChange={(v) =>
              setCms({
                ...data,
                settings: {
                  ...data.settings,
                  whatsappNumber: v.whatsappNumber as string,
                  whatsappMessage: v.whatsappMessage as string,
                  liveChatEmbed: v.liveChatEmbed as string,
                },
              })
            }
          />
        );
      default:
        return null;
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className="w-64 shrink-0 overflow-y-auto border-r border-slate-200 bg-white">
        <div className="border-b border-slate-200 p-4">
          <h1 className="font-bold text-[#071525]">CMS Admin</h1>
          <p className="text-xs text-slate-500">{cms.settings.siteName}</p>
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
          <h2 className="text-lg font-semibold text-[#071525]">
            {tabs.find((t) => t.id === tab)?.label}
          </h2>
          <div className="flex items-center gap-3">
            {message && (
              <span
                className={`text-sm ${message.includes("failed") ? "text-red-600" : "text-teal-700"}`}
              >
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
          <div className="max-w-4xl rounded-xl border border-slate-200 bg-white p-6">
            {renderEditor(cms)}
          </div>
        </div>
      </main>
    </div>
  );
}
