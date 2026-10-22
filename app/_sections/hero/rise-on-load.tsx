"use client"

import { useAnimate, useReducedMotion } from "motion/react"
import { useEffect } from "react"

import { cn } from "@/lib/utils"

/** easeOutCubic: decelerates gently, without expo's sudden opening burst. */
const softEase = [0.33, 1, 0.68, 1] as const
const START = "translateY(40%)"

/**
 * Slides its content up from below once the image inside has loaded and been
 * decoded. Waiting for the load (instead of running on mount) guarantees the
 * rise is seen even on a slow first visit; waiting for the decode keeps the
 * first frames from stalling. It's a pure slide with no fade, so it emerges
 * from behind the clipping edge of its container.
 *
 * Animating the raw `transform` lets Motion hand the animation to the browser
 * (WAAPI), so it runs on the compositor even while the page is hydrating.
 */
export function RiseOnLoad({ children, className }: { children: React.ReactNode; className?: string }) {
  const [scope, animate] = useAnimate<HTMLDivElement>()
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const img = scope.current?.querySelector("img")
    if (!img) return
    let cancelled = false

    const rise = () => {
      img
        .decode()
        .catch(() => {})
        .then(() => {
          if (cancelled) return
          animate(
            scope.current,
            { transform: [START, "translateY(0%)"] },
            reduceMotion ? { duration: 0 } : { duration: 1.4, ease: softEase, delay: 0.05 }
          )
        })
    }

    // A cached image can finish before hydration, so check `complete` as well.
    if (img.complete) rise()
    else img.addEventListener("load", rise, { once: true })

    return () => {
      cancelled = true
      img.removeEventListener("load", rise)
    }
  }, [animate, scope, reduceMotion])

  return (
    <div ref={scope} style={{ transform: START }} className={cn("will-change-transform", className)}>
      {children}
    </div>
  )
}
