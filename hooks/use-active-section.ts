"use client"

import { useCallback, useEffect, useRef, useState } from "react"

/**
 * Returns the id of the section currently crossing the upper-middle band of the
 * viewport. One IntersectionObserver for all sections; no scroll listeners.
 *
 * `lock(id)` pins the result to a clicked link's section while the page smooth
 * scrolls there, so the indicator doesn't flicker through every section it passes.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0])
  const lockedRef = useRef(false)
  const releaseRef = useRef<() => void>(undefined)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (lockedRef.current) return
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: "-35% 0px -60% 0px" }
    )
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => {
      observer.disconnect()
      releaseRef.current?.()
    }
  }, [ids])

  const lock = useCallback((id: string) => {
    releaseRef.current?.()
    lockedRef.current = true
    setActive(id)

    // Release once scrolling has been quiet for a moment (or never started).
    let timer = window.setTimeout(() => release(), 600)
    const onScroll = () => {
      window.clearTimeout(timer)
      timer = window.setTimeout(() => release(), 150)
    }
    const release = () => {
      window.clearTimeout(timer)
      window.removeEventListener("scroll", onScroll)
      lockedRef.current = false
      releaseRef.current = undefined
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    releaseRef.current = release
  }, [])

  return { active, lock }
}
