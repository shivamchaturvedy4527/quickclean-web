# ProLaundry Solutions — Commercial Laundry Website

A modern B2B commercial laundry machines and solutions website inspired by QuickClean.co.in structure. Built with **Next.js 16**, **TypeScript**, and **Tailwind CSS**.

## Features

- **Home** — Hero, animated stats, solutions grid, sustainability metrics, founder message, brand logos, testimonials, blog
- **Company** — About, Team, Sustainability, Investors, Careers
- **Solutions** — Build Own & Operate, Turnkey, Linen Rental, Equipment on Lease (with multi-currency pricing)
- **Contact** — Form with admin submission storage
- **Admin CMS** — Full content management at `/admin`
- **Geo + Currency** — Auto-detect visitor region; INR for India, USD/EUR/AED/GBP for international
- **Integrations** — WhatsApp floating button, Tawk.to/Crisp live chat (configurable in admin)

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
| Default Password | `ProLaundry@2026` |

Override with environment variable:

```bash
ADMIN_PASSWORD=your-secure-password
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `ADMIN_PASSWORD` | Admin login password (default: `ProLaundry@2026`) |
| `CONTACT_EMAIL_TO` | Optional email for contact form notifications |

## CMS Storage

- **Local development**: Reads/writes `data/cms.json`
- **Vercel production**: Writes to `/tmp` (persists per deployment instance; for permanent edits on Vercel, redeploy after local changes or use Hostinger)
- **Hostinger Node.js**: Full read/write to `data/cms.json` — recommended for client CMS editing

## Project Structure

```
data/cms.json          # All site content (editable via admin)
src/app/               # Pages and API routes
src/components/        # UI components
src/lib/               # CMS store, auth, currency utilities
src/types/cms.ts       # TypeScript types
```

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint
```

## Deployment

- **Vercel**: Connect GitHub repo, deploy automatically
- **Hostinger**: See [HOSTINGER_DEPLOY.md](./HOSTINGER_DEPLOY.md)

## License

Private — client project.
