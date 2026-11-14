import { useRef } from "react";
import { Link } from "react-router";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

export const EASE = [0.16, 1, 0.3, 1];

/* ---------------- Reveal: fade + rise + de-blur when scrolled into view ---------------- */
export function Reveal({ as = "div", delay = 0, y = 18, className, children, ...rest }) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </M>
  );
}

/* ---------------- SplitHeading: each word rises out of a clipping mask ----------------
   `text` may contain *word* to set that word in the italic serif accent. */
export function SplitHeading({ text, as = "h2", className, delay = 0, stagger = 0.06, inView = true }) {
  const Tag = motion[as];
  const words = text.split(" ");
  const anim = inView
    ? { initial: "hidden", whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } }
    : { initial: "hidden", animate: "show" };
  return (
    <Tag className={className} {...anim} transition={{ staggerChildren: stagger, delayChildren: delay }} aria-label={text.replaceAll("*", "")}>
      {words.map((w, i) => {
        const accent = w.startsWith("*") && w.includes("*", 1);
        const clean = w.replaceAll("*", "");
        return (
          <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
            <motion.span
              className={`inline-block ${accent ? "accent-serif text-teal-ink" : ""}`}
              variants={{ hidden: { y: "105%" }, show: { y: "0%", transition: { duration: 1, ease: EASE } } }}
            >
              {clean}
            </motion.span>
            {i < words.length - 1 && " "}
          </span>
        );
      })}
    </Tag>
  );
}

/* ---------------- Magnetic button: follows the cursor a few px, arrow slides ---------------- */
export function Button({ to, href, variant = "primary", size = "md", children, className = "", arrow = true, ...rest }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (e) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.18);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.28);
  };
  const reset = () => { x.set(0); y.set(0); };

  const variants = {
    primary: "bg-ink text-paper hover:text-ink [--fill:var(--color-lime)]",
    light: "bg-paper text-ink hover:text-ink [--fill:var(--color-lime)]",
    outline: "border border-current/25 text-current hover:text-ink [--fill:var(--color-paper)]",
    "outline-dark": "border border-white/20 text-paper hover:text-ink [--fill:var(--color-paper)]",
  };
  const sizes = { md: "h-12 px-6 text-[15px]", lg: "h-14 px-7 text-base", sm: "h-10 px-4 text-sm" };

  const inner = (
    <>
      {/* fill wipes up from the bottom on hover */}
      <span aria-hidden className="absolute inset-0 -z-10 translate-y-[101%] rounded-[inherit] bg-[var(--fill)] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0" />
      <span className="relative">{children}</span>
      {arrow && (
        <span aria-hidden className="relative grid size-5 place-items-center overflow-hidden">
          <ArrowIcon className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-5" />
          <ArrowIcon className="absolute size-4 -translate-x-5 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-0" />
        </span>
      )}
    </>
  );
  const cls = `group relative isolate inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full font-medium tracking-[-0.01em] transition-colors duration-300 ${variants[variant]} ${sizes[size]} ${className}`;
  const El = to ? Link : href ? "a" : "button";
  const linkProps = to ? { to, viewTransition: true } : href ? { href } : {};

  return (
    <motion.span ref={ref} style={{ x, y }} onPointerMove={onMove} onPointerLeave={reset} className={`inline-flex ${className.includes("w-full") ? "w-full" : ""}`}>
      <El className={cls} {...linkProps} {...rest}>{inner}</El>
    </motion.span>
  );
}

/* ---------------- Spotlight: writes cursor position into CSS vars ---------------- */
export function useSpotlight() {
  return (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
}

/* ---------------- Marquee ---------------- */
export function Marquee({ children, className = "" }) {
  return (
    <div className={`group/marquee marquee-mask overflow-hidden ${className}`}>
      <div className="animate-marquee flex w-max">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>{children}</div>
      </div>
    </div>
  );
}

export function Eyebrow({ children, className = "" }) {
  return <span className={`eyebrow ${className}`}>{children}</span>;
}

export function SectionHeader({ eyebrow, title, intro, dark = false, className = "" }) {
  return (
    <div className={`grid gap-8 lg:grid-cols-12 lg:items-end ${className}`}>
      <div className="lg:col-span-7">
        <Reveal><Eyebrow className={dark ? "text-mist" : "text-muted"}>{eyebrow}</Eyebrow></Reveal>
        <SplitHeading text={title} className="mt-5 text-[clamp(2.1rem,4.6vw,4rem)] font-medium leading-[1.02]" />
      </div>
      {intro && (
        <Reveal delay={0.15} className={`text-[17px] leading-relaxed lg:col-span-4 lg:col-start-9 ${dark ? "text-mist" : "text-muted"}`}>
          {intro}
        </Reveal>
      )}
    </div>
  );
}

/* ---------------- Icons (hand-drawn set, consistent 1.6 stroke) ---------------- */
export function ArrowIcon({ className = "size-4", ...p }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} {...p}>
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}
export function ArrowUpRight({ className = "size-4", ...p }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} {...p}>
      <path d="M5 11 11 5M6 5h5v5" />
    </svg>
  );
}

/* Brand logo — Agarwal & Saxena, Chartered Accountants (vector, crisp at any size).
   `light` uses the white-ink version for navy grounds. */
export function Logo({ className = "h-9", light = false }) {
  return (
    <img
      src={light ? "/agarwal-saxena-logo-light.svg" : "/agarwal-saxena-logo.svg"}
      alt="Agarwal & Saxena — Chartered Accountants"
      className={`w-auto ${className}`}
      width="2600" height="350"
    />
  );
}

/* Portal wordmark shown top-left once signed in. */
export function PortalMark({ light = true, collapsed = false }) {
  if (collapsed) return <img src="/favicon.svg" alt="Workflow Automation" className="size-10 rounded-xl" />;
  return (
    <span className="flex items-center gap-3">
      <img src="/favicon.svg" alt="" className="size-10 shrink-0 rounded-xl" />
      <span className="leading-tight">
        <span className={`block font-display text-[17px] font-medium tracking-[-0.01em] ${light ? "text-paper" : "text-ink"}`}>Workflow Automation</span>
        <span className={`block font-mono text-[10px] uppercase tracking-[0.14em] ${light ? "text-mist" : "text-muted"}`}>Agarwal &amp; Saxena</span>
      </span>
    </span>
  );
}
