import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { CmsImage } from "@/components/CmsImage";
import { SectionReveal } from "@/components/SectionReveal";
import { getCMS } from "@/lib/cms-store";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Team",
};

export default async function TeamPage() {
  const cms = await getCMS();
  const { team } = cms;

  return (
    <SiteLayout>
      <PageHero title={team.title} subtitle={team.intro} image={team.heroImage} />

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:grid-cols-2 lg:grid-cols-4 sm:px-6 lg:px-8">
          {team.members.map((member, i) => (
            <SectionReveal key={member.id} delay={i * 0.08}>
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
                <div className="relative aspect-square overflow-hidden">
                  <CmsImage src={member.image} alt={member.name} fill sizes="(max-width: 768px) 50vw, 25vw" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-primary">{member.name}</h3>
                  <p className="text-sm text-accent">{member.role}</p>
                  <p className="mt-2 text-sm text-slate-600">{member.bio}</p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
