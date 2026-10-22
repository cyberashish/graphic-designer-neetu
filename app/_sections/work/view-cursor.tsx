"use client"

import { useMotionValue, useSpring } from "motion/react"
import * as m from "motion/react-m"
import { useEffect } from "react"
import { createPortal } from "react-dom"

import { useMediaQuery } from "@/hooks/use-media-query"
import { springs } from "@/lib/motion"

/**
 * A "View" bubble that trails the pointer over any `[data-cursor="view"]`
 * element inside `container`. Fine pointers only; all updates go through
 * motion values, so moving the mouse never re-renders React.
 */
export function ViewCursor({ container }: { container: React.RefObject<HTMLElement | null> }) {
  const x = useSpring(useMotionValue(-100), springs.soft)
  const y = useSpring(useMotionValue(-100), springs.soft)
  const scale = useSpring(useMotionValue(0), springs.snappy)
  const enabled = useMediaQuery("(pointer: fine)")

  useEffect(() => {
    const el = container.current
    if (!el || !enabled) return

    const onMove = (event: PointerEvent) => {
      // Snap into place while hidden so the bubble never flies in from afar.
      const method = scale.get() < 0.05 ? "jump" : "set"
      x[method](event.clientX)
      y[method](event.clientY)
      const overTarget = (event.target as Element).closest('[data-cursor="view"]')
      scale.set(overTarget ? 1 : 0)
    }
    const onLeave = () => scale.set(0)

    el.addEventListener("pointermove", onMove, { passive: true })
    el.addEventListener("pointerleave", onLeave)
    return () => {
      el.removeEventListener("pointermove", onMove)
      el.removeEventListener("pointerleave", onLeave)
    }
  }, [container, enabled, x, y, scale])

  if (!enabled) return null

  // Portalled so a transformed ancestor can never offset the fixed position.
  return createPortal(
    <m.div
      aria-hidden
      style={{ x, y, scale }}
      className="pointer-events-none fixed top-0 left-0 z-40 -mt-12 -ml-12 grid size-24 place-items-center rounded-full bg-primary text-sm font-semibold text-white shadow-xl shadow-primary/30"
    >
      View
    </m.div>,
    document.body
  )
}
