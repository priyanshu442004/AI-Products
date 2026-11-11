// The four portal products. `appPath` is where nginx serves each sub-app.
// Add a product: build it under apps/<slug>, give it vite `base: "/app/<slug>/"`,
// add an nginx location, then flip `status` to "live" and set `appPath`.

export const products = [
  {
    slug: "financial-reporting",
    name: "Financial Reporting",
    category: "Financial statements",
    status: "live",
    appPath: "/app/financial-reporting/",
    entryPath: "/app/financial-reporting/dashboard", // skip the app's own landing page inside the portal
    summary: "Upload a raw trial balance and get Schedule III balance sheet, profit & loss and notes to accounts — classified by AI, exportable to Excel.",
    flow: ["Trial balance (.xlsx)", "AI ledger classification", "Balance sheet · P&L · Notes"],
    features: ["Trial balance upload & preview", "AI ledger-to-head mapping", "Balance sheet & P&L generation", "Notes to accounts", "Excel / PDF export", "AI assistant over your financials"],
  },
  {
    slug: "virtual-cfo",
    name: "Virtual CFO",
    category: "Finance intelligence",
    status: "live",
    appPath: "/app/virtual-cfo/",
    summary: "Upload the Balance Sheet, P&L, Cash Flow and Ratio Analysis. Get a scored financial health report by email, then chat with a virtual CFO that answers from your own statements.",
    flow: ["4 statement PDFs", "Ratios & six-dimension score", "Health report + CFO chat"],
    features: ["Balance Sheet, P&L, Cash Flow, Ratios", "Health score out of 100", "Six-dimension scorecard", "Risks & recommended actions", "CFO chat grounded in the statements", "PDF report, Excel & chat export"],
  },
  {
    slug: "bank-reconciliation",
    name: "Bank Reconciliation",
    category: "Accounting automation",
    status: "live",
    appPath: "/app/bank-reconciliation/",
    summary: "Match bank statement lines against the cash book automatically — exact, amount + date, one-to-many and many-to-one — and explain every rupee of the difference.",
    flow: ["Bank statement + ledger", "Six matching passes", "Review report + exceptions"],
    features: ["CSV & Excel statements", "Deterministic matching", "Group & split matches", "Duplicates & amount mismatches", "Difference bridge (no plugs)", "PDF report & Excel workbook"],
  },
  {
    slug: "invoice-automation",
    name: "Invoice Automation",
    category: "Accounts payable",
    status: "live",
    appPath: "/app/invoice-automation/",
    summary: "Drop any number of supplier invoice PDFs. Supplier, GSTIN, items and totals are extracted, GST is recalculated, and duplicates and inflated totals are flagged before payment.",
    flow: ["Invoice PDFs", "Extraction + GST validation", "Checked register + report"],
    features: ["Any number of PDFs per batch", "Supplier, GSTIN & line-item extraction", "GST recalculation (CGST/SGST/IGST)", "Duplicate & total-mismatch checks", "Side-by-side review with the PDF", "PDF report, Excel & CSV register"],
  },
];

export const productBySlug = (slug) => products.find((p) => p.slug === slug);
