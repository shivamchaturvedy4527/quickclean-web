import { SiteLayout } from "@/components/SiteLayout";
import { getCMS } from "@/lib/cms-store";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
};

export default async function CareersPage() {
  const cms = await getCMS();
  const { careers } = cms;

  return (
    <SiteLayout>
      <section className="bg-[#0c2340] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">{careers.title}</h1>
          <p className="mt-4 max-w-2xl text-slate-300">{careers.intro}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#0c2340]">Why Join Us</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {careers.benefits.map((benefit) => (
              <li
                key={benefit}
                className="rounded-lg border border-slate-200 bg-white p-4 text-slate-700"
              >
                {benefit}
              </li>
            ))}
          </ul>

          <h2 className="mt-14 text-2xl font-bold text-[#0c2340]">Open Positions</h2>
          <div className="mt-6 space-y-4">
            {careers.openings.map((job) => (
              <div
                key={job.title}
                className="flex flex-col justify-between gap-2 rounded-xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center"
              >
                <div>
                  <h3 className="font-semibold text-[#0c2340]">{job.title}</h3>
                  <p className="text-sm text-slate-500">
                    {job.location} · {job.type}
                  </p>
                </div>
                <a
                  href={`mailto:${cms.settings.contactEmail}?subject=Application: ${job.title}`}
                  className="inline-flex rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800"
                >
                  Apply Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
