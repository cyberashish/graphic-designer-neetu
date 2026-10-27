"use client"

import { useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react"
import * as m from "motion/react-m"
import { createContext, use } from "react"

type Pointer = { x: MotionValue<number>; y: MotionValue<number> }

const PointerContext = createContext<Pointer | null>(null)

const spring = { stiffness: 70, damping: 18, mass: 0.7 }

/**
 * Tracks the mouse over the hero as -0.5…0.5 on each axis. Only motion
 * values change, so moving the mouse never re-renders React.
 */
export function PointerField({ children, className }: { children: React.ReactNode; className?: string }) {
  const x = useSpring(useMotionValue(0), spring)
  const y = useSpring(useMotionValue(0), spring)

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return
    const rect = event.currentTarget.getBoundingClientRect()
    x.set((event.clientX - rect.left) / rect.width - 0.5)
    y.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <PointerContext value={{ x, y }}>
      <div
        onPointerMove={onPointerMove}
        onPointerLeave={() => {
          x.set(0)
          y.set(0)
        }}
        className={className}
      >
        {children}
      </div>
    </PointerContext>
  )
}

/**
 * Shifts its content with the mouse by up to `depth` px. Mixing depths (and
 * signs) makes the floating pieces feel layered at different distances.
 */
export function Drift({ depth = 20, children, className }: { depth?: number; children: React.ReactNode; className?: string }) {
  const pointer = use(PointerContext)
  if (!pointer) throw new Error("Drift must be rendered inside PointerField")
  const x = useTransform(pointer.x, (v) => v * depth)
  const y = useTransform(pointer.y, (v) => v * depth)
  return (
    <m.div style={{ x, y }} className={className}>
      {children}
    </m.div>
  )
}
