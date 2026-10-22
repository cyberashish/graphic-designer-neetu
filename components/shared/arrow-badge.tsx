import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"

type ArrowBadgeProps = {
  className?: string
  tone?: "ink" | "brand" | "light"
}

const tones = {
  ink: "bg-ink text-white group-hover:bg-primary",
  brand: "bg-primary text-white group-hover:bg-ink",
  light: "bg-white text-ink group-hover:bg-primary group-hover:text-white",
}

/**
 * Round arrow that reacts to hover on the nearest `group` ancestor: it fills
 * with the accent and the arrow turns to point right, hinting "open this".
 */
export function ArrowBadge({ className, tone = "ink" }: ArrowBadgeProps) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-14 shrink-0 place-items-center rounded-full transition-colors duration-500 ease-out-expo",
        tones[tone],
        className
      )}
    >
      <ArrowUpRight className="size-6 transition-transform duration-500 ease-out-expo group-hover:rotate-45" />
    </span>
  )
}
