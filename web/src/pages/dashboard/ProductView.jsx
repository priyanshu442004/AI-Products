import { useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { productBySlug } from "../../lib/products";
import { company } from "../../lib/content";
import StatusPill from "../../components/StatusPill";
import ProductGlyph from "../../components/ProductGlyph";
import { ArrowIcon, ArrowUpRight, EASE } from "../../components/ui";
import { mockFor } from "../../components/viz/ProductMocks";

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

/* -------- In-development product: roadmap + preview -------- */
function Building({ p }) {
  const Mock = mockFor[p.slug];
  return (
    <div className="mx-auto max-w-[1180px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">{p.category}</span>
          <StatusPill status={p.status} dark={false} />
        </div>
        <h1 className="mt-3 text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.05]">{p.name}</h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">{p.summary}</p>
      </motion.div>

      <div className="mt-10 grid gap-4 lg:grid-cols-12">
        <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7, ease: EASE }} className="rounded-3xl border border-ink/8 bg-white/60 p-6 sm:p-7 lg:col-span-5">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Planned for v1</h2>
          <ul className="mt-4 divide-y divide-ink/8">
            {p.features.map((f, i) => (
              <motion.li key={f} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.05, ease: EASE }} className="flex items-center gap-3 py-3 text-[15px]">
                <span className="grid size-5 place-items-center rounded-full border border-ink/20"><span className="size-1.5 rounded-full bg-teal" /></span>
                {f}
              </motion.li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap items-center gap-2 font-mono text-[11px]">
            {p.flow.map((f, k) => (
              <span key={f} className="flex items-center gap-2">
                <span className="rounded-full bg-paper-2 px-2.5 py-1">{f}</span>
                {k < p.flow.length - 1 && <ArrowIcon className="size-3 text-muted" />}
              </span>
            ))}
          </div>
          <a
            href={`mailto:${company.email}?subject=${encodeURIComponent(`${p.name} — requirements`)}`}
            className="mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-paper transition-colors hover:bg-ink-3"
          >
            Share your requirements <ArrowIcon />
          </a>
        </motion.section>
        <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7, ease: EASE }} className="rounded-3xl bg-ink p-4 sm:p-6 lg:col-span-7">
          <p className="mb-4 px-1 font-mono text-[11px] uppercase tracking-[0.16em] text-mist">Design preview</p>
          <Mock />
        </motion.section>
      </div>
    </div>
  );
}
