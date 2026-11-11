/* Small custom glyphs for each portal product (consistent 1.6 stroke, 20px grid). */
const G = {
  eldeco: (
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
