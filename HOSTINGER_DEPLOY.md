# Hostinger Premium Deployment Guide

Step-by-step instructions for deploying Quick Clean Laundry Systems on **Hostinger Premium** hosting.

---

## Option A: Static Export (Simplest — No Admin CMS on Server)

Best if the client only needs the public website and will edit content locally before re-uploading.

### 1. Build static site locally

Add to `next.config.ts`:

```ts
const nextConfig = {
  output: "export",
};
```

Then run:

```bash
npm run build
```

This creates an `out/` folder with static HTML/CSS/JS.

### 2. Upload to Hostinger

1. Log in to [Hostinger hPanel](https://hpanel.hostinger.com)
2. Go to **Files → File Manager**
3. Open `public_html` (or your domain folder)
4. Delete default `index.html` if present
5. Upload **all contents** of the `out/` folder into `public_html`
6. Visit your domain — site should load

### 3. Contact form (static limitation)

Static export cannot run API routes. Options:
- Use a third-party form service (Formspree, Getform)
- Or use **Option B** below for full CMS

---

## Option B: Node.js Hosting (Full CMS + Contact Form)

Hostinger Premium supports Node.js on Business/Premium plans.

### 1. Prepare the project

```bash
npm install
npm run build
```

### 2. Upload files via FTP/SFTP

Use FileZilla or Hostinger File Manager. Upload the entire project **except**:
- `node_modules/` (install on server)
- `.next/` (rebuild on server)
- `.git/`

Upload to a folder like `/home/username/quickclean-web/`

### 3. Enable Node.js in hPanel

1. hPanel → **Websites → Manage**
2. **Advanced → Node.js**
3. Create application:
   - **Node version**: 20.x
   - **Application root**: `/quickclean-web`
   - **Application URL**: your domain
   - **Application startup file**: `node_modules/next/dist/bin/next`
   - **Arguments**: `start -p 3000`

### 4. Install dependencies on server

SSH into Hostinger (hPanel → SSH Access):

```bash
cd ~/quickclean-web
npm install --production
npm run build
```

### 5. Set environment variables

In hPanel Node.js settings, add:

```
ADMIN_PASSWORD=your-secure-password
NODE_ENV=production
```

### 6. Ensure `data/` folder is writable

```bash
chmod 755 data
chmod 644 data/cms.json
```

The admin CMS writes to `data/cms.json` — this is where all client edits are saved.

### 7. Restart Node.js app

In hPanel → Node.js → click **Restart**

Visit `https://yourdomain.com` and `https://yourdomain.com/admin`

---

## Option C: PHP Proxy (Alternative)

If Node.js is unavailable, deploy static `out/` files and add a simple PHP contact handler:

1. Create `public_html/api/contact.php`:

```php
<?php
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);
$to = 'info@yourdomain.com';
$subject = 'Contact from ' . ($data['name'] ?? 'Website');
$body = "Name: {$data['name']}\nEmail: {$data['email']}\nPhone: {$data['phone']}\nMessage: {$data['message']}";
mail($to, $subject, $body);
echo json_encode(['success' => true]);
```

2. Point contact form to `/api/contact.php` instead of `/api/contact`

---

## SSL Certificate

1. hPanel → **SSL**
2. Enable **Free SSL** (Let's Encrypt)
3. Force HTTPS in hPanel → **Redirects**

---

## Domain Setup

1. hPanel → **Domains**
2. Point domain nameservers to Hostinger (if not already)
3. Add domain to hosting plan
4. Wait for DNS propagation (up to 24 hours)

---

## WhatsApp & Live Chat

Configure in Admin CMS (`/admin` → WhatsApp & Chat):

- **WhatsApp**: Enter number as `919876543210` (country code, no +)
- **Tawk.to**: Sign up at [tawk.to](https://tawk.to), copy embed script, paste in admin
- **Crisp**: Sign up at [crisp.chat](https://crisp.chat), copy embed script, paste in admin

---

## Updating Content

### With Node.js (Option B)
1. Log in to `/admin`
2. Edit content → Save Changes
3. Changes persist in `data/cms.json`

### With Static (Option A)
1. Edit `data/cms.json` locally OR use admin locally (`npm run dev`)
2. Rebuild: `npm run build`
3. Re-upload `out/` folder to Hostinger

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| 404 on sub-pages | Ensure `.htaccess` has rewrite rules (Hostinger usually adds this) |
| Admin login fails | Check `ADMIN_PASSWORD` env var |
| CMS save fails | Check `data/` folder permissions (`chmod 755`) |
| Contact form error | Verify Node.js app is running (Option B) |
| Images missing | Upload images to `public/images/` |

---

## Support Contacts

- Hostinger support: hPanel live chat
- Project repo: GitHub `quickclean-web`
