"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { useLabels } from "@/context/LabelsContext";

interface NewsletterFormProps {
  title: string;
  subtitle: string;
  compact?: boolean;
}

export function NewsletterForm({ title, subtitle, compact }: NewsletterFormProps) {
  const nl = useLabels().newsletter;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim()) {
      setError(nl.errorName);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(nl.errorEmail);
      return;
    }
    setStatus("loading");
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    if (res.ok) {
      setStatus("success");
      setName("");
      setEmail("");
    } else {
      setStatus("error");
      setError(nl.errorGeneric);
    }
  }

  if (status === "success") {
    return (
      <div className={`rounded-lg bg-accent/5 p-8 text-center ${compact ? "" : "border border-accent/10"}`}>
        <p className="font-semibold text-gray-900">{nl.successTitle}</p>
        <p className="mt-2 text-sm text-gray-600">{nl.successText}</p>
      </div>
    );
  }

  return (
    <div className={compact ? "" : "card h-full p-8"}>
      {!compact && (
        <>
          <h3 className="text-xl font-bold tracking-tight text-gray-900">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">{subtitle}</p>
        </>
      )}
      <form onSubmit={handleSubmit} className={`${compact ? "" : "mt-6"} space-y-3`}>
        <input
          type="text"
          placeholder={nl.namePlaceholder}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
        />
        <input
          type="email"
          placeholder={nl.emailPlaceholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" disabled={status === "loading"} className="btn-secondary w-full disabled:opacity-60">
          <Send className="h-4 w-4" />
          {status === "loading" ? nl.subscribing : nl.subscribe}
        </button>
      </form>
    </div>
  );
}
