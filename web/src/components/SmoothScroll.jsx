import { useEffect } from "react";
import { useLocation } from "react-router";
import Lenis from "lenis";

let lenis = null;
export const getLenis = () => lenis;

/**
 * Lenis inertial scrolling for marketing pages only (dashboards keep native
 * scroll). Disabled when the user prefers reduced motion. Resets to top on
 * route change, or scrolls to #hash targets.
 */
export default function SmoothScroll() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.95, anchors: { offset: -90 } });
    let id;
    const raf = (t) => { lenis?.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis?.destroy(); lenis = null; };
  }, []);

  useEffect(() => {
    if (hash) {
      // wait a frame so the target section is mounted after a route change
      requestAnimationFrame(() => {
        const el = document.querySelector(hash);
        if (!el) return;
        if (lenis) lenis.scrollTo(el, { offset: -90 });
        else el.scrollIntoView();
      });
      return;
    }
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
