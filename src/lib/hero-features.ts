import type { HeroFeatureItem, HomeContent } from "@/types/cms";

export const DEFAULT_HERO_FEATURES: HeroFeatureItem[] = [
  { line1: "High Quality", line2: "Machines" },
  { line1: "Advanced", line2: "Technology" },
  { line1: "Complete", line2: "Solutions" },
  { line1: "24/7", line2: "Support" },
  { line1: "Trusted", line2: "Company" },
];

export function resolveHeroFeatures(home: HomeContent): HeroFeatureItem[] {
  if (home.heroFeatures?.length) return home.heroFeatures;
  return DEFAULT_HERO_FEATURES;
}
