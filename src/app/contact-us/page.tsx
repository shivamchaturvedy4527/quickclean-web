import { Mail, MapPin, Phone } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { getCMS } from "@/lib/cms-store";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCMS();
  return { title: cms.labels.meta.contact };
}

export default async function ContactPage() {
  const cms = await getCMS();
  const { contact, settings, footer, labels } = cms;
  const primaryPhone = settings.contactPhone.replace(/\s/g, "").split("/")[0];

  return (
    <SiteLayout>
      <PageHero
        title={contact.title}
        subtitle={contact.getInTouchSubtitle ?? labels.contact.getInTouchSubtitle}
        breadcrumb={contact.breadcrumb ?? labels.breadcrumbs.getInTouch}
        size="compact"
      />

      <section className="section-pad">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {contact.getInTouchTitle ?? labels.contact.getInTouchTitle}
              </h2>
              <p className="mt-3 text-gray-600">
                {contact.getInTouchSubtitle ?? labels.contact.getInTouchSubtitle}
              </p>

              <ul className="mt-10 space-y-6">
                <li className="card flex gap-4 p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <MapPin className="h-5 w-5 text-accent" />
                  </div>
                  <span className="leading-relaxed text-gray-700">
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

                {footer.manufacturedByLabel && footer.manufacturedByCompany && (
                  <li className="card p-5">
                    <p className="font-semibold text-gray-900">{footer.manufacturedByLabel}</p>
                    <p className="mt-2 leading-relaxed text-gray-700">{footer.manufacturedByCompany}</p>
                    {footer.manufacturedByDivision && (
                      <p className="leading-relaxed text-gray-700">{footer.manufacturedByDivision}</p>
                    )}
                    <p className="mt-2 leading-relaxed text-gray-600">
                      {settings.addressLine1}
                      {settings.addressLine2 && (
                        <>
                          <br />
                          {settings.addressLine2}
                        </>
                      )}
                      <br />
                      {settings.city}, {settings.country}
                    </p>
                  </li>
                )}

                <li className="card flex gap-4 p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <Phone className="h-5 w-5 text-accent" />
                  </div>
                  <a href={`tel:${primaryPhone}`} className="text-gray-700 transition-colors hover:text-accent">
                    {settings.contactPhone}
                  </a>
                </li>

                <li className="card flex gap-4 p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <Mail className="h-5 w-5 text-accent" />
                  </div>
                  <a href={`mailto:${settings.contactEmail}`} className="text-gray-700 transition-colors hover:text-accent">
                    {settings.contactEmail}
                  </a>
                </li>
              </ul>

              {contact.serviceCentres && contact.serviceCentres.length > 0 && (
                <div className="mt-10">
                  <h3 className="font-semibold text-gray-900">
                    {contact.serviceCentresTitle ?? labels.contact.serviceCentresTitle}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    {contact.serviceCentres.join(" · ")}
                  </p>
                </div>
              )}
            </div>

            <div className="card p-8 sm:p-10">
              <h3 className="text-xl font-bold tracking-tight text-primary">
                {contact.sendMessageTitle ?? labels.contact.sendMessageTitle}
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                {contact.sendMessageSubtitle ?? labels.contact.sendMessageSubtitle}
              </p>
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
