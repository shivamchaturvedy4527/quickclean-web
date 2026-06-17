import fs from "fs";
import path from "path";

const pptDir = path.join(process.cwd(), "public/images/ppt");
const files = fs.readdirSync(pptDir).filter((f) => f.startsWith("slide"));

// Group by slide number
const bySlide = {};
for (const f of files) {
  const m = f.match(/^slide(\d+)_/);
  if (!m) continue;
  const slide = m[1];
  if (!bySlide[slide]) bySlide[slide] = [];
  bySlide[slide].push({ name: f, size: fs.statSync(path.join(pptDir, f)).size });
}

for (const slide of Object.keys(bySlide).sort((a, b) => +a - +b)) {
  const items = bySlide[slide].sort((a, b) => b.size - a.size);
  const best = items.find((i) => i.size > 20000 && !i.name.endsWith("_img01.png")) || items[0];
  console.log(
    `slide${slide.padStart(2, "0")}: best=${best.name} (${best.size}) | all: ${items.map((i) => `${i.name}:${i.size}`).join(", ")}`
  );
}
