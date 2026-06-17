import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const imgDir = path.join(root, "public", "images");

const ASSETS = [
  ["logo.png", "https://quickclean.co.in/wp-content/uploads/2025/10/cropped-Quick-Clean-Site-Identity-Logo-1.png"],
  ["favicon-32.png", "https://quickclean.co.in/wp-content/uploads/2025/10/cropped-quick-clean-website-icon-32x32.png"],
  ["hero.jpg", "https://quickclean.co.in/wp-content/uploads/2025/10/hero-section-Sustainable-laundry-solutions.jpg"],
  ["founder.jpg", "https://quickclean.co.in/wp-content/uploads/2017/10/Untitled-design-1.jpg"],
  ["testimonial-nitin.jpg", "https://quickclean.co.in/wp-content/uploads/2017/10/Untitled-design-1-150x150.jpg"],
  ["sustainability-water.jpg", "https://quickclean.co.in/wp-content/uploads/2025/10/3456543.jpg"],
  ["sustainability-carbon.jpg", "https://quickclean.co.in/wp-content/uploads/2025/10/346534.jpg"],
  ["sustainability-extra.jpg", "https://quickclean.co.in/wp-content/uploads/2025/10/36345.jpg"],
  ["blog-manufacturing.jpg", "https://quickclean.co.in/wp-content/uploads/2025/08/645.jpg"],
  ["blog-hotel-revenue.jpg", "https://quickclean.co.in/wp-content/uploads/2025/12/Why-Linen-Management-Directly-Impacts-Hotel-Revenue.jpg"],
  ["blog-hospital-linen.jpg", "https://quickclean.co.in/wp-content/uploads/2025/12/linen-hygiene-blog.jpg"],
  ["blog-outdated-systems.jpg", "https://quickclean.co.in/wp-content/uploads/2025/12/The-Hidden-Cost-of-Outdated-Laundry-Systems.jpg"],
  ["solution-boo.jpg", "https://quickclean.co.in/wp-content/uploads/2025/10/2.jpg"],
  ["solution-turnkey.jpg", "https://quickclean.co.in/wp-content/uploads/2025/10/867.jpg"],
  ["solution-linen.jpg", "https://quickclean.co.in/wp-content/uploads/2025/10/897.jpg"],
  ["solution-lease.jpg", "https://quickclean.co.in/wp-content/uploads/2025/10/556.jpg"],
  ["solution-boo-cover.jpg", "https://quickclean.co.in/wp-content/uploads/2025/11/Build-Own-and-Operate-Title-Cover.jpg"],
  ...Array.from({ length: 18 }, (_, i) => [
    `brands/${i + 1}.jpg`,
    `https://i.postimg.cc/${[
      "0NBdYP5b/1", "7LfSYd1D/10", "rp3xdjg4/11", "85vWLvn0/12", "NF7Hzct8/13",
      "T1Xb0PzY/14", "59wL0wzH/15", "GhdYsHPX/16", "m2j93B8B/17", "wjBm0ZGJ/18",
      "nrv4fm4D/2", "qR6cQSgQ/3", "cCqRzhnW/4", "05mdwTTy/5", "rFkGChTC/6",
      "WbwG9MbR/7", "dVQ8gLLh/8", "t4rhbpx2/9",
    ][i]}.jpg`,
  ]),
];

fs.mkdirSync(path.join(imgDir, "brands"), { recursive: true });

let ok = 0;
let fail = 0;

for (const [rel, url] of ASSETS) {
  const dest = path.join(imgDir, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(res.statusText);
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(dest, buf);
    ok++;
    console.log("OK", rel);
  } catch (e) {
    fail++;
    console.error("FAIL", rel, e.message);
  }
}

console.log(`\nDownloaded: ${ok}, Failed: ${fail}`);
