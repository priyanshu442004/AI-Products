import { useEffect, useRef } from "react";

/**
 * "Analytics for Transformation", as motion: a field of scattered data points
 * sweeps into an ordered dot-matrix chart; every few seconds the dataset
 * refreshes and points flow to the new shape. Cursor gently repels points.
 * Pure canvas 2D — no WebGL, ~2–4k points, paused when off-screen.
 */
const PALETTES = {
  light: { dot: "29,122,115", ambient: "11,26,51", hi: "130,170,40", line: "29,122,115", grid: "11,26,51" },
  dark: { dot: "79,179,172", ambient: "154,167,189", hi: "181,214,97", line: "181,214,97", grid: "255,255,255" },
};

function rng(seed) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

function makeDataset(cols, seed) {
  const r = rng(seed);
  const shape = seed % 3; // growth · seasonal · recovery
  return Array.from({ length: cols }, (_, i) => {
    const t = i / (cols - 1);
    let v =
      shape === 0 ? 0.16 + 0.78 * Math.pow(t, 1.5)
      : shape === 1 ? 0.35 + 0.28 * Math.sin(t * Math.PI * 2.2) + 0.3 * t
      : 0.55 - 0.35 * Math.sin(t * Math.PI) + 0.38 * t;
    v += (r() - 0.5) * 0.12;
    return Math.min(1, Math.max(0.08, v));
  });
}

export default function DataField({ className = "", tone = "light", density = 1, chartArea = [0.06, 0.94] }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const C = PALETTES[tone];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, cols = 0, rowsMax = 0, step = 0, x0 = 0, base = 0;
    let parts = [];
    let tops = [];
    let seed = 7;
    let lineStart = 0;
    let raf = 0;
    let visible = true;
    const pointer = { x: -1e4, y: -1e4 };

    function geometry() {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const [a, b] = chartArea;
      const cw = w * (b - a);
      cols = Math.max(8, Math.min(22, Math.round(cw / 44)));
      step = Math.max(5, Math.min(10, cw / cols / 3.2));
      x0 = w * a;
      base = h * 0.86;
      rowsMax = Math.floor((h * 0.68) / step);
    }

    function slotsFor(data) {
      const colW = (w * (chartArea[1] - chartArea[0])) / cols;
      const slots = [];
      tops = [];
      data.forEach((v, c) => {
        const rows = Math.max(2, Math.round(v * rowsMax));
        const cx = x0 + c * colW + colW / 2;
        for (let k = 0; k < 2; k++) {
          for (let r = 0; r < rows; r++) {
            slots.push({ x: cx + (k - 0.5) * step, y: base - r * step, top: r === rows - 1, c });
          }
        }
        tops.push({ x: cx, y: base - (rows - 1) * step });
      });
      return slots;
    }

    function assign(firstTime) {
      const data = makeDataset(cols, seed);
      const slots = slotsFor(data).sort((p, q) => p.x - q.x || q.y - p.y);
      const order = [...parts].sort((p, q) => p.x - q.x);
      const now = performance.now();
      order.forEach((p, i) => {
        const s = slots[i];
        if (s) {
          p.tx = s.x; p.ty = s.y; p.top = s.top; p.slot = true;
          p.delay = (firstTime ? 450 : 0) + ((s.x - x0) / w) * 1100 + Math.random() * 260;
        } else {
          p.slot = false; p.top = false; p.delay = 0;
          p.hx = Math.random() * w; p.hy = Math.random() * h;
        }
        p.t0 = now;
      });
      lineStart = now + (firstTime ? 1900 : 1300);
    }

    function init() {
      geometry();
      const maxSlots = cols * 2 * rowsMax;
      const ambient = Math.round(((w * h) / 9000) * density);
      const n = Math.round(maxSlots * 0.62) + ambient;
      parts = Array.from({ length: n }, () => {
        const x = Math.random() * w, y = Math.random() * h;
        return { x, y, vx: 0, vy: 0, hx: x, hy: y, ph: Math.random() * Math.PI * 2, tx: x, ty: y, slot: false, top: false, delay: 0, t0: 0 };
      });
      assign(true);
      if (reduce) parts.forEach((p) => { if (p.slot) { p.x = p.tx; p.y = p.ty; } });
    }

    function draw(now) {
      ctx.clearRect(0, 0, w, h);

      // baseline + faint gridlines
      ctx.strokeStyle = `rgba(${C.grid},0.08)`;
      ctx.lineWidth = 1;
      for (let i = 1; i <= 4; i++) {
        const y = Math.round(base - (rowsMax * step * i) / 4) + 0.5;
        ctx.beginPath(); ctx.setLineDash([2, 5]); ctx.moveTo(x0, y); ctx.lineTo(w * chartArea[1], y); ctx.stroke();
      }
      ctx.setLineDash([]);
      ctx.strokeStyle = `rgba(${C.grid},0.18)`;
      ctx.beginPath(); ctx.moveTo(x0, Math.round(base + step) + 0.5); ctx.lineTo(w * chartArea[1], Math.round(base + step) + 0.5); ctx.stroke();

      const t = now / 1000;
      for (const p of parts) {
        if (!reduce) {
          const active = now - p.t0 > p.delay;
          if (p.slot && active) {
            p.vx += (p.tx - p.x) * 0.055; p.vy += (p.ty - p.y) * 0.055;
            p.vx *= 0.76; p.vy *= 0.76;
          } else {
            // ambient wander around a home point
            const gx = p.hx + Math.sin(t * 0.35 + p.ph) * 18, gy = p.hy + Math.cos(t * 0.3 + p.ph) * 14;
            p.vx += (gx - p.x) * 0.004; p.vy += (gy - p.y) * 0.004;
            p.vx *= 0.94; p.vy *= 0.94;
          }
          const dx = p.x - pointer.x, dy = p.y - pointer.y, d2 = dx * dx + dy * dy;
          if (d2 < 8100) { const f = (1 - d2 / 8100) * 2.4; const d = Math.sqrt(d2) || 1; p.vx += (dx / d) * f; p.vy += (dy / d) * f; }
          p.x += p.vx; p.y += p.vy;
        }
        if (p.slot) {
          const settled = Math.min(1, Math.max(0, 1 - Math.hypot(p.tx - p.x, p.ty - p.y) / 120));
          if (p.top) {
            ctx.fillStyle = `rgba(${C.hi},${0.55 + settled * 0.45})`;
            ctx.beginPath(); ctx.arc(p.x, p.y, step * 0.3, 0, 6.283); ctx.fill();
          } else {
            ctx.fillStyle = `rgba(${C.dot},${0.25 + settled * 0.6})`;
            ctx.fillRect(p.x - step * 0.19, p.y - step * 0.19, step * 0.38, step * 0.38);
          }
        } else {
          ctx.fillStyle = `rgba(${C.ambient},0.16)`;
          ctx.fillRect(p.x, p.y, 1.6, 1.6);
        }
      }

      // trend line through column tops, drawn progressively once bars settle
      const prog = reduce ? 1 : Math.min(1, Math.max(0, (now - lineStart) / 1400));
      if (prog > 0 && tops.length > 1) {
        const segs = (tops.length - 1) * prog;
        ctx.strokeStyle = `rgba(${C.line},0.9)`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(tops[0].x, tops[0].y - step * 1.4);
        for (let i = 1; i <= Math.floor(segs); i++) ctx.lineTo(tops[i].x, tops[i].y - step * 1.4);
        const f = segs % 1, i = Math.floor(segs);
        if (f > 0 && tops[i + 1]) ctx.lineTo(tops[i].x + (tops[i + 1].x - tops[i].x) * f, tops[i].y - step * 1.4 + (tops[i + 1].y - tops[i].y) * f);
        ctx.stroke();
      }
    }

    let nextSwap = performance.now() + 6500;
    function loop(now) {
      if (visible) {
        if (now > nextSwap) { seed += 1; assign(false); nextSwap = now + 6500; }
        draw(now);
      }
      raf = requestAnimationFrame(loop);
    }

    init();
    if (reduce) draw(performance.now());
    else raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => { init(); if (reduce) draw(performance.now()); });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(canvas);
    const onMove = (e) => { const r = canvas.getBoundingClientRect(); pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top; };
    const onLeave = () => { pointer.x = pointer.y = -1e4; };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- depend on values, not the array identity
  }, [tone, density, chartArea[0], chartArea[1]]);

  return <canvas ref={ref} className={`block h-full w-full ${className}`} aria-hidden />;
}
