# QuickClean — Commercial Laundry Website Clone

A **feature-complete clone** of [quickclean.co.in](https://quickclean.co.in) with a premium international B2B redesign. Built with **Next.js 16**, **TypeScript**, **Tailwind CSS 4**, and **Framer Motion**.

## Deployment

**Canonical production URL:** https://quickclean-clone.vercel.app  
**GitHub:** https://github.com/shivamchaturvedy4527/quickclean-web

This is the **only active QuickClean client project** on Vercel (`quickclean-clone`), linked to the `quickclean-web` repo.

## Feature Parity

| Area | Status |
|------|--------|
| Home (hero, stats, water comparison, solutions, founder, video, brands, sustainability, testimonials, blog, newsletter) | ✅ |
| Company (About, Team, Sustainability, Investors, Careers, Financial Planning) | ✅ |
| Solutions (4 detail pages + listing) | ✅ |
| ReWeave 360 circular economy programme | ✅ |
| Blog with categories + individual posts | ✅ |
| Contact form → admin | ✅ |
| Cookie consent banner | ✅ |
| Legal (Privacy, Terms, Code of Conduct) | ✅ |
| WhatsApp + live chat integrations | ✅ |
| Geo + multi-currency (INR/USD/EUR/AED/GBP) | ✅ |
| Full Admin CMS (ObjectEditor) | ✅ ~95% |

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Admin Access

| Field | Value |
|-------|-------|
| URL | `/admin` |
| Default Password | `QuickClean@2026` |

Override with environment variable:

```bash
ADMIN_PASSWORD=your-secure-password
```

## CMS Coverage

All content is driven by `data/cms.json` and editable via `/admin` dashboard tabs:

- Site Settings, Navigation, Home, Solutions, Brands
- About (incl. timeline), Team, Testimonials, Blog + Categories
- Sustainability, Investors, Careers (jobs CRUD), ReWeave 360
- Financial Planning, Contact, Footer, Legal, Cookie Consent
- WhatsApp/Chat integrations, Contact & Newsletter submissions

## Environment Variables

| Variable | Description |
|----------|-------------|
| `ADMIN_PASSWORD` | Admin login password (default: `QuickClean@2026`) |
| `CONTACT_EMAIL_TO` | Optional email for contact form notifications |
| `BLOB_READ_WRITE_TOKEN` | Auto-set when Vercel Blob store is linked to the project |

## CMS Storage

- **Local development**: Reads/writes `data/cms.json`
- **Vercel production**: Persists to **Vercel Blob** (`cms/cms.json`) when `BLOB_READ_WRITE_TOKEN` is set (linked via Vercel Blob store). Admin saves apply immediately on the live site.
- **Fallback (no blob token)**: Temporary `/tmp` only — changes do not survive redeploys.
- **Hostinger Node.js**: Full read/write — see [HOSTINGER_DEPLOY.md](./HOSTINGER_DEPLOY.md)

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint
```

## Differences from quickclean.co.in

- **Premium UI redesign** — Plus Jakarta Sans + Instrument Serif, Framer Motion section reveals, refined cards and hover states
- **Content** seeded from quickclean.co.in (images in `public/images/`)
- **Video embed** URL editable in admin Home tab
- **WordPress-specific plugins** (Elementor, etc.) not replicated — functionality equivalent in Next.js

## License

Private — client project.
