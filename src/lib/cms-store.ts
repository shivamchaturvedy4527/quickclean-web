import { DEFAULT_LABELS } from "@/lib/default-labels";
import { clampLogoHeight, clampLogoWidth } from "@/lib/logo-size";
import { get, head, put } from "@vercel/blob";
import { promises as fs } from "fs";
import path from "path";
import type { CMSData, SiteLabels } from "@/types/cms";

const DATA_FILE = path.join(process.cwd(), "data", "cms.json");
const TMP_FILE = "/tmp/cms-data.json";
const BLOB_PATHNAME = "cms/cms.json";

let memoryCache: CMSData | null = null;

function isStaticExportBuild(): boolean {
  return process.env.HOSTINGER_STATIC_EXPORT === "1";
}

/** Serverless instances keep module state — never cache CMS reads on Vercel. */
function useMemoryCache(): boolean {
  return !process.env.VERCEL;
}

function hasBlobStorage(): boolean {
  if (isStaticExportBuild()) return false;
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function readFromFile(filePath: string): Promise<CMSData | null> {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as CMSData;
  } catch {
    return null;
  }
}

async function blobExists(): Promise<boolean> {
  if (!hasBlobStorage()) return false;
  try {
    await head(BLOB_PATHNAME);
    return true;
  } catch {
    return false;
  }
}

async function readFromBlob(): Promise<CMSData | null> {
  if (!hasBlobStorage()) return null;

  try {
    const metadata = await head(BLOB_PATHNAME);
    if (!metadata?.url) return null;

    const res = await fetch(metadata.url);
    if (!res.ok) return null;

    const text = await res.text();
    return JSON.parse(text) as CMSData;
  } catch {
    return null;
  }
}

async function writeToBlob(data: CMSData): Promise<void> {
  if (!hasBlobStorage()) return;

  await put(BLOB_PATHNAME, JSON.stringify(data, null, 2), {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/json",
    allowOverwrite: true,
  });
}

function mergeLabels(partial?: SiteLabels): SiteLabels {
  if (!partial) return DEFAULT_LABELS;
  return {
    breadcrumbs: { ...DEFAULT_LABELS.breadcrumbs, ...partial.breadcrumbs },
    home: { ...DEFAULT_LABELS.home, ...partial.home },
    solutions: { ...DEFAULT_LABELS.solutions, ...partial.solutions },
    products: { ...DEFAULT_LABELS.products, ...partial.products },
    contact: { ...DEFAULT_LABELS.contact, ...partial.contact },
    newsletter: { ...DEFAULT_LABELS.newsletter, ...partial.newsletter },
    whatsapp: {
      ...DEFAULT_LABELS.whatsapp,
      ...partial.whatsapp,
      inquiryOptions: partial.whatsapp?.inquiryOptions ?? DEFAULT_LABELS.whatsapp.inquiryOptions,
    },
    meta: { ...DEFAULT_LABELS.meta, ...partial.meta },
  };
}

function normalizeCms(data: CMSData): CMSData {
  const logoMaxWidth = clampLogoWidth(Number(data.settings.logoMaxWidth) || 242);
  const logoMaxHeight = clampLogoHeight(Number(data.settings.logoMaxHeight) || 53);
  return {
    ...data,
    settings: {
      ...data.settings,
      logoMaxWidth,
      logoMaxHeight,
    },
    labels: mergeLabels(data.labels),
  };
}

/** Only for first-time setup when blob store is empty — never call on read errors. */
async function seedBlobFromFile(): Promise<CMSData | null> {
  const fromFile = await readFromFile(DATA_FILE);
  if (!fromFile) return null;

  const normalized = normalizeCms(fromFile);
  await writeToBlob(normalized);
  return normalized;
}

function cacheResult(data: CMSData): CMSData {
  const normalized = normalizeCms(data);
  if (useMemoryCache()) memoryCache = normalized;
  return normalized;
}

async function readFromBlobWithRetry(maxAttempts = 3): Promise<CMSData | null> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const data = await readFromBlob();
    if (data) return data;
    if (attempt < maxAttempts - 1) {
      await new Promise((resolve) => setTimeout(resolve, 150 * (attempt + 1)));
    }
  }
  return null;
}

export async function getCMS(): Promise<CMSData> {
  if (useMemoryCache() && memoryCache) return memoryCache;

  if (isStaticExportBuild()) {
    const data = await readFromFile(DATA_FILE);
    if (!data) throw new Error("CMS data file not found");
    return cacheResult(data);
  }

  if (hasBlobStorage()) {
    const fromBlob = await readFromBlobWithRetry();
    if (fromBlob) return cacheResult(fromBlob);

    const exists = await blobExists();
    if (!exists && process.env.VERCEL) {
      const seeded = await seedBlobFromFile();
      if (seeded) return cacheResult(seeded);
    }

    // Blob exists but read failed — do NOT fall back to bundled cms.json (would restore deleted items).
    if (exists) {
      throw new Error("CMS storage read failed. Please publish again.");
    }
  }

  if (process.env.VERCEL && !hasBlobStorage()) {
    const tmp = await readFromFile(TMP_FILE);
    if (tmp) return cacheResult(tmp);
  }

  if (!process.env.VERCEL || !hasBlobStorage()) {
    const data = await readFromFile(DATA_FILE);
    if (!data) throw new Error("CMS data file not found");
    return cacheResult(data);
  }

  throw new Error("CMS data unavailable");
}

export async function saveCMS(data: CMSData): Promise<CMSData> {
  const normalized = normalizeCms(data);
  const json = JSON.stringify(normalized, null, 2);

  if (isStaticExportBuild()) {
    await fs.writeFile(DATA_FILE, json, "utf-8");
    memoryCache = normalized;
    return normalized;
  }

  if (hasBlobStorage()) {
    await writeToBlob(normalized);
    if (useMemoryCache()) memoryCache = normalized;
    return normalized;
  }

  if (process.env.VERCEL) {
    await fs.writeFile(TMP_FILE, json, "utf-8");
    if (useMemoryCache()) memoryCache = normalized;
    return normalized;
  }

  await fs.writeFile(DATA_FILE, json, "utf-8");
  memoryCache = normalized;
  return normalized;
}

export function invalidateCMSCache(): void {
  memoryCache = null;
}

export function cmsStorageMode(): "blob" | "file" | "tmp" {
  if (hasBlobStorage()) return "blob";
  if (process.env.VERCEL) return "tmp";
  return "file";
}
