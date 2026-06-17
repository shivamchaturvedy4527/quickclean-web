import { Phone, Clock } from "lucide-react";
import Link from "next/link";
import type { SiteSettings } from "@/types/cms";

export function TopBar({ settings }: { settings: SiteSettings }) {
  return (
    <div className="hidden border-b border-white/10 bg-navy text-xs text-slate-300 lg:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <a
            href={`tel:${settings.contactPhone.replace(/\s/g, "")}`}
            className="flex items-center gap-1.5 transition-colors hover:text-accent-bright"
          >
            <Phone className="h-3.5 w-3.5" />
            {settings.contactPhone}
          </a>
          <span className="flex items-center gap-1.5 text-slate-400">
            <Clock className="h-3.5 w-3.5" />
            {settings.businessHours}
          </span>
        </div>
        <Link
          href="/careers"
          className="font-medium text-accent-bright transition-colors hover:text-white"
        >
          {settings.careersLabel} →
        </Link>
      </div>
    </div>
  );
}
