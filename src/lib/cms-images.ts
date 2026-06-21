const IMAGE_PATH =
  /(\/images\/|\.jpg|\.jpeg|\.png|\.gif|\.webp|\.svg|blob\.vercel-storage\.com)/i;

export function looksLikeImagePath(value: string): boolean {
  return IMAGE_PATH.test(value);
}

export function collectImagePaths(value: unknown, out: Set<string> = new Set()): Set<string> {
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed && looksLikeImagePath(trimmed)) out.add(trimmed);
    return out;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => collectImagePaths(item, out));
    return out;
  }

  if (value && typeof value === "object") {
    Object.values(value as Record<string, unknown>).forEach((item) => collectImagePaths(item, out));
  }

  return out;
}
