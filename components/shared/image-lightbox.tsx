"use client"

import { ArrowLeft, ArrowRight, X } from "lucide-react"
import { AnimatePresence } from "motion/react"
import * as m from "motion/react-m"
import Image, { type StaticImageData } from "next/image"
import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

import { easeOutExpo } from "@/lib/motion"
import { cn } from "@/lib/utils"

export type LightboxItem = { image: StaticImageData; alt: string; caption?: string }

type ImageLightboxProps = {
  items: LightboxItem[]
  /** Index of the open image, or null when closed. */
  index: number | null
  onIndexChange: (index: number | null) => void
}

const SWIPE_THRESHOLD = 60

/**
 * Full-screen image viewer: arrows, keyboard (← → Esc), swipe, counter and a
 * thumbnail strip. Key handling runs in the capture phase and stops there, so
 * it never also closes or steps a dialog underneath it.
 */
export function ImageLightbox({ items, index, onIndexChange }: ImageLightboxProps) {
  const [direction, setDirection] = useState<1 | -1>(1)
  const closeRef = useRef<HTMLButtonElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const open = index !== null
  const item = open ? items[index] : null

  const go = (delta: 1 | -1) => {
    if (index === null) return
    setDirection(delta)
    onIndexChange((index + delta + items.length) % items.length)
  }

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus({ preventScroll: true })
    const onKey = (event: KeyboardEvent) => {
      if (!["Escape", "ArrowLeft", "ArrowRight", "Tab"].includes(event.key)) return
      event.stopImmediatePropagation()
      if (event.key === "Escape") onIndexChange(null)
      if (event.key === "ArrowRight") go(1)
      if (event.key === "ArrowLeft") go(-1)
    }
    window.addEventListener("keydown", onKey, true)
    return () => window.removeEventListener("keydown", onKey, true)
  })

  // Keep the active thumbnail in view.
  useEffect(() => {
    if (index === null) return
    stripRef.current?.children[index]?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" })
  }, [index])

  if (typeof document === "undefined") return null

  return createPortal(
    <AnimatePresence>
      {item && index !== null && (
        <m.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-80 flex flex-col overscroll-contain bg-[#0d0d0d]/96 text-white backdrop-blur-sm"
        >
          <div className="flex items-center justify-between px-4 py-4 sm:px-8">
            <span className="font-mono text-sm text-white/60 tabular-nums">
              {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={() => onIndexChange(null)}
              aria-label="Close viewer"
              className="grid size-11 cursor-pointer place-items-center rounded-full bg-white/10 transition-[background-color,rotate] hover:rotate-90 hover:bg-white/20"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Click outside the image closes. */}
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-24" onClick={() => onIndexChange(null)}>
            <AnimatePresence mode="popLayout" initial={false} custom={direction}>
              <m.div
                key={index}
                custom={direction}
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d * 80, scale: 0.98 }),
                  center: { opacity: 1, x: 0, scale: 1 },
                  exit: (d: number) => ({ opacity: 0, x: d * -80, scale: 0.98 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: easeOutExpo }}
                drag="x"
                dragSnapToOrigin
                dragElastic={0.25}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -SWIPE_THRESHOLD) go(1)
                  else if (info.offset.x > SWIPE_THRESHOLD) go(-1)
                }}
                onClick={(event) => event.stopPropagation()}
                className="relative cursor-grab overflow-hidden rounded-xl shadow-2xl active:cursor-grabbing"
                style={{
                  aspectRatio: `${item.image.width} / ${item.image.height}`,
                  width: `min(100%, calc((100dvh - 15rem) * ${item.image.width / item.image.height}))`,
                }}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 80vw, 100vw"
                  placeholder="blur"
                  draggable={false}
                  className="pointer-events-none object-contain select-none"
                />
              </m.div>
            </AnimatePresence>

            {items.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation()
                    go(-1)
                  }}
                  aria-label="Previous image"
                  className="absolute left-3 hidden size-12 cursor-pointer place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20 sm:left-8 sm:grid"
                >
                  <ArrowLeft className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation()
                    go(1)
                  }}
                  aria-label="Next image"
                  className="absolute right-3 hidden size-12 cursor-pointer place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20 sm:right-8 sm:grid"
                >
                  <ArrowRight className="size-5" />
                </button>
              </>
            )}
          </div>

          <div className="px-4 pt-4 pb-5 sm:px-8">
            <p className="min-h-7 text-center text-base text-white/80 sm:text-lg" aria-live="polite">
              {item.caption ?? item.alt}
            </p>
            {items.length > 1 && (
              <div ref={stripRef} className="mx-auto mt-4 flex max-w-full justify-start gap-2 overflow-x-auto pb-1 [scrollbar-width:none] sm:justify-center [&::-webkit-scrollbar]:hidden">
                {items.map((thumb, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setDirection(i > index ? 1 : -1)
                      onIndexChange(i)
                    }}
                    aria-label={`Show image ${i + 1}`}
                    aria-current={i === index}
                    className={cn(
                      "relative h-14 shrink-0 cursor-pointer overflow-hidden rounded-md ring-2 transition-[opacity,box-shadow] sm:h-16",
                      i === index ? "opacity-100 ring-primary" : "opacity-45 ring-transparent hover:opacity-80"
                    )}
                    style={{ aspectRatio: `${thumb.image.width} / ${thumb.image.height}` }}
                  >
                    <Image src={thumb.image} alt="" fill sizes="120px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </m.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
