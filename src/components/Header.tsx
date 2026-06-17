"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import type { NavItem, SiteSettings } from "@/types/cms";
import { CmsImage } from "./CmsImage";
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
      "inline-flex items-center gap-1 border-b-2 px-3 py-4 text-[15px] font-medium tracking-tight transition-colors",
      active
        ? "border-[#00B4D8] text-navy"
        : "border-transparent text-slate-600 hover:text-navy"
    );

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-stretch lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center justify-self-start">
          {settings.logo ? (
            <CmsImage
              src={settings.logo}
              alt={settings.siteName}
              width={250}
              height={44}
              className="h-9 w-auto max-w-[160px] object-contain transition-opacity group-hover:opacity-90 sm:h-10 sm:max-w-[200px]"
            />
          ) : (
            <span className="font-display text-xl font-medium text-navy">{settings.siteName}</span>
          )}
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
                    <div className="rounded-lg border border-slate-200 bg-white py-1.5 shadow-lg shadow-slate-900/8">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "block px-4 py-2.5 text-sm transition-colors hover:bg-slate-50 hover:text-[#0077B6]",
                            pathname === child.href ? "font-medium text-[#0077B6]" : "text-slate-600"
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
          <Link
            href={settings.headerCtaLink}
            className="btn-cta hidden sm:inline-flex"
          >
            {settings.headerCtaText}
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-md p-2 text-slate-600 transition-colors hover:bg-slate-100 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
          {navItems.map((item) => (
            <div key={item.label} className="mb-1">
              {item.children ? (
                <>
                  <div className="px-2 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {item.label}
                  </div>
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "block rounded-md px-2 py-2.5 text-sm transition-colors hover:bg-slate-50",
                        pathname === child.href ? "font-medium text-[#0077B6]" : "text-slate-700"
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
                    "block rounded-md px-2 py-2.5 text-sm font-medium transition-colors hover:bg-slate-50",
                    isNavActive(pathname, item) ? "text-[#0077B6]" : "text-slate-700"
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
            className="btn-cta mt-4 w-full"
          >
            {settings.headerCtaText}
          </Link>
        </div>
      )}
    </header>
  );
}
