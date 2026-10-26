"use client"

import { getImageProps, type StaticImageData } from "next/image"
import type { PageFlip } from "page-flip"
import { useEffect, useEffectEvent, useImperativeHandle, useRef, useState } from "react"

import { cn } from "@/lib/utils"

export type FlipBookPage = {
  image: StaticImageData
  alt: string
  /** Show only one half of a two-page spread image. */
  half?: "left" | "right"
  /** Stiff board (covers) instead of a paper page that curls. */
  hard?: boolean
}

export type FlipBookHandle = {
  next: () => void
  prev: () => void
  /** Animate to a page, flipping once even when it is several spreads away. */
  flipTo: (page: number) => void
}

type FlipBookProps = {
  pages: FlipBookPage[]
  /** Width the full spread image renders at, for responsive image selection. */
  sizes: string
  startPage?: number
  onFlip?: (page: number) => void
  label?: string
  className?: string
  ref?: React.Ref<FlipBookHandle>
}

/** How many pages on either side of the open spread start loading ahead of a flip. */
const PRELOAD_BEHIND = 2
const PRELOAD_AHEAD = 5

/**
 * A booklet whose pages curl and turn like paper, powered by StPageFlip.
 * Pages can be dragged by their corners, clicked or swiped; covers stay stiff.
 *
 * The library owns (and on destroy, removes) its DOM, so pages are built
 * imperatively inside a host element React never renders children into.
 */
export function FlipBook({ pages, sizes, startPage = 0, onFlip, label = "Booklet", className, ref }: FlipBookProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const bookRef = useRef<PageFlip>(null)
  const [page, setPage] = useState(startPage)
  const [landscape, setLandscape] = useState(true)
  const [ready, setReady] = useState(false)

  const handleFlip = useEffectEvent((next: number) => {
    setPage(next)
    onFlip?.(next)
  })

  useImperativeHandle(ref, () => ({
    next: () => bookRef.current?.flipNext(),
    prev: () => bookRef.current?.flipPrev(),
    flipTo: (target) => bookRef.current?.flip(target),
  }))

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    let book: PageFlip | undefined
    let cancelled = false

    const root = document.createElement("div")
    const elements = pages.map((p, i) => createPage(p, i, sizes))
    const images = elements.map((el) => el.querySelector("img")!)
    root.append(...elements)
    host.append(root)

    const preload = (around: number) => {
      for (let i = Math.max(0, around - PRELOAD_BEHIND); i <= Math.min(images.length - 1, around + PRELOAD_AHEAD); i++) {
        images[i].loading = "eager"
      }
    }
    preload(startPage)

    const { width, height } = pageSize(pages)

    import("page-flip").then(({ PageFlip }) => {
      if (cancelled) return
      book = new PageFlip(root, {
        startPage,
        size: "stretch",
        width,
        height,
        // Below two 280px pages side by side, show one page at a time.
        minWidth: 280,
        maxWidth: width,
        minHeight: 200,
        maxHeight: height,
        showCover: true,
        maxShadowOpacity: 0.45,
        flippingTime: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 350 : 900,
        mobileScrollSupport: true,
      })
      book.on("flip", ({ data }) => {
        preload(data)
        handleFlip(data)
      })
      book.on("changeOrientation", ({ data }) => setLandscape(data === "landscape"))
      book.loadFromHTML(elements)
      setLandscape(book.getOrientation() === "landscape")
      bookRef.current = book
      setReady(true)
    })

    return () => {
      cancelled = true
      bookRef.current = null
      book?.destroy()
      host.replaceChildren()
      setReady(false)
    }
  }, [pages, sizes, startPage])

  // A closed book rests on one side of the spine; slide it to the centre.
  const shift = !landscape ? 0 : page === 0 ? -25 : page === pages.length - 1 && pages.length % 2 === 0 ? 25 : 0

  return (
    <div
      ref={hostRef}
      role="region"
      aria-roledescription="book"
      aria-label={label}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") bookRef.current?.flipNext()
        else if (e.key === "ArrowLeft") bookRef.current?.flipPrev()
        else return
        e.preventDefault()
      }}
      className={cn(
        "relative rounded-sm drop-shadow-[0_24px_30px_rgb(0_0_0/0.22)] transition-transform duration-700 ease-out-expo outline-none select-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-8",
        className
      )}
      // Hold a two-page spread's space until the library has loaded.
      style={{ transform: `translateX(${shift}%)`, aspectRatio: ready ? undefined : spreadRatio(pages) }}
    />
  )
}

/** Native size of one page, which sets the book's proportions. */
function pageSize(pages: FlipBookPage[]) {
  const { image, half } = pages[0]
  return { width: half ? image.width / 2 : image.width, height: image.height }
}

function spreadRatio(pages: FlipBookPage[]) {
  const { width, height } = pageSize(pages)
  return `${width * 2} / ${height}`
}

/**
 * With `showCover`, the front cover sits alone on the right and every odd
 * page after it is a left-hand page.
 */
function createPage(page: FlipBookPage, index: number, sizes: string) {
  const side = index % 2 === 0 ? "right" : "left"
  const el = document.createElement("div")
  el.className = "overflow-hidden bg-white"
  if (page.hard) el.dataset.density = "hard"

  const { props } = getImageProps({ src: page.image, alt: page.alt, sizes, quality: 90 })
  const img = document.createElement("img")
  img.alt = page.alt
  img.sizes = props.sizes ?? sizes
  if (props.srcSet) img.srcset = props.srcSet
  img.src = props.src
  img.loading = "lazy"
  img.decoding = "async"
  img.draggable = false
  img.className = cn(
    "pointer-events-none absolute top-0 h-full max-w-none object-cover",
    page.half ? "w-[200%]" : "w-full",
    page.half === "right" ? "-left-full" : "left-0"
  )

  // Paper bends into the spine: darken the gutter edge of every page.
  const gutter = document.createElement("span")
  gutter.className = cn(
    "pointer-events-none absolute inset-y-0",
    page.hard ? "w-[5%]" : "w-[14%]",
    side === "left"
      ? "right-0 bg-gradient-to-l from-black/20 via-black/5 to-transparent"
      : "left-0 bg-gradient-to-r from-black/20 via-white/10 to-transparent"
  )

  el.append(img, gutter)
  return el
}
