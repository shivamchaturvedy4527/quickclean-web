import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import type { FooterContent, NavItem, SiteSettings } from "@/types/cms";
import { CurrencySwitcher } from "./CurrencySwitcher";
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
    <footer className="relative mt-auto overflow-hidden gradient-primary text-gray-300">
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />

      <Container className="relative py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div className="lg:col-span-1">
            <p className="text-xl font-bold tracking-tight text-white">
              {settings.companyLegalName || settings.siteName}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">{footer.aboutText}</p>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-wider text-white/80">
              {footer.solutionsTitle}
            </h3>
            <ul className="space-y-3">
              {solutions.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 transition-colors hover:text-accent-bright"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-wider text-white/80">
              {footer.companyTitle}
            </h3>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 transition-colors hover:text-accent-bright"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-wider text-white/80">
              {footer.headOfficeTitle}
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-bright" />
                <span className="leading-relaxed text-gray-400">
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
                <a href={`tel:${primaryPhone}`} className="text-gray-400 transition-colors hover:text-accent-bright">
                  {settings.contactPhone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="h-4 w-4 shrink-0 text-accent-bright" />
                <a href={`mailto:${settings.contactEmail}`} className="text-gray-400 transition-colors hover:text-accent-bright">
                  {settings.contactEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-gray-500">{footer.copyright}</p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <CurrencySwitcher variant="footer" />
            {footer.legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-gray-500 transition-colors hover:text-accent-bright">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
