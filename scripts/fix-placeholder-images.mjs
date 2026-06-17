/**
 * Replace PPT placeholder gradient circles (img01/img02/img04/img05)
 * with actual product photographs from the same slide.
 */
import fs from "fs";
import path from "path";

const cmsPath = path.join(process.cwd(), "data/cms.json");
const pptDir = path.join(process.cwd(), "public/images/ppt");

// Known placeholder sizes (dark gradient circles from PPT master)
const PLACEHOLDER_SIZES = new Set([56393, 23177, 13711, 5351]);

function isPlaceholder(filename) {
  const full = path.join(pptDir, filename);
  if (!fs.existsSync(full)) return false;
  const size = fs.statSync(full).size;
  if (PLACEHOLDER_SIZES.has(size)) return true;
  if (/_img0[125]\.png$/.test(filename) && size < 60000) return true;
  return false;
}

function bestImageForSlide(slideNum) {
  const prefix = `slide${String(slideNum).padStart(2, "0")}_`;
  const candidates = fs
    .readdirSync(pptDir)
    .filter((f) => f.startsWith(prefix))
    .map((f) => ({ f, size: fs.statSync(path.join(pptDir, f)).size }))
    .filter(({ f, size }) => !isPlaceholder(f) && size > 20000)
    .sort((a, b) => b.size - a.size);
  return candidates[0]?.f ?? null;
}

// Per-slide best photo (slides 8-22 used in cms)
const slideBest = {};
for (let s = 8; s <= 22; s++) {
  const best = bestImageForSlide(s);
  if (best) slideBest[s] = `/images/ppt/${best}`;
}

// Cross-slide fallbacks when a slide has no real photos (e.g. slide 9)
slideBest[9] = slideBest[10] ?? "/images/ppt/slide10_img01.png";

const EXPLICIT = {
  "/images/ppt/slide08_img01.png": "/images/ppt/slide08_img07.jpg",
  "/images/ppt/slide08_img02.png": "/images/ppt/slide08_img07.jpg",
  "/images/ppt/slide08_img04.png": "/images/ppt/slide10_img01.png",
  "/images/ppt/slide08_img05.png": "/images/ppt/slide11_img00.jpg",
  "/images/ppt/slide09_img01.png": "/images/ppt/slide10_img01.png",
  "/images/ppt/slide09_img02.png": "/images/ppt/slide11_img00.jpg",
  "/images/ppt/slide09_img04.png": "/images/ppt/slide12_img02.png",
  "/images/ppt/slide09_img05.png": "/images/ppt/slide13_img03.jpg",
  "/images/ppt/slide19_img02.jpg": "/images/ppt/slide19_img06.jpg",
  "/images/ppt/slide20_img06.jpg": "/images/ppt/slide20_img07.jpg",
  "/images/ppt/slide22_img02.jpg": "/images/ppt/slide22_img06.jpg",
};

function resolveImagePath(imgPath) {
  if (!imgPath || !imgPath.startsWith("/images/ppt/")) return imgPath;
  if (EXPLICIT[imgPath]) return EXPLICIT[imgPath];

  const m = imgPath.match(/slide(\d+)_/);
  if (!m) return imgPath;
  const filename = path.basename(imgPath);
  if (isPlaceholder(filename)) {
    const slide = parseInt(m[1], 10);
    return slideBest[slide] ?? imgPath;
  }
  return imgPath;
}

const cms = JSON.parse(fs.readFileSync(cmsPath, "utf8"));
let fixed = 0;

function walk(obj) {
  if (!obj) return;
  if (typeof obj === "string" && obj.startsWith("/images/")) {
    return;
  }
  if (Array.isArray(obj)) {
    obj.forEach((item, i) => {
      if (typeof item === "string" && item.startsWith("/images/")) {
        const resolved = resolveImagePath(item);
        if (resolved !== item) {
          obj[i] = resolved;
          fixed++;
          console.log(`FIX: ${item} -> ${resolved}`);
        }
      } else {
        walk(item);
      }
    });
  } else if (typeof obj === "object") {
    for (const [key, val] of Object.entries(obj)) {
      if (key === "image" || key === "logo" || key === "heroImage" || key === "videoThumbnail" || key === "favicon") {
        if (typeof val === "string" && val.startsWith("/images/")) {
          const resolved = resolveImagePath(val);
          if (resolved !== val) {
            obj[key] = resolved;
            fixed++;
            console.log(`FIX [${key}]: ${val} -> ${resolved}`);
          }
        }
      } else if (key === "gallery" && Array.isArray(val)) {
        val.forEach((item, i) => {
          if (typeof item === "string") {
            const resolved = resolveImagePath(item);
            if (resolved !== item) {
              val[i] = resolved;
              fixed++;
              console.log(`FIX [gallery]: ${item} -> ${resolved}`);
            }
          }
        });
      } else {
        walk(val);
      }
    }
  }
}

// Hero + logo: use best portfolio photo
cms.settings.logo = "/images/ppt/slide10_img01.png";
cms.home.heroImage = "/images/ppt/slide08_img07.jpg";
cms.about.heroImage = "/images/ppt/slide08_img07.jpg";
cms.productsPage.heroImage = "/images/ppt/slide08_img07.jpg";

walk(cms);

fs.writeFileSync(cmsPath, JSON.stringify(cms, null, 2) + "\n");
console.log(`\nTotal path fixes: ${fixed}`);
console.log("Hero:", cms.home.heroImage);
console.log("Logo:", cms.settings.logo);
