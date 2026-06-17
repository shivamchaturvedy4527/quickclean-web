"use client";

import { useState } from "react";
export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({ name: "", email: "", phone: "", company: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">Name *</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Email *</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">Phone</label>
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="+91"
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Company</label>
          <input
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Message *</label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-md bg-teal-700 px-6 py-3 text-sm font-semibold text-white hover:bg-teal-800 disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
      {status === "success" && (
        <p className="text-sm text-teal-700">Thank you. We will respond within one business day.</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
