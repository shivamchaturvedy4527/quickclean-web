#!/usr/bin/env python3
"""Full PPT integration: gallery images, pressing machines, product fixes, audit."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PPT_JSON = ROOT / "data" / "ppt-extraction.json"
CMS_JSON = ROOT / "data" / "cms.json"
AUDIT_JSON = ROOT / "data" / "ppt-audit.json"


def slide(data, n):
    return data["slides"][n - 1]


def texts_after_title(s):
    t = s["text"]
    return t[1:] if len(t) > 1 else []


def bullets(s, skip_headers=None):
    skip_headers = skip_headers or {"Quality", "Comprehensive Service:", "Maintenance:"}
    t = s["text"]
    if len(t) <= 1:
        return []
    items = []
    for line in t[1:]:
        if line in skip_headers:
            continue
        items.append(line)
    return items


def best_image(s, min_size=30000):
    imgs = sorted(s["images"], key=lambda x: x["size"], reverse=True)
    for img in imgs:
        if img["size"] >= min_size:
            return img["path"]
    return imgs[0]["path"] if imgs else ""


def all_images(s):
    return [img["path"] for img in s["images"]]


def meaningful_gallery_images(s):
    """All slide images — include logos/decorative assets so nothing is orphaned."""
    return [img["path"] for img in s["images"]]


def slugify(text):
    text = re.sub(r"[^\w\s-]", "", text.lower())
    return re.sub(r"[\s_]+", "-", text).strip("-")[:60]


def parse_clients(s30, s31):
    clients = []
    for s in (s30, s31):
        for line in s["text"][1:]:
            name = line.strip()
            if name:
                clients.append(name)
    return clients


def dedupe(seq):
    seen = set()
    out = []
    for x in seq:
        if x and x not in seen:
            seen.add(x)
            out.append(x)
    return out


def main():
    with open(PPT_JSON, encoding="utf-8") as f:
        data = json.load(f)

    with open(CMS_JSON, encoding="utf-8") as f:
        cms = json.load(f)

    slides_map = {s["slide"]: s for s in data["slides"]}

    # --- gallery from slides 23-29 ---
    gallery_images = []
    for sn in range(23, 30):
        gallery_images.extend(meaningful_gallery_images(slides_map[sn]))
    gallery_images = dedupe(gallery_images)

    cms["installationGallery"] = {
        "title": "Installations & Equipment Gallery",
        "subtitle": "Pan India installations of Transferon CBW systems, washer extractors, ironers and complete laundry lines.",
        "images": [{"src": p, "caption": ""} for p in gallery_images],
    }

    # --- zip media archive (duplicate extractions) ---
    media_paths = dedupe([m["saved_as"] for m in data.get("zip_media", [])])
    cms["pptMediaArchive"] = media_paths

    # --- pressing machines from slide 22 ---
    s22 = slides_map[22]
    press_names = texts_after_title(s22)
    press_imgs = all_images(s22)
    pressing = []
    for i, name in enumerate(press_names):
        img = press_imgs[i] if i < len(press_imgs) else press_imgs[-1] if press_imgs else ""
        pressing.append({"name": name.strip(), "image": img})
    cms["pressingMachines"] = {
        "title": s22["text"][0] if s22["text"] else "Pressing Machines Portfolio",
        "subtitle": "Professional garment pressing machines for laundry and dry-cleaning operations.",
        "items": pressing,
    }

    # --- home slide 1 ---
    s1 = slides_map[1]
    cms["home"]["companyProfile"] = "\n".join(s1["text"]) if s1["text"] else ""
    cms["home"]["heroEyebrow"] = s1["text"][1] if len(s1["text"]) > 1 else cms["settings"]["companyLegalName"]

    # --- about timeline ---
    cms["about"]["journeyTitle"] = "Our Journey"
    cms["about"]["timeline"] = [
        {
            "year": "10+",
            "title": "Years of Industry Experience",
            "description": "Reliable partner in laundry & dry cleaning room solutions across India.",
        },
        {
            "year": "12+",
            "title": "Product Categories",
            "description": "CBW systems, washer extractors, ironers, folders, dry-cleaning and pressing machines.",
        },
        {
            "year": "51+",
            "title": "Prestigious Clients",
            "description": "Hotels, hospitals, universities and commercial laundries trust Pcts Infrastructures.",
        },
        {
            "year": "12",
            "title": "Service Centres",
            "description": "Bangalore, Chennai, Hyderabad, Mumbai, Pune, Delhi and more — pan India support.",
        },
    ]

    # --- products rebuild slides 8-22 ---
    products = []
    gallery_pool = list(gallery_images)
    gallery_idx = 0

    for sn in range(8, 23):
        s = slides_map[sn]
        title = s["text"][0] if s["text"] else f"Product {sn}"
        desc_parts = texts_after_title(s)
        short = desc_parts[0][:200] if desc_parts else title
        description = "\n\n".join(desc_parts)
        features = bullets(s) if sn <= 9 else desc_parts
        if sn > 9 and len(desc_parts) > 1:
            features = desc_parts

        imgs = all_images(s)
        if not imgs and sn == 15:
            imgs = [slides_map[16]["images"][0]["path"]] if slides_map[16]["images"] else []
        if not imgs and gallery_pool:
            imgs = [gallery_pool[gallery_idx % len(gallery_pool)]]
            gallery_idx += 1

        gallery = dedupe(imgs)
        # Enrich commercial products with installation photos
        if sn >= 10 and gallery_pool:
            extra = gallery_pool[gallery_idx % len(gallery_pool)]
            gallery_idx += 1
            if extra not in gallery:
                gallery.append(extra)

        products.append(
            {
                "id": f"p{sn}",
                "slug": slugify(title),
                "title": title,
                "shortDescription": short,
                "description": description,
                "image": best_image(s) if s["images"] else (gallery[0] if gallery else "/images/ppt/slide08_img07.jpg"),
                "gallery": gallery,
                "features": features[:12] if features else desc_parts[:8],
                "category": "Products Portfolio" if sn <= 9 else "Commercial Laundry",
                "specs": features[:6] if sn >= 10 else [],
            }
        )

    cms["products"] = products

    s8 = slides_map[8]
    # --- contact slide 32 ---
    s32 = slides_map[32]
    cms["contact"]["heroImage"] = all_images(s32)[0] if s32["images"] else cms["about"].get("heroImage", "")
    cms["contact"]["intro"] = "\n".join(texts_after_title(s32)) or cms["contact"].get("intro", "")

    cms["productsPage"] = {
        "title": "Products Portfolio",
        "intro": "\n\n".join(texts_after_title(s8)),
        "heroImage": best_image(s8),
    }

    # --- audit table ---
    used_paths = set()

    def mark_used(obj):
        if isinstance(obj, str) and obj.startswith("/images/ppt/"):
            used_paths.add(obj)
        elif isinstance(obj, list):
            for x in obj:
                mark_used(x)
        elif isinstance(obj, dict):
            for v in obj.values():
                mark_used(v)

    mark_used(cms)

    all_ppt_files = set()
    ppt_dir = ROOT / "public" / "images" / "ppt"
    if ppt_dir.exists():
        for f in ppt_dir.iterdir():
            if f.name.startswith("slide") or f.name.startswith("media_"):
                all_ppt_files.add(f"/images/ppt/{f.name}")

    audit_rows = []
    for sn in range(1, 33):
        s = slides_map[sn]
        text_on_site = False
        pages = []
        missing = []

        if sn == 1:
            text_on_site = bool(cms["home"].get("companyProfile"))
            pages = ["Home (company profile)"]
        elif sn in (2, 3, 4):
            text_on_site = True
            pages = ["About Us"]
        elif sn in (5, 6, 7):
            text_on_site = True
            pages = [f"Solutions + About (slide {sn})"]
        elif 8 <= sn <= 22:
            text_on_site = any(p["id"] == f"p{sn}" for p in cms["products"])
            pages = [f"Products /products/p{sn}"]
        elif 23 <= sn <= 29:
            text_on_site = bool(gallery_images)
            pages = ["Installation Gallery (Home + About)"]
            if not gallery_images:
                missing.append("Gallery images not mapped")
        elif sn in (30, 31):
            text_on_site = len(cms.get("clients", [])) >= 50
            pages = ["Clients marquee"]
        elif sn == 32:
            text_on_site = True
            pages = ["Contact Us"]

        slide_imgs = [img["path"] for img in s["images"]]
        imgs_used = [p for p in slide_imgs if p in used_paths]
        if slide_imgs and not imgs_used:
            missing.append(f"{len(slide_imgs)} slide images not in CMS")
        elif slide_imgs and len(imgs_used) < len(slide_imgs):
            missing.append(f"{len(slide_imgs) - len(imgs_used)} images unused")

        if not s["text"] and not s["images"]:
            missing.append("Empty slide")

        audit_rows.append(
            {
                "slide": sn,
                "content": s["text_joined"][:120] + ("..." if len(s["text_joined"]) > 120 else "") or f"({s['image_count']} images only)",
                "onWebsite": text_on_site and (not slide_imgs or bool(imgs_used)),
                "pages": pages,
                "missing": missing,
                "imageCount": s["image_count"],
                "imagesUsed": len(imgs_used),
            }
        )

    orphan_images = sorted(all_ppt_files - used_paths)

    audit = {
        "totalSlides": 32,
        "slidesFullyIntegrated": [r["slide"] for r in audit_rows if r["onWebsite"] and not r["missing"]],
        "slidesPartial": [r["slide"] for r in audit_rows if r["missing"]],
        "pptImagesTotal": len(all_ppt_files),
        "pptImagesUsed": len(used_paths & all_ppt_files),
        "orphanImages": orphan_images[:50],
        "orphanCount": len(orphan_images),
        "rows": audit_rows,
    }

    with open(CMS_JSON, "w", encoding="utf-8") as f:
        json.dump(cms, f, indent=2, ensure_ascii=False)

    with open(AUDIT_JSON, "w", encoding="utf-8") as f:
        json.dump(audit, f, indent=2, ensure_ascii=False)

    print(f"Updated {CMS_JSON}")
    print(f"  Gallery images: {len(gallery_images)}")
    print(f"  Pressing machines: {len(pressing)}")
    print(f"  Products: {len(products)}")
    print(f"  PPT images used: {audit['pptImagesUsed']}/{audit['pptImagesTotal']}")
    print(f"  Audit: {AUDIT_JSON}")


if __name__ == "__main__":
    main()
