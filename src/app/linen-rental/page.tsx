import { SolutionDetail, generateSolutionMetadata } from "@/components/SolutionDetail";

export async function generateMetadata() {
  return generateSolutionMetadata("linen-rental");
}

export default function Page() {
  return <SolutionDetail slug="linen-rental" />;
}
