import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";
import PageHero from "../components/PageHero";
import { Reveal, SectionHeader, Eyebrow, ArrowUpRight, useSpotlight } from "../components/ui";
import { CTA } from "./Home";
import { company, services, labProducts } from "../lib/content";
import { products } from "../lib/products";

const principles = [
  { title: "Personal, not packaged", body: "Every business is unique, so every project starts from how your team actually works — not from a template." },
  { title: "Prove it on real data", body: "We prototype on your own documents and numbers early, so the first demo already answers the hard questions." },
  { title: "Own the whole stack", body: "Data, models, backend, frontend and cloud — one team, so nothing gets lost between vendors." },
  { title: "Stay after launch", body: "We provide ongoing support and keep improving the system as your data and processes change." },
];

export default function About() {
  const onMove = useSpotlight();
  const facts = [
    [services.length, "service lines"],
    [products.length, "portal products"],
    [labProducts.length, "lab products"],
    [company.offices.length, "offices in Delhi NCR"],
  ];
  return (
    <>
      <PageHero
        eyebrow="About Analytx4t Lab"
        title="Analytics for *Transformation*."
        intro="An automation, data analytics, AI and full-stack application company. We build AI agents, RAG applications, web and mobile apps, and BI dashboards in Power BI and Tableau."
      />

      {/* mission / vision */}
      <section className="container-x py-24 sm:py-32">
        <div className="grid gap-px overflow-hidden rounded-3xl border border-ink/8 bg-ink/8 lg:grid-cols-2">
          {[["Mission", company.mission], ["Vision", company.vision]].map(([k, v], i) => (
            <Reveal key={k} delay={i * 0.1} className="bg-paper p-8 sm:p-12">
              <Eyebrow className="text-muted">{k}</Eyebrow>
              <p className="mt-8 font-display text-[clamp(1.5rem,2.6vw,2.2rem)] leading-[1.18] tracking-[-0.02em]">{v}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 gap-y-10 border-t rule pt-10 lg:grid-cols-4">
          {facts.map(([n, label]) => (
            <Reveal key={label}>
              <div className="font-display text-6xl font-medium tracking-tight sm:text-7xl"><Count to={n} /></div>
              <div className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-muted">{label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* principles */}
      <section className="bg-paper-2/70 py-28 sm:py-36">
        <div className="container-x">
          <SectionHeader eyebrow="How we work" title="Four things we *won't* compromise on." />
          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={(i % 2) * 0.08}>
                <article onPointerMove={onMove} className="spotlight h-full rounded-3xl border border-ink/8 bg-paper p-8">
                  <span className="font-mono text-xs text-muted">0{i + 1}</span>
                  <h3 className="mt-8 text-3xl font-medium">{p.title}</h3>
                  <p className="mt-3 max-w-md text-[16px] leading-relaxed text-muted">{p.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* founders */}
      <section className="container-x py-28 sm:py-36">
        <SectionHeader eyebrow="Leadership" title="The people *behind* the lab." intro="A small senior team of data, AI and software engineers, led by its founders." />
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {company.founders.map((f, i) => (
            <Reveal key={f.name} delay={i * 0.1}>
              <article className="group grid grid-cols-[auto_1fr] items-center gap-6 rounded-3xl border border-ink/8 bg-white/55 p-6 sm:p-8">
                <div className="relative grid size-24 place-items-center overflow-hidden rounded-2xl bg-ink font-display text-3xl text-paper sm:size-28">
                  <span className="relative z-10">{f.initials}</span>
                  <span aria-hidden className="absolute -bottom-6 -right-6 size-16 rounded-full bg-teal/40 blur-xl transition-transform duration-700 group-hover:scale-150" />
                </div>
                <div>
                  <h3 className="text-2xl font-medium sm:text-3xl">{f.name}</h3>
                  <p className="mt-1 text-muted">{f.role}</p>
                  <a href={`mailto:${f.email}`} className="link-draw mt-4 inline-block font-mono text-[13px] text-teal-ink">{f.email}</a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* offices */}
      <section className="container-x pb-28">
        <div className="grid gap-4 md:grid-cols-2">
          {company.offices.map((o, i) => (
            <Reveal key={o.label} delay={i * 0.1}>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.lines.join(", "))}`}
                target="_blank" rel="noreferrer"
                className="group flex h-full items-end justify-between gap-6 rounded-3xl bg-ink p-8 text-paper"
              >
                <div>
                  <Eyebrow className="text-mist">{o.label}</Eyebrow>
                  <p className="mt-10 font-display text-2xl leading-snug sm:text-3xl">{o.lines.map((l) => <span key={l} className="block">{l}</span>)}</p>
                </div>
                <span className="grid size-12 shrink-0 place-items-center rounded-full border border-white/20 transition-all duration-500 group-hover:bg-lime group-hover:text-ink">
                  <ArrowUpRight />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}

function Count({ to }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const c = animate(0, to, { duration: 1.4, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => { if (ref.current) ref.current.textContent = Math.round(v); } });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>0</span>;
}
