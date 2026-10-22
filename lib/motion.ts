import type { Transition, Variants } from "motion/react"

/** Mirrors `--ease-out-expo` in globals.css so CSS and JS motion feel identical. */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const

export const springs = {
  /** Snappy UI feedback: pills, toggles, indicators. */
  snappy: { type: "spring", stiffness: 500, damping: 40, mass: 0.8 },
  /** Soft follow for cursors and magnetic elements. */
  soft: { type: "spring", stiffness: 150, damping: 18, mass: 0.4 },
} satisfies Record<string, Transition>

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOutExpo } },
}

export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
})

/** Trigger once, slightly before the element is fully on screen. */
export const inViewOnce = { once: true, margin: "0px 0px -12% 0px" } as const
