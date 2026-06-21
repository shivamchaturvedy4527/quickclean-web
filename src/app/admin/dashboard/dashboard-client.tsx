"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Save,
  LogOut,
  Home,
  Settings,
  MessageSquare,
  FileText,
  Leaf,
  Briefcase,
  Phone,
  Package,
  KeyRound,
} from "lucide-react";
import { ObjectEditor } from "@/components/admin/ObjectEditor";
import { ProductsEditor } from "@/components/admin/ProductsEditor";
import { SiteSettingsEditor } from "@/components/admin/SiteSettingsEditor";
import { SolutionsEditor } from "@/components/admin/SolutionsEditor";
import { BlogEditor } from "@/components/admin/BlogEditor";
import { ContactEditor } from "@/components/admin/ContactEditor";
import { HomePageEditor } from "@/components/admin/HomePageEditor";
import { TabHelp } from "@/components/admin/TabHelp";
import type { CMSData } from "@/types/cms";

const LIVE_SITE = "https://quickclean-clone.vercel.app";

type Tab =
  | "settings"
  | "home"
  | "about"
  | "sustainability"
  | "solutions"
  | "products"
  | "contact"
  | "news"
  | "messages"
  | "security";

export default function AdminDashboard() {
  const router = useRouter();
  const [cms, setCms] = useState<CMSData | null>(null);
  const [tab, setTab] = useState<Tab>("products");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/cms", { cache: "no-store" });
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
      cache: "no-store",
    });
    setSaving(false);
    if (res.ok) {
      const payload = (await res.json()) as {
        warning?: string;
        storage?: string;
        data?: CMSData;
        confirm?: {
          products?: number;
          solutions?: number;
          testimonials?: number;
          blog?: number;
        };
      };

      // Use saved data from server — do NOT reload (reload could restore old bundled defaults).
      if (payload.data) {
        setCms(payload.data);
      }

      const counts = payload.confirm;
      const detail = counts
        ? `${counts.products ?? 0} products · ${counts.solutions ?? 0} solutions · ${counts.testimonials ?? 0} testimonials`
        : "";

      if (payload.warning) {
        setMessage(`Saved but not permanent — ${payload.warning}`);
      } else {
        setMessage(
          `Published live (${payload.storage ?? "saved"})${detail ? ` — ${detail}` : ""}. Deleted items stay deleted.`
        );
      }
    } else {
      const err = (await res.json().catch(() => null)) as { error?: string } | null;
      setMessage(err?.error ?? "Save failed — please try again or log in again.");
    }
  }

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin");
  }

  async function updatePassword(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage("New passwords do not match");
      return;
    }

    setSaving(true);
    const res = await fetch("/api/admin/password", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      }),
    });
    const body = (await res.json().catch(() => ({}))) as { error?: string };
    setSaving(false);

    if (!res.ok) {
      setMessage(body.error ?? "Password update failed");
      return;
    }

    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setMessage("Password updated successfully");
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
    { id: "about", label: "About Us", icon: <FileText className="h-4 w-4" /> },
    { id: "sustainability", label: "Sustainability", icon: <Leaf className="h-4 w-4" /> },
    { id: "solutions", label: "Solutions", icon: <Briefcase className="h-4 w-4" /> },
    { id: "products", label: "Products", icon: <Package className="h-4 w-4" /> },
    { id: "contact", label: "Contact Us", icon: <Phone className="h-4 w-4" /> },
    { id: "news", label: "News", icon: <FileText className="h-4 w-4" /> },
    { id: "messages", label: "Messages", icon: <MessageSquare className="h-4 w-4" /> },
    { id: "security", label: "Change Password", icon: <KeyRound className="h-4 w-4" /> },
  ];

  function renderEditor(data: CMSData) {
    switch (tab) {
      case "settings":
        return (
          <SiteSettingsEditor
            settings={data.settings}
            footer={data.footer}
            navigation={data.navigation}
            onSettingsChange={(settings) => setCms({ ...data, settings })}
            onFooterChange={(footer) => setCms({ ...data, footer })}
            onNavigationChange={(navigation) => setCms({ ...data, navigation })}
          />
        );
      case "home":
        return (
          <HomePageEditor
            home={data.home}
            homeLabels={data.labels.home}
            brands={data.brands}
            testimonials={data.testimonials}
            installationGallery={data.installationGallery}
            onHomeChange={(home) => setCms({ ...data, home })}
            onHomeLabelsChange={(homeLabels) =>
              setCms({ ...data, labels: { ...data.labels, home: homeLabels } })
            }
            onBrandsChange={(brands) => setCms({ ...data, brands })}
            onTestimonialsChange={(testimonials) => setCms({ ...data, testimonials })}
            onGalleryChange={(installationGallery) => setCms({ ...data, installationGallery })}
          />
        );
      case "about":
        return (
          <ObjectEditor
            data={data.about as unknown as Record<string, unknown>}
            onChange={(v) => setCms({ ...data, about: v as unknown as CMSData["about"] })}
          />
        );
      case "sustainability":
        return (
          <ObjectEditor
            data={data.sustainability as unknown as Record<string, unknown>}
            onChange={(v) => setCms({ ...data, sustainability: v as unknown as CMSData["sustainability"] })}
          />
        );
      case "solutions":
        return (
          <SolutionsEditor
            solutions={data.solutions}
            onChange={(solutions) => setCms({ ...data, solutions })}
          />
        );
      case "products":
        return (
          <ProductsEditor
            productsPage={data.productsPage}
            products={data.products}
            pressingMachines={data.pressingMachines}
            onProductsPageChange={(productsPage) => setCms({ ...data, productsPage })}
            onProductsChange={(products) => setCms({ ...data, products })}
            onPressingMachinesChange={(pressingMachines) => setCms({ ...data, pressingMachines })}
          />
        );
      case "contact":
        return (
          <ContactEditor
            contact={data.contact}
            onChange={(contact) => setCms({ ...data, contact })}
          />
        );
      case "news":
        return (
          <BlogEditor
            posts={data.blog}
            onChange={(blog) => setCms({ ...data, blog })}
          />
        );
      case "messages":
        return (
          <div className="space-y-8">
            <section>
              <h3 className="mb-3 font-bold text-primary">Contact Form Messages</h3>
              {data.contactSubmissions.length === 0 ? (
                <p className="text-slate-500">No messages yet.</p>
              ) : (
                <div className="space-y-3">
                  {data.contactSubmissions.map((sub) => (
                    <div key={sub.id} className="rounded-xl border border-slate-200 p-4">
                      <div className="flex justify-between">
                        <strong>{sub.name}</strong>
                        <span className="text-xs text-slate-400">{new Date(sub.createdAt).toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-slate-600">{sub.email} · {sub.phone}</p>
                      <p className="mt-2 text-sm">{sub.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
            <section>
              <h3 className="mb-3 font-bold text-primary">Newsletter Signups</h3>
              {data.newsletterSubmissions.length === 0 ? (
                <p className="text-slate-500">No subscribers yet.</p>
              ) : (
                <div className="space-y-3">
                  {data.newsletterSubmissions.map((sub) => (
                    <div key={sub.id} className="rounded-xl border border-slate-200 p-4">
                      <strong>{sub.name}</strong>
                      <p className="text-sm text-slate-600">{sub.email}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        );
      case "security":
        return (
          <form onSubmit={updatePassword} className="space-y-5">
            <div>
              <h3 className="text-base font-semibold text-primary">Change Password</h3>
              <p className="mt-1 text-sm text-slate-500">
                Login username: <span className="font-medium text-slate-700">admin</span>
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className="text-sm font-medium text-slate-700">Current Password</span>
                <input
                  type="password"
                  required
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">New Password</span>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Confirm New Password</span>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm"
                />
              </label>
            </div>
            <button type="submit" disabled={saving} className="rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-white">
              {saving ? "Updating..." : "Update Password"}
            </button>
          </form>
        );
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 lg:flex">
      <aside className="border-b border-slate-200 bg-white lg:h-screen lg:w-64 lg:shrink-0 lg:overflow-y-auto lg:border-b-0 lg:border-r">
        <div className="border-b border-slate-200 p-4">
          <h1 className="font-bold text-primary">Website Editor</h1>
          <p className="text-xs text-slate-500">Menu jitne pages, utne tabs</p>
        </div>
        <nav className="flex gap-1 overflow-x-auto p-2 lg:block lg:overflow-visible">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`mb-0.5 flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-left text-sm lg:w-full ${
                tab === t.id
                  ? "bg-accent/5 font-medium text-accent-hover"
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
        <div className="sticky top-0 z-10 flex flex-col gap-3 border-b border-slate-200 bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <h2 className="text-lg font-semibold text-primary">
            {tabs.find((t) => t.id === tab)?.label}
          </h2>
          <div className="flex flex-wrap items-center gap-3">
            {message && (
              <span
                className={`text-sm ${message.includes("failed") || message.includes("not permanent") ? "text-red-600" : "text-emerald-700"}`}
              >
                {message}
              </span>
            )}
            <a
              href={LIVE_SITE}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-slate-600 underline hover:text-accent"
            >
              View live website
            </a>
            {tab !== "security" && tab !== "messages" && (
              <button
                onClick={save}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
              >
                <Save className="h-4 w-4" />
                {saving ? "Publishing..." : "Publish to Website"}
              </button>
            )}
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <TabHelp tab={tab} />
          <div
            className={`rounded-xl border border-slate-200 bg-white p-6 ${
              tab === "products" || tab === "home" ? "max-w-none" : "max-w-4xl"
            }`}
          >
            {renderEditor(cms)}
          </div>
        </div>
      </main>
    </div>
  );
}
