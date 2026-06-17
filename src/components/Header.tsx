"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown, Phone, ArrowRight } from "lucide-react";
import type { NavItem, SiteSettings } from "@/types/cms";
import { CurrencySwitcher } from "./CurrencySwitcher";
import { CmsImage } from "./CmsImage";
import { cn } from "@/lib/utils";

interface HeaderProps {
  navigation: NavItem[];
  settings: SiteSettings;
}

export function Header({ navigation, settings }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-white/92 shadow-[0_1px_0_rgb(10_22_40/4%)] backdrop-blur-2xl backdrop-saturate-150">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center">
          {settings.logo ? (
            <CmsImage
              src={settings.logo}
              alt={settings.siteName}
              width={250}
              height={44}
              className="h-10 w-auto max-w-[180px] object-contain transition-opacity group-hover:opacity-85 sm:h-11 sm:max-w-[220px]"
            />
          ) : (
            <span className="font-display text-xl font-medium text-navy">{settings.siteName}</span>
          )}
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {navigation.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="flex items-center gap-1 rounded-lg px-3.5 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-navy">
                  {item.label}
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 opacity-60 transition-transform duration-200",
                      openDropdown === item.label && "rotate-180"
                    )}
                  />
                </button>
                {openDropdown === item.label && (
                  <div className="absolute left-0 top-[calc(100%-4px)] z-50 min-w-[272px] rounded-xl border border-border/80 bg-white p-1.5 shadow-2xl shadow-navy/12">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="group flex items-center justify-between rounded-lg px-3.5 py-2.5 text-sm text-slate-600 transition-colors hover:bg-teal-50/80 hover:text-teal-900"
                      >
                        {child.label}
                        <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3.5 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-navy"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <CurrencySwitcher />
          <a
            href={`tel:${settings.contactPhone.replace(/\s/g, "").split("/")[0]}`}
            className="hidden items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-accent md:flex"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden xl:inline max-w-[180px] truncate">{settings.contactPhone}</span>
          </a>
          <Link href={settings.headerCtaLink} className="btn-primary hidden !py-2.5 !px-5 sm:inline-flex">
            {settings.headerCtaText}
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-white px-4 py-5 lg:hidden">
          {navigation.map((item) => (
            <div key={item.label} className="mb-1">
              {item.children ? (
                <>
                  <div className="px-2 py-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-slate-400">
                    {item.label}
                  </div>
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-lg px-2 py-2.5 text-sm text-slate-700 transition-colors hover:bg-slate-50"
                    >
                      {child.label}
                    </Link>
                  ))}
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-2 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
          <Link
            href={settings.headerCtaLink}
            onClick={() => setMobileOpen(false)}
            className="btn-primary mt-4 w-full"
          >
            {settings.headerCtaText}
          </Link>
        </div>
      )}
    </header>
  );
}
