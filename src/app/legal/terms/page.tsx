import { LegalPageTemplate } from "@/components/LegalPageTemplate";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return <LegalPageTemplate contentKey="terms" />;
}
