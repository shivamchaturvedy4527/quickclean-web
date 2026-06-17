import { getCMS } from "@/lib/cms-store";
import { SiteLayout } from "@/components/SiteLayout";
import { CmsImage } from "@/components/CmsImage";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateSolutionMetadata(slug: string): Promise<Metadata> {
  const cms = await getCMS();
  const solution = cms.solutions.find((s) => s.slug === slug);
  return { title: solution?.title ?? "Solution" };
}

export async function SolutionDetail({ slug }: { slug: string }) {
  const cms = await getCMS();
  const solution = cms.solutions.find((s) => s.slug === slug);
  if (!solution) notFound();

  return (
    <SiteLayout>
      <section className="bg-[#06163a] py-12 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-3xl font-semibold">{solution.title}</h1>
          <p className="mt-3 max-w-3xl text-slate-300">{solution.shortDescription}</p>
        </div>
      </section>
      <section className="py-12">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-2">
          {solution.image && (
            <div className="relative aspect-video overflow-hidden rounded">
              <CmsImage src={solution.image} alt={solution.title} fill />
            </div>
          )}
          <div>
            <div className="prose-legal space-y-4">
              {solution.description.split("\n\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            {solution.features.length > 0 && (
              <>
                <h2 className="mt-8 text-xl font-semibold text-[#06163a]">Key Points</h2>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
                  {solution.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </>
            )}
            <Link
              href="/contact-us"
              className="mt-8 inline-block rounded bg-[#00b67a] px-6 py-3 text-sm font-semibold text-white"
            >
              {solution.ctaText ?? "Contact Us"}
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
