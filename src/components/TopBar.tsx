import { Phone, Clock } from "lucide-react";
import type { SiteSettings } from "@/types/cms";

export function TopBar({ settings }: { settings: SiteSettings }) {
  const primaryPhone = settings.contactPhone.replace(/\s/g, "").split("/")[0];

  return (
    <div className="border-b border-white/10 bg-navy text-[11px] text-slate-300 sm:text-xs">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
        <a
          href={`tel:${primaryPhone}`}
          className="flex min-w-0 items-center gap-1.5 transition-colors hover:text-white"
        >
          <Phone className="h-3.5 w-3.5 shrink-0 text-[#00B4D8]" aria-hidden />
          <span className="truncate whitespace-nowrap">{settings.contactPhone}</span>
        </a>
        <span className="flex shrink-0 items-center gap-1.5 text-slate-400">
          <Clock className="h-3.5 w-3.5 text-slate-500" aria-hidden />
          <span className="whitespace-nowrap">{settings.businessHours}</span>
        </span>
      </div>
    </div>
  );

}
