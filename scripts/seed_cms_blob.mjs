/**
 * One-time seed: upload data/cms.json to Vercel Blob.
 * Run: node scripts/seed_cms_blob.mjs
 */
import { readFileSync } from "fs";
import { put } from "@vercel/blob";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cmsPath = path.join(__dirname, "..", "data", "cms.json");
const json = readFileSync(cmsPath, "utf-8");

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error("Missing BLOB_READ_WRITE_TOKEN");
  process.exit(1);
}

const result = await put("cms/cms.json", json, {
  access: "public",
  addRandomSuffix: false,
  contentType: "application/json",
  allowOverwrite: true,
});

console.log("Seeded CMS to blob:", result.url);
