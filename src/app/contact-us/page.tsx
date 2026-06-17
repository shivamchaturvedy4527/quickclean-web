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
  const primaryPhone = settings.contactPhone.replace(/\s/g, "").split("/")[0];

  return (
    <SiteLayout>
      <PageHero title={contact.title} subtitle={contact.intro} breadcrumb="Get in touch" />

      <section className="section-pad">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="font-display text-2xl font-medium text-navy sm:text-3xl">Get in Touch</h2>
              <p className="mt-3 text-slate-600">We&apos;re here to help with equipment, consultancy, and service.</p>

              <ul className="mt-10 space-y-6">
                <li className="card flex gap-4 p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <MapPin className="h-5 w-5 text-accent" />
                  </div>
                  <span className="text-slate-700 leading-relaxed">
                    {settings.addressLine1}
                    {settings.addressLine2 && (
                      <>
                        <br />
                        {settings.addressLine2}
                      </>
                    )}
                    <br />
                    {settings.city}, {settings.country}
                  </span>
                </li>
                <li className="card flex gap-4 p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <Phone className="h-5 w-5 text-accent" />
                  </div>
                  <a
                    href={`tel:${primaryPhone}`}
                    className="text-slate-700 transition-colors hover:text-accent"
                  >
                    {settings.contactPhone}
                  </a>
                </li>
                <li className="card flex gap-4 p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <Mail className="h-5 w-5 text-accent" />
                  </div>
                  <a
                    href={`mailto:${settings.contactEmail}`}
                    className="text-slate-700 transition-colors hover:text-accent"
                  >
                    {settings.contactEmail}
                  </a>
                </li>
              </ul>

              {contact.serviceCentres && contact.serviceCentres.length > 0 && (
                <div className="mt-10">
                  <h3 className="font-semibold text-navy">Service Centres</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {contact.serviceCentres.join(" · ")}
                  </p>
                </div>
              )}
            </div>
            <div className="card card-premium p-8 sm:p-10">
              <h3 className="font-display text-xl font-medium text-navy">Send a Message</h3>
              <p className="mt-2 text-sm text-slate-500">Fill out the form and we&apos;ll respond promptly.</p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </SiteLayout>
  );
}
