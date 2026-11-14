import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Button, Logo, EASE } from "./ui";
import { company } from "../lib/content";

const links = [
  { to: "/services", label: "Services" },
  { to: "/products", label: "Products" },
];

export default function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const { pathname } = useLocation();

  // Hide while scrolling down, reveal on any upward scroll.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > prev && y > 240 && !open);
  });

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.5, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5"
      >
        <div
          className={`container-x flex h-16 items-center justify-between rounded-2xl transition-all duration-500 ${
            scrolled ? "border border-ink/8 bg-paper/75 shadow-[0_8px_30px_-12px_rgb(11_26_51/0.18)] backdrop-blur-xl" : "border border-transparent"
          }`}
        >
          <Link to="/" viewTransition aria-label="Agarwal & Saxena home" className="shrink-0">
            <Logo className="h-8 sm:h-9" />
          </Link>

          <nav className="hidden items-center md:flex" onMouseLeave={() => setHovered(null)} aria-label="Primary">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                viewTransition
                onMouseEnter={() => setHovered(l.to)}
                className={({ isActive }) => `relative px-4 py-2 text-[15px] transition-colors ${isActive ? "text-ink" : "text-muted hover:text-ink"}`}
              >
                {({ isActive }) => (
                  <>
                    {hovered === l.to && (
                      <motion.span layoutId="nav-hover" className="absolute inset-0 -z-10 rounded-full bg-ink/6" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                    )}
                    {l.label}
                    {isActive && <motion.span layoutId="nav-active" className="absolute bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-teal" />}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Link to="/login" viewTransition className="px-4 py-2 text-[15px] text-muted transition-colors hover:text-ink">
              Sign in
            </Link>
            <Button to="/signup" size="sm">Sign up</Button>
          </div>

          <button
            onClick={() => setOpen((o) => !o)}
            className="relative grid size-11 place-items-center rounded-full md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span className={`absolute h-[1.5px] w-5 bg-ink transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[4px]"}`} />
            <span className={`absolute h-[1.5px] w-5 bg-ink transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[4px]"}`} />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu: full-screen sheet, links rise in sequence */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-paper px-6 pb-8 pt-28 md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <nav className="flex flex-col" aria-label="Mobile">
              {[{ to: "/", label: "Home" }, ...links, { to: "/login", label: "Sign in" }, { to: "/signup", label: "Sign up" }].map((l, i) => (
                <motion.div key={l.to} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease: EASE }}>
                  <Link to={l.to} viewTransition className="flex items-baseline justify-between border-b rule py-4 font-display text-4xl tracking-tight">
                    {l.label}
                    <span className="font-mono text-xs text-muted">0{i + 1}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <p className="mt-auto font-mono text-[11px] uppercase tracking-[0.16em] text-muted">{company.legal}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
