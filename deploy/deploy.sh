#!/usr/bin/env bash
# Build every frontend, publish static files to $PUBLIC, (re)start backends.
# Run on the droplet from the project root:  bash deploy/deploy.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PUBLIC="${PUBLIC:-/var/www/aiproducts/public}"

echo "→ Portal (web/)"
cd "$ROOT/web"
npm ci --no-audit --no-fund
npm run build

echo "→ Financial Reporting frontend (apps/financial-reporting/)"
cd "$ROOT/apps/financial-reporting"
npm ci --no-audit --no-fund
npm run build

mkdir -p "$ROOT/apps/financial-reporting/backend/uploads" "$ROOT/apps/financial-reporting/backend/data"
echo "→ Financial Reporting backend deps"
cd "$ROOT/apps/financial-reporting/backend"
npm ci --omit=dev --no-audit --no-fund

echo "→ Bank Reconciliation (apps/bank-reconciliation/)"
cd "$ROOT/apps/bank-reconciliation/frontend"
npm ci --no-audit --no-fund
npm run build
cd "$ROOT/apps/bank-reconciliation/backend"
npm ci --omit=dev --no-audit --no-fund
# PDF renderer (ReportLab) in a local virtualenv
[ -x report/.venv/bin/python ] || python3 -m venv report/.venv
report/.venv/bin/pip install -q -r report/requirements.txt

echo "→ Virtual CFO (apps/virtual-cfo/)"
cd "$ROOT/apps/virtual-cfo/frontend"
npm ci --no-audit --no-fund
npm run build
cd "$ROOT/apps/virtual-cfo/backend"
npm ci --omit=dev --no-audit --no-fund
[ -x report/.venv/bin/python ] || python3 -m venv report/.venv
report/.venv/bin/pip install -q -r report/requirements.txt

echo "→ Invoice Automation (apps/invoice-automation/)"
cd "$ROOT/apps/invoice-automation/frontend"
npm ci --no-audit --no-fund
npm run build
cd "$ROOT/apps/invoice-automation/backend"
npm ci --omit=dev --no-audit --no-fund
[ -x report/.venv/bin/python ] || python3 -m venv report/.venv
report/.venv/bin/pip install -q -r report/requirements.txt

echo "→ GST Reconciliation (apps/gst-reconciliation/)"
cd "$ROOT/apps/gst-reconciliation/frontend"
npm ci --no-audit --no-fund
npm run build
cd "$ROOT/apps/gst-reconciliation/backend"
mkdir -p data
[ -x .venv/bin/python ] || python3 -m venv .venv
.venv/bin/pip install -q -r requirements.txt

echo "→ Publishing static files to $PUBLIC"
STAGE="$(mktemp -d)"
chmod 755 "$STAGE"   # mktemp creates 0700; nginx (www-data) must be able to read the published tree
cp -r "$ROOT/web/dist/." "$STAGE/"
mkdir -p "$STAGE/app/financial-reporting"
cp -r "$ROOT/apps/financial-reporting/dist/." "$STAGE/app/financial-reporting/"
mkdir -p "$STAGE/app/bank-reconciliation"
cp -r "$ROOT/apps/bank-reconciliation/frontend/dist/." "$STAGE/app/bank-reconciliation/"
for app in virtual-cfo invoice-automation gst-reconciliation; do
  mkdir -p "$STAGE/app/$app" && cp -r "$ROOT/apps/$app/frontend/dist/." "$STAGE/app/$app/"
done
sudo mkdir -p "$PUBLIC"
sudo rsync -a --delete --chmod=D755,F644 "$STAGE/" "$PUBLIC/"
rm -rf "$STAGE"

echo "→ Backends"
cd "$ROOT"
pm2 startOrReload deploy/ecosystem.config.cjs --update-env
pm2 save

echo "→ nginx"
sudo nginx -t && sudo systemctl reload nginx
echo "✓ Deployed — https://aiproducts.analytx4t.com"
