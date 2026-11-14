import { useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { productBySlug, products } from "../../lib/products";
import StatusPill from "../../components/StatusPill";
import ProductGlyph from "../../components/ProductGlyph";
import { ArrowIcon, ArrowUpRight, EASE } from "../../components/ui";

export default function ProductView() {
  const { slug } = useParams();
  const p = productBySlug(slug);
  if (!p) return <Navigate to="/dashboard" replace />;
  // key forces a fresh iframe/loading state when switching products
  return p.status === "live" && p.appPath ? <LiveApp key={p.slug} p={p} /> : <Building key={p.slug} p={p} />;
}

/* -------- Live product: embedded same-origin sub-app with a slim toolbar -------- */
function LiveApp({ p }) {
  const frame = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const reload = () => { setLoaded(false); frame.current?.contentWindow?.location.reload(); };

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 shrink-0 items-center justify-between gap-4 border-b rule bg-paper px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid size-8 place-items-center rounded-lg bg-ink text-lime"><ProductGlyph name={p.slug} className="size-[18px]" /></span>
          <nav className="flex min-w-0 items-center gap-2 text-sm" aria-label="Breadcrumb">
            <Link to="/dashboard" viewTransition className="hidden text-muted hover:text-ink sm:inline">Products</Link>
            <span className="hidden text-ink/25 sm:inline">/</span>
            <span className="truncate font-medium">{p.name}</span>
          </nav>
          <StatusPill status={p.status} dark={false} className="hidden md:inline-flex" />
        </div>
        <div className="flex items-center gap-1">
          <ToolBtn onClick={reload} label="Reload">
            <path d="M15.5 10a5.5 5.5 0 1 1-1.6-3.9M15.5 4v3.5H12" />
          </ToolBtn>
          <a href={p.entryPath || p.appPath} target="_blank" rel="noreferrer" className="ml-1 inline-flex h-9 items-center gap-1.5 rounded-lg border border-ink/12 px-3 text-sm transition-colors hover:border-ink/30">
            <span className="hidden sm:inline">Open in new tab</span><ArrowUpRight />
          </a>
        </div>
      </div>

      <div className="relative min-h-0 flex-1 bg-white">
        <AnimatePresence>
          {!loaded && (
            <motion.div exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 bg-paper">
              <div className="flex gap-1.5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.span key={i} className="w-1.5 rounded-full bg-teal" animate={{ height: [8, 28, 8] }} transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }} />
                ))}
              </div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Loading {p.name}</p>
            </motion.div>
          )}
        </AnimatePresence>
        <iframe
          ref={frame}
          src={p.entryPath || p.appPath}
          title={p.name}
          onLoad={() => setLoaded(true)}
          className="h-full w-full border-0"
          allow="clipboard-read; clipboard-write; fullscreen"
        />
      </div>
    </div>
  );
}

function ToolBtn({ onClick, label, children }) {
  return (
    <button onClick={onClick} title={label} aria-label={label} className="grid size-9 place-items-center rounded-lg text-muted transition-colors hover:bg-ink/5 hover:text-ink">
      <svg viewBox="0 0 20 20" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{children}</svg>
    </button>
  );
}

/* -------- Coming-soon product: animated preview of what it will do -------- */
function Building({ p }) {
  const live = products.filter((x) => x.status === "live");
  return (
    <div className="min-h-full bg-paper">
      <section className="relative isolate overflow-hidden bg-ink text-paper">
        <div className="grid-bg absolute inset-0 -z-10 opacity-70" aria-hidden />
        {/* slow aurora behind the glyph */}
        <motion.div aria-hidden className="absolute -right-24 -top-24 -z-10 size-[520px] rounded-full bg-teal/25 blur-[120px]"
          animate={{ x: [0, -40, 0], y: [0, 30, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div aria-hidden className="absolute -bottom-40 left-1/4 -z-10 size-[420px] rounded-full bg-lime/15 blur-[120px]"
          animate={{ x: [0, 50, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} />

        <div className="mx-auto grid max-w-[1180px] items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-20">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3">
              <StatusPill status={p.status} />
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-mist">{p.category}</span>
            </div>
            <h1 className="mt-5 text-[clamp(2.2rem,4.6vw,3.8rem)] font-medium leading-[1.02]">{p.name}</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-mist">{p.summary}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/dashboard" viewTransition className="inline-flex h-11 items-center gap-2 rounded-full bg-lime px-5 text-sm font-medium text-ink transition-transform active:scale-[0.98]">
                Explore live products <ArrowIcon />
              </Link>
            </div>
          </motion.div>

          {/* orbiting glyph */}
          <div className="relative mx-auto grid size-[260px] place-items-center sm:size-[320px] lg:col-span-5">
            {[1, 0.74, 0.48].map((k, i) => (
              <motion.span key={k} aria-hidden className="absolute rounded-full border border-white/10" style={{ width: `${k * 100}%`, height: `${k * 100}%` }}
                animate={{ rotate: i % 2 ? -360 : 360 }} transition={{ duration: 30 + i * 12, repeat: Infinity, ease: "linear" }}>
                <span className={`absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full ${i === 1 ? "bg-lime" : "bg-teal"}`} />
              </motion.span>
            ))}
            <motion.span initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, duration: 0.8, ease: EASE }}
              className="grid size-24 place-items-center rounded-3xl bg-paper text-ink shadow-[0_30px_80px_-20px_rgb(79_179_172/0.6)]">
              <ProductGlyph name={p.slug} className="size-11" />
            </motion.span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1180px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
        {/* pipeline */}
        <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7, ease: EASE }}>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">How it will work</h2>
          <ol className="relative mt-5 grid gap-3 md:grid-cols-3">
            {p.flow.map((f, k) => (
              <li key={f} className="relative overflow-hidden rounded-2xl border border-ink/8 bg-white/70 p-5">
                <span className="font-mono text-xs text-muted">Step 0{k + 1}</span>
                <p className="mt-2 text-lg font-medium leading-snug">{f}</p>
                <div className="mt-5 h-1 overflow-hidden rounded-full bg-ink/8">
                  <motion.div className="h-full w-1/3 rounded-full bg-gradient-to-r from-teal to-lime"
                    animate={{ x: ["-100%", "300%"] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: k * 0.5 }} />
                </div>
              </li>
            ))}
          </ol>
        </motion.section>

        {/* planned features */}
        <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.7, ease: EASE }} className="mt-10">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Planned for the first release</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {p.features.map((f, i) => (
              <motion.li key={f} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.05, ease: EASE }}
                className="flex items-center gap-3 rounded-2xl border border-ink/8 bg-white/60 px-4 py-3.5 text-[15px]">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-teal/12 text-teal-ink">
                  <svg viewBox="0 0 20 20" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 10.5 8 14l7.5-8" /></svg>
                </span>
                {f}
              </motion.li>
            ))}
          </ul>
        </motion.section>

        <p className="mt-10 text-sm text-muted">
          While this is being built, {live.length} workflows are ready to use:{" "}
          {live.map((x, i) => (
            <span key={x.slug}>
              <Link to={`/dashboard/${x.slug}`} viewTransition className="text-ink underline decoration-ink/20 underline-offset-4 hover:decoration-teal">{x.name}</Link>
              {i < live.length - 1 ? ", " : "."}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
