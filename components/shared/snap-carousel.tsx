"use client"

import { useSnapCarousel } from "@/hooks/use-snap-carousel"
import { cn } from "@/lib/utils"

type SnapCarouselProps = {
  children: React.ReactNode
  label: string
  tone?: "light" | "dark"
  className?: string
  trackClassName?: string
}

/**
 * Accessible, swipeable carousel built on native scroll-snap. Each direct child
 * is a slide; size slides with basis classes via `trackClassName` children.
 */
export function SnapCarousel({ children, label, tone = "light", className, trackClassName }: SnapCarouselProps) {
  const { trackRef, active, pageCount, scrollToPage } = useSnapCarousel()

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label} className={className}>
      <div
        ref={trackRef}
        tabIndex={0}
        className={cn(
          "relative flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain scroll-smooth pb-2 outline-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&>*]:snap-start",
          trackClassName
        )}
      >
        {children}
      </div>

      {pageCount > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToPage(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === active}
              className="group grid h-6 cursor-pointer place-items-center"
            >
              <span
                className={cn(
                  "block h-2.5 rounded-full transition-all duration-500 ease-out-expo",
                  i === active
                    ? "w-10 bg-primary"
                    : cn("w-2.5", tone === "dark" ? "bg-white/30 group-hover:bg-white/60" : "bg-ink/15 group-hover:bg-ink/40")
                )}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
