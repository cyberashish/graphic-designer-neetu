"use client"

import { Bookmark, ChevronLeft, ChevronRight, Heart, MessageCircle, MoreHorizontal, Send } from "lucide-react"
import Image, { type StaticImageData } from "next/image"
import { useEffect, useRef, useState } from "react"

import { useAutoplay } from "@/hooks/use-autoplay"
import { cn } from "@/lib/utils"

import { BrandAvatar, StatusBar } from "./phone-frame"

type InstagramPostProps = {
  slides: StaticImageData[]
  caption: string
  handle?: string
  /** Auto-advance while visible; stops for good once the visitor swipes. */
  autoplay?: boolean
  /** Feed post shape: 4:5 portrait (default) or 1:1 square. */
  aspect?: "portrait" | "square"
  /** Controlled slide index, e.g. driven by thumbnails outside the phone. */
  index?: number
  /** Called whenever the visible slide changes from inside the phone. */
  onIndexChange?: (index: number) => void
  sizes?: string
}

/**
 * An Instagram feed screen for use inside `PhoneFrame`. Multi-image posts are a
 * native scroll-snap carousel: swipe, trackpad and keyboard all just work.
 */
export function InstagramPost({ slides, caption, handle = "researchayu", autoplay = false, aspect = "portrait", index, onIndexChange, sizes = "320px" }: InstagramPostProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const settleRef = useRef(0)
  const [active, setActive] = useState(0)
  const { ref: autoplayRef, index: autoIndex, select: stopAutoplay } = useAutoplay(slides.length, { interval: 2600, enabled: autoplay })

  // Drive the track from the autoplay index.
  useEffect(() => {
    const track = trackRef.current
    if (!autoplay || !track) return
    track.scrollTo({ left: autoIndex * track.clientWidth, behavior: "smooth" })
  }, [autoIndex, autoplay])

  // Drive the track from a controlled index.
  useEffect(() => {
    const track = trackRef.current
    if (index === undefined || !track) return
    if (Math.round(track.scrollLeft / track.clientWidth) !== index) {
      track.scrollTo({ left: index * track.clientWidth, behavior: "smooth" })
    }
  }, [index])

  /** Tap / arrow navigation: step one slide, clamped to the ends. */
  const step = (track: HTMLElement, direction: 1 | -1) => {
    if (autoplay) stopAutoplay(active)
    const next = Math.min(Math.max(active + direction, 0), slides.length - 1)
    track.scrollTo({ left: next * track.clientWidth, behavior: "smooth" })
  }

  return (
    <div ref={autoplayRef} className="flex h-full flex-col bg-white text-black">
      <StatusBar />
      <div className="flex items-center justify-between px-[4cqw] py-[2.5cqw]">
        <div className="flex items-center gap-[2.5cqw]">
          <span className="rounded-full bg-gradient-to-tr from-amber-400 via-pink-500 to-fuchsia-600 p-[0.6cqw]">
            <BrandAvatar className="size-[8cqw] text-[3.6cqw] ring-[0.6cqw] ring-white" />
          </span>
          <span className="leading-tight">
            <span className="block text-[3.5cqw] font-semibold">{handle}</span>
            <span className="block text-[2.8cqw] text-black/50">Sponsored</span>
          </span>
        </div>
        <MoreHorizontal className="size-[5cqw]" aria-hidden />
      </div>

      <div className="relative">
        <div
          ref={trackRef}
          onScroll={(event) => {
            const el = event.currentTarget
            const current = Math.round(el.scrollLeft / el.clientWidth)
            setActive(current)
            // Report only once scrolling settles, so smooth scrolls never echo back mid-way.
            window.clearTimeout(settleRef.current)
            settleRef.current = window.setTimeout(() => {
              if (current !== index) onIndexChange?.(current)
            }, 140)
          }}
          onPointerDown={() => autoplay && stopAutoplay(active)}
          onWheel={() => autoplay && stopAutoplay(active)}
          // Tap the left third to go back, anywhere else to go forward. A swipe
          // scrolls instead and never fires a click, so the two don't clash.
          onClick={(event) => {
            if (slides.length < 2) return
            const rect = event.currentTarget.getBoundingClientRect()
            step(event.currentTarget, event.clientX - rect.left < rect.width / 3 ? -1 : 1)
          }}
          className={cn(
            "flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            slides.length > 1 && "cursor-pointer"
          )}
        >
          {slides.map((slide, i) => (
            <div key={i} className={cn("relative w-full shrink-0 snap-center", aspect === "square" ? "aspect-square" : "aspect-[4/5]")}>
              <Image src={slide} alt={`Slide ${i + 1} of ${slides.length}`} fill sizes={sizes} className="object-cover" />
            </div>
          ))}
        </div>
        {slides.length > 1 && (
          <span className="absolute top-[3cqw] right-[3cqw] rounded-full bg-black/60 px-[2.4cqw] py-[0.8cqw] text-[2.8cqw] font-medium text-white tabular-nums">
            {active + 1}/{slides.length}
          </span>
        )}
        {slides.length > 1 &&
          ([-1, 1] as const).map((direction) => {
            const hidden = direction === -1 ? active === 0 : active === slides.length - 1
            return (
              <button
                key={direction}
                type="button"
                onClick={(event) => step(event.currentTarget.parentElement!.firstElementChild as HTMLElement, direction)}
                aria-label={direction === 1 ? "Next slide" : "Previous slide"}
                tabIndex={hidden ? -1 : 0}
                className={cn(
                  "absolute top-1/2 grid size-[7.5cqw] -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-black/60 text-white shadow-md ring-1 ring-white/30 backdrop-blur-sm transition-[opacity,background-color] duration-300 hover:bg-black/80",
                  direction === 1 ? "right-[2.5cqw]" : "left-[2.5cqw]",
                  hidden && "pointer-events-none opacity-0"
                )}
              >
                {direction === 1 ? <ChevronRight className="size-[4.5cqw]" /> : <ChevronLeft className="size-[4.5cqw]" />}
              </button>
            )
          })}
      </div>

      <div className="flex items-center justify-between px-[4cqw] pt-[3cqw]">
        <div className="flex gap-[4cqw]" aria-hidden>
          <Heart className="size-[6cqw]" />
          <MessageCircle className="size-[6cqw]" />
          <Send className="size-[6cqw]" />
        </div>
        {slides.length > 1 && (
          <div className="flex gap-[1cqw]" aria-hidden>
            {slides.map((_, i) => (
              <span
                key={i}
                className={cn("size-[1.6cqw] rounded-full transition-colors", i === active ? "bg-[#0095f6]" : "bg-black/20")}
              />
            ))}
          </div>
        )}
        <Bookmark className="size-[6cqw]" aria-hidden />
      </div>
      <p className="line-clamp-2 px-[4cqw] pt-[2.5cqw] text-[3.2cqw] leading-snug">
        <span className="font-semibold">{handle}</span> {caption}
      </p>
    </div>
  )
}
