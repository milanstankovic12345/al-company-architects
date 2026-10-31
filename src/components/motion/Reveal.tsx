import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

export const EASE =[0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, margin: "0px 0px -80px 0px" } as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

/** Subtle fade-up when scrolled into view. Honors reduced motion via MotionConfig. */
export const Reveal = ({ children, className, delay = 0, y = 20 }: RevealProps) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={VIEWPORT}
    transition={{ duration: 0.6, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

interface RevealStaggerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
}

/** Container that staggers its RevealItem children (card grids). */
export const RevealStagger = ({ children, className, stagger = 0.08 }: RevealStaggerProps) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="show"
    viewport={VIEWPORT}
    transition={{ staggerChildren: stagger }}
  >
    {children}
  </motion.div>
);

export const RevealItem = ({ children, className }: { children: ReactNode; className?: string }) => (
  <motion.div className={className} variants={itemVariants}>
    {children}
  </motion.div>
);
