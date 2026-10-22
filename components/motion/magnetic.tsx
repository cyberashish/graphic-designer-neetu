"use client"

import { useMotionValue, useSpring } from "motion/react"
import * as m from "motion/react-m"
import { useRef } from "react"

import { springs } from "@/lib/motion"
import { cn } from "@/lib/utils"

type MagneticProps = {
  children: React.ReactNode
  /** How far (0–1) the element follows the pointer from its centre. */
  strength?: number
  className?: string
}

/**
 * Pulls its child gently toward the pointer. Pointer movement only writes to
 * motion values, so it never triggers a React re-render.
 */
export function Magnetic({ children, strength = 0.35, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(useMotionValue(0), springs.soft)
  const y = useSpring(useMotionValue(0), springs.soft)

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength)
  }

  function reset() {
    x.set(0)
    y.set(0)
  }

  return (
    <m.div
      ref={ref}
      style={{ x, y }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      className={cn("inline-flex", className)}
    >
      {children}
    </m.div>
  )
}
