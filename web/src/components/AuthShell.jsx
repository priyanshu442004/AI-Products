import { Link } from "react-router";
import { motion } from "motion/react";
import DataField from "./viz/DataField";
import { Logo, EASE } from "./ui";
import { products } from "../lib/products";

export default function AuthShell({ children }) {
  return (
    <div className="grid min-h-dvh bg-paper lg:grid-cols-[1.05fr_1fr]">
      {/* brand panel */}
      <aside className="relative hidden overflow-hidden bg-ink text-paper lg:block">
        <div className="grid-bg absolute inset-0" aria-hidden />
        <div className="absolute inset-x-0 top-[10%] h-[48%]"><DataField tone="dark" density={0.8} chartArea={[0.1, 0.92]} /></div>
        <div className="relative flex h-full flex-col justify-between p-10 xl:p-14">
          <Link to="/" viewTransition aria-label="Back to Agarwal & Saxena home"><Logo className="h-10" light /></Link>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.9, ease: EASE }} className="max-w-md">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist">Workflow Automation portal</p>
            <p className="mt-5 font-display text-4xl leading-[1.08] tracking-[-0.02em]">
              One sign-in for every <span className="accent-serif text-lime">finance</span> workflow we automate for you.
            </p>
            <ul className="mt-8 space-y-2 font-mono text-[12px] text-mist">
              {products.map((p) => (
                <li key={p.slug} className="flex items-center gap-2.5">
                  <span className={`size-1.5 rounded-full ${p.status === "live" ? "bg-lime" : "bg-white/25"}`} />
                  {p.shortName || p.name}
                  {p.status !== "live" && <span className="text-mist/50">— soon</span>}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </aside>

      {/* form panel */}
      <main className="flex flex-col px-5 py-8 sm:px-10">
        <div className="flex items-center justify-between lg:justify-end">
          <Link to="/" viewTransition className="lg:hidden" aria-label="Home"><Logo className="h-8" /></Link>
          <Link to="/" viewTransition className="text-sm text-muted transition-colors hover:text-ink">← Back to site</Link>
        </div>
        <div className="mx-auto flex w-full max-w-[420px] flex-1 flex-col justify-center py-12">{children}</div>
      </main>
    </div>
  );
}
