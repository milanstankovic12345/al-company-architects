import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { formatCount } from "@/lib/formatCount";

interface CountUpProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** seconds */
  duration?: number;
  className?: string;
}


const CountUp = ({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.8,
  className,
}: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const [current, setCurrent] = useState(reduced ? value : 0);

  useEffect(() => {
    if (reduced) {
      setCurrent(value);
      return;
    }
    if (!inView) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: setCurrent,
    });
    return () => controls.stop();
  }, [inView, reduced, value, duration]);

  const format = (n: number) => `${prefix}${formatCount(n, decimals)}${suffix}`;

  return (
    <span ref={ref} className={`relative inline-block tabular-nums ${className ?? ""}`}>
      {/* Invisible final value reserves width so the layout never shifts */}
      <span className="invisible" aria-hidden="true">
        {format(value)}
      </span>
      <span className="absolute inset-0 text-center" aria-hidden="true">
        {format(current)}
      </span>
      <span className="sr-only">{format(value)}</span>
    </span>
  );
};

export default CountUp;
