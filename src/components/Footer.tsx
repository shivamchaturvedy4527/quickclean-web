import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import type { FooterContent, NavItem, SiteSettings } from "@/types/cms";
import { Container } from "./ui/Container";

interface FooterProps {
  navigation: NavItem[];
  settings: SiteSettings;
  footer: FooterContent;
}

export function Footer({ navigation, settings, footer }: FooterProps) {
  const solutions =
    navigation.find((n) => n.label === "Our Solutions" || n.label === "Solutions")?.children ?? [];
  const company = navigation.find((n) => n.label === "Company")?.children ?? [];
  const primaryPhone = settings.contactPhone.replace(/\s/g, "").split("/")[0];

  return (
    <footer className="relative mt-auto overflow-hidden gradient-navy text-slate-300">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-gold/5 blur-3xl" />

      <Container className="relative py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div className="lg:col-span-1">
            <p className="font-display text-xl font-medium text-white">
              {settings.companyLegalName || settings.siteName}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">{footer.aboutText}</p>
          </div>

          <div>
            <h3 className="mb-5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/80">
              {footer.solutionsTitle}
            </h3>
            <ul className="space-y-3">
              {solutions.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 transition-colors hover:text-accent-bright"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/80">
              {footer.companyTitle}
            </h3>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 transition-colors hover:text-accent-bright"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/80">
              {footer.headOfficeTitle}
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-bright" />
                <span className="leading-relaxed text-slate-400">
                  {settings.addressLine1}
                  {settings.addressLine2 && (
                    <>
                      <br />
                      {settings.addressLine2}
                    </>
                  )}
                  <br />
                  {settings.city}
                  {settings.country ? `, ${settings.country}` : ""}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="h-4 w-4 shrink-0 text-accent-bright" />
                <a href={`tel:${primaryPhone}`} className="text-slate-400 transition-colors hover:text-accent-bright">
                  {settings.contactPhone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="h-4 w-4 shrink-0 text-accent-bright" />
                <a href={`mailto:${settings.contactEmail}`} className="text-slate-400 transition-colors hover:text-accent-bright">
                  {settings.contactEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-5 border-t border-white/8 pt-8 sm:flex-row">
          <p className="text-sm text-slate-500">{footer.copyright}</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {footer.legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-slate-500 transition-colors hover:text-accent-bright">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
