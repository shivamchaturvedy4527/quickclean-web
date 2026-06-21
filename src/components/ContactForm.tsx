"use client";

import { useState } from "react";
import { useLabels } from "@/context/LabelsContext";

export function ContactForm() {
  const labels = useLabels().contact;
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
          <label className="block text-sm font-medium text-gray-700">{labels.formName}</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input-field mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">{labels.formEmail}</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="input-field mt-1"
          />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">{labels.formPhone}</label>
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder={labels.formPhonePlaceholder}
            className="input-field mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">{labels.formCompany}</label>
          <input
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="input-field mt-1"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">{labels.formMessage}</label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="input-field mt-1"
        />
      </div>
      <button type="submit" disabled={status === "loading"} className="btn-primary disabled:opacity-60">
        {status === "loading" ? labels.formSubmitting : labels.formSubmit}
      </button>
      {status === "success" && <p className="text-sm text-accent">{labels.formSuccess}</p>}
      {status === "error" && <p className="text-sm text-red-600">{labels.formError}</p>}
    </form>
  );
}
