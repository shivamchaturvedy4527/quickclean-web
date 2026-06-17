import { Mail, MapPin, Phone } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { getCMS } from "@/lib/cms-store";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
};

export default async function ContactPage() {
  const cms = await getCMS();
  const { contact, settings } = cms;

  return (
    <SiteLayout>
      <PageHero title={contact.title} subtitle={contact.intro} />

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="font-display text-2xl font-medium text-navy">Get in Touch</h2>
              <ul className="mt-8 space-y-5">
                <li className="flex gap-4 text-slate-700">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span>
                    {settings.addressLine1}
                    <br />
                    {settings.addressLine2}
                    <br />
                    {settings.city}, {settings.country}
                  </span>
                </li>
                <li className="flex gap-4 text-slate-700">
                  <Phone className="h-5 w-5 shrink-0 text-accent" />
                  <a
                    href={`tel:${settings.contactPhone.replace(/\s/g, "")}`}
                    className="transition-colors hover:text-accent"
                  >
                    {settings.contactPhone}
                  </a>
                </li>
                <li className="flex gap-4 text-slate-700">
                  <Mail className="h-5 w-5 shrink-0 text-accent" />
                  <a
                    href={`mailto:${settings.contactEmail}`}
                    className="transition-colors hover:text-accent"
                  >
                    {settings.contactEmail}
                  </a>
                </li>
              </ul>
            </div>
            <div className="card p-8">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </SiteLayout>
  );
}
