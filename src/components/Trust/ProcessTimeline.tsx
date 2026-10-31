import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { processSteps } from "@/data/trust";
import { EASE } from "@/components/motion/Reveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const GLOW = "drop-shadow(0 0 6px hsl(var(--accent))) drop-shadow(0 0 12px hsl(var(--accent) / 0.5))";

type Point = { x: number; y: number };

/** Stair path through the badge centres: down to the next row, then right into the next badge. */
const stairPath = (pts: Point[]) =>
  pts.reduce((d, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${d} V ${p.y} H ${p.x}`), "");

const ProcessTimeline = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const badgeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [points, setPoints] = useState<Point[]>([]);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start 75%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  // offset* ignores transforms, so the slide-in animation does not skew the measurement
  useLayoutEffect(() => {
    const measure = () =>
      setPoints(
        badgeRefs.current.filter(Boolean).map((b) => {
          const li = b!.offsetParent as HTMLElement;
          return {
            x: li.offsetLeft + b!.offsetLeft + b!.offsetWidth / 2,
            y: li.offsetTop + b!.offsetTop + b!.offsetHeight / 2,
          };
        }),
      );
    measure();
    if (typeof ResizeObserver === "undefined" || !wrapRef.current) return;
    const ro = new ResizeObserver(measure);
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  const d = stairPath(points);

  return (
    <div>
      <h3 className="mb-8 font-heading text-xl font-bold text-foreground">Kako radimo</h3>
      <div ref={wrapRef} className="relative">
        {d && (
          <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
            <path d={d} fill="none" stroke="hsl(var(--border))" strokeWidth={1} />
            <motion.path
              d={d}
              fill="none"
              stroke="hsl(var(--accent))"
              strokeWidth={2}
              style={{ pathLength: reduced ? 1 : progress, filter: GLOW }}
            />
          </svg>
        )}

        <ol className="space-y-10 md:space-y-12">
          {processSteps.map((s, i) => (
            <motion.li
              key={s.title}
              className="relative flex gap-6 ml-[calc(var(--i)*1rem)] md:ml-[calc(var(--i)*3rem)] lg:ml-[calc(var(--i)*5rem)]"
              style={{ "--i": i } as CSSProperties}
              initial={reduced ? false : { opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -20% 0px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            >
              <span
                ref={(el) => (badgeRefs.current[i] = el)}
                aria-hidden="true"
                className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center bg-accent font-heading font-black text-accent-foreground"
              >
                {i + 1}
              </span>
              <div className="max-w-md pt-1.5">
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
