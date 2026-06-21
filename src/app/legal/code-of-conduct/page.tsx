import { LegalPageTemplate } from "@/components/LegalPageTemplate";
import { getCMS } from "@/lib/cms-store";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCMS();
  return { title: cms.labels.meta.codeOfConduct };
}

export default function CodeOfConductPage() {
  return <LegalPageTemplate contentKey="codeOfConduct" />;
}
