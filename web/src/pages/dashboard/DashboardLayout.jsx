import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { PortalMark, EASE } from "../../components/ui";
import ProductGlyph from "../../components/ProductGlyph";
import { products } from "../../lib/products";

const GROUPS = [
  ["Products", products.filter((p) => p.status === "live")],
  ["Coming soon", products.filter((p) => p.status !== "live")],
];
import { getSession, logout } from "../../lib/auth";

export default function DashboardLayout() {
  const session = getSession();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(() => {
    try { return localStorage.getItem("a4t.sidebar") === "1"; } catch { return false; }
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => { try { localStorage.setItem("a4t.sidebar", collapsed ? "1" : "0"); } catch { /* ignore */ } }, [collapsed]);
  useEffect(() => setMobileOpen(false), [pathname]);

  const signOut = () => { logout(); navigate("/login", { replace: true, viewTransition: true }); };

  const sidebar = (isMobile) => (
    <Sidebar collapsed={!isMobile && collapsed} onToggle={() => setCollapsed((c) => !c)} session={session} onSignOut={signOut} isMobile={isMobile} />
  );

  return (
    <div className="flex h-dvh overflow-hidden bg-paper">
      {/* desktop sidebar */}
      <motion.div
        animate={{ width: collapsed ? 84 : 288 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="hidden shrink-0 lg:block"
      >
        {sidebar(false)}
      </motion.div>

      {/* mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)} />
            <motion.div className="fixed inset-y-0 left-0 z-50 w-[288px] lg:hidden" initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ duration: 0.45, ease: EASE }}>
              {sidebar(true)}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* mobile top bar */}
        <div className="flex h-14 shrink-0 items-center justify-between border-b rule px-4 lg:hidden">
          <button onClick={() => setMobileOpen(true)} className="grid size-10 place-items-center rounded-lg hover:bg-ink/5" aria-label="Open navigation">
            <svg viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M3 6h14M3 10h14M3 14h9" /></svg>
          </button>
          <PortalMark light={false} />
          <span className="w-10" />
        </div>
        <main className="min-h-0 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function Sidebar({ collapsed, onToggle, session, onSignOut, isMobile }) {
  const item = ({ isActive }) =>
    `group relative flex h-11 items-center gap-3 rounded-xl px-3 text-[14.5px] transition-colors ${isActive ? "text-paper" : "text-mist hover:text-paper"}`;
  const activeId = isMobile ? "side-active-m" : "side-active";

  return (
    <aside className="relative isolate flex h-full flex-col overflow-hidden bg-ink px-3 py-5 text-paper">
      <div className="grid-bg absolute inset-0 -z-10 opacity-50" aria-hidden />
      <div className={`flex items-center ${collapsed ? "justify-center" : "justify-between px-2"}`}>
        <PortalMark collapsed={collapsed} />
        {!isMobile && !collapsed && <CollapseBtn onClick={onToggle} collapsed={collapsed} />}
      </div>
      {!isMobile && collapsed && <div className="mt-3 flex justify-center"><CollapseBtn onClick={onToggle} collapsed={collapsed} /></div>}

      <nav className="mt-8 flex-1 space-y-1 overflow-y-auto" aria-label="Portal">
        <NavLink to="/dashboard" end viewTransition className={item} title="Overview">
          {(s) => (<><SideActive isActive={s.isActive} id={activeId} /><span className="grid size-7 shrink-0 place-items-center"><ProductGlyph name="overview" /></span><SideLabel collapsed={collapsed}>Overview</SideLabel></>)}
        </NavLink>

        {GROUPS.map(([group, list]) => (
          <div key={group} className="space-y-1">
            <div className={`pb-2 pt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-mist/60 ${collapsed ? "text-center" : "px-3"}`}>
              {collapsed ? "—" : group}
            </div>
            {list.map((p) => (
              <NavLink key={p.slug} to={`/dashboard/${p.slug}`} viewTransition className={item} title={p.name}>
                {(s) => (
                  <>
                    <SideActive isActive={s.isActive} id={activeId} />
                    <span className="relative grid size-7 shrink-0 place-items-center">
                      <ProductGlyph name={p.slug} />
                      <span className={`absolute -right-0.5 -top-0.5 size-1.5 rounded-full ${p.status === "live" ? "bg-lime" : "bg-white/25"}`} />
                    </span>
                    <SideLabel collapsed={collapsed}>{p.shortName || p.name}</SideLabel>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className={`mt-4 flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] p-2.5 ${collapsed ? "flex-col" : ""}`}>
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-teal font-mono text-xs font-semibold text-ink">PT</span>
        {!collapsed && (
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm">{session?.name}</div>
            <div className="truncate font-mono text-[11px] text-mist">{session?.email}</div>
          </div>
        )}
        <button onClick={onSignOut} className="grid size-9 shrink-0 place-items-center rounded-lg text-mist transition-colors hover:bg-white/8 hover:text-paper" title="Sign out" aria-label="Sign out">
          <svg viewBox="0 0 20 20" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M8 4H5.5A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8M12 13.5 15.5 10 12 6.5M15.5 10H8" /></svg>
        </button>
      </div>
    </aside>
  );
}

function SideLabel({ collapsed, children }) {
  return (
    <AnimatePresence initial={false}>
      {!collapsed && (
        <motion.span initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -6 }} transition={{ duration: 0.25 }} className="truncate">
          {children}
        </motion.span>
      )}
    </AnimatePresence>
  );
}

function SideActive({ isActive, id }) {
  if (!isActive) return null;
  return <motion.span layoutId={id} className="absolute inset-0 -z-10 rounded-xl bg-white/[0.08] ring-1 ring-white/10" transition={{ type: "spring", stiffness: 400, damping: 34 }} />;
}

function CollapseBtn({ onClick, collapsed }) {
  return (
    <button onClick={onClick} className="grid size-8 place-items-center rounded-lg text-mist transition-colors hover:bg-white/8 hover:text-paper" aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
      <svg viewBox="0 0 20 20" className={`size-[18px] transition-transform duration-500 ${collapsed ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3.5" width="14" height="13" rx="2.5" /><path d="M8 3.5v13M13 8.5 11 10l2 1.5" />
      </svg>
    </button>
  );
}
