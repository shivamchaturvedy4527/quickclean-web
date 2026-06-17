"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import type { NavItem, SiteSettings } from "@/types/cms";
import { CurrencySwitcher } from "./CurrencySwitcher";

interface HeaderProps {
  navigation: NavItem[];
  settings: SiteSettings;
}

export function Header({ navigation, settings }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0c2340] text-sm font-bold text-white">
            PL
          </div>
          <div className="hidden sm:block">
            <div className="text-base font-semibold tracking-tight text-[#0c2340]">
              {settings.siteName}
            </div>
            <div className="text-xs text-slate-500">{settings.tagline}</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#0c2340]">
                  {item.label}
                  <ChevronDown className="h-4 w-4" />
                </button>
                {openDropdown === item.label && (
                  <div className="absolute left-0 top-full min-w-[220px] rounded-lg border border-slate-200 bg-white py-2 shadow-xl">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-teal-700"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#0c2340]"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <CurrencySwitcher />
          <a
            href={`tel:${settings.contactPhone.replace(/\s/g, "")}`}
            className="hidden items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-teal-700 md:flex"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden xl:inline">{settings.contactPhone}</span>
          </a>
          <Link
            href="/contact"
            className="hidden rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800 sm:inline-block"
          >
            Get a Quote
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-md p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
          {navigation.map((item) => (
            <div key={item.label} className="mb-2">
              {item.children ? (
                <>
                  <div className="px-2 py-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {item.label}
                  </div>
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-md px-2 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      {child.label}
                    </Link>
                  ))}
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-md px-2 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="mt-3 block rounded-md bg-teal-700 px-4 py-2.5 text-center text-sm font-semibold text-white"
          >
            Get a Quote
          </Link>
        </div>
      )}
    </header>
  );
}
