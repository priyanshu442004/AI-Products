import { useEffect, useRef, useState } from "react";
import StatusPill from "../components/StatusPill";
import { Link } from "react-router";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Button, Reveal, SplitHeading, Eyebrow, SectionHeader, Marquee, ArrowIcon, ArrowUpRight, useSpotlight, EASE } from "../components/ui";
import DataField from "../components/viz/DataField";
import ScrollText from "../components/ScrollText";
import { AgentFlowViz, ForecastViz, ChatViz, RagViz } from "../components/viz/CapabilityViz";
import { mockFor } from "../components/viz/ProductMocks";
import { capabilities, services, process, industries, transformations, insights } from "../lib/content";
import { products } from "../lib/products";

export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <Capabilities />
      <ProductStory />
      <ServicesIndex />
      <Process />
      <Industries />
      <Insights />
      <CTA />
    </>
  );
}

/* ------------------------------------------------------------------ HERO */
function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 sm:pt-40">
      <div className="container-x relative grid items-end gap-10 lg:grid-cols-12">
        <div className="relative z-10 lg:col-span-7">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}>
            <Eyebrow className="text-muted">Analytx4t Lab · AI &amp; analytics studio</Eyebrow>
          </motion.div>
          <SplitHeading
            as="h1"
            inView={false}
            delay={0.15}
            stagger={0.07}
            text="From raw data to *finished* work."
            className="mt-7 text-[clamp(3rem,7.6vw,7rem)] font-medium leading-[0.94] tracking-[-0.045em]"
          />
          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.9, ease: EASE }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-muted sm:text-xl"
          >
            We build AI agents, RAG applications and analytics platforms that read your documents, reconcile your numbers and act on them — for finance, HR, travel and customer teams.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.9, ease: EASE }} className="mt-10 flex flex-wrap items-center gap-3">
            <Button to="/contact" size="lg">Start a project</Button>
            <Button to="/products" variant="outline" size="lg">See our products</Button>
          </motion.div>
        </div>

        {/* the canvas sits behind/right of the headline and bleeds off the edge */}
        <div className="relative h-[340px] sm:h-[420px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[46%]">
          <DataField chartArea={[0.1, 0.94]} />
          <div className="pointer-events-none absolute left-[8%] top-6 font-mono text-[10px] uppercase tracking-[0.16em] text-muted/70 lg:top-10">
            input · unstructured
          </div>
          <div className="pointer-events-none absolute bottom-3 right-[4%] font-mono text-[10px] uppercase tracking-[0.16em] text-teal-ink">
            output · decision-ready ↗
          </div>
        </div>
      </div>

      {/* input → output ticker */}
      <div className="mt-16 border-y rule bg-paper/60 py-4 backdrop-blur-sm sm:mt-24">
        <Marquee>
          {transformations.map(([a, b]) => (
            <span key={a} className="flex items-center gap-4 px-7 font-mono text-[13px] text-muted">
              <span>{a}</span>
              <ArrowIcon className="size-3.5 text-teal-ink" />
              <span className="text-ink">{b}</span>
              <span className="ml-7 size-1.5 rounded-full bg-lime" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ STATEMENT */
function Statement() {
  return (
    <section className="container-x py-28 sm:py-40">
      <div className="grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-3"><Eyebrow className="text-muted">Who we are</Eyebrow></Reveal>
        <ScrollText
          className="font-display text-[clamp(1.7rem,3.4vw,3.1rem)] font-normal leading-[1.14] tracking-[-0.02em] lg:col-span-9"
          text="A team of data, AI and software engineers. We build the systems that read your documents, reconcile your numbers and answer your customers — then we stay on to run and improve them."
        />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ CAPABILITIES (bento) */
const VIZ = { ai: AgentFlowViz, analytics: ForecastViz, engagement: ChatViz, emerging: RagViz };
const SPAN = { ai: "lg:col-span-7", analytics: "lg:col-span-5", engagement: "lg:col-span-5", emerging: "lg:col-span-7" };

function Capabilities() {
  const onMove = useSpotlight();
  return (
    <section className="container-x pb-28 sm:pb-40">
      <SectionHeader
        eyebrow="What we build"
        title="Four practices, one *working* system."
        intro="Most projects use more than one: an agent needs data, a dashboard needs automation behind it. We build across all four so the pieces fit."
      />
      <div className="mt-14 grid gap-4 lg:grid-cols-12">
        {capabilities.map((c, i) => {
          const Viz = VIZ[c.id];
          return (
            <Reveal key={c.id} delay={i * 0.08} className={SPAN[c.id]}>
              <article onPointerMove={onMove} className="spotlight flex h-full flex-col rounded-3xl border border-ink/8 bg-white/55 p-6 sm:p-8">
                <div className="flex items-start justify-between gap-6">
                  <h3 className="text-2xl font-medium sm:text-[28px]">{c.title}</h3>
                  <span className="font-mono text-xs text-muted">0{i + 1}</span>
                </div>
                <div className="my-7 h-[180px] text-ink">{<Viz />}</div>
                <ul className="mt-auto flex flex-wrap gap-1.5">
                  {c.items.map((it) => (
                    <li key={it} className="rounded-full border border-ink/10 px-3 py-1 text-[13px] text-muted">{it}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ PRODUCTS (sticky story) */
function ProductStory() {
  const [active, setActive] = useState(0);
  return (
    <section className="relative bg-ink text-paper">
      <div className="grid-bg absolute inset-0" aria-hidden />
      <div className="container-x relative py-28 sm:py-36">
        <SectionHeader
          dark
          eyebrow="Products"
          title="Finance work that *runs* itself."
          intro="Four products for the most repetitive work in an accounts team — each one built from real client engagements and available inside the Analytx4t portal."
        />
        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          <div className="hidden lg:col-span-4 lg:block">
            <ol className="sticky top-32 space-y-1">
              {products.map((p, i) => (
                <li key={p.slug}>
                  <a href={`#story-${p.slug}`} className={`group flex items-baseline gap-4 rounded-xl py-3 transition-colors duration-500 ${active === i ? "text-paper" : "text-paper/35 hover:text-paper/70"}`}>
                    <span className="font-mono text-xs">0{i + 1}</span>
                    <span className="font-display text-2xl tracking-tight xl:text-3xl">{p.name}</span>
                    {active === i && <motion.span layoutId="story-dot" className="ml-auto size-2 self-center rounded-full bg-lime" />}
                  </a>
                </li>
              ))}
            </ol>
          </div>
          <div className="space-y-24 lg:col-span-8 lg:space-y-32">
            {products.map((p, i) => <StoryPanel key={p.slug} p={p} i={i} onActive={setActive} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

function StoryPanel({ p, i, onActive }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => { if (inView) onActive(i); }, [inView, i, onActive]);
  const Mock = mockFor[p.slug];
  return (
    <article ref={ref} id={`story-${p.slug}`} className="scroll-mt-32">
      <Reveal className="flex flex-wrap items-center gap-3">
        <span className="font-mono text-xs uppercase tracking-[0.16em] text-mist">{p.category}</span>
        <StatusPill status={p.status} />
      </Reveal>
      <Reveal as="h3" delay={0.05} className="mt-4 font-display text-4xl tracking-tight lg:hidden">{p.name}</Reveal>
      <Reveal delay={0.1} className="mt-4 max-w-2xl text-lg leading-relaxed text-mist">{p.summary}</Reveal>
      <Reveal delay={0.15} className="mt-6 flex flex-wrap items-center gap-2 font-mono text-[12px]">
        {p.flow.map((f, k) => (
          <span key={f} className="flex items-center gap-2">
            <span className={`rounded-full border px-3 py-1 ${k === p.flow.length - 1 ? "border-lime/40 text-lime" : "border-white/15 text-paper/80"}`}>{f}</span>
            {k < p.flow.length - 1 && <ArrowIcon className="size-3.5 text-mist" />}
          </span>
        ))}
      </Reveal>
      <Reveal delay={0.2} className="mt-8"><Mock /></Reveal>
    </article>
  );
}

/* ------------------------------------------------------------------ SERVICES (editorial index) */
function ServicesIndex() {
  return (
    <section className="container-x py-28 sm:py-40">
      <SectionHeader eyebrow="Services" title="Six ways we *work* with you." intro="From a single chatbot to a full platform — scoped to the process you want to change." />
      <div className="mt-14 border-t rule">
        {services.map((s, i) => (
          <Reveal key={s.id} delay={i * 0.04}>
            <Link to={`/services#${s.id}`} viewTransition className="group relative grid grid-cols-[3rem_1fr_auto] items-center gap-4 border-b rule py-7 sm:grid-cols-[5rem_1.2fr_1fr_auto] sm:py-9">
              <span aria-hidden className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-paper-2 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-y-100" />
              <span className="font-mono text-sm text-muted">{s.no}</span>
              <span className="font-display text-2xl tracking-tight transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-2 sm:text-4xl">{s.title}</span>
              <span className="hidden text-[15px] text-muted sm:block">{s.kicker}</span>
              <span className="grid size-11 place-items-center rounded-full border border-ink/12 transition-all duration-500 group-hover:-rotate-45 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
                <ArrowIcon />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ PROCESS (scroll-linked rail) */
function Process() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.6"] });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <section ref={ref} className="bg-paper-2/70 py-28 sm:py-36">
      <div className="container-x">
        <SectionHeader eyebrow="How an engagement runs" title="Working software in *weeks*, not quarters." />
        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-[7px] hidden h-px bg-ink/10 md:block" />
          <motion.div style={{ scaleX }} className="absolute left-0 right-0 top-[7px] hidden h-px origin-left bg-teal md:block" />
          <ol className="grid gap-10 md:grid-cols-4 md:gap-8">
            {process.map((s, i) => (
              <Reveal as="li" key={s.no} delay={i * 0.1} className="relative">
                <span className="relative z-10 block size-[15px] rounded-full border-2 border-teal bg-paper" />
                <div className="mt-6 font-mono text-xs text-muted">{s.no}</div>
                <h3 className="mt-2 text-2xl font-medium">{s.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ INDUSTRIES */
function Industries() {
  return (
    <section className="container-x py-28 sm:py-36">
      <Reveal><Eyebrow className="text-muted">Teams we build for</Eyebrow></Reveal>
      <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2 font-display text-[clamp(1.9rem,4.4vw,3.6rem)] leading-[1.15] tracking-[-0.03em]">
        {industries.map((ind, i) => (
          <Reveal key={ind} delay={i * 0.05} as="span" className="group inline-flex items-center gap-4">
            <span className="relative">
              {ind}
              <span className="absolute inset-x-0 bottom-[0.12em] -z-10 h-[0.32em] origin-left scale-x-0 bg-lime/70 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
            </span>
            {i < industries.length - 1 && <span className="text-ink/20">/</span>}
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ INSIGHTS */
function Insights() {
  return (
    <section className="container-x pb-28 sm:pb-36">
      <div className="flex items-end justify-between gap-6">
        <SectionHeader eyebrow="Insights" title="Notes from the *lab*." />
      </div>
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {insights.map((post, i) => (
          <Reveal key={post.title} delay={i * 0.08}>
            <a href={post.href} target="_blank" rel="noreferrer" className="group flex h-full flex-col rounded-3xl border border-ink/8 bg-white/50 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-ink/15 hover:bg-white hover:shadow-[0_24px_50px_-28px_rgb(11_26_51/0.35)]">
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                <span>{post.tag}</span><span>{post.date}</span>
              </div>
              <h3 className="mt-10 text-[22px] font-medium leading-snug">{post.title}</h3>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-10 text-sm text-teal-ink">
                Read on analytx4t.com <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ CTA */
export function CTA() {
  return (
    <section className="container-x pb-24">
      <Reveal className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-20 text-paper sm:px-14 sm:py-28">
        <div className="absolute inset-0 opacity-70"><DataField tone="dark" density={0.6} chartArea={[0.5, 0.97]} /></div>
        <div className="relative max-w-2xl">
          <Eyebrow className="text-mist">Start a project</Eyebrow>
          <h2 className="mt-6 text-[clamp(2.2rem,5vw,4.4rem)] font-medium leading-[1.02]">
            Have a process that eats <span className="accent-serif text-lime">hours</span> every month?
          </h2>
          <p className="mt-6 max-w-lg text-lg text-mist">Tell us what it is. We'll come back with how we'd automate it, what it would take, and a working prototype plan.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button to="/contact" variant="light" size="lg">Talk to us</Button>
            <Button to="/login" variant="outline-dark" size="lg" arrow={false}>Client login</Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
