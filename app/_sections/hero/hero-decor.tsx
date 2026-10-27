import { cn } from "@/lib/utils"

import { NameCursor } from "./hero-art"

const delay = (ms: number) => ({ animationDelay: `${ms}ms` })

// Control points the pen tool keeps nudging; the curve and its handles share them.
const c1 = { x: "40;64;28;40", y: "12;-6;30;12" }
const c2 = { x: "140;118;152;140", y: "12;34;-4;12" }
const curve = "M10 100 C40 12 140 12 170 90;M10 100 C64 -6 118 34 170 90;M10 100 C28 30 152 -4 170 90;M10 100 C40 12 140 12 170 90"
const timing = { dur: "7s", repeatCount: "indefinite", calcMode: "spline", keyTimes: "0;0.33;0.66;1", keySplines: "0.45 0 0.2 1;0.45 0 0.2 1;0.45 0 0.2 1" }

/**
 * A Bézier curve mid-edit: it sketches itself in, then its two control
 * handles keep tugging it into new shapes. SMIL keeps the path, handle lines
 * and knobs in lockstep without any JavaScript.
 */
export function PenCurve({ className }: { className?: string }) {
  return (
    <div aria-hidden style={delay(1000)} className={cn("animate-rise", className)}>
      <svg viewBox="-6 -16 192 128" className="w-48 overflow-visible">
        <path d="M10 100 C40 12 140 12 170 90" pathLength={1} fill="none" strokeWidth={2.5} strokeLinecap="round" className="animate-draw stroke-ink [animation-delay:1.1s] [stroke-dasharray:1]">
          <animate attributeName="d" values={curve} {...timing} />
        </path>
        {[
          { x1: 10, y1: 100, c: c1 },
          { x1: 170, y1: 90, c: c2 },
        ].map(({ x1, y1, c }) => (
          <g key={x1} style={delay(1700)} className="animate-pop">
            <line x1={x1} y1={y1} x2={c.x.split(";")[0]} y2={c.y.split(";")[0]} strokeWidth={1.2} className="stroke-primary">
              <animate attributeName="x2" values={c.x} {...timing} />
              <animate attributeName="y2" values={c.y} {...timing} />
            </line>
            <circle r={4.5} cx={c.x.split(";")[0]} cy={c.y.split(";")[0]} strokeWidth={1.5} className="fill-white stroke-primary">
              <animate attributeName="cx" values={c.x} {...timing} />
              <animate attributeName="cy" values={c.y} {...timing} />
            </circle>
            <rect x={x1 - 5} y={y1 - 5} width={10} height={10} rx={1.5} strokeWidth={1.5} className="fill-white stroke-primary" />
          </g>
        ))}
      </svg>
      <span style={delay(1900)} className="mt-1 ml-2 inline-block animate-pop rounded-[5px] bg-ink px-2 py-1 text-xs leading-none font-semibold text-white">
        Pen tool
      </span>
    </div>
  )
}

/** A review comment pinned to the canvas, with the client's cursor hovering nearby. */
export function CommentPin({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none", className)}>
      <div style={delay(2300)} className="flex origin-bottom-left animate-pop items-end gap-2">
        <span className="grid size-9 shrink-0 place-items-center rounded-full rounded-bl-none bg-[#0e7461] text-sm font-bold text-white shadow-lg ring-2 ring-white">
          C
        </span>
        <span className="animate-float rounded-2xl rounded-bl-sm bg-white px-3.5 py-2.5 text-left shadow-[0_14px_30px_-12px_rgb(0_0_0/0.3)] ring-1 ring-black/5 [animation-delay:3s]">
          <span className="block text-xs font-semibold">Client</span>
          <span className="block text-sm whitespace-nowrap text-muted-foreground">Love this direction! </span>
        </span>
      </div>
      <NameCursor name="Client" arrow="fill-[#0e7461]" tag="bg-[#0e7461] shadow-[#0e7461]/30" delay={2600} className="top-full left-[70%] mt-1" />
    </div>
  )
}

/** Four-point sparkle that twinkles in place. */
export function Sparkle({ className, delayMs = 0 }: { className?: string; delayMs?: number }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" style={delay(delayMs)} className={cn("pointer-events-none absolute size-5 animate-twinkle fill-primary", className)}>
      <path d="M12 0c.8 6.4 5.6 11.2 12 12-6.4.8-11.2 5.6-12 12-.8-6.4-5.6-11.2-12-12C6.4 11.2 11.2 6.4 12 0Z" />
    </svg>
  )
}

/** Soft colour blooms drifting slowly behind the type. */
export function Glows() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <span className="absolute top-[8%] left-[4%] size-72 animate-blob rounded-full bg-primary/15 blur-3xl" />
      <span className="absolute top-[30%] right-[2%] size-80 animate-blob rounded-full bg-[#feb273]/25 blur-3xl [animation-delay:-7s]" />
      <span className="absolute bottom-[0%] left-[38%] size-64 animate-blob rounded-full bg-[#0e7461]/8 blur-3xl [animation-delay:-13s]" />
    </div>
  )
}

/** A rotation guide: dashed ring turning slowly, with a handle riding its edge. */
export function RotateGuide({ className }: { className?: string }) {
  return (
    <div aria-hidden style={delay(1400)} className={cn("pointer-events-none animate-pop", className)}>
      <div className="relative size-full animate-turn rounded-full border-[1.5px] border-dashed border-primary/40">
        <span className="absolute top-0 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-primary bg-white" />
      </div>
    </div>
  )
}
