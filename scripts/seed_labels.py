import json
from pathlib import Path

LABELS = {
    "breadcrumbs": {
        "company": "Company",
        "contact": "Contact",
        "products": "Products",
        "solutions": "Solutions",
        "getInTouch": "Get in touch",
        "ourSolutions": "Our Solutions",
    },
    "home": {
        "readMore": "Read More",
        "viewProduct": "View Product",
        "fullCatalogue": "Full Products Catalogue",
        "machinesEyebrow": "Machines",
        "clientsEyebrow": "Clients",
        "heroImageAlt": "Commercial laundry equipment",
    },
    "solutions": {
        "learnMore": "Learn more",
        "benefitsHeading": "Key Benefits",
        "partnerTitle": "Partner With Us",
        "partnerText": "Every on-premise laundry is unique. Speak with our solutions team for a tailored proposal — equipment supply, consultancy, layout design and installation support across India.",
    },
    "contact": {
        "getInTouchTitle": "Get in Touch",
        "getInTouchSubtitle": "We're here to help with equipment, consultancy, and service.",
        "sendMessageTitle": "Send a Message",
        "sendMessageSubtitle": "Fill out the form and we'll respond promptly.",
        "serviceCentresTitle": "Service Centres",
        "formName": "Name *",
        "formEmail": "Email *",
        "formPhone": "Phone",
        "formPhonePlaceholder": "+91",
        "formCompany": "Company",
        "formMessage": "Message *",
        "formSubmit": "Send Message",
        "formSubmitting": "Sending...",
        "formSuccess": "Thank you. We will respond within one business day.",
        "formError": "Something went wrong. Please try again.",
    },
    "newsletter": {
        "namePlaceholder": "Your name",
        "emailPlaceholder": "Your email",
        "subscribe": "Subscribe",
        "subscribing": "Subscribing...",
        "successTitle": "Thank you for subscribing!",
        "successText": "You'll receive our latest updates soon.",
        "errorName": "Please enter your name.",
        "errorEmail": "Please enter a valid email address.",
        "errorGeneric": "Something went wrong. Please try again.",
    },
    "whatsapp": {
        "ariaLabel": "Chat on WhatsApp",
        "modalTitle": "Chat on WhatsApp",
        "modalSubtitle": "Enter your details to message us directly",
        "nameLabel": "Full Name *",
        "namePlaceholder": "Your full name",
        "phoneLabel": "Phone Number *",
        "phonePlaceholder": "+91 98765 43210",
        "phoneError": "Enter a valid Indian mobile number (+91, 10 digits).",
        "inquiryLabel": "Inquiry type",
        "inquiryOptional": "(optional)",
        "submit": "Start Chat on WhatsApp",
        "submitting": "Opening WhatsApp...",
        "inquiryOptions": [
            {"value": "", "label": "General inquiry"},
            {"value": "Laundry machines & equipment", "label": "Laundry machines & equipment"},
            {"value": "Dry cleaning solutions", "label": "Dry cleaning solutions"},
            {"value": "Consultancy & setup", "label": "Consultancy & setup"},
            {"value": "Service & maintenance", "label": "Service & maintenance"},
        ],
    },
    "meta": {
        "about": "About Us",
        "contact": "Contact",
        "products": "Products",
        "solutions": "Solutions",
        "news": "News & Media",
        "sustainability": "Sustainability",
        "financialPlanning": "Financial Planning",
        "reweave360": "ReWeave 360",
    },
}

path = Path(__file__).resolve().parents[1] / "data" / "cms.json"
cms = json.loads(path.read_text(encoding="utf-8"))
cms["labels"] = LABELS

contact = cms.setdefault("contact", {})
contact.setdefault("breadcrumb", LABELS["breadcrumbs"]["getInTouch"])
contact.setdefault("getInTouchTitle", LABELS["contact"]["getInTouchTitle"])
contact.setdefault("getInTouchSubtitle", LABELS["contact"]["getInTouchSubtitle"])
contact.setdefault("sendMessageTitle", LABELS["contact"]["sendMessageTitle"])
contact.setdefault("sendMessageSubtitle", LABELS["contact"]["sendMessageSubtitle"])
contact.setdefault("serviceCentresTitle", LABELS["contact"]["serviceCentresTitle"])

about = cms.setdefault("about", {})
about.setdefault("breadcrumb", LABELS["breadcrumbs"]["company"])

path.write_text(json.dumps(cms, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("labels seeded")
