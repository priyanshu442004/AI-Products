# Agarwal & Saxena — Workflow Automation (aiproducts.analytx4t.com)

Marketing site + client portal for **Agarwal & Saxena, Chartered Accountants**. After sign-in the portal is
called **Workflow Automation** and hosts each product as a sub-app.

```
AI-Products/
├── web/                         Marketing site + portal (Vite, React 19, React Router 7, Tailwind 4, Motion, Lenis)
├── apps/
│   ├── _shared/                 Shared UI (AppShell, theme, Chat), logo assets, server/chat.js (DeepSeek document chat)
│   ├── invoice-automation/      1 · Invoice Automation            (Node API :8003)
│   ├── bank-reconciliation/     2 · Bank Reconciliation           (Node API :8002)
│   ├── financial-reporting/     3 · Trial Balance                 (Node API :8000)
│   ├── virtual-cfo/             4 · Financial Statement Analysis  (Node API :8001)
│   └── gst-reconciliation/      5 · GST Reconciliation            (FastAPI :8004, from github.com/akshat-dwivedi-ad/gst-ai-agent)
└── deploy/                      nginx site, PM2 file, deploy script
```

Products 6–10 (TDS Return Preparation & Reconciliation, Vendor Ledger Reconciliation, Customer Ledger
Reconciliation, Payroll Processing & Statutory Compliance, Fixed Asset Register & Depreciation Computation)
are listed in `web/src/lib/products.js` with `status: "soon"` and show an animated "coming soon" page.

Product **slugs/URLs are stable ids** and were not renamed: Trial Balance is served at `/app/financial-reporting/`,
Financial Statement Analysis at `/app/virtual-cfo/`. Only display names changed.

| URL | Served by |
|---|---|
| `/`, `/services`, `/products` | `web/` (marketing; About and Contact pages were removed) |
| `/login`, `/signup`, `/dashboard`, `/dashboard/:product` | `web/` (portal) |
| `/app/<slug>/` | `apps/<slug>/…/dist` (static) |
| `/app/<slug>/api/*` | nginx → that product's backend `/api/*` |

## Chat with your documents (every product)
Each product has **Ask AI**: pick a processed job and chat with it. DeepSeek (`DEEPSEEK_API_KEY`, `DEEPSEEK_MODEL`)
answers from the job's processed output **and** the text of the uploaded source files, streamed over SSE.
- Invoice / Bank: `apps/_shared/server/chat.js` (routes `/api/runs/:id/chat`, `…/chat/reset`, `…/transcript`, `/api/chat/suggestions`)
  + context builders in each backend's `lib/chatContext.js`. UI: `apps/_shared/src/Chat.jsx` (`ChatPage`, `DocChat`).
- GST: same contract in Python (`app/services/chat.py`, routes in `app/main.py`), same shared UI.
- Financial Statement Analysis and Trial Balance keep their existing DeepSeek chats (Ask AI in the sidebar).

## GST Reconciliation (`apps/gst-reconciliation/`)
- Backend: FastAPI + LangGraph workflow (profile → map → normalize → validate → calculate → reports). The original
  OpenAI Responses/Batch calls were replaced by DeepSeek chat-completions (JSON mode, pydantic-validated); AI only
  maps layouts and explains exceptions — every figure is computed in `services/calculator.py`. The inward
  reconciliation also returns line-level books-only / 2B-only / mismatch invoices.
- `backend/.env`: `DEEPSEEK_API_KEY`, `DEEPSEEK_MODEL`, `AI_ENABLED` (gitignored — copy to the server by hand). Data in `backend/data/` (SQLite + files).
- Frontend rebuilt on `apps/_shared` (same look as the other apps). Sample package: `frontend/public/samples`
  (regenerate with `backend/tests/make_samples.py`). Tests: `cd backend && .venv/Scripts/python -m pytest tests`.
- Dev: `cd apps/gst-reconciliation/backend && python -m venv .venv && .venv/Scripts/pip install -r requirements.txt && .venv/Scripts/python -m uvicorn app.main:app --port 8004`; UI `:5178`.

## Portal login (temporary)

`product@analytx4t.com` / `12345678`, checked in the browser (`web/src/lib/auth.js`).
**This is a UI gate, not security:** anyone can open `/app/financial-reporting/` directly, and the
password ships in the JS bundle. The product apps have no sign-in of their own.
Replace with a real auth service (and SSO into each product) before giving customers access.

## Run locally

```bash
# 1. Trial Balance backend      (port 8000)
cd apps/financial-reporting/backend && npm install && node server.js
# 2. Trial Balance frontend     (port 5174, base /app/financial-reporting/, proxies /app/financial-reporting/api → :8000)
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
Every deploy: `bash deploy/deploy.sh` (builds every frontend, creates the Python venvs, publishes to `/var/www/aiproducts/public`, reloads PM2 + nginx).

LLM: Trial Balance's ledger classifier calls DeepSeek (`deepseek-v4-pro`, thinking off, JSON mode) via
`DEEPSEEK_API_KEY` / `DEEPSEEK_MODEL` / optional `DEEPSEEK_BASE_URL` in `apps/financial-reporting/backend/.env`
(`apps/financial-reporting/backend/services/classifierService.js`). The AI assistant and document RAG go through n8n webhooks — their model is configured inside n8n.

### Report emails (client format — keep identical across products)
All products email `MAIL_TO` via Hostinger SMTP (`SMTP_*`, `MAIL_FROM`, `MAIL_TO` in each backend's `.env`). Sender name: **AI Reporting System**. Every subject ends with `– Dated: DD-MM-YYYY` (send date, India time). Same body everywhere:

> Dear Sir/Mam, / Please find attached the requested **<report>** for your reference. / Regards, AI Products Team

| Product | Trigger | Subject | Attachments |
|---|---|---|---|
| Trial Balance | trial balance uploaded (TB Summary, or BS/P&L page upload) | `Trial Balance – Financial Report Generated – Dated: …` | Balance Sheet .xlsx + Profit & Loss .xlsx — nothing else |
| Bank Reconciliation | each new reconciliation | `AI Summary Report – Bank Reconciliation – Dated: …` | Final review report .pdf |
| Financial Statement Analysis | all four statements uploaded | `AI Summary Report – Company Health CFO Intelligence – Dated: …` | Financial Health Summary .pdf |
| Invoice Automation | each new batch | `Extracted Invoice Report Generated – Dated: …` | Review report .pdf + register .xlsx |

- Trial Balance: after upload the browser builds both statements (same builders as the Download buttons, `src/formats/infraStatements.js` / `src/utils/sohnaExportUtils.js`) and posts them to `POST /api/mail/financial-report`; one email per trial-balance file per 12 h (`backend/data/mail-log.json`). The AI-summary email is handled by the client.
- Bank Reconciliation: identical files + settings produce the same report id, so re-running does not resend.

## Bank Reconciliation (`apps/bank-reconciliation/`)
- **Input:** bank statement + books ledger (CSV or .xlsx), opening balance, date tolerance, books sign convention (auto-detected).
- **Engine** (`backend/lib/match.js`, deterministic): exact ref+amount → duplicate → ref with amount mismatch → amount+date → one-to-many / many-to-one groups → classify leftovers. A difference bridge proves the exceptions explain the closing difference (residual shown, never plugged).
- **Report:** `backend/report/render_brs.py` (ReportLab) reproduces the reference layout; ₹ is drawn with bundled DejaVu Sans. API `POST /api/reconcile`, `GET /api/reports/:id/pdf`.
- Dev: backend `:8002` (`node server.js`), frontend `:5176` (`npm run dev`), portal proxies `/app/bank-reconciliation`.


## Product websites (apps/*/frontend) — shared structure
Invoice Automation, Bank Reconciliation, Financial Statement Analysis and GST Reconciliation are complete sites built on `apps/_shared` (shell, design tokens, components; imported as `@shared` via a Vite alias with `resolve.dedupe`). Each has: **Overview · New run · History · Run detail (on-screen output + PDF/Excel/CSV downloads, email status + resend) · Help (formats, sample files, FAQ) · Settings**. Runs are stored under `backend/data/` with their inputs.

| App | Port (API / dev UI) | Notes |
|---|---|---|
| Financial Statement Analysis | 8001 / 5175 | DeepSeek extracts statement lines; ratios, score and report text computed in `lib/metrics.js`; chat streams over SSE (`lib/chat.js`, nginx `proxy_buffering off`). PDF via `report/render_report.py` (ReportLab + matplotlib). |
| Bank Reconciliation | 8002 / 5176 | Deterministic matcher; PDF via `report/render_brs.py`. |
| Invoice Automation | 8003 / 5177 | Rule-based extraction with DeepSeek fallback; register matches `expected_invoice_ground_truth.csv` exactly; PDF via `report/render_inv.py`. |
| GST Reconciliation | 8004 / 5178 | FastAPI + LangGraph; DeepSeek maps layouts and explains exceptions; Python calculates GSTR-9 / 9C; PDFs via ReportLab. |

## Adding another product

1. Build it in `apps/<slug>/` with Vite `base: "/app/<slug>/"`, a router `basename` from `import.meta.env.BASE_URL`, and API calls prefixed with the base (see `apps/financial-reporting/src/lib/apiPath.js`).
2. Give its backend a free port and add it to `deploy/ecosystem.config.cjs`.
3. Uncomment/copy the template `location` blocks in the nginx file; add the copy step to `deploy.sh`.
4. In `web/src/lib/products.js` set `status: "live"` and `appPath` — the sidebar and dashboard pick it up.

## Design system (web/ and every app)

- **Brand** — Agarwal & Saxena logo as vector SVG (`web/public/agarwal-saxena-logo*.svg`, `apps/_shared/src/assets/`), A&S favicon. Trial Balance was re-themed onto the shared tokens: its `index.css` imports `apps/_shared/src/theme.css` and remaps Tailwind's blue/indigo/purple/gray palettes to the brand scale.

- **Colour** — from the logo: navy ink `#0B1A33`, paper `#F3F5F1`, brand teal `#4FB3AC` (`#1D7A73` for text), lime `#B5D661` as a sparing signal colour. Tokens in `web/src/styles/index.css`.
- **Type** — Funnel Display (headlines), Instrument Sans (body), JetBrains Mono (labels/data), Newsreader italic (one accent word per headline). Self-hosted via Fontsource.
- **Motion** — Lenis inertial scroll (marketing pages only), word-mask headline reveals, blur-up reveals on scroll, scroll-linked text and process rail, View Transitions between routes, magnetic buttons, cursor spotlight borders. All honour `prefers-reduced-motion`.
- **Imagery** — no stock photos: the hero is a canvas "raw data → chart" field echoing the logo's node network; capability tiles and product previews are coded SVG/HTML that animate the actual mechanism.
- **Copy** — no invented stats, clients or testimonials. Product previews use real output from each product's sample run (labelled *sample data*; Trial Balance shows ledger counts only).
