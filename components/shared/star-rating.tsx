import { Star } from "lucide-react"

import { cn } from "@/lib/utils"

export function StarRating({ value = 5, className }: { value?: number; className?: string }) {
  return (
    <div role="img" aria-label={`Rated ${value} out of 5`} className={cn("flex gap-0.5 text-primary", className)}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} aria-hidden className={cn("size-5", i < value ? "fill-current" : "opacity-30")} />
      ))}
    </div>
  )
}
