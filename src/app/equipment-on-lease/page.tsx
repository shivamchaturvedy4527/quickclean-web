import { SolutionDetail, generateSolutionMetadata } from "@/components/SolutionDetail";

export async function generateMetadata() {
  return generateSolutionMetadata("equipment-on-lease");
}

export default function Page() {
  return <SolutionDetail slug="equipment-on-lease" />;
}
