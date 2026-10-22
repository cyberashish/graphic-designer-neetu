"use client"

import { useInView, useReducedMotion } from "motion/react"
import { useCallback, useEffect, useRef, useState } from "react"

type AutoplayOptions = {
  interval?: number
  /** Extra condition, e.g. pause while a transition is running. */
  enabled?: boolean
}

/**
 * Cycles an index while the element is on screen. Stops for good once the
 * visitor picks a slide themselves, and never runs for reduced motion.
 */
export function useAutoplay<T extends Element = HTMLDivElement>(count: number, { interval = 3200, enabled = true }: AutoplayOptions = {}) {
  const ref = useRef<T>(null)
  const inView = useInView(ref, { amount: 0.35 })
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [manual, setManual] = useState(false)
  const playing = inView && !reduceMotion && !manual && enabled && count > 1

  useEffect(() => {
    if (!playing) return
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % count), interval)
    return () => window.clearTimeout(id)
  }, [playing, index, count, interval])

  const select = useCallback(
    (next: number) => {
      setManual(true)
      setIndex(((next % count) + count) % count)
    },
    [count]
  )

  return { ref, index, setIndex, select, playing, inView }
}
