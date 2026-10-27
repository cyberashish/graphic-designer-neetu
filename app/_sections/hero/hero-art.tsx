import { site } from "@/config/site"
import { cn } from "@/lib/utils"

/** Staggers the CSS entrance animations without any client JS. */
const delay = (ms: number) => ({ animationDelay: `${ms}ms` })

/** Faint column guides, like a layout grid switched on in a design file. Columns drop in from the top. */
export function LayoutGrid({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 grid grid-cols-6 mask-[radial-gradient(ellipse_70%_60%_at_50%_45%,black,transparent)] lg:grid-cols-12",
        className
      )}
    >
      {Array.from({ length: 12 }, (_, i) => (
        <span
          key={i}
          style={delay(i * 70)}
          className={cn("origin-top animate-grid-in border-l border-dashed border-border last:border-r", i >= 6 && "hidden lg:block")}
        />
      ))}
    </div>
  )
}

const corners = ["top-0 left-0", "top-0 left-full", "top-full left-0", "top-full left-full"]

/**
 * Wraps text in a design-tool selection frame: outline, corner handles and a
 * type-spec tag. The frame sits in em units so it tracks the heading size.
 */
export function Selection({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <span className="relative inline-block">
      {children}
      <span aria-hidden className="pointer-events-none absolute inset-x-[-0.14em] inset-y-[-0.04em]">
        <span style={delay(650)} className="absolute inset-0 animate-select border-[1.5px] border-primary" />
        {corners.map((position, i) => (
          <span
            key={position}
            style={delay(750 + i * 60)}
            className={cn(
              "absolute size-2.5 -translate-x-1/2 -translate-y-1/2 animate-pop rounded-xs border-[1.5px] border-primary bg-white sm:size-3",
              position
            )}
          />
        ))}
        <span
          style={delay(900)}
          className="absolute bottom-full left-0 mb-2 hidden animate-rise rounded-[5px] bg-primary px-2 py-1 text-xs leading-none font-semibold tracking-normal text-white [--rise-from:6px] lg:block"
        >
          {label}
        </span>
      </span>
    </span>
  )
}

type CursorProps = {
  name?: string
  /** Arrow fill and name-tag colours. */
  arrow?: string
  tag?: string
  delay?: number
  className?: string
}

/** A collaborator cursor with a name tag that glides in, then idly wanders as if looking around. */
export function NameCursor({ name = site.name, arrow = "fill-primary", tag = "bg-primary shadow-primary/30", delay: delayMs = 1100, className }: CursorProps) {
  return (
    <span aria-hidden style={delay(delayMs)} className={cn("pointer-events-none absolute z-10 animate-cursor-in", className)}>
      <span className="flex animate-wander items-start" style={delay(delayMs + 1600)}>
        <svg viewBox="0 0 24 24" className={cn("size-7 stroke-white drop-shadow-[0_4px_6px_rgb(0_0_0/0.2)]", arrow)}>
          <path d="M3.5 2.5 10 21l2.7-7.6 7.8-2.9L3.5 2.5Z" strokeWidth={1.6} strokeLinejoin="round" />
        </svg>
        <span
          className={cn(
            "mt-6 -ml-1.5 rounded-full rounded-tl-sm px-3.5 py-1.5 text-sm leading-none font-semibold tracking-normal text-white shadow-lg",
            tag
          )}
        >
          {name}
        </span>
      </span>
    </span>
  )
}

const swatches = [
  { name: "Ink", hex: "#171717", tone: "bg-ink", rest: "-28deg", open: "-42deg" },
  { name: "Peach", hex: "#FEB273", tone: "bg-[#feb273]", rest: "-13deg", open: "-20deg" },
  { name: "Signature", hex: "#FD853A", tone: "bg-primary", rest: "2deg", open: "5deg" },
]

/** A fanned stack of colour chips from the brand palette that spreads open every few seconds. */
export function SwatchFan({ className }: { className?: string }) {
  return (
    <div aria-hidden style={delay(400)} className={cn("animate-rise", className)}>
      <div className="relative h-40 w-28 animate-float">
        {swatches.map((swatch) => (
          <div
            key={swatch.name}
            style={{ "--rest": swatch.rest, "--open": swatch.open, rotate: swatch.rest, animationDelay: "1.6s" } as React.CSSProperties}
            className="absolute inset-0 origin-bottom-left animate-fan rounded-xl bg-white p-1.5 shadow-[0_18px_36px_-18px_rgb(0_0_0/0.35)] ring-1 ring-black/5"
          >
            <div className={cn("h-[68%] rounded-lg", swatch.tone)} />
            <p className="mt-2 px-1 text-xs font-semibold">{swatch.name}</p>
            <p className="px-1 text-[0.7rem] text-muted-foreground">{swatch.hex}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
