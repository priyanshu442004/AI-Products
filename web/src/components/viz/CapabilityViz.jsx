import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { EASE } from "../ui";

const inView = { initial: "hidden", whileInView: "show", viewport: { once: true, margin: "-10%" } };

/* 1 · Agent workflow — a pulse travels trigger → agent → tools → done */
export function AgentFlowViz() {
  const nodes = [
    { x: 40, y: 90, label: "New lead" },
    { x: 170, y: 90, label: "Agent", core: true },
    { x: 300, y: 36, label: "CRM" },
    { x: 300, y: 90, label: "Email" },
    { x: 300, y: 144, label: "Sheet" },
  ];
  const paths = ["M58 90 H150", "M190 90 C240 90 240 36 282 36", "M190 90 H282", "M190 90 C240 90 240 144 282 144"];
  return (
    <svg viewBox="0 0 340 180" className="h-full w-full" fill="none">
      {paths.map((d, i) => (
        <g key={i}>
          <path d={d} stroke="currentColor" strokeOpacity=".16" strokeWidth="1.5" />
          <path d={d} stroke="var(--color-teal)" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="10 200" className="[animation:flow_2.6s_linear_infinite]" style={{ animationDelay: `${i === 0 ? 0 : 0.7 + i * 0.12}s` }} />
        </g>
      ))}
      {nodes.map((n) => (
        <g key={n.label} transform={`translate(${n.x} ${n.y})`}>
          {n.core ? (
            <>
              <circle r="22" fill="var(--color-ink)" />
              <circle r="22" stroke="var(--color-lime)" strokeOpacity=".5" className="origin-center [animation:ring_2.6s_ease-out_infinite]" />
              <circle r="6" fill="var(--color-lime)" />
            </>
          ) : (
            <circle r="9" fill="var(--color-paper)" stroke="currentColor" strokeOpacity=".3" strokeWidth="1.5" />
          )}
          <text y={n.core ? 40 : 4} x={n.core ? 0 : 16} textAnchor={n.core ? "middle" : "start"} className="fill-current font-mono text-[10px] opacity-60">{n.label}</text>
        </g>
      ))}
      <style>{`@keyframes flow{from{stroke-dashoffset:210}to{stroke-dashoffset:0}}@keyframes ring{from{transform:scale(1);opacity:.8}to{transform:scale(1.7);opacity:0}}`}</style>
    </svg>
  );
}

/* 2 · Forecast — actuals draw in, forecast continues dashed inside a confidence band */
export function ForecastViz() {
  const actual = "M10 132 L45 120 L80 126 L115 104 L150 110 L185 86 L220 92";
  const forecast = "M220 92 L255 74 L290 66 L325 50";
  const band = "M220 92 L255 60 L290 44 L325 22 L325 78 L290 88 L255 88 L220 92 Z";
  return (
    <motion.svg viewBox="0 0 340 160" className="h-full w-full" fill="none" {...inView}>
      {[40, 80, 120].map((y) => <line key={y} x1="10" x2="330" y1={y} y2={y} stroke="currentColor" strokeOpacity=".08" strokeDasharray="2 5" />)}
      <motion.path d={band} fill="var(--color-teal)" fillOpacity=".12" variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 1.3, duration: 0.8 } } }} />
      <motion.path d={actual} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 1.4, ease: EASE } } }} />
      <motion.path d={forecast} stroke="var(--color-teal)" strokeWidth="2" strokeDasharray="5 5" variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 1.4, duration: 0.6 } } }} />
      <line x1="220" x2="220" y1="18" y2="146" stroke="currentColor" strokeOpacity=".2" />
      <text x="226" y="146" className="fill-current font-mono text-[9px] opacity-50">forecast →</text>
      <motion.circle cx="325" cy="50" r="5" fill="var(--color-lime)" stroke="var(--color-ink)" strokeWidth="1.5" variants={{ hidden: { scale: 0 }, show: { scale: 1, transition: { delay: 2, type: "spring" } } }} />
    </motion.svg>
  );
}

/* 3 · Chatbot — messages arrive, typing indicator in between, then loops */
const SCRIPT = [
  { me: true, text: "How many leave days do I have left?" },
  { me: false, text: "You have 9 earned leaves left for 2026. Want me to apply for Friday?" },
  { me: true, text: "Yes, please." },
  { me: false, text: "Done — sent to your manager for approval." },
];
export function ChatViz() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setN((v) => (v >= SCRIPT.length + 2 ? 0 : v + 1)), 1500);
    return () => clearInterval(id);
  }, []);
  const shown = SCRIPT.slice(0, Math.min(n, SCRIPT.length));
  const typing = n < SCRIPT.length && n > 0 && !SCRIPT[n]?.me;
  return (
    <div className="flex h-full flex-col justify-end gap-2 overflow-hidden px-1 text-[13px]">
      {shown.map((m, i) => (
        <motion.div
          key={i + m.text}
          initial={{ opacity: 0, y: 10, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: EASE }}
          className={`max-w-[82%] rounded-2xl px-3.5 py-2 leading-snug ${m.me ? "self-end rounded-br-md bg-ink text-paper" : "self-start rounded-bl-md bg-paper-2 text-ink"}`}
        >
          {m.text}
        </motion.div>
      ))}
      {typing && (
        <div className="flex w-fit gap-1 rounded-2xl rounded-bl-md bg-paper-2 px-3.5 py-3">
          {[0, 1, 2].map((i) => <span key={i} className="pulse-dot size-1.5 rounded-full bg-ink/50" style={{ animationDelay: `${i * 0.2}s` }} />)}
        </div>
      )}
    </div>
  );
}

/* 4 · RAG — documents are chunked, the relevant chunk lights up and flows into a cited answer */
export function RagViz() {
  return (
    <motion.div className="grid h-full grid-cols-[1fr_auto_1.25fr] items-center gap-3" {...inView}>
      <div className="relative h-[120px]">
        {["policy.pdf", "q3.xlsx", "faq.docx"].map((f, i) => (
          <motion.div
            key={f}
            className="absolute inset-x-0 rounded-lg border border-ink/10 bg-paper p-2.5 shadow-sm"
            style={{ top: i * 22, zIndex: 3 - i }}
            variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0, transition: { delay: i * 0.12, ease: EASE, duration: 0.7 } } }}
          >
            <div className="font-mono text-[9px] text-muted">{f}</div>
            <div className="mt-1.5 space-y-1">
              {[0, 1, 2].map((l) => (
                <motion.div
                  key={l}
                  className="h-1 rounded-full"
                  style={{ width: `${90 - l * 18}%` }}
                  variants={{
                    hidden: { backgroundColor: "rgba(11,26,51,0.12)" },
                    show: { backgroundColor: i === 0 && l === 1 ? "rgba(79,179,172,1)" : "rgba(11,26,51,0.12)", transition: { delay: 1 } },
                  }}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div className="font-mono text-teal-ink" variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 1.2 } } }}>→</motion.div>
      <motion.div
        className="rounded-xl bg-ink p-3 text-[12px] leading-snug text-paper"
        variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { delay: 1.4, duration: 0.7, ease: EASE } } }}
      >
        Reimbursements above ₹5,000 need a manager's sign-off.
        <span className="mt-2 block font-mono text-[9px] text-lime">↳ policy.pdf · p.4</span>
      </motion.div>
    </motion.div>
  );
}
