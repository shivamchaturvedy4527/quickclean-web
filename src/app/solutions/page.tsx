import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { getCMS } from "@/lib/cms-store";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solutions",
};

export default async function SolutionsPage() {
  const cms = await getCMS();

  return (
    <SiteLayout>
      <section className="bg-[#0c2340] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Commercial Laundry Solutions</h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            End-to-end laundry infrastructure for hospitality, healthcare, and institutional clients.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {cms.solutions.map((solution) => (
              <Link
                key={solution.id}
                href={`/solutions/${solution.slug}`}
                className="group flex flex-col rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition hover:border-teal-200 hover:shadow-md"
              >
                <h2 className="text-2xl font-bold text-[#0c2340] group-hover:text-teal-700">
                  {solution.title}
                </h2>
                <p className="mt-4 flex-1 text-slate-600">{solution.shortDescription}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-teal-700">
                  Learn more <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
