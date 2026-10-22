"use client"

import { LazyMotion, MotionConfig } from "motion/react"

// Animation features (incl. layout/drag) are code-split and fetched after the
// first paint, keeping the initial JS bundle small.
const loadFeatures = () => import("./features").then((mod) => mod.default)

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}
