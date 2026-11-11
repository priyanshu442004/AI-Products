import { motion } from "motion/react";
import { EASE } from "../ui";

/* Coded UI previews of the four portal products. Every figure is real output from
   the products' own sample runs (Financial Reporting shows ledger counts only, no client amounts). */

const inView = { initial: "hidden", whileInView: "show", viewport: { once: true, margin: "-15%" } };
const row = (i) => ({ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0, transition: { delay: 0.1 + i * 0.08, duration: 0.6, ease: EASE } } });

function Frame({ title, children }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-2 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)]">
      <div className="flex items-center gap-2 border-b border-white/8 px-4 py-3">
        <span className="size-2.5 rounded-full bg-white/15" /><span className="size-2.5 rounded-full bg-white/15" /><span className="size-2.5 rounded-full bg-white/15" />
        <span className="ml-3 font-mono text-[11px] text-mist">{title}</span>
        <span className="ml-auto font-mono text-[10px] uppercase tracking-wider text-mist/60">sample data</span>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}

export function FinancialReportingMock() {
  const lines = [
    ["WIP, project in progress", "279", "Inventories"],
    ["Realisation under agreement to sell", "137", "Other current liabilities"],
    ["Advance tax (net of provision)", "63", "Other current assets"],
    ["Fixed assets", "47", "Property, plant & equipment"],
    ["Sundry debtors", "30", "Trade receivables"],
  ];
  return (
    <Frame title="financial-reporting / trial-balance → balance-sheet">
      <motion.div {...inView} className="space-y-1.5 font-mono text-[11px] sm:text-xs">
        <div className="grid grid-cols-[1.4fr_0.8fr_1.3fr] gap-3 px-2 pb-1 text-mist/70"><span>Ledger group</span><span className="text-right">Ledgers</span><span>Schedule III head</span></div>
        {lines.map(([l, a, h], i) => (
          <motion.div key={l} variants={row(i)} className="grid grid-cols-[1.4fr_0.8fr_1.3fr] items-center gap-3 rounded-lg bg-white/[0.03] px-2 py-2 text-paper/90">
            <span className="truncate">{l}</span>
            <span className="text-right tabular-nums">{a}</span>
            <motion.span
              variants={{ hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1, transition: { delay: 0.8 + i * 0.12, ease: EASE } } }}
              className="w-fit truncate rounded-md bg-teal/15 px-2 py-0.5 text-teal"
            >
              {h}
            </motion.span>
          </motion.div>
        ))}
        <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 1.6 } } }} className="flex justify-between border-t border-white/10 px-2 pt-3 text-paper">
          <span>1,981 of 1,981 ledgers classified</span><span className="text-lime">✓ Assets = Equity + Liabilities</span>
        </motion.div>
      </motion.div>
    </Frame>
  );
}

export function CfoMock() {
  const dims = [["Liquidity", "Low"], ["Profitability", "Mixed"], ["Leverage", "Low"], ["Efficiency", "Watch"], ["Cash flow", "Low"], ["Growth", "Watch"]];
  const tone = { Good: "bg-teal/20 text-teal", Mixed: "bg-white/10 text-paper/80", Watch: "bg-lime/15 text-lime", Low: "bg-[#e0796b]/20 text-[#f0a093]" };
  return (
    <Frame title="virtual-cfo / health-report · FY2024">
      <motion.div {...inView}>
        <div className="grid grid-cols-3 gap-2.5">
          {[["Health score", "59/100"], ["Current ratio", "0.61"], ["Debt / equity", "6.48×"]].map(([k, v], i) => (
            <motion.div key={k} variants={row(i)} className="rounded-xl bg-white/[0.04] p-3">
              <div className="font-mono text-[10px] uppercase tracking-wider text-mist/80">{k}</div>
              <div className="mt-1.5 font-display text-xl text-paper sm:text-2xl">{v}</div>
            </motion.div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-1.5 rounded-xl bg-white/[0.03] p-3 font-mono text-[11px] sm:grid-cols-3">
          {dims.map(([d, st], i) => (
            <motion.div key={d} variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0, transition: { delay: 0.4 + i * 0.07, ease: EASE } } }} className="flex items-center justify-between gap-2 rounded-lg bg-white/[0.03] px-2 py-1.5">
              <span className="truncate text-mist">{d}</span><span className={`rounded px-1.5 py-0.5 text-[10px] ${tone[st]}`}>{st}</span>
            </motion.div>
          ))}
        </div>
        <motion.p variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 1.3 } } }} className="mt-4 rounded-xl border border-white/8 p-3 text-[13px] leading-relaxed text-mist">
          <span className="text-paper">CFO note · </span>Net profit rose 137.6% on flat revenue (+0.02%), but short-term borrowings grew 591.7%: growth is being funded by overdraft.
        </motion.p>
      </motion.div>
    </Frame>
  );
}

export function RecoMock() {
  const bank = [["NEFT ASTER COMPONENTS", "1,86,500"], ["RTGS BLUEPEAK MFG", "4,25,000"], ["UPI OFFICE REFRESHMENTS", "1,450"], ["NEFT CLIENT HOTEL MERIDIAN", "2,34,000"]];
  const ledger = [["Aster Components", "1,86,500"], ["Bluepeak Manufacturing", "4,25,000"], ["Office refreshments", "1,450"]];
  return (
    <Frame title="bank-reconciliation / april-2026">
      <motion.div {...inView} className="font-mono text-[11px] sm:text-xs">
        <div className="grid grid-cols-[1fr_44px_1fr] text-mist/70"><span className="px-2 pb-2">Bank statement</span><span /><span className="px-2 pb-2">Books</span></div>
        <div className="space-y-1.5">
          {bank.map((b, i) => {
            const ok = i < 3;
            return (
              <motion.div key={b[0]} variants={row(i)} className="grid grid-cols-[1fr_44px_1fr] items-center">
                <div className="flex justify-between gap-2 rounded-lg bg-white/[0.04] px-2 py-2 text-paper/90"><span className="truncate">{b[0]}</span><span className="tabular-nums">{b[1]}</span></div>
                <motion.div variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { delay: 0.8 + i * 0.15, ease: EASE } } }} className={`mx-1 h-px origin-left ${ok ? "bg-teal" : "border-t border-dashed border-lime/70 bg-transparent"}`} />
                <div className={`flex justify-between gap-2 rounded-lg px-2 py-2 ${ok ? "bg-white/[0.04] text-paper/90" : "border border-dashed border-lime/50 text-lime"}`}>
                  <span className="truncate">{ok ? ledger[i][0] : "Not in books · review"}</span>{ok && <span className="tabular-nums">{ledger[i][1]}</span>}
                </div>
              </motion.div>
            );
          })}
        </div>
        <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 1.6 } } }} className="mt-4 flex justify-between border-t border-white/10 px-2 pt-3 text-paper">
          <span>53 of 59 bank lines matched</span><span className="text-lime">13 exceptions explained</span>
        </motion.div>
      </motion.div>
    </Frame>
  );
}

export function InvoiceMock() {
  const fields = [["Supplier", "Metro IT Solutions"], ["GSTIN", "07BBBBB1111B1Z4"], ["Invoice no.", "INV-260410"], ["Taxable value", "₹5,000.00"], ["CGST + SGST 18%", "₹900.00"], ["Printed total", "₹6,400.00"]];
  return (
    <Frame title="invoice-automation / april-2026">
      <motion.div {...inView} className="grid gap-4 sm:grid-cols-[0.9fr_1.1fr]">
        <div className="relative rounded-xl bg-paper p-4 text-ink">
          <div className="font-display text-sm font-semibold">TAX INVOICE</div>
          <div className="mt-3 space-y-2">
            {[70, 45, 85, 55, 100, 60, 75].map((wd, i) => (
              <motion.div
                key={i}
                className="h-1.5 rounded-full"
                style={{ width: `${wd}%` }}
                variants={{ hidden: { backgroundColor: "rgba(11,26,51,0.12)" }, show: { backgroundColor: [1, 2, 4].includes(i) ? "rgba(79,179,172,0.8)" : "rgba(11,26,51,0.12)", transition: { delay: 0.5 + i * 0.1 } } }}
              />
            ))}
          </div>
          {/* scanning beam */}
          <motion.div className="absolute inset-x-2 h-8 rounded bg-gradient-to-b from-transparent via-teal/25 to-transparent" variants={{ hidden: { top: "0%", opacity: 0 }, show: { top: ["0%", "80%"], opacity: [0, 1, 0], transition: { duration: 1.4, ease: "easeInOut" } } }} />
        </div>
        <div className="space-y-1.5 font-mono text-[11px] sm:text-xs">
          {fields.map(([k, v], i) => (
            <motion.div key={k} variants={{ hidden: { opacity: 0, x: 10 }, show: { opacity: 1, x: 0, transition: { delay: 0.9 + i * 0.1, ease: EASE } } }} className="flex justify-between gap-3 rounded-lg bg-white/[0.04] px-2.5 py-2">
              <span className="text-mist">{k}</span><span className="truncate text-paper">{v}</span>
            </motion.div>
          ))}
          <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 1.7 } } }} className="flex justify-between gap-3 px-2.5 pt-2 text-[#f0a093]">
            <span>✗ ₹500 above taxable + GST (₹5,900)</span><span>Hold</span>
          </motion.div>
        </div>
      </motion.div>
    </Frame>
  );
}

export const mockFor = { "financial-reporting": FinancialReportingMock, "virtual-cfo": CfoMock, "bank-reconciliation": RecoMock, "invoice-automation": InvoiceMock };
