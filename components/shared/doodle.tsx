import { cn } from "@/lib/utils"

/**
 * Hand-drawn accents. Strokes use `pathLength={1}` so the CSS `draw`
 * animation can sketch them in regardless of path length.
 */
function Strokes({ paths, delay, width }: { paths: string[]; delay: string; width: number }) {
  return paths.map((d, i) => (
    <path
      key={d}
      d={d}
      pathLength={1}
      stroke="currentColor"
      strokeWidth={width}
      strokeLinecap="round"
      className="animate-draw [stroke-dasharray:1]"
      style={{ animationDelay: `calc(${delay} + ${i * 0.12}s)` }}
    />
  ))
}

/** Three short strokes radiating up and to the right, as beside "Hello!". */
export function SparkDoodle({ className, delay = "0s" }: { className?: string; delay?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden className={cn("size-8 text-primary", className)}>
      <Strokes paths={["M5 27 Q9 21 11 16", "M13 24 Q15 16 21 8", "M19 28 Q24 25 29 20"]} delay={delay} width={2.4} />
    </svg>
  )
}

/** Three sweeping arcs fanning out, the larger accent beside the portrait. */
export function BurstDoodle({ className, delay = "0s" }: { className?: string; delay?: string }) {
  return (
    <svg viewBox="0 0 64 72" fill="none" aria-hidden className={cn("text-primary", className)}>
      <Strokes
        paths={["M60 10 C46 4 24 6 6 18", "M62 30 C48 28 32 36 22 52", "M52 70 C50 60 52 52 58 44"]}
        delay={delay}
        width={3}
      />
    </svg>
  )
}
