import { SiteLayout } from "@/components/SiteLayout";
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
      <section className="bg-[#0c2340] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">{team.title}</h1>
          <p className="mt-4 max-w-2xl text-slate-300">{team.intro}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:grid-cols-2 lg:grid-cols-4 sm:px-6 lg:px-8">
          {team.members.map((member) => (
            <div
              key={member.id}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="aspect-square bg-gradient-to-br from-slate-200 to-slate-300" />
              <div className="p-5">
                <h3 className="font-semibold text-[#0c2340]">{member.name}</h3>
                <p className="text-sm text-teal-700">{member.role}</p>
                <p className="mt-2 text-sm text-slate-600">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
