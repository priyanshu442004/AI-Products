import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

/** Paragraph whose words brighten one by one as it scrolls through the viewport. */
export default function ScrollText({ text, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => {
        const start = i / words.length;
        return <Word key={i} progress={scrollYProgress} range={[start, start + 1 / words.length]}>{w}</Word>;
      })}
    </p>
  );
}

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <span aria-hidden className="relative">
      <motion.span style={{ opacity }}>{children}</motion.span>{" "}
    </span>
  );
}
