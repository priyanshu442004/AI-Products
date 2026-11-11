import PageHero from "../components/PageHero";
import { Reveal, SectionHeader, useSpotlight } from "../components/ui";
import { CTA } from "./Home";
import { services, capabilities, benefits } from "../lib/content";

export default function Services() {
  const onMove = useSpotlight();
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Built around the *process*, not the buzzword."
        intro="Six service lines covering the full path from raw data to software people use every day. Most engagements combine two or three."
        index={services.map((s) => (
          <a key={s.id} href={`#${s.id}`} className="link-draw hover:text-ink">{s.no} {s.title}</a>
        ))}
      />

      {/* six services as spec sheets */}
      <section className="container-x py-20 sm:py-28">
        {services.map((s) => (
          <article id={s.id} key={s.id} className="grid scroll-mt-28 gap-8 border-b rule py-14 first:pt-0 lg:grid-cols-12 lg:gap-10 lg:py-20">
            <Reveal className="lg:col-span-1"><span className="font-mono text-sm text-muted">{s.no}</span></Reveal>
            <div className="lg:col-span-6">
              <Reveal as="p" className="font-mono text-xs uppercase tracking-[0.16em] text-teal-ink">{s.kicker}</Reveal>
              <Reveal as="h2" delay={0.05} className="mt-3 text-[clamp(2rem,4vw,3.4rem)] font-medium leading-[1.02]">{s.title}</Reveal>
              <Reveal as="p" delay={0.1} className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{s.summary}</Reveal>
            </div>
            <Reveal delay={0.15} className="lg:col-span-5">
              <div onPointerMove={onMove} className="spotlight rounded-3xl border border-ink/8 bg-white/55 p-6 sm:p-8">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">What's included</h3>
                <ul className="mt-4 divide-y divide-ink/8">
                  {s.includes.map((it) => (
                    <li key={it} className="flex items-center gap-3 py-3 text-[15px]">
                      <span className="size-1.5 rounded-full bg-teal" />{it}
                    </li>
                  ))}
                </ul>
                <h3 className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Typical stack</h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {s.stack.map((t) => <span key={t} className="rounded-md bg-paper-2 px-2.5 py-1 font-mono text-[12px]">{t}</span>)}
                </div>
              </div>
            </Reveal>
          </article>
        ))}
      </section>

      {/* capability matrix */}
      <section className="bg-ink py-28 text-paper sm:py-36">
        <div className="container-x">
          <SectionHeader dark eyebrow="Capability map" title="Everything we *ship*, in one view." />
          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((c, i) => (
              <Reveal key={c.id} delay={i * 0.06} className="bg-ink p-7">
                <div className="font-mono text-xs text-mist">0{i + 1}</div>
                <h3 className="mt-3 text-xl font-medium">{c.title}</h3>
                <ul className="mt-6 space-y-2.5 text-[15px] text-mist">
                  {c.items.map((it) => <li key={it} className="flex gap-2.5"><span className="mt-2 size-1 shrink-0 rounded-full bg-lime" />{it}</li>)}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* outcomes */}
      <section className="container-x py-28 sm:py-36">
        <SectionHeader eyebrow="Why it matters" title="What changes for your *team*." />
        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={(i % 3) * 0.08} className="border-t rule pt-6">
              <h3 className="text-2xl font-medium">{b.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{b.body}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
