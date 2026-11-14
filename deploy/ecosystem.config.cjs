// PM2 process file — one entry per product backend.
//   pm2 start deploy/ecosystem.config.cjs && pm2 save && pm2 startup
const path = require("path");
const root = path.resolve(__dirname, "..");

module.exports = {
  apps: [
    {
      name: "financial-reporting-api",
      cwd: path.join(root, "apps/financial-reporting/backend"), // server.js reads ./.env and writes ./uploads
      script: "server.js",
      env: { NODE_ENV: "production", PORT: 8000 },
      max_memory_restart: "700M",
      time: true,
    },
    {
      name: "bank-reconciliation-api",
      cwd: path.join(root, "apps/bank-reconciliation/backend"),
      script: "server.js",
      env: { NODE_ENV: "production", PORT: 8002, PYTHON_BIN: "report/.venv/bin/python" },
      max_memory_restart: "400M",
      time: true,
    },
    {
      name: "virtual-cfo-api",
      cwd: path.join(root, "apps/virtual-cfo/backend"),
      script: "server.js",
      env: { NODE_ENV: "production", PORT: 8001, PYTHON_BIN: "report/.venv/bin/python" },
      max_memory_restart: "500M",
      time: true,
    },
    {
      name: "invoice-automation-api",
      cwd: path.join(root, "apps/invoice-automation/backend"),
      script: "server.js",
      env: { NODE_ENV: "production", PORT: 8003, PYTHON_BIN: "report/.venv/bin/python" },
      max_memory_restart: "500M",
      time: true,
    },
    {
      // FastAPI (Python) — runs from its own virtualenv, created by deploy/deploy.sh
      name: "gst-reconciliation-api",
      cwd: path.join(root, "apps/gst-reconciliation/backend"), // reads ./.env, writes ./data
      script: ".venv/bin/python",
      args: "-m uvicorn app.main:app --host 127.0.0.1 --port 8004 --workers 1",
      interpreter: "none",
      env: { PYTHONUNBUFFERED: "1" },
      max_memory_restart: "700M",
      time: true,
    },
  ],
};
