import { readFileSync, existsSync } from "fs";
import { join } from "path";

const root = process.cwd();
const cms = JSON.parse(readFileSync(join(root, "data", "cms.json"), "utf-8"));

const paths = new Set();

function collect(value) {
  if (typeof value === "string" && value.startsWith("/images/")) {
    paths.add(value);
  } else if (Array.isArray(value)) {
    value.forEach(collect);
  } else if (value && typeof value === "object") {
    Object.values(value).forEach(collect);
  }
}

collect(cms);

const missing = [...paths].filter((p) => !existsSync(join(root, "public", p)));

if (missing.length) {
  console.error("Missing CMS image files:");
  missing.forEach((p) => console.error(`  ${p}`));
  process.exit(1);
}

console.log(`OK: ${paths.size} CMS image paths verified`);
