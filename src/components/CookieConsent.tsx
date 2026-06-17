"use client";

import { useEffect, useState } from "react";
import type { CookieConsentContent } from "@/types/cms";
import Link from "next/link";

const STORAGE_KEY = "qc-cookie-consent";

export function CookieConsent({ content }: { content: CookieConsentContent }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!localStorage.getItem(STORAGE_KEY));
  }, []);

  if (!visible) return null;

  function accept(value: "accepted" | "declined") {
    localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] border-t border-slate-200 bg-white/95 p-4 shadow-2xl backdrop-blur-md sm:p-6">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-sm leading-relaxed text-slate-600">
          {content.message}{" "}
          <Link href={content.policyLink} className="font-medium text-teal-700 hover:underline">
            {content.policyLabel}
          </Link>
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            onClick={() => accept("declined")}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            {content.declineText}
          </button>
          <button
            onClick={() => accept("accepted")}
            className="rounded-lg bg-[#071525] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0c2340]"
          >
            {content.acceptText}
          </button>
        </div>
      </div>
    </div>
  );
}
