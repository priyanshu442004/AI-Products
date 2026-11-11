import { motion } from "motion/react";
import { Eyebrow, SplitHeading, EASE } from "./ui";

export default function PageHero({ eyebrow, title, intro, aside, index }) {
  return (
    <section className="relative overflow-hidden pt-36 sm:pt-44">
      <div aria-hidden className="dot-bg absolute inset-x-0 top-0 h-[70%] [mask-image:linear-gradient(to_bottom,#000,transparent)]" />
      <div className="container-x relative">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}>
          <Eyebrow className="text-muted">{eyebrow}</Eyebrow>
        </motion.div>
        <div className="mt-7 grid gap-10 lg:grid-cols-12 lg:items-end">
          <SplitHeading
            as="h1"
            inView={false}
            delay={0.1}
            text={title}
            className="text-[clamp(2.8rem,7vw,6.2rem)] font-medium leading-[0.96] tracking-[-0.04em] lg:col-span-8"
          />
          {(intro || aside) && (
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.9, ease: EASE }} className="lg:col-span-4">
              {intro && <p className="text-lg leading-relaxed text-muted">{intro}</p>}
              {aside}
            </motion.div>
          )}
        </div>
        {index && (
          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.4, duration: 1.2, ease: EASE }}
            className="mt-16 flex origin-left flex-wrap gap-x-8 gap-y-2 border-t rule pt-5 font-mono text-[12px] text-muted sm:mt-24"
          >
            {index}
          </motion.div>
        )}
      </div>
    </section>
  );
}
