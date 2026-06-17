import { SolutionDetail, generateSolutionMetadata } from "@/components/SolutionDetail";

export async function generateMetadata() {
  return generateSolutionMetadata("turnkey-project");
}

export default function Page() {
  return <SolutionDetail slug="turnkey-project" />;
}
