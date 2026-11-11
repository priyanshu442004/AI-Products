// Eldeco AI Financial Assistant — DeepSeek grounded in the CURRENT trial
// balance's generated statements (the same workbook as "Download All
// Statements"), the trial balance aggregated by head, and the Cash Flow / SOCE
// statements. Context is rebuilt whenever a different trial balance is uploaded.
import fs from "fs";
import path from "path";
import axios from "axios";
import XLSX from "xlsx";
import { fileURLToPath } from "url";
import { downloadFinancialStatements } from "../controllers/downloadFinancialStatements.js";
import { currentTrialBalanceHash } from "./mailService.js";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const FORMATS = path.resolve(HERE, "../../src/formats");
let cache = { key: null, text: null };

/** Run the existing statements generator and capture its workbook buffer. */
function generateWorkbook() {
  return new Promise((resolve, reject) => {
    const res = {
      setHeader() { return this; }, status() { return this; },
      send: (buf) => resolve(Buffer.isBuffer(buf) ? buf : Buffer.from(buf)),
      json: (body) => reject(new Error(body?.message || "Could not generate statements")),
      end: () => reject(new Error("Statements generator returned no data")),
    };
    Promise.resolve(downloadFinancialStatements({ query: {}, body: {} }, res)).catch(reject);
  });
}

const compactCsv = (ws) => XLSX.utils.sheet_to_csv(ws, { blankrows: false })
  .split("\n").map((l) => l.replace(/,+$/, "")).filter((l) => l.replace(/[,"]/g, "").trim()).join("\n");

/** Trial balance (≈2,000 ledgers) summarised by Balance Sheet head → group head. */
function tbSummary(ws) {
  const rows = XLSX.utils.sheet_to_json(ws, { header: 1, blankrows: false });
  const h = rows.findIndex((r) => r.includes("Balance Sheet Head"));
  if (h < 0) return "";
  const hd = rows[h], ix = (n) => hd.indexOf(n);
  const groups = {};
  for (const r of rows.slice(h + 1)) {
    const bsh = r[ix("Balance Sheet Head")] || "Unclassified", gh = r[ix("Group Heads")] || "—";
    const k = `${bsh} › ${gh}`;
    groups[k] ||= { n: 0, open: 0, close: 0 };
    groups[k].n++; groups[k].open += Number(r[ix("Net Opening Balance")]) || 0; groups[k].close += Number(r[ix("Net Closing Balance")]) || 0;
  }
  return ["Balance Sheet Head › Group Head | ledgers | net opening | net closing (₹; debit +, credit −)",
    ...Object.entries(groups).sort((a, b) => Math.abs(b[1].close) - Math.abs(a[1].close))
      .map(([k, v]) => `${k} | ${v.n} | ${Math.round(v.open)} | ${Math.round(v.close)}`)].join("\n");
}

/** Text rows of a static statement component (FormatCFS / FormatSOCE): one line per <tr>. */
function jsxTable(file) {
  try {
    const src = fs.readFileSync(path.join(FORMATS, file), "utf8");
    const head = (src.match(/<h2[^>]*>([\s\S]*?)<\/h2>[\s\S]*?<h3[^>]*>([\s\S]*?)<\/h3>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/) || []).slice(1).map((s) => s.replace(/\s+/g, " ").trim());
    const rows = [...src.matchAll(/<tr[\s\S]*?<\/tr>/g)].map((m) =>
      [...m[0].matchAll(/>([^<>{}]+)</g)].map((x) => x[1].replace(/\s+/g, " ").trim()).filter(Boolean).join(" | "))
      .filter((r) => r && /[A-Za-z]/.test(r));
    return [...head, ...rows].join("\n");
  } catch {
    return "";
  }
}

export async function buildContext() {
  const tb = currentTrialBalanceHash();
  if (!tb) throw new Error("NO_TB");
  if (cache.key === tb.hash) return cache.text;
  const wb = XLSX.read(await generateWorkbook(), { type: "buffer" });
  const parts = [`SOURCE TRIAL BALANCE FILE: ${tb.name}`];
  for (const name of wb.SheetNames) {
    parts.push(`\n=== ${name === "TB Summary" ? "TRIAL BALANCE — summarised by head" : `SHEET: ${name}`} ===\n${name === "TB Summary" ? tbSummary(wb.Sheets[name]) : compactCsv(wb.Sheets[name])}`);
  }
  const cfs = jsxTable("FormatCFS.jsx"), soce = jsxTable("FormatSOCE.jsx");
  if (cfs) parts.push(`\n=== CASH FLOW STATEMENT ===\n${cfs}`);
  if (soce) parts.push(`\n=== STATEMENT OF CHANGES IN EQUITY ===\n${soce}`);
  cache = { key: tb.hash, text: parts.join("\n") };
  return cache.text;
}

const SYSTEM = (ctx) => `You are the Eldeco AI Financial Assistant — a CFO-grade analyst for Eldeco's financial statements generated from the uploaded trial balance.

HOW TO ANSWER
- Use ONLY the documents below for company figures, and name the source briefly, e.g. (Balance Sheet), (P&L), (Note 9), (Cash Flow).
- Statement amounts are in ₹ millions unless a sheet says otherwise; keep the document's unit and state it. Values marked * are audited figures shown as reported.
- Compute ratios when asked (current ratio, debt/equity, ROE, ROCE, margins) and show the inputs in one line.
- If something isn't in the documents, say so plainly — never invent figures. General accounting guidance (Ind AS, Schedule III) is fine; label it as general.
- Stay on finance and this company; politely decline unrelated topics.

STYLE
- Lead with the answer in one sentence, then support it. Usually 80–200 words; longer only for board-level summaries or when asked.
- Markdown suited to the content: ### headings only for multi-part answers, bullets for drivers/actions, a compact table for period comparisons, **bold** for key figures.

DOCUMENTS
${ctx}`;

/** history: [{role:"user"|"assistant", content}] (most recent last) */
export async function ask(question, history = []) {
  const key = process.env.DEEPSEEK_API_KEY;
  if (!key) throw new Error("DEEPSEEK_API_KEY is not set");
  const ctx = await buildContext();
  const messages = [
    { role: "system", content: SYSTEM(ctx) },
    ...history.slice(-12).filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string").map((m) => ({ role: m.role, content: m.content.slice(0, 6000) })),
    { role: "user", content: question },
  ];
  const { data } = await axios.post(`${process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com"}/chat/completions`, {
    model: process.env.DEEPSEEK_MODEL || "deepseek-v4-pro",
    messages, thinking: { type: "disabled" }, temperature: 0.3, max_tokens: 1400,
  }, { headers: { Authorization: `Bearer ${key.trim()}` }, timeout: 120000 });
  return data.choices?.[0]?.message?.content?.trim() || "";
}
