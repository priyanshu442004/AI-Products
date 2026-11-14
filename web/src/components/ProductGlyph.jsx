/* Small custom glyphs for each portal product (consistent 1.6 stroke, 20px grid). */
const G = {
  "financial-reporting": (
    <>
      <rect x="4" y="2.5" width="12" height="15" rx="2" />
      <path d="M7 6.5h6M7 9.5h6M7 12.5h3.5" />
      <path d="M12.5 12.5h.5" strokeWidth="2.2" />
    </>
  ),
  "virtual-cfo": (
    <>
      <path d="M3 16.5h14" />
      <path d="M5 13.5v-3M8.5 13.5V8M12 13.5V9.5M15.5 13.5V5" />
      <path d="M4.5 7.5 8.5 4.5l3.5 2.5 4-3.5" />
    </>
  ),
  "bank-reconciliation": (
    <>
      <path d="M3.5 7h11l-3-3M16.5 13h-11l3 3" />
    </>
  ),
  "invoice-automation": (
    <>
      <path d="M5 2.5h10v15l-2-1.3-1.7 1.3-1.6-1.3-1.7 1.3L6.3 16.2 5 17.5z" />
      <path d="M8 6.5h4M8 9.5h4" />
    </>
  ),
  "gst-reconciliation": (
    <>
      <rect x="3" y="3" width="14" height="14" rx="2.5" />
      <path d="M6.5 7.5h3M6.5 10.5h3M6.5 13.5h2" />
      <path d="m11.5 11 1.5 1.5 3-3.5" />
    </>
  ),
  "tds-return": (
    <>
      <path d="M5 2.5h7l3.5 3.5v11.5H5z" /><path d="M12 2.5V6h3.5" />
      <path d="M8 10.5h4.5M8 13.5h3" /><circle cx="8.5" cy="7" r=".6" fill="currentColor" />
    </>
  ),
  "vendor-ledger": (
    <>
      <path d="M3 6.5h6M3 10h6M3 13.5h6" /><path d="M11 6.5h6M11 10h6M11 13.5h4" />
      <path d="M10 4v12" strokeDasharray="1.5 2" />
    </>
  ),
  "customer-ledger": (
    <>
      <circle cx="7" cy="7" r="2.5" /><path d="M2.5 16c.6-2.6 2.3-4 4.5-4s3.9 1.4 4.5 4" />
      <path d="M13 6.5h4.5M13 9.5h4.5M14.5 12.5h3" />
    </>
  ),
  "payroll-compliance": (
    <>
      <rect x="2.5" y="5" width="15" height="10" rx="2" />
      <circle cx="10" cy="10" r="2.2" /><path d="M5.5 8v4M14.5 8v4" />
    </>
  ),
  "fixed-asset-register": (
    <>
      <path d="M3 17h14M4.5 17V8.5L10 4l5.5 4.5V17" /><path d="M8 17v-4h4v4" />
    </>
  ),
  overview: (
    <>
      <rect x="3" y="3" width="6" height="6" rx="1.5" /><rect x="11" y="3" width="6" height="6" rx="1.5" />
      <rect x="3" y="11" width="6" height="6" rx="1.5" /><rect x="11" y="11" width="6" height="6" rx="1.5" />
    </>
  ),
};

export default function ProductGlyph({ name, className = "size-5" }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      {G[name]}
    </svg>
  );
}
