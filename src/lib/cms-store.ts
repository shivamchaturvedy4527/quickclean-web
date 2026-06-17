import { promises as fs } from "fs";
import path from "path";
import type { CMSData } from "@/types/cms";

const DATA_FILE = path.join(process.cwd(), "data", "cms.json");
const TMP_FILE = "/tmp/cms-data.json";

let memoryCache: CMSData | null = null;

async function readFromFile(filePath: string): Promise<CMSData | null> {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as CMSData;
  } catch {
    return null;
  }
}

export async function getCMS(): Promise<CMSData> {
  if (memoryCache) return memoryCache;

  if (process.env.VERCEL) {
    const tmp = await readFromFile(TMP_FILE);
    if (tmp) {
      memoryCache = tmp;
      return tmp;
    }
  }

  const data = await readFromFile(DATA_FILE);
  if (!data) throw new Error("CMS data file not found");
  memoryCache = data;
  return data;
}

export async function saveCMS(data: CMSData): Promise<void> {
  memoryCache = data;
  const json = JSON.stringify(data, null, 2);

  if (process.env.VERCEL) {
    await fs.writeFile(TMP_FILE, json, "utf-8");
    return;
  }

  await fs.writeFile(DATA_FILE, json, "utf-8");
}

export function invalidateCMSCache(): void {
  memoryCache = null;
}
