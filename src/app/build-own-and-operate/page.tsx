import { SolutionDetail, generateSolutionMetadata } from "@/components/SolutionDetail";

export async function generateMetadata() {
  return generateSolutionMetadata("build-own-and-operate");
}

export default function Page() {
  return <SolutionDetail slug="build-own-and-operate" />;
}
