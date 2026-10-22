"use client"

import { useReducedMotion, useScroll, useSpring, useTransform } from "motion/react"
import * as m from "motion/react-m"

type SinkOnScrollProps = {
  children: React.ReactNode
  className?: string
  /** Page scroll (px) over which the full travel happens. */
  distance?: number
  /** How far (px) the content sinks by the end of `distance`. */
  travel?: number
}

/**
 * Moves its content down as the page scrolls, so the hero portrait sinks
 * behind the section edge while you scroll away. Scroll-linked to a motion
 * value bound to `transform`, so it never re-renders React.
 */
export function SinkOnScroll({ children, className, distance = 900, travel = 240 }: SinkOnScrollProps) {
  const reduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const target = useTransform(scrollY, [0, distance], [0, reduceMotion ? 0 : travel])
  // A light spring adds a touch of weight without feeling detached from the scroll.
  const y = useSpring(target, { stiffness: 140, damping: 28, restDelta: 0.5 })

  return (
    <m.div style={{ y }} className={className}>
      {children}
    </m.div>
  )
}
