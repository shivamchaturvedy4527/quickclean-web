import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import type { NavItem, SiteSettings } from "@/types/cms";

interface FooterProps {
  navigation: NavItem[];
  settings: SiteSettings;
  aboutText: string;
  copyright: string;
}

export function Footer({ navigation, settings, aboutText, copyright }: FooterProps) {
  const solutions = navigation.find((n) => n.label === "Solutions")?.children ?? [];
  const company = navigation.find((n) => n.label === "Company")?.children ?? [];

  return (
    <footer className="mt-auto bg-[#0c2340] text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-teal-700 text-sm font-bold text-white">
              PL
            </div>
            <p className="text-sm leading-relaxed text-slate-400">{aboutText}</p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Solutions
            </h3>
            <ul className="space-y-2.5">
              {solutions.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm hover:text-teal-400">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h3>
            <ul className="space-y-2.5">
              {company.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm hover:text-teal-400">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Head Office
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal-500" />
                <span>
                  {settings.addressLine1}
                  <br />
                  {settings.addressLine2}
                  <br />
                  {settings.city}, {settings.country}
                </span>
              </li>
              <li className="flex gap-2">
                <Phone className="h-4 w-4 shrink-0 text-teal-500" />
                <a href={`tel:${settings.contactPhone.replace(/\s/g, "")}`} className="hover:text-teal-400">
                  {settings.contactPhone}
                </a>
              </li>
              <li className="flex gap-2">
                <Mail className="h-4 w-4 shrink-0 text-teal-500" />
                <a href={`mailto:${settings.contactEmail}`} className="hover:text-teal-400">
                  {settings.contactEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-700 pt-8 sm:flex-row">
          <p className="text-sm text-slate-500">{copyright}</p>
          <div className="flex gap-4 text-sm">
            <a href={settings.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400">
              LinkedIn
            </a>
            <a href={settings.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400">
              Twitter
            </a>
            <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400">
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
