import { Link } from "react-router";
import PageHero from "../components/PageHero";
import StatusPill from "../components/StatusPill";
import { Button, Reveal, SectionHeader, ArrowIcon, useSpotlight } from "../components/ui";
import { mockFor } from "../components/viz/ProductMocks";
import { CTA } from "./Home";
import { products } from "../lib/products";
import { labProducts } from "../lib/content";

export default function Products() {
  const onMove = useSpotlight();
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Four tools for the *accounts* team."
        intro="Each product automates one recurring piece of finance work end to end. Clients use them inside the Analytx4t portal."
        aside={<div className="mt-6"><Button to="/login" size="md">Open the portal</Button></div>}
        index={products.map((p, i) => <a key={p.slug} href={`#${p.slug}`} className="link-draw hover:text-ink">0{i + 1} {p.name}</a>)}
      />

      <section className="bg-ink text-paper">
        <div className="container-x divide-y divide-white/10">
          {products.map((p, i) => {
            const Mock = mockFor[p.slug];
            return (
              <article id={p.slug} key={p.slug} className="grid scroll-mt-24 gap-12 py-20 sm:py-28 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <Reveal className="flex items-center gap-3">
                    <span className="font-mono text-xs text-mist">0{i + 1} · {p.category}</span>
                    <StatusPill status={p.status} />
                  </Reveal>
                  <Reveal as="h2" delay={0.05} className="mt-5 text-[clamp(2.2rem,4vw,3.6rem)] font-medium leading-[1]">{p.name}</Reveal>
                  <Reveal as="p" delay={0.1} className="mt-6 text-lg leading-relaxed text-mist">{p.summary}</Reveal>
                  <Reveal delay={0.15}>
                    <ul className="mt-8 grid grid-cols-1 gap-x-6 sm:grid-cols-2">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-center gap-2.5 border-b border-white/8 py-3 text-[15px]">
                          <span className="size-1.5 rounded-full bg-lime" />{f}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                  <Reveal delay={0.2} className="mt-8">
                    {p.status === "live"
                      ? <Button to={`/dashboard/${p.slug}`} variant="light">Launch {p.name}</Button>
                      : <Button to="/contact" variant="outline-dark">Request early access</Button>}
                  </Reveal>
                </div>
                <Reveal delay={0.1} className="lg:col-span-7 lg:pt-10"><Mock /></Reveal>
              </article>
            );
          })}
        </div>
      </section>

      <section className="container-x py-28 sm:py-36">
        <SectionHeader eyebrow="From the lab" title="Experiments that became *products*." intro="AI products we've designed beyond finance — evaluation, hiring and financial health." />
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {labProducts.map((lp, i) => (
            <Reveal key={lp.name} delay={i * 0.08}>
              <article onPointerMove={onMove} className="spotlight flex h-full flex-col rounded-3xl border border-ink/8 bg-white/55 p-7">
                <span className="font-mono text-xs text-muted">L{i + 1}</span>
                <h3 className="mt-6 text-3xl font-medium">{lp.name}</h3>
                <p className="mt-2 text-[17px] text-ink">{lp.line}</p>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">{lp.body}</p>
                <Link to="/contact" viewTransition className="group mt-auto inline-flex items-center gap-2 pt-8 text-sm text-teal-ink">Ask for a demo <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" /></Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
