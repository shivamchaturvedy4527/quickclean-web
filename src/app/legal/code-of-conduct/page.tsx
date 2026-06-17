import { LegalPageTemplate } from "@/components/LegalPageTemplate";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Code of Conduct",
};

export default function CodeOfConductPage() {
  return <LegalPageTemplate contentKey="codeOfConduct" />;
}
