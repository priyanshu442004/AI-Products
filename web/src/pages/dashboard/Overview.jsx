import { Link } from "react-router";
import { motion } from "motion/react";
import { products } from "../../lib/products";
import { getSession } from "../../lib/auth";
import { company } from "../../lib/content";
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
  const live = products.filter((p) => p.status === "live").length;
  const date = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });

  return (
    <div className="mx-auto max-w-[1180px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
      <motion.header initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{date}</p>
        <h1 className="mt-3 text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.05]">
          {greeting()}, <span className="accent-serif text-teal-ink">{session?.name || "there"}</span>.
        </h1>
        <p className="mt-3 text-muted">{live} of {products.length} products are live. Pick one to get started.</p>
      </motion.header>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {products.map((p, i) => (
          <motion.div key={p.slug} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.07, duration: 0.7, ease: EASE }}>
            <Link
              to={`/dashboard/${p.slug}`}
              viewTransition
              onPointerMove={onMove}
              className="spotlight group flex h-full flex-col rounded-3xl border border-ink/8 bg-white/60 p-6 transition-shadow duration-500 hover:shadow-[0_24px_50px_-30px_rgb(11_26_51/0.4)] sm:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <span className={`grid size-12 place-items-center rounded-2xl ${p.status === "live" ? "bg-ink text-lime" : "bg-paper-2 text-muted"}`}>
                  <ProductGlyph name={p.slug} className="size-6" />
                </span>
                <StatusPill status={p.status} dark={false} />
              </div>
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">{p.category}</p>
              <h2 className="mt-1.5 text-2xl font-medium">{p.name}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.summary}</p>
              <span className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-medium">
                {p.status === "live" ? "Open product" : "View roadmap"}
                <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-4 flex flex-col justify-between gap-4 rounded-3xl bg-ink p-6 text-paper sm:flex-row sm:items-center sm:p-7">
        <div>
          <p className="font-medium">Need a product configured for your data?</p>
          <p className="mt-1 text-sm text-mist">Our team sets up mappings, users and integrations during onboarding.</p>
        </div>
        <a href={`mailto:${company.email}?subject=${encodeURIComponent("Portal support")}`} className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-paper px-5 text-sm font-medium text-ink transition-colors hover:bg-lime">
          Contact support
        </a>
      </motion.div>
    </div>
  );
}
