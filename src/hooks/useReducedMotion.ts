import { useReducedMotion as useFramerReducedMotion } from "framer-motion";

/** True when the OS asks for reduced motion. Shared guard for manual animation branches. */
export const useReducedMotion = (): boolean => !!useFramerReducedMotion();
