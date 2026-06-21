/** Remote CDN fallbacks — local /images/brands/* can 500 on some Vercel deploys. */
export const BRAND_LOGO_CDN: string[] = [
  "https://i.postimg.cc/0NBdYP5b/1.jpg",
  "https://i.postimg.cc/nrv4fm4D/2.jpg",
  "https://i.postimg.cc/qR6cQSgQ/3.jpg",
  "https://i.postimg.cc/cCqRzhnW/4.jpg",
  "https://i.postimg.cc/05mdwTTy/5.jpg",
  "https://i.postimg.cc/rFkGChTC/6.jpg",
  "https://i.postimg.cc/WbwG9MbR/7.jpg",
  "https://i.postimg.cc/dVQ8gLLh/8.jpg",
  "https://i.postimg.cc/t4rhbpx2/9.jpg",
  "https://i.postimg.cc/7LfSYd1D/10.jpg",
  "https://i.postimg.cc/rp3xdjg4/11.jpg",
  "https://i.postimg.cc/85vWLvn0/12.jpg",
  "https://i.postimg.cc/NF7Hzct8/13.jpg",
  "https://i.postimg.cc/T1Xb0PzY/14.jpg",
  "https://i.postimg.cc/59wL0wzH/15.jpg",
  "https://i.postimg.cc/GhdYsHPX/16.jpg",
  "https://i.postimg.cc/m2j93B8B/17.jpg",
  "https://i.postimg.cc/wjBm0ZGJ/18.jpg",
];

export const BRAND_LOGO_COUNT = BRAND_LOGO_CDN.length;

export function brandLogoUrlForIndex(index: number): string {
  return BRAND_LOGO_CDN[index % BRAND_LOGO_COUNT];
}

/** Prefer local brand assets; CDN is fallback only when local path is missing. */
export function resolveBrandLogoUrl(image: string, index = 0): string {
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  if (image.startsWith("/images/brands/")) {
    return image;
  }

  return brandLogoUrlForIndex(index);
}
