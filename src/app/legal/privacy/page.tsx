import { LegalPageTemplate } from "@/components/LegalPageTemplate";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return <LegalPageTemplate contentKey="privacy" />;
}
