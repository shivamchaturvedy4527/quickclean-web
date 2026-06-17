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

  return (
    <footer className="mt-auto gradient-navy text-slate-300">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-lg font-semibold text-white">
              {settings.companyLegalName || settings.siteName}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">{footer.aboutText}</p>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-white/90">
              {footer.solutionsTitle}
            </h3>
            <ul className="space-y-2.5">
              {solutions.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm transition-colors hover:text-accent-bright">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-white/90">
              {footer.companyTitle}
            </h3>
            <ul className="space-y-2.5">
              {company.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm transition-colors hover:text-accent-bright">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-white/90">
              {footer.headOfficeTitle}
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>
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
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                <a href={`tel:${settings.contactPhone.replace(/\s/g, "")}`} className="hover:text-accent-bright">
                  {settings.contactPhone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                <a href={`mailto:${settings.contactEmail}`} className="hover:text-accent-bright">
                  {settings.contactEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-slate-500">{footer.copyright}</p>
          <div className="flex flex-wrap justify-center gap-5 text-sm">
            {footer.legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-accent-bright">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
