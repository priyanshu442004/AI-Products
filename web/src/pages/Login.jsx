import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { AnimatePresence, motion, useAnimationControls } from "motion/react";
import AuthShell from "../components/AuthShell";
import { Button, EASE } from "../components/ui";
import { Field } from "../components/Field";
import { login } from "../lib/auth";

export default function Login() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const shake = useAnimationControls();

  const submit = async (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true);
    await new Promise((r) => setTimeout(r, 450)); // brief, deliberate feedback
    const res = login(String(f.get("email")), String(f.get("password")));
    setBusy(false);
    if (!res.ok) {
      setError(res.error);
      shake.start({ x: [0, -10, 9, -6, 4, 0], transition: { duration: 0.45 } });
      return;
    }
    const next = params.get("next");
    navigate(next && next.startsWith("/dashboard") ? next : "/dashboard", { replace: true, viewTransition: true });
  };

  return (
    <AuthShell>
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}>
        <h1 className="text-[2.6rem] font-medium leading-[1.02] tracking-[-0.03em]">Welcome back.</h1>
        <p className="mt-3 text-muted">Sign in to open your Workflow Automation products.</p>

        <motion.form animate={shake} onSubmit={submit} className="mt-10 space-y-7" noValidate>
          <Field name="email" type="email" label="Email" autoComplete="username" required onChange={() => setError("")} />
          <div className="relative">
            <Field name="password" type={show ? "text" : "password"} label="Password" autoComplete="current-password" required onChange={() => setError("")} />
            <button type="button" onClick={() => setShow((s) => !s)} className="absolute bottom-2.5 right-0 font-mono text-[11px] uppercase tracking-wider text-muted hover:text-ink">
              {show ? "Hide" : "Show"}
            </button>
          </div>
          <AnimatePresence>
            {error && (
              <motion.p role="alert" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-sm text-[#b42318]">
                {error}
              </motion.p>
            )}
          </AnimatePresence>
          <Button type="submit" size="lg" className="w-full" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</Button>
        </motion.form>

        <p className="mt-8 text-sm text-muted">
          New to the portal? <Link to="/signup" viewTransition className="text-ink underline underline-offset-4">Request access</Link>
        </p>
      </motion.div>
    </AuthShell>
  );
}
