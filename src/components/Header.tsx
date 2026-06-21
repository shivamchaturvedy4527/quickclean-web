"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import type { NavItem, SiteSettings } from "@/types/cms";
import { SiteLogo } from "./SiteLogo";
import { cn } from "@/lib/utils";

interface HeaderProps {
  navigation: NavItem[];
  settings: SiteSettings;
}

function isNavActive(pathname: string, item: NavItem): boolean {
  if (item.href === "/") return pathname === "/";
  if (item.children?.length) {
    return item.children.some(
      (child) => pathname === child.href || pathname.startsWith(`${child.href}/`)
    );
  }
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export function Header({ navigation, settings }: HeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navItems = navigation.filter(
    (item) =>
      item.label !== "Contact Us" &&
      item.href !== settings.headerCtaLink
  );

  const navLinkClass = (active: boolean) =>
    cn(
      "inline-flex items-center gap-1 border-b-2 px-3 py-4 text-sm font-medium tracking-tight transition-colors",
      active
        ? "border-accent text-gray-900"
        : "border-transparent text-gray-600 hover:text-gray-900"
    );

  return (
    <header className="sticky top-0 z-50 overflow-visible border-b border-gray-200/50 bg-white/70 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1380px] items-center justify-between gap-4 overflow-visible px-6 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-center lg:px-8">
        <Link
          href="/"
          className="group relative z-20 flex h-16 min-w-[80px] shrink-0 items-center justify-self-start overflow-visible"
          aria-label={settings.siteName}
        >
          <SiteLogo
            settings={settings}
            priority
            className="absolute left-0 top-1/2 -translate-y-1/2 transition-opacity group-hover:opacity-90"
          />
        </Link>

        <nav className="hidden items-center justify-center gap-1 lg:flex">
          {navItems.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  className={navLinkClass(isNavActive(pathname, item))}
                  aria-expanded={openDropdown === item.label}
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 opacity-50 transition-transform duration-200",
                      openDropdown === item.label && "rotate-180"
                    )}
                  />
                </button>
                {openDropdown === item.label && (
                  <div className="absolute left-1/2 top-full z-50 min-w-[240px] -translate-x-1/2 pt-3">
                    <div className="rounded-lg border border-gray-200 bg-white py-1.5 shadow-lg shadow-slate-900/8">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "block px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 hover:text-accent",
                            pathname === child.href ? "font-medium text-accent" : "text-gray-600"
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={navLinkClass(isNavActive(pathname, item))}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center justify-end gap-2">
          <Link href={settings.headerCtaLink} className="btn-primary hidden sm:inline-flex">
            {settings.headerCtaText}
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-gray-200 bg-white px-6 py-4 lg:hidden">
          {navItems.map((item) => (
            <div key={item.label} className="mb-1">
              {item.children ? (
                <>
                  <div className="px-2 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    {item.label}
                  </div>
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "block rounded-lg px-2 py-2.5 text-sm transition-colors hover:bg-gray-50",
                        pathname === child.href ? "font-medium text-accent" : "text-gray-700"
                      )}
                    >
                      {child.label}
                    </Link>
                  ))}
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block rounded-lg px-2 py-2.5 text-sm font-medium transition-colors hover:bg-gray-50",
                    isNavActive(pathname, item) ? "text-accent" : "text-gray-700"
                  )}
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
