import { cn } from "@/lib/utils"

type MarqueeProps = {
  children: React.ReactNode
  /** Seconds for one full loop. */
  duration?: number
  reverse?: boolean
  pauseOnHover?: boolean
  className?: string
  trackClassName?: string
}

/**
 * Infinite, GPU-composited ticker driven purely by CSS (no JS on the main
 * thread). Content is duplicated once; the copy is hidden from assistive tech.
 */
export function Marquee({
  children,
  duration = 30,
  reverse,
  pauseOnHover,
  className,
  trackClassName,
}: MarqueeProps) {
  return (
    <div className={cn("flex overflow-hidden", pauseOnHover && "pause-on-hover", className)}>
      <div
        className={cn("flex w-max shrink-0 animate-marquee", reverse && "[animation-direction:reverse]")}
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        <div className={cn("flex shrink-0", trackClassName)}>{children}</div>
        <div aria-hidden className={cn("flex shrink-0", trackClassName)}>
          {children}
        </div>
      </div>
    </div>
  )
}
