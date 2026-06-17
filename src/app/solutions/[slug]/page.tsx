import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { SolutionPrice } from "@/components/SolutionPrice";
import { getCMS } from "@/lib/cms-store";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const cms = await getCMS();
  return cms.solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cms = await getCMS();
  const solution = cms.solutions.find((s) => s.slug === slug);
  return { title: solution?.title ?? "Solution" };
}

export default async function SolutionDetailPage({ params }: Props) {
  const { slug } = await params;
  const cms = await getCMS();
  const solution = cms.solutions.find((s) => s.slug === slug);

  if (!solution) notFound();

  return (
    <SiteLayout>
      <section className="bg-[#0c2340] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-medium text-teal-400">
            <Link href="/solutions" className="hover:underline">
              Solutions
            </Link>{" "}
            / {solution.title}
          </p>
          <h1 className="mt-4 text-4xl font-bold">{solution.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            {solution.shortDescription}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div className="lg:col-span-2">
            <p className="text-lg leading-relaxed text-slate-700">
              {solution.description}
            </p>
            <h2 className="mt-10 text-xl font-semibold text-[#0c2340]">Key Benefits</h2>
            <ul className="mt-4 space-y-3">
              {solution.features.map((feature) => (
                <li key={feature} className="flex gap-3 text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm h-fit">
            <h3 className="font-semibold text-[#0c2340]">Pricing</h3>
            <div className="mt-3 text-2xl font-bold text-teal-700">
              <SolutionPrice solution={solution} />
            </div>
            <p className="mt-2 text-sm text-slate-500">
              Prices shown in your local currency. Contact us for detailed quotations.
            </p>
            <Link
              href="/contact"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-teal-700 px-4 py-3 text-sm font-semibold text-white hover:bg-teal-800"
            >
              Request Quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
