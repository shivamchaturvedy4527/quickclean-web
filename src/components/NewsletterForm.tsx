"use client";

import { useState } from "react";
import { Send } from "lucide-react";

interface NewsletterFormProps {
  title: string;
  subtitle: string;
  compact?: boolean;
}

export function NewsletterForm({ title, subtitle, compact }: NewsletterFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
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
      setError("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className={`rounded-2xl bg-teal-50 p-8 text-center ${compact ? "" : "border border-teal-100"}`}>
        <p className="font-semibold text-teal-900">Thank you for subscribing!</p>
        <p className="mt-2 text-sm text-teal-700">You&apos;ll receive our latest updates soon.</p>
      </div>
    );
  }

  return (
    <div className={compact ? "" : "card h-full p-8"}>
      {!compact && (
        <>
          <h3 className="font-display text-xl font-medium text-navy">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{subtitle}</p>
        </>
      )}
      <form onSubmit={handleSubmit} className={`${compact ? "" : "mt-6"} space-y-3`}>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm transition-colors"
        />
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm transition-colors"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-accent w-full disabled:opacity-60"
        >
          <Send className="h-4 w-4" />
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
    </div>
  );
}
