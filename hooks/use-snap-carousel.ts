"use client"

import { useCallback, useEffect, useRef, useState } from "react"

/**
 * Drives a native CSS scroll-snap track. Scrolling, swiping and momentum stay
 * native; we only derive the reachable "pages" (snap stops) to sync the dots.
 */
export function useSnapCarousel<T extends HTMLElement = HTMLDivElement>() {
  const trackRef = useRef<T>(null)
  const pagesRef = useRef<number[]>([])
  const [pageCount, setPageCount] = useState(0)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let frame = 0

    const measure = () => {
      const slides = Array.from(track.children) as HTMLElement[]
      const origin = slides[0]?.offsetLeft ?? 0
      const max = track.scrollWidth - track.clientWidth
      // Slides near the end clamp to the same scroll position; collapse them.
      const stops = slides.map((s) => Math.min(s.offsetLeft - origin, max))
      pagesRef.current = stops.filter((stop, i) => i === 0 || stop - stops[i - 1] > 4)
      setPageCount(pagesRef.current.length)
    }

    const sync = () => {
      frame = 0
      const pages = pagesRef.current
      let nearest = 0
      pages.forEach((stop, i) => {
        if (Math.abs(stop - track.scrollLeft) < Math.abs(pages[nearest] - track.scrollLeft)) nearest = i
      })
      setActive(nearest)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(sync)
    }

    measure()
    const resizeObserver = new ResizeObserver(() => {
      measure()
      sync()
    })
    resizeObserver.observe(track)
    track.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      track.removeEventListener("scroll", onScroll)
    }
  }, [])

  const scrollToPage = useCallback((index: number) => {
    trackRef.current?.scrollTo({ left: pagesRef.current[index] ?? 0, behavior: "smooth" })
  }, [])

  return { trackRef, active, pageCount, scrollToPage }
}
