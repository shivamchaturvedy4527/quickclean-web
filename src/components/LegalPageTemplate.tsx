import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { getCMS } from "@/lib/cms-store";
import type { Metadata } from "next";
import type { LegalPageContent } from "@/types/cms";

async function LegalPage({ content }: { content: LegalPageContent }) {
  return (
    <section className="py-16">
      <div className="prose-legal mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-slate-500">
          Last updated: {new Date(content.lastUpdated).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        {content.sections.map((section) => (
          <div key={section.heading}>
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export async function generateLegalMetadata(
  title: string
): Promise<Metadata> {
  return { title };
}

export async function LegalPageTemplate({
  contentKey,
}: {
  contentKey: "privacy" | "terms" | "codeOfConduct";
}) {
  const cms = await getCMS();
  const content = cms.legal[contentKey];

  return (
    <SiteLayout>
      <PageHero title={content.title} />
      <LegalPage content={content} />
    </SiteLayout>
  );
}
