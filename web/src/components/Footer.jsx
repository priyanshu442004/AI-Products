import { Link } from "react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { company, services } from "../lib/content";
import { products } from "../lib/products";
import { ArrowUpRight, Logo } from "./ui";

export default function Footer() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  // the oversized wordmark slides up into place as the footer is revealed
  const y = useTransform(scrollYProgress, [0, 1], ["35%", "0%"]);

  return (
    <footer ref={ref} className="relative overflow-hidden bg-ink text-paper">
      <div className="grid-bg absolute inset-0 opacity-60" aria-hidden />
      <div className="container-x relative pt-20 sm:pt-28">
        <div className="grid gap-12 border-b rule-dark pb-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo className="h-9" light />
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-mist">
              AI agents, analytics and full-stack applications that turn raw business data into finished work.
            </p>
            <div className="mt-8 space-y-1.5 text-[15px]">
              <a href={`mailto:${company.email}`} className="link-draw block w-fit">{company.email}</a>
              {company.phones.map((p) => (
                <a key={p} href={`tel:${p.replaceAll(" ", "")}`} className="link-draw block w-fit text-mist hover:text-paper">{p}</a>
              ))}
            </div>
          </div>

          <FooterCol title="Services" className="lg:col-span-3 lg:col-start-6">
            {services.map((s) => (
              <Link key={s.id} to={`/services#${s.id}`} viewTransition className="link-draw w-fit text-mist hover:text-paper">{s.title}</Link>
            ))}
          </FooterCol>
          <FooterCol title="Products" className="lg:col-span-2">
            {products.map((p) => (
              <Link key={p.slug} to={`/products#${p.slug}`} viewTransition className="link-draw w-fit text-mist hover:text-paper">{p.name}</Link>
            ))}
          </FooterCol>
          <FooterCol title="Company" className="lg:col-span-2">
            <Link to="/about" viewTransition className="link-draw w-fit text-mist hover:text-paper">About</Link>
            <Link to="/contact" viewTransition className="link-draw w-fit text-mist hover:text-paper">Contact</Link>
            <Link to="/login" viewTransition className="link-draw w-fit text-mist hover:text-paper">Client login</Link>
            {company.socials.slice(0, 3).map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="group inline-flex w-fit items-center gap-1 text-mist hover:text-paper">
                {s.label}<ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ))}
          </FooterCol>
        </div>

        <div className="flex flex-col gap-3 py-6 font-mono text-[11px] uppercase tracking-[0.14em] text-mist sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} {company.legal}</span>
          <span>{company.offices.map((o) => o.lines[0]).join("  ·  ")}</span>
        </div>
      </div>

      {/* oversized wordmark, cropped by the viewport edge */}
      <motion.div style={{ y }} aria-hidden className="pointer-events-none relative select-none whitespace-nowrap text-center font-display font-semibold leading-[0.78] tracking-[-0.06em] text-[clamp(5rem,22vw,22rem)]">
        <span className="bg-gradient-to-b from-paper/[0.14] to-paper/[0.02] bg-clip-text text-transparent">analytx4t</span>
      </motion.div>
    </footer>
  );
}

function FooterCol({ title, children, className = "" }) {
  return (
    <div className={className}>
      <h3 className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-mist/70">{title}</h3>
      <div className="flex flex-col gap-2.5 text-[15px]">{children}</div>
    </div>
  );
}
