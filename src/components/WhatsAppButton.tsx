"use client";

import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import {
  buildWhatsAppMessage,
  isValidIndianPhone,
  normalizeIndianPhone,
} from "@/lib/whatsapp";

const INQUIRY_OPTIONS = [
  { value: "", label: "General inquiry" },
  { value: "Laundry machines & equipment", label: "Laundry machines & equipment" },
  { value: "Dry cleaning solutions", label: "Dry cleaning solutions" },
  { value: "Consultancy & setup", label: "Consultancy & setup" },
  { value: "Service & maintenance", label: "Service & maintenance" },
];

interface WhatsAppButtonProps {
  number: string;
  defaultPrefix?: string;
  greetingTemplate: string;
}

export function WhatsAppButton({
  number,
  defaultPrefix,
  greetingTemplate,
}: WhatsAppButtonProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [inquiryType, setInquiryType] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const cleanNumber = number.replace(/\D/g, "");

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  function resetForm() {
    setName("");
    setPhone("");
    setInquiryType("");
    setPhoneError("");
    setSubmitting(false);
  }

  function closeModal() {
    setOpen(false);
    resetForm();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPhoneError("");

    if (!isValidIndianPhone(phone)) {
      setPhoneError("Enter a valid Indian mobile number (+91, 10 digits).");
      return;
    }

    const message = buildWhatsAppMessage({
      name,
      phone,
      inquiry: inquiryType || undefined,
      greetingTemplate,
      defaultPrefix,
    });

    setSubmitting(true);

    try {
      await fetch("/api/whatsapp-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: normalizeIndianPhone(phone),
          message,
        }),
      });
    } catch {
      // Lead save is best-effort; still open WhatsApp
    }

    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    closeModal();
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 hover:shadow-xl"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="whatsapp-modal-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            aria-label="Close"
            onClick={closeModal}
          />

          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366]">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <h2
                    id="whatsapp-modal-title"
                    className="text-lg font-semibold text-slate-900"
                  >
                    Chat on WhatsApp
                  </h2>
                  <p className="text-sm text-slate-500">
                    अपना नाम और नंबर दर्ज करें · Enter your details
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                aria-label="Close dialog"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 px-5 py-5">
              <div>
                <label
                  htmlFor="wa-name"
                  className="block text-sm font-medium text-slate-700"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="wa-name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="input-field mt-1.5"
                  autoComplete="name"
                />
              </div>

              <div>
                <label
                  htmlFor="wa-phone"
                  className="block text-sm font-medium text-slate-700"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="wa-phone"
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setPhoneError("");
                  }}
                  placeholder="+91 98765 43210"
                  className="input-field mt-1.5"
                  autoComplete="tel"
                />
                {phoneError && (
                  <p className="mt-1.5 text-sm text-red-600">{phoneError}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="wa-inquiry"
                  className="block text-sm font-medium text-slate-700"
                >
                  Inquiry type <span className="text-slate-400">(optional)</span>
                </label>
                <select
                  id="wa-inquiry"
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className="input-field mt-1.5"
                >
                  {INQUIRY_OPTIONS.map((opt) => (
                    <option key={opt.value || "general"} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-secondary w-full disabled:opacity-60"
              >
                {submitting ? "Opening WhatsApp..." : "Start Chat on WhatsApp"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
