import { Check, Circle, MousePointer2, Slash, Square, Type } from "lucide-react"

import { NameCursor, Selection } from "@/app/_sections/hero/hero-art"
import { site } from "@/config/site"
import { cn } from "@/lib/utils"

const tools = [MousePointer2, Square, Circle, Slash, Type]

const deliverables = ["Booklets", "Standees", "Pamphlets", "Social ads"]

const palette = [
  { name: "Ink", tone: "bg-ink ring-1 ring-white/25" },
  { name: "Peach", tone: "bg-[#feb273]" },
  { name: "Signature", tone: "bg-primary" },
  { name: "Paper", tone: "bg-white" },
]

/** Small grey caption used for layer names and card titles. */
function Caption({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-[2.8cqw] leading-none font-medium text-white/45", className)}>{children}</p>
}

/**
 * An artboard drawn in markup instead of a screenshot: tool bar, a headline in a
 * selection frame, the deliverables, and the type and colour styles behind them.
 * Sized in container units so the whole composition scales with the card.
 */
export function StudioArt() {
  return (
    <div
      role="img"
      aria-label={`${site.name}'s design canvas: a poster headline reading "Made to be remembered", with brand type and colour styles`}
      className="@container relative aspect-4/5 overflow-hidden rounded-[3rem] bg-ink-glow text-white shadow-2xl shadow-ink/10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgb(255_255_255/0.08)_1px,transparent_1.5px)] bg-size-[5cqw_5cqw] mask-[radial-gradient(ellipse_80%_70%_at_50%_45%,black,transparent)]"
      />

      {/* Container units resolve against an ancestor, so the padding lives on this inner layer. */}
      <div aria-hidden className="relative flex size-full flex-col p-[8cqw] pt-[7cqw]">
        <div className="flex flex-col gap-[6cqw]">
          <div className="flex items-center justify-between border-b border-white/10 pb-[4cqw]">
            <div className="flex items-center gap-[1.6cqw]">
              <span className="size-[2.4cqw] rounded-full bg-[#ff5f57]" />
              <span className="size-[2.4cqw] rounded-full bg-[#febc2e]" />
              <span className="size-[2.4cqw] rounded-full bg-[#28c840]" />
              <div className="ml-[4cqw] flex items-center gap-[3cqw] text-white/70">
                {tools.map((Tool, i) => (
                  <Tool key={i} strokeWidth={1.8} className={cn("size-[3.4cqw]", i === 0 && "fill-white text-white")} />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-[3cqw]">
              <span className="text-[2.8cqw] text-white/45">100%</span>
              <span className="rounded-full bg-primary px-[3cqw] py-[1.2cqw] text-[2.8cqw] leading-none font-semibold">Share</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Caption>Poster / Why me</Caption>
            <span className="flex items-center gap-[1.6cqw] rounded-full bg-white/8 py-[1.2cqw] pr-[3cqw] pl-[1.4cqw] text-[2.8cqw] leading-none ring-1 ring-white/10">
              <span className="grid size-[3.6cqw] place-items-center rounded-full bg-emerald-500">
                <Check strokeWidth={3} className="size-[2.4cqw]" />
              </span>
              print-ready.pdf
            </span>
          </div>
        </div>

        <div className="relative flex flex-1 flex-col justify-center">
          <p className="text-[13cqw] leading-none font-bold tracking-tight">
            Made to be
            {/* Extra gap above so the selection's spec tag clears the first line. */}
            <span className="mt-[0.45em] block text-primary">
              <Selection label="H1 · Bold 64/72">remembered.</Selection>
            </span>
          </p>
          <div className="mt-[6cqw] flex flex-wrap gap-[2cqw]">
            {deliverables.map((item) => (
              <span key={item} className="rounded-full border border-white/15 px-[3cqw] py-[1.6cqw] text-[2.8cqw] leading-none text-white/80">
                {item}
              </span>
            ))}
          </div>
          <NameCursor className="top-[6%] right-0" delay={0} />
        </div>

        <div className="grid grid-cols-2 gap-[3cqw]">
          <div className="rounded-[5cqw] bg-white/6 p-[4.5cqw] ring-1 ring-white/10">
            <Caption>Typeface</Caption>
            <p className="mt-[2cqw] text-[13cqw] leading-none font-bold tracking-tight">Aa</p>
            <p className="mt-[2cqw] text-[2.8cqw] text-white/60">Urbanist · Bold</p>
          </div>
          <div className="flex flex-col rounded-[5cqw] bg-white/6 p-[4.5cqw] ring-1 ring-white/10">
            <Caption>Colours</Caption>
            <div className="mt-auto flex space-x-[-1.4cqw]">
              {palette.map((swatch) => (
                <span key={swatch.name} className={cn("size-[8cqw] rounded-full shadow-lg shadow-black/30", swatch.tone)} />
              ))}
            </div>
            <p className="mt-[3cqw] text-[2.8cqw] text-white/60">#FD853A · Signature</p>
          </div>
        </div>
      </div>
    </div>
  )
}
