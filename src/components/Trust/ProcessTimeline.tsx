import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { processSteps } from "@/data/trust";
import { EASE } from "@/components/motion/Reveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const GLOW = "0 0 12px hsl(var(--accent)), 0 0 24px hsl(var(--accent) / 0.5)";

const ProcessTimeline = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <div>
      <h3 className="mb-8 font-heading text-xl font-bold text-foreground">Kako radimo</h3>
      <div ref={listRef} className="relative max-w-3xl">
        {/* Rail + scroll-linked glowing line, centred on the w-10 badges */}
        <div aria-hidden="true" className="pointer-events-none absolute bottom-5 left-5 top-5 -translate-x-1/2">
          <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-border" />
          <motion.div
            className="absolute inset-y-0 left-1/2 w-0.5 origin-top -translate-x-1/2 bg-accent"
            style={{ scaleY: reduced ? 1 : progress, boxShadow: GLOW }}
          />
        </div>

        <ol className="space-y-10 md:space-y-12">
          {processSteps.map((s, i) => (
            <motion.li
              key={s.title}
              className="relative flex gap-6"
              initial={reduced ? false : "hidden"}
              whileInView="show"
              viewport={{ once: true, margin: "0px 0px -20% 0px" }}
              variants={{
                hidden: { opacity: 0, x: -24 },
                show: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.1, ease: EASE } },
              }}
            >
              <motion.span
                aria-hidden="true"
                className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center font-heading font-black"
                variants={{
                  hidden: {
                    backgroundColor: "hsl(var(--muted))",
                    color: "hsl(var(--muted-foreground))",
                    boxShadow: "0 0 0px hsl(var(--accent) / 0)",
                  },
                  show: {
                    backgroundColor: "hsl(var(--accent))",
                    color: "hsl(var(--accent-foreground))",
                    boxShadow: GLOW,
                    transition: { duration: 0.5, delay: 0.35, ease: EASE },
                  },
                }}
              >
                {i + 1}
              </motion.span>
              <div className="pt-1.5">
                <h4 className="font-heading text-base font-bold text-foreground">
                  {s.to ? (
                    <Link
                      to={s.to}
                      className="hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      {s.title}
                    </Link>
                  ) : (
                    s.title
                  )}
                </h4>
                <p className="mt-1 font-body text-sm leading-relaxed text-muted-foreground">{s.description}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default ProcessTimeline;
