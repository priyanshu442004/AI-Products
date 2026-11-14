import PageHero from "../components/PageHero";
import StatusPill from "../components/StatusPill";
import { Button, Reveal } from "../components/ui";
import { mockFor, SoonMock } from "../components/viz/ProductMocks";
import { CTA } from "./Home";
import { products, liveProducts } from "../lib/products";

export default function Products() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Ten workflows for the *accounts* team."
        intro={`Each product automates one recurring piece of finance work end to end. ${liveProducts.length} are live inside the Workflow Automation portal; the rest are coming soon.`}
        aside={<div className="mt-6"><Button to="/login" size="md">Open the portal</Button></div>}
        index={products.map((p, i) => <a key={p.slug} href={`#${p.slug}`} className="link-draw hover:text-ink">{String(i + 1).padStart(2, "0")} {p.shortName || p.name}</a>)}
      />

      <section className="bg-ink text-paper">
        <div className="container-x divide-y divide-white/10">
          {products.map((p, i) => {
            const Mock = mockFor[p.slug] || (() => <SoonMock p={p} />);
            return (
              <article id={p.slug} key={p.slug} className="grid scroll-mt-24 gap-12 py-20 sm:py-28 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <Reveal className="flex items-center gap-3">
                    <span className="font-mono text-xs text-mist">{String(i + 1).padStart(2, "0")} · {p.category}</span>
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
                      : <Button to="/signup" variant="outline-dark">Sign up for early access</Button>}
                  </Reveal>
                </div>
                <Reveal delay={0.1} className="lg:col-span-7 lg:pt-10"><Mock /></Reveal>
              </article>
            );
          })}
        </div>
      </section>

      <CTA />
    </>
  );
}
