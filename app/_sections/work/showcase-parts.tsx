export { ArtGrid } from "./art-grid"

import { cn } from "@/lib/utils"

/** A titled block inside a case study. */
export function ShowcaseSection({
  title,
  note,
  children,
  className,
}: {
  title: string
  note?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section className={cn("py-12 [counter-increment:showcase] sm:py-16", className)}>
      {/* Auto-numbered from the counter reset on the case study body. */}
      <div className="mb-7 grid gap-x-8 gap-y-2 border-t border-black/10 pt-6 sm:mb-10 sm:grid-cols-[auto_1fr_auto] sm:items-baseline">
        <span
          aria-hidden
          className="font-mono text-sm text-primary tabular-nums before:content-[counter(showcase,decimal-leading-zero)]"
        />
        <h4 className="text-2xl font-semibold tracking-tight sm:text-[2rem]">{title}</h4>
        {note && <p className="max-w-sm text-base text-muted-foreground sm:text-right sm:text-lg">{note}</p>}
      </div>
      {children}
    </section>
  )
}

/** A tinted rounded surface that mockups sit on. */
export function Stage({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("relative overflow-hidden rounded-[1.75rem] p-6 sm:rounded-[2rem] sm:p-12", className)}>{children}</div>
}

/** Shown while a case study's code-split showcase is loading. */
export function ShowcaseSkeleton() {
  return (
    <div aria-hidden className="grid gap-5 py-14">
      <div className="h-[420px] animate-pulse rounded-[2rem] bg-surface" />
      <div className="grid grid-cols-3 gap-5">
        <div className="aspect-square animate-pulse rounded-2xl bg-surface" />
        <div className="aspect-square animate-pulse rounded-2xl bg-surface" />
        <div className="aspect-square animate-pulse rounded-2xl bg-surface" />
      </div>
    </div>
  )
}
