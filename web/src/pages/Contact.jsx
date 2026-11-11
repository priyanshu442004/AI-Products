import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import PageHero from "../components/PageHero";
import { Button, Reveal, Eyebrow, EASE } from "../components/ui";
import { company } from "../lib/content";

const TOPICS = ["AI agent", "Chatbot / RAG", "Analytics & BI", "Web / mobile app", "Finance automation", "Something else"];

export default function Contact() {
  const [topics, setTopics] = useState(["AI agent"]);
  const [sent, setSent] = useState(false);
  const toggle = (t) => setTopics((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]));

  // No backend yet: hand the message to the visitor's mail client, prefilled.
  const submit = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = [
      `Name: ${f.get("name")}`,
      `Email: ${f.get("email")}`,
      `Company: ${f.get("company") || "-"}`,
      `Interested in: ${topics.join(", ") || "-"}`,
      "",
      f.get("message"),
    ].join("\n");
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(`Project enquiry — ${f.get("name")}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <>
      <PageHero eyebrow="Contact" title="Tell us what *slows* you down." intro="Describe the process or the idea. We'll reply with how we would approach it and what it would take." />

      <section className="container-x grid gap-14 pb-28 pt-16 sm:pt-24 lg:grid-cols-12">
        <div className="space-y-10 lg:col-span-4">
          <Reveal>
            <Eyebrow className="text-muted">Write</Eyebrow>
            <div className="mt-4 space-y-3">
              {company.emails.map((e) => (
                <div key={e.value}>
                  <div className="text-sm text-muted">{e.label}</div>
                  <a href={`mailto:${e.value}`} className="link-draw text-lg">{e.value}</a>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <Eyebrow className="text-muted">Call</Eyebrow>
            <div className="mt-4 space-y-1">
              {company.phones.map((p) => <a key={p} href={`tel:${p.replaceAll(" ", "")}`} className="link-draw block w-fit text-lg">{p}</a>)}
            </div>
          </Reveal>
          {company.offices.map((o, i) => (
            <Reveal key={o.label} delay={0.1 + i * 0.05}>
              <Eyebrow className="text-muted">{o.label}</Eyebrow>
              <p className="mt-4 text-lg leading-snug">{o.lines.map((l) => <span key={l} className="block">{l}</span>)}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <div className="relative overflow-hidden rounded-[2rem] border border-ink/8 bg-white/60 p-6 sm:p-10">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div key="ok" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ ease: EASE, duration: 0.6 }} className="py-16 text-center">
                  <div className="mx-auto grid size-14 place-items-center rounded-full bg-lime text-ink">
                    <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2"><motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.2, duration: 0.5 }} /></svg>
                  </div>
                  <h2 className="mt-6 text-3xl font-medium">Your email is ready to send.</h2>
                  <p className="mx-auto mt-3 max-w-sm text-muted">We opened your mail app with the message filled in. If nothing opened, write to <a className="text-teal-ink underline" href={`mailto:${company.email}`}>{company.email}</a>.</p>
                  <button onClick={() => setSent(false)} className="mt-8 text-sm text-muted underline underline-offset-4 hover:text-ink">Write another message</button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit} exit={{ opacity: 0, y: -10 }} className="space-y-7">
                  <fieldset>
                    <legend className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">I'm interested in</legend>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {TOPICS.map((t) => {
                        const on = topics.includes(t);
                        return (
                          <button type="button" key={t} onClick={() => toggle(t)} aria-pressed={on}
                            className={`rounded-full border px-4 py-2 text-[14px] transition-all duration-300 ${on ? "border-ink bg-ink text-paper" : "border-ink/15 hover:border-ink/40"}`}>
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                  <div className="grid gap-7 sm:grid-cols-2">
                    <Field name="name" label="Your name" required autoComplete="name" />
                    <Field name="email" type="email" label="Work email" required autoComplete="email" />
                  </div>
                  <Field name="company" label="Company (optional)" autoComplete="organization" />
                  <Field name="message" label="What should we automate or build?" textarea required />
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <p className="text-sm text-muted">Opens your email app with this message.</p>
                    <Button type="submit" size="lg">Send message</Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </section>
    </>
  );
}

/* Floating-label input with an animated underline */
export function Field({ label, name, type = "text", textarea, ...rest }) {
  const C = textarea ? "textarea" : "input";
  return (
    <label className="group relative block">
      <C
        name={name}
        type={textarea ? undefined : type}
        placeholder=" "
        rows={textarea ? 4 : undefined}
        className="peer block w-full resize-none border-0 border-b border-ink/15 bg-transparent px-0 pb-2.5 pt-6 text-[17px] outline-none transition-colors placeholder:text-transparent focus:border-ink/15"
        {...rest}
      />
      <span className="pointer-events-none absolute left-0 top-6 origin-left text-[17px] text-muted transition-all duration-300 ease-[var(--ease-out-expo)] peer-focus:top-0 peer-focus:scale-[0.78] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:scale-[0.78]">
        {label}
      </span>
      <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-500 ease-[var(--ease-out-expo)] peer-focus:scale-x-100" />
    </label>
  );
}
