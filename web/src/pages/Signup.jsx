import { useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import AuthShell from "../components/AuthShell";
import { Button, EASE } from "../components/ui";
import { Field } from "./Contact";
import { company } from "../lib/content";

// Accounts are provisioned by the Analytx4t team during the pilot, so sign-up
// is a request-access form. It hands off to email until a backend exists.
export default function Signup() {
  const [done, setDone] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = `Name: ${f.get("name")}\nEmail: ${f.get("email")}\nCompany: ${f.get("company")}\n\nPlease create a portal account.`;
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent("Portal access request")}&body=${encodeURIComponent(body)}`;
    setDone(true);
  };

  return (
    <AuthShell>
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div key="done" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
            <h1 className="text-[2.6rem] font-medium leading-[1.02] tracking-[-0.03em]">Request ready.</h1>
            <p className="mt-4 text-muted">We opened your email app with the request filled in. Once it's sent, the Analytx4t team will set up your account and reply with sign-in details.</p>
            <div className="mt-10"><Button to="/login">Go to sign in</Button></div>
          </motion.div>
        ) : (
          <motion.div key="form" exit={{ opacity: 0, y: -10 }} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}>
            <h1 className="text-[2.6rem] font-medium leading-[1.02] tracking-[-0.03em]">Request access.</h1>
            <p className="mt-3 text-muted">Portal accounts are created by our team during the pilot.</p>
            <form onSubmit={submit} className="mt-10 space-y-7">
              <Field name="name" label="Full name" autoComplete="name" required />
              <Field name="email" type="email" label="Work email" autoComplete="email" required />
              <Field name="company" label="Company" autoComplete="organization" required />
              <Button type="submit" size="lg" className="w-full">Request access</Button>
            </form>
            <p className="mt-8 text-sm text-muted">
              Already have an account? <Link to="/login" viewTransition className="text-ink underline underline-offset-4">Sign in</Link>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthShell>
  );
}
