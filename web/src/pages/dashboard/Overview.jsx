import { Link } from "react-router";
import { motion } from "motion/react";
import { products } from "../../lib/products";
import { getSession } from "../../lib/auth";
import StatusPill from "../../components/StatusPill";
import ProductGlyph from "../../components/ProductGlyph";
import { ArrowIcon, EASE, useSpotlight } from "../../components/ui";

const greeting = () => {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
};

export default function Overview() {
  const session = getSession();
  const onMove = useSpotlight();
  const live = products.filter((p) => p.status === "live");
  const soon = products.filter((p) => p.status !== "live");
  const date = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });

  return (
    <div className="mx-auto max-w-[1180px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
      <motion.header initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{date} · Workflow Automation</p>
        <h1 className="mt-3 text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.05]">
          {greeting()}, <span className="accent-serif text-teal-ink">{session?.name || "there"}</span>.
        </h1>
        <p className="mt-3 text-muted">{live.length} of {products.length} workflows are live. Pick one to get started.</p>
      </motion.header>

      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {live.map((p, i) => (
          <motion.div key={p.slug} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.06, duration: 0.7, ease: EASE }}>
            <Link
              to={`/dashboard/${p.slug}`}
              viewTransition
              onPointerMove={onMove}
              className="spotlight group flex h-full flex-col rounded-3xl border border-ink/8 bg-white/60 p-6 transition-shadow duration-500 hover:shadow-[0_24px_50px_-30px_rgb(11_26_51/0.4)] sm:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="grid size-12 place-items-center rounded-2xl bg-ink text-lime">
                  <ProductGlyph name={p.slug} className="size-6" />
                </span>
                <span className="font-mono text-xs text-muted">0{i + 1}</span>
              </div>
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">{p.category}</p>
              <h2 className="mt-1.5 text-2xl font-medium">{p.name}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.summary}</p>
              <span className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-medium">
                Open product
                <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.7, ease: EASE }} className="relative mt-10 overflow-hidden rounded-3xl bg-ink p-6 text-paper sm:p-8">
        <div className="grid-bg absolute inset-0 opacity-60" aria-hidden />
        <div className="relative flex flex-wrap items-end justify-between gap-4">
          <div>
            <StatusPill status="soon" />
            <h2 className="mt-3 text-2xl font-medium sm:text-3xl">Next on the roadmap</h2>
          </div>
          <p className="max-w-sm text-sm text-mist">Five more workflows are being built. Open one to see what it will do.</p>
        </div>
        <div className="relative mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
          {soon.map((p, i) => (
            <Link key={p.slug} to={`/dashboard/${p.slug}`} viewTransition className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-colors hover:border-lime/40 hover:bg-white/[0.07]">
              <span className="flex items-center justify-between text-mist">
                <ProductGlyph name={p.slug} className="size-5 text-lime" />
                <span className="font-mono text-[10px]">{String(live.length + i + 1).padStart(2, "0")}</span>
              </span>
              <span className="mt-5 text-[15px] font-medium leading-snug">{p.name}</span>
              <span className="mt-auto pt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-mist transition-colors group-hover:text-lime">Preview →</span>
            </Link>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
