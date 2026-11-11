# Analytx4t AI Products — aiproducts.analytx4t.com

Marketing site + client portal for Analytx4t Lab, hosting each AI product as a sub-app.

```
AI-Products/
├── web/                 Marketing site + portal (Vite, React 19, React Router 7, Tailwind 4, Motion, Lenis)
├── apps/
│   └── financial-reporting/          Financial Reporting — Vite/React frontend + Express backend (moved in, envs included)
└── deploy/              nginx site, PM2 file, deploy script
```

| URL | Served by |
|---|---|
| `/`, `/services`, `/products`, `/about`, `/contact` | `web/` (marketing) |
| `/login`, `/signup`, `/dashboard`, `/dashboard/:product` | `web/` (portal) |
| `/app/financial-reporting/` | `apps/financial-reporting/dist` (static) |
| `/app/financial-reporting/api/*` | nginx → Financial Reporting backend on `127.0.0.1:8000/api/*` |

## Portal login (temporary)

`product@analytx4t.com` / `12345678`, checked in the browser (`web/src/lib/auth.js`).
**This is a UI gate, not security:** anyone can open `/app/financial-reporting/` directly, and the
password ships in the JS bundle. The product apps have no sign-in of their own.
Replace with a real auth service (and SSO into each product) before giving customers access.

## Run locally

```bash
# 1. Financial Reporting backend      (port 8000)
cd apps/financial-reporting/backend && npm install && node server.js
# 2. Financial Reporting frontend     (port 5174, base /app/financial-reporting/, proxies /app/financial-reporting/api → :8000)
cd apps/financial-reporting && npm install && npm run dev
# 3. Portal              (port 5173, proxies /app/financial-reporting → :5174)
cd web && npm install && npm run dev
```
Open http://localhost:5173 — the dashboard iframe uses the same `/app/financial-reporting/` URL as production.

## Deploy (Ubuntu droplet)

One-time setup:
```bash
# DNS: A record  aiproducts.analytx4t.com → droplet IP
sudo apt update && sudo apt install -y nginx rsync python3-venv   # python3-venv: PDF report renderers
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash - && sudo apt install -y nodejs
sudo npm i -g pm2
sudo mkdir -p /var/www/aiproducts && sudo chown $USER /var/www/aiproducts
# copy this project to /var/www/aiproducts/src  (git clone or rsync), then copy the
# secrets that .gitignore excludes:  apps/financial-reporting/.env*, apps/financial-reporting/backend/.env,
# apps/financial-reporting/backend/services/firebaseServiceAccount.json
sudo cp deploy/nginx/aiproducts.analytx4t.com.conf /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/aiproducts.analytx4t.com.conf /etc/nginx/sites-enabled/
sudo apt install -y certbot python3-certbot-nginx && sudo certbot --nginx -d aiproducts.analytx4t.com
pm2 startup   # run the command it prints
```
Every deploy: `bash deploy/deploy.sh` (builds both frontends, publishes to `/var/www/aiproducts/public`, reloads PM2 + nginx).

LLM: Financial Reporting's ledger classifier calls DeepSeek (`deepseek-v4-pro`, thinking off, JSON mode) via
`DEEPSEEK_API_KEY` / `DEEPSEEK_MODEL` / optional `DEEPSEEK_BASE_URL` in `apps/financial-reporting/backend/.env`
(`apps/financial-reporting/backend/services/classifierService.js`). The AI assistant and document RAG go through n8n webhooks — their model is configured inside n8n.

### Report emails (client format — keep identical across products)
All products email `MAIL_TO` via Hostinger SMTP (`SMTP_*`, `MAIL_FROM`, `MAIL_TO` in each backend's `.env`). Sender name: **AI Reporting System**. Every subject ends with `– Dated: DD-MM-YYYY` (send date, India time). Same body everywhere:

> Dear Sir/Mam, / Please find attached the requested **<report>** for your reference. / Regards, AI Products Team

| Product | Trigger | Subject | Attachments |
|---|---|---|---|
| Financial Reporting | trial balance uploaded (TB Summary, or BS/P&L page upload) | `Financial Reporting – Financial Report Generated – Dated: …` | Balance Sheet .xlsx + Profit & Loss .xlsx — nothing else |
| Bank Reconciliation | each new reconciliation | `AI Summary Report – Bank Reconciliation – Dated: …` | Final review report .pdf |
| Virtual CFO | all four statements uploaded | `AI Summary Report – Company Health CFO Intelligence – Dated: …` | Financial Health Summary .pdf |
| Invoice Automation | each new batch | `Extracted Invoice Report Generated – Dated: …` | Review report .pdf + register .xlsx |

- Financial Reporting: after upload the browser builds both statements (same builders as the Download buttons, `src/formats/infraStatements.js` / `src/utils/sohnaExportUtils.js`) and posts them to `POST /api/mail/financial-report`; one email per trial-balance file per 12 h (`backend/data/mail-log.json`). The AI-summary email is handled by the client.
- Bank Reconciliation: identical files + settings produce the same report id, so re-running does not resend.

## Bank Reconciliation (`apps/bank-reconciliation/`)
- **Input:** bank statement + books ledger (CSV or .xlsx), opening balance, date tolerance, books sign convention (auto-detected).
- **Engine** (`backend/lib/match.js`, deterministic): exact ref+amount → duplicate → ref with amount mismatch → amount+date → one-to-many / many-to-one groups → classify leftovers. A difference bridge proves the exceptions explain the closing difference (residual shown, never plugged).
- **Report:** `backend/report/render_brs.py` (ReportLab) reproduces the reference layout; ₹ is drawn with bundled DejaVu Sans. API `POST /api/reconcile`, `GET /api/reports/:id/pdf`.
- Dev: backend `:8002` (`node server.js`), frontend `:5176` (`npm run dev`), portal proxies `/app/bank-reconciliation`.


## Product websites (apps/*/frontend) — shared structure
Bank Reconciliation, Virtual CFO and Invoice Automation are complete sites built on `apps/_shared` (shell, design tokens, components; imported as `@shared` via a Vite alias with `resolve.dedupe`). Each has: **Overview · New run · History · Run detail (on-screen output + PDF/Excel/CSV downloads, email status + resend) · Help (formats, sample files, FAQ) · Settings**. Runs are stored under `backend/data/` with their inputs.

| App | Port (API / dev UI) | Notes |
|---|---|---|
| Virtual CFO | 8001 / 5175 | DeepSeek extracts statement lines; ratios, score and report text computed in `lib/metrics.js`; chat streams over SSE (`lib/chat.js`, nginx `proxy_buffering off`). PDF via `report/render_report.py` (ReportLab + matplotlib). |
| Bank Reconciliation | 8002 / 5176 | Deterministic matcher; PDF via `report/render_brs.py`. |
| Invoice Automation | 8003 / 5177 | Rule-based extraction with DeepSeek fallback; register matches `expected_invoice_ground_truth.csv` exactly; PDF via `report/render_inv.py`. |

## Adding another product

1. Build it in `apps/<slug>/` with Vite `base: "/app/<slug>/"`, a router `basename` from `import.meta.env.BASE_URL`, and API calls prefixed with the base (see `apps/financial-reporting/src/lib/apiPath.js`).
2. Give its backend a free port and add it to `deploy/ecosystem.config.cjs`.
3. Uncomment/copy the template `location` blocks in the nginx file; add the copy step to `deploy.sh`.
4. In `web/src/lib/products.js` set `status: "live"` and `appPath` — the sidebar and dashboard pick it up.

## Design system (web/)

- **Colour** — from the logo: navy ink `#0B1A33`, paper `#F3F5F1`, brand teal `#4FB3AC` (`#1D7A73` for text), lime `#B5D661` as a sparing signal colour. Tokens in `web/src/styles/index.css`.
- **Type** — Funnel Display (headlines), Instrument Sans (body), JetBrains Mono (labels/data), Newsreader italic (one accent word per headline). Self-hosted via Fontsource.
- **Motion** — Lenis inertial scroll (marketing pages only), word-mask headline reveals, blur-up reveals on scroll, scroll-linked text and process rail, View Transitions between routes, magnetic buttons, cursor spotlight borders. All honour `prefers-reduced-motion`.
- **Imagery** — no stock photos: the hero is a canvas "raw data → chart" field echoing the logo's node network; capability tiles and product previews are coded SVG/HTML that animate the actual mechanism.
- **Copy** — all from analytx4t.com; no invented stats, clients or testimonials. Product previews use real output from each product's sample run (labelled *sample data*; Financial Reporting shows ledger counts only).
