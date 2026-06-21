import json
import re
from pathlib import Path

path = Path(__file__).resolve().parents[1] / "data" / "cms.json"
text = path.read_text(encoding="utf-8")

for old, new in [
    ("Transferon series CBW systems", "Commercial CBW systems"),
    ("Transferon series CBW System", "Commercial CBW System"),
    ("Transferon CBW systems", "Commercial CBW systems"),
    (" – Transferon", ""),
    (" - Transferon", ""),
    ("Transferon", ""),
]:
    text = text.replace(old, new)

text = re.sub(r"  +", " ", text)
cms = json.loads(text)


def fix_strings(obj):
    if isinstance(obj, str):
        s = obj
        s = s.replace("Quick Clean Laundry Solutions", "Laundrex")
        s = s.replace("Quick Clean Laundry Systems", "Laundrex")
        s = s.replace("Quick Clean", "Laundrex")
        s = s.replace("QuickClean", "Laundrex")
        return s
    if isinstance(obj, list):
        return [fix_strings(x) for x in obj]
    if isinstance(obj, dict):
        return {k: fix_strings(v) for k, v in obj.items()}
    return obj


cms = fix_strings(cms)

wc = cms["home"]["waterComparison"]
wc["laundrexLabel"] = wc.pop("qcLabel", "Low production cost — best value for money")
wc["laundrexDisplayValue"] = wc.pop("qcDisplayValue", 0)
wc["laundrexValue"] = wc.pop("qcValue", 0)
wc["laundrexUnit"] = wc.pop("qcUnit", "")

cms["home"]["productsSubtitle"] = (
    "Commercial CBW systems and laundry machines — proven quality, pan India."
)
cms["installationGallery"]["subtitle"] = (
    "Pan India installations of CBW systems, washer extractors, ironers and complete laundry lines."
)

blog_images = {
    "blog1": "/images/ppt/slide10_img01.png",
    "blog2": "/images/ppt/slide17_img00.jpg",
    "blog3": "/images/ppt/slide13_img05.png",
    "blog4": "/images/ppt/slide11_img00.jpg",
}
for post in cms["blog"]:
    if post["id"] in blog_images:
        post["image"] = blog_images[post["id"]]

cms["sustainability"]["intro"] = (
    "At Laundrex, sustainability is built into how we specify and supply commercial laundry "
    "equipment — prioritising lower energy and water consumption, durable machines, and efficient "
    "plant design for hotels, hospitals and industrial laundries across India."
)
cms["sustainability"]["heroImage"] = "/images/ppt/slide08_img07.jpg"
cms["sustainability"]["metrics"] = [
    {"value": 10, "suffix": "+", "label": "Years of industry experience"},
    {"value": 12, "suffix": "+", "label": "Product categories"},
    {"value": 51, "suffix": "+", "label": "Prestigious clients"},
    {"value": 12, "suffix": "+", "label": "Pan-India service centres"},
]

cms["team"]["heroImage"] = "/images/ppt/slide08_img07.jpg"
cms["reweave360"]["programDescription"] = (
    "ReWeave 360 is India's first circular linen economy programme supported by Laundrex."
)

path.write_text(json.dumps(cms, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("cms.json updated")
