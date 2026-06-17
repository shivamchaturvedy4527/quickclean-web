import { Phone, Clock } from "lucide-react";
import Link from "next/link";
import type { SiteSettings } from "@/types/cms";

export function TopBar({ settings }: { settings: SiteSettings }) {
  const primaryPhone = settings.contactPhone.replace(/\s/g, "").split("/")[0];

  return (
    <div className="hidden border-b border-white/8 bg-navy text-xs text-slate-400 lg:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <a
            href={`tel:${primaryPhone}`}
            className="flex items-center gap-1.5 transition-colors hover:text-accent-bright"
          >
            <Phone className="h-3.5 w-3.5 text-accent-bright/80" />
            {settings.contactPhone}
          </a>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-slate-500" />
            {settings.businessHours}
          </span>
        </div>
        <Link
          href="/careers"
          className="font-semibold tracking-wide text-accent-bright transition-colors hover:text-white"
        >
          {settings.careersLabel} →
        </Link>
      </div>
    </div>
  );
}
