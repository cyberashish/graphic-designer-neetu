"use client"

import { animate, useInView, useReducedMotion } from "motion/react"
import { useEffect, useRef } from "react"

type CounterProps = {
  value: number
  suffix?: string
  duration?: number
  className?: string
}

/**
 * Counts up from zero when scrolled into view. Writes straight to the DOM
 * node each frame instead of setting state, so it costs no re-renders.
 * The final value is server-rendered for crawlers and no-JS visitors.
 */
export function Counter({ value, suffix = "", duration = 1.6, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" })
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!inView || !node || reduceMotion) return
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        node.textContent = `${Math.round(latest)}${suffix}`
      },
    })
    return () => controls.stop()
  }, [inView, value, suffix, duration, reduceMotion])

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  )
}
