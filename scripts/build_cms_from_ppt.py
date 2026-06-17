#!/usr/bin/env python3
"""Build cms.json from PPT extraction data."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PPT_JSON = ROOT / "data" / "ppt-extraction.json"
CMS_JSON = ROOT / "data" / "cms.json"


def slide(n):
    return data["slides"][n - 1]


def texts_after_title(s):
    t = s["text"]
    return t[1:] if len(t) > 1 else []


def bullets(s):
    t = s["text"]
    if len(t) <= 1:
        return []
    items = []
    for line in t[1:]:
        if line in ("Quality", "Comprehensive Service:", "Maintenance:"):
            continue
        items.append(line)
    return items


def first_image(s, fallback=""):
    if s["images"]:
        return s["images"][0]["path"]
    return fallback


def all_images(s):
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


with open(PPT_JSON, encoding="utf-8") as f:
    data = json.load(f)

with open(CMS_JSON, encoding="utf-8") as f:
    cms = json.load(f)

s1, s2, s3, s4 = slide(1), slide(2), slide(3), slide(4)
s5, s6, s7 = slide(5), slide(6), slide(7)
s8, s9 = slide(8), slide(9)
s30, s31, s32 = slide(30), slide(31), slide(32)

clients = parse_clients(s30, s31)

# --- settings ---
cms["settings"]["siteName"] = "Pcts Infrastructures"
cms["settings"]["companyLegalName"] = "Pcts infrastructures Pvt Ltd"
cms["settings"]["tagline"] = "Laundry & Dry Cleaning Room Solutions"
cms["settings"]["logo"] = "/images/ppt/slide08_img01.png"
cms["settings"]["whatsappNumber"] = "919821354872"
cms["settings"]["whatsappMessage"] = (
    "Hello, I would like to know more about Pcts Infrastructures laundry equipment and consultancy."
)
cms["settings"]["contactEmail"] = "kjandrew67@gmail.com"
cms["settings"]["contactPhone"] = "+91 98213 54872 / +91 86899 11455"
cms["settings"]["addressLine1"] = "C-909, Kailas Business Park, Vikroli West"
cms["settings"]["addressLine2"] = ""
cms["settings"]["city"] = "Mumbai, Maharashtra 400079"
cms["settings"]["businessHours"] = "Mon - Sat: 9:00 - 19:00"
cms["settings"]["linkedin"] = ""
cms["settings"]["twitter"] = ""
cms["settings"]["facebook"] = ""

# --- navigation ---
cms["navigation"] = [
    {"label": "Home", "href": "/"},
    {
        "label": "Company",
        "href": "/about-us",
        "children": [
            {"label": "About Us", "href": "/about-us"},
            {"label": "Sustainability", "href": "/sustainability"},
        ],
    },
    {
        "label": "Solutions",
        "href": "/solutions",
        "children": [
            {"label": "Basic Analysis & Planning", "href": "/solutions/basic-analysis-planning"},
            {"label": "Process Improvement", "href": "/solutions/process-improvement"},
            {"label": "Laundry Consultancy", "href": "/solutions/laundry-consultancy"},
        ],
    },
    {"label": "Products", "href": "/products"},
    {"label": "Contact Us", "href": "/contact-us"},
]

# --- home ---
cms["home"]["heroTitle"] = "Your Trusted Partner"
cms["home"]["heroTitleLine2"] = "In Laundry & Dry Cleaning Solutions"
cms["home"]["heroSubtitle"] = (
    "Thoughtfully designed, innovative and sustainable laundry & dry-cleaning equipment "
    "and consultancy — pan India."
)
cms["home"]["heroCtaText"] = "Our Products"
cms["home"]["heroCtaLink"] = "/products"
cms["home"]["heroSecondaryCtaText"] = "Contact Us"
cms["home"]["heroSecondaryCtaLink"] = "/contact-us"
cms["home"]["heroImage"] = first_image(s8, "/images/ppt/slide08_img01.png")
cms["home"]["stats"] = [
    {"value": 10, "suffix": "+", "label": "Years of Industry Experience"},
    {"value": 12, "suffix": "+", "label": "Product Categories"},
    {"value": len(clients), "suffix": "+", "label": "Prestigious Clients"},
]
cms["home"]["linenWashedLabel"] = "Pan India Presence"
cms["home"]["linenWashedValue"] = 12
cms["home"]["linenWashedSuffix"] = "+"
cms["home"]["linenWashedUnit"] = "cities with service centres"
cms["home"]["waterComparison"] = {
    "title": "Energy Efficiency",
    "industryLabel": "Low energy consumption machines",
    "industryDisplayValue": 0,
    "industryValue": 0,
    "industryUnit": "",
    "qcLabel": "Low production cost — best value for money",
    "qcDisplayValue": 0,
    "qcValue": 0,
    "qcUnit": "",
    "monthlySavedLabel": "Wide Installations",
    "monthlySaved": 0,
    "yearlySavedLabel": "Proven Quality",
    "yearlySaved": 0,
}
cms["home"]["solutionsTitle"] = "Our Expert Solutions"
cms["home"]["solutionsSubtitle"] = (
    "From feasibility analysis and facility planning to process improvement and full laundry consultancy."
)
cms["home"]["sustainabilityTitle"] = ""
cms["home"]["sustainabilityStats"] = []
cms["home"]["sustainabilityImpactTitle"] = ""
cms["home"]["founderTitle"] = ""
cms["home"]["founderMessage"] = ""
cms["home"]["founderName"] = ""
cms["home"]["founderRole"] = ""
cms["home"]["founderImage"] = ""
cms["home"]["sinceYear"] = ""
cms["home"]["videoTitle"] = ""
cms["home"]["videoUrl"] = ""
cms["home"]["videoThumbnail"] = ""
cms["home"]["brandsTitle"] = "Few of our <strong>Prestigious Clients</strong>"
cms["home"]["clientsTitle"] = "Trusted Across India"
cms["home"]["productsTitle"] = "Products Portfolio"
cms["home"]["productsSubtitle"] = (
    "Transferon series CBW systems and commercial laundry machines — proven quality, pan India."
)

# --- solutions (slides 5-7) ---
cms["solutions"] = [
    {
        "id": "analysis",
        "slug": "basic-analysis-planning",
        "title": "Basic Analysis & Facility Planning",
        "shortDescription": "Market research, load analysis, budget and facility planning for laundry projects.",
        "description": "Our expert solutions cover end-to-end basic analysis and facility planning for laundry and dry-cleaning operations.",
        "image": "/images/ppt/slide08_img01.png",
        "features": bullets(s5),
        "ctaText": "Contact Us",
        "ctaLink": "/contact-us",
        "priceFromINR": 0,
        "priceFromUSD": 0,
        "priceFromEUR": 0,
        "priceFromAED": 0,
    },
    {
        "id": "process",
        "slug": "process-improvement",
        "title": "Process Improvement & Project Management",
        "shortDescription": "Operational development, quality control, energy review and continuous improvement.",
        "description": "We help streamline operational processes, improve productivity and quality, and manage laundry projects from installation through post-installation review.",
        "image": "/images/ppt/slide10_img01.png",
        "features": bullets(s6),
        "ctaText": "Contact Us",
        "ctaLink": "/contact-us",
        "priceFromINR": 0,
        "priceFromUSD": 0,
        "priceFromEUR": 0,
        "priceFromAED": 0,
    },
    {
        "id": "consultancy",
        "slug": "laundry-consultancy",
        "title": "Laundry Consultancy Services",
        "shortDescription": "Full consultancy from feasibility study through equipment supply, layout design and training.",
        "description": "Pcts Infrastructures provides comprehensive laundry consultancy — from market feasibility and load assessment to equipment planning, HVAC analysis, training and post-installation evaluation.",
        "image": "/images/ppt/slide11_img00.jpg",
        "features": bullets(s7),
        "ctaText": "Contact Us",
        "ctaLink": "/contact-us",
        "priceFromINR": 0,
        "priceFromUSD": 0,
        "priceFromEUR": 0,
        "priceFromAED": 0,
    },
]

# --- products (slides 8-22) ---
product_slides = list(range(8, 23))
products = []
for sn in product_slides:
    s = slide(sn)
    title = s["text"][0] if s["text"] else f"Product {sn}"
    desc_parts = s["text"][1:]
    short = desc_parts[0] if desc_parts else title
    description = "\n\n".join(desc_parts)
    features = [p for p in desc_parts if len(p) < 120 and ("." not in p or len(p) < 80)]
    if not features and desc_parts:
        features = desc_parts
    slug = slugify(title)
    products.append(
        {
            "id": f"p{sn}",
            "slug": slug,
            "title": title,
            "shortDescription": short[:200],
            "description": description,
            "image": first_image(s, "/images/ppt/slide08_img01.png"),
            "gallery": all_images(s),
            "features": features[:8],
            "category": "Products Portfolio" if sn <= 9 else "Commercial Laundry",
        }
    )

cms["products"] = products
cms["productsPage"] = {
    "title": "Products Portfolio",
    "intro": "\n\n".join(s8["text"][1:]),
    "heroImage": first_image(s8),
}

# --- clients / brands ---
cms["clients"] = [{"id": f"c{i+1}", "name": name} for i, name in enumerate(clients)]
cms["brands"] = [
    {"id": f"c{i+1}", "name": name, "image": ""} for i, name in enumerate(clients)
]
cms["testimonials"] = []

# --- about ---
cms["about"]["title"] = "About Us"
cms["about"]["intro"] = "\n\n".join(s2["text"][1:])
cms["about"]["mission"] = "\n\n".join(s3["text"][1:])
cms["about"]["vision"] = "\n\n".join(s4["text"][1:])
cms["about"]["missionTitle"] = "What We Do"
cms["about"]["visionTitle"] = "Why Choose Us"
cms["about"]["journeyTitle"] = ""
cms["about"]["timeline"] = []
cms["about"]["heroImage"] = first_image(s8, "/images/ppt/slide08_img01.png")
cms["about"]["expertSolutions"] = {
    "title": "Our Expert Solutions",
    "sections": [
        {"title": s5["text"][0], "items": bullets(s5)},
        {"title": s6["text"][1] if len(s6["text"]) > 1 else "Process Improvement", "items": bullets(s6)},
        {"title": s7["text"][0], "items": bullets(s7)},
    ],
}

# --- team ---
cms["team"]["members"] = []
cms["team"]["intro"] = ""

# --- contact ---
service_centres = "Bangalore, Coimbatore, Chennai, Hyderabad, Hubli, Jaipur, Mumbai, New Delhi, Pune, Tirupati, Vijayawada, Visakhapatnam"
cms["contact"]["title"] = "Contact Us"
cms["contact"]["intro"] = (
    f"Pcts infrastructures Pvt Ltd — C-909, Kailas Business Park, Vikroli West, Mumbai 400079. "
    f"Mobile: +91 98213 54872 / +91 86899 11455. Email: kjandrew67@gmail.com. "
    f"Service Centres: {service_centres}."
)
cms["contact"]["serviceCentres"] = service_centres.split(", ")

# --- footer ---
cms["footer"]["aboutText"] = (
    "Pcts infrastructures Pvt Ltd — reliable partner in laundry & dry cleaning room solutions, "
    "supplying world-class equipment and consultancy across India."
)
cms["footer"]["copyright"] = "© Pcts infrastructures Pvt Ltd"
cms["footer"]["solutionsTitle"] = "Solutions & Products"

# --- legal ---
for key in ("privacy", "terms", "codeOfConduct"):
    cms["legal"][key]["sections"][0]["body"] = (
        f"Pcts infrastructures Pvt Ltd — {cms['legal'][key]['title']}."
    )

# Remove careers content (keep removed per user)
cms["careers"] = {
    "title": "",
    "intro": "",
    "benefitsTitle": "",
    "benefits": [],
    "openingsTitle": "",
    "openings": [],
}

with open(CMS_JSON, "w", encoding="utf-8") as f:
    json.dump(cms, f, indent=2, ensure_ascii=False)

print(f"Updated {CMS_JSON}")
print(f"  Solutions: {len(cms['solutions'])}")
print(f"  Products: {len(cms['products'])}")
print(f"  Clients: {len(cms['clients'])}")
