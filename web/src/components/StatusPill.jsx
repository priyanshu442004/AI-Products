const STYLES = {
  dark: { live: "bg-lime/15 text-lime", building: "bg-white/8 text-mist" },
  light: { live: "bg-teal-ink/10 text-teal-ink", building: "bg-ink/6 text-muted" },
};

export default function StatusPill({ status, dark = true, className = "" }) {
  const live = status === "live";
  const tone = STYLES[dark ? "dark" : "light"][live ? "live" : "building"];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] ${tone} ${className}`}>
      <span className={`size-1.5 rounded-full bg-current ${live ? "pulse-dot" : "opacity-60"}`} />
      {live ? "Live" : "Coming soon"}
    </span>
  );
}
