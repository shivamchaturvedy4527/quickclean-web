/**
 * Patch live Blob CMS: logo + hero TEXT only (never overwrites hero images).
 * Run: node scripts/patch-live-cms-brand.mjs
 */
import { readFileSync } from "fs";
import { resolve } from "path";
import { get, put } from "@vercel/blob";

function loadEnvLocal() {
  try {
    const envPath = resolve(process.cwd(), ".env.local");
    for (const line of readFileSync(envPath, "utf8").split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let val = trimmed.slice(eq + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = val;
    }
  } catch {
    /* ignore */
  }
}

loadEnvLocal();

const BLOB_PATH = "cms/cms.json";

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error("Missing BLOB_READ_WRITE_TOKEN in .env.local");
  process.exit(1);
}

const defaults = JSON.parse(readFileSync(resolve(process.cwd(), "data/cms.json"), "utf8"));

const result = await get(BLOB_PATH, { access: "public" });
if (!result?.stream) {
  console.error("Could not read CMS from blob");
  process.exit(1);
}

const cms = JSON.parse(await new Response(result.stream).text());

cms.settings.logo = "/images/laundrex-logo-transparent.png";

cms.home.heroTitle = defaults.home.heroTitle;
cms.home.heroTitleLine2 = defaults.home.heroTitleLine2 ?? "";
cms.home.heroEyebrow = defaults.home.heroEyebrow;
cms.home.heroSubtitle = defaults.home.heroSubtitle;
cms.home.heroCtaText = defaults.home.heroCtaText;
cms.home.heroCtaLink = defaults.home.heroCtaLink;
cms.home.heroSecondaryCtaText = defaults.home.heroSecondaryCtaText;
cms.home.heroSecondaryCtaLink = defaults.home.heroSecondaryCtaLink;
cms.home.heroFeatures = defaults.home.heroFeatures;

// Restore client's uploaded equipment photo (reference mockup was wrongly set before).
const clientHero =
  "https://5vfy5mzs7fpalhva.public.blob.vercel-storage.com/uploads/upload-1782020641311.png";
cms.home.heroImage = clientHero;
cms.home.heroImages = [clientHero];

await put(BLOB_PATH, JSON.stringify(cms, null, 2), {
  access: "public",
  addRandomSuffix: false,
  contentType: "application/json",
  allowOverwrite: true,
});

console.log("Patched live CMS:");
console.log("  logo:", cms.settings.logo);
console.log("  heroTitle:", cms.home.heroTitle);
console.log("  heroEyebrow:", cms.home.heroEyebrow);
console.log("  heroImage:", cms.home.heroImage);
