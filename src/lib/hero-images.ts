export function resolveHeroImages(home: { heroImage: string; heroImages?: string[] }): string[] {
  const fromList = home.heroImages?.filter(Boolean) ?? [];
  if (fromList.length) return fromList;
  if (home.heroImage) return [home.heroImage];
  return [];
}
