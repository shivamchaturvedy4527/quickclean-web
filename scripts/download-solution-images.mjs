import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imgDir = path.join(__dirname, "..", "public", "images");

const SOLUTION_IMAGES = [
  ["solution-boo.jpg", "https://quickclean.co.in/wp-content/uploads/2025/10/2.jpg"],
  ["solution-turnkey.jpg", "https://quickclean.co.in/wp-content/uploads/2025/10/867.jpg"],
  ["solution-linen.jpg", "https://quickclean.co.in/wp-content/uploads/2025/10/897.jpg"],
  ["solution-lease.jpg", "https://quickclean.co.in/wp-content/uploads/2025/10/556.jpg"],
  ["solution-boo-cover.jpg", "https://quickclean.co.in/wp-content/uploads/2025/11/Build-Own-and-Operate-Title-Cover.jpg"],
];

fs.mkdirSync(imgDir, { recursive: true });

for (const [rel, url] of SOLUTION_IMAGES) {
  const dest = path.join(imgDir, rel);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`);
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  console.log("OK", rel);
}
