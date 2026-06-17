import { Mail, MapPin, Phone } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { ContactForm } from "@/components/ContactForm";
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
      <section className="bg-[#0c2340] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">{contact.title}</h1>
          <p className="mt-4 max-w-2xl text-slate-300">{contact.intro}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-xl font-semibold text-[#0c2340]">Get in Touch</h2>
            <ul className="mt-6 space-y-4">
              <li className="flex gap-3 text-slate-700">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
                <span>
                  {settings.addressLine1}
                  <br />
                  {settings.addressLine2}
                  <br />
                  {settings.city}, {settings.country}
                </span>
              </li>
              <li className="flex gap-3 text-slate-700">
                <Phone className="h-5 w-5 shrink-0 text-teal-600" />
                <a href={`tel:${settings.contactPhone.replace(/\s/g, "")}`} className="hover:text-teal-700">
                  {settings.contactPhone}
                </a>
              </li>
              <li className="flex gap-3 text-slate-700">
                <Mail className="h-5 w-5 shrink-0 text-teal-600" />
                <a href={`mailto:${settings.contactEmail}`} className="hover:text-teal-700">
                  {settings.contactEmail}
                </a>
              </li>
            </ul>
          </div>
          <ContactForm />
        </div>
      </section>
    </SiteLayout>
  );
}
