import { Lock } from "lucide-react"

import { cn } from "@/lib/utils"

type BrowserFrameProps = {
  url: string
  children: React.ReactNode
  className?: string
}

/** A minimal desktop browser window. Content area is a size container. */
export function BrowserFrame({ url, children, className }: BrowserFrameProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[10px] bg-white shadow-[0_40px_80px_-35px_rgb(0_0_0/0.45),0_0_0_1px_rgb(0_0_0/0.06)]",
        className
      )}
    >
      <div className="flex items-center gap-3 border-b border-black/5 bg-[#f4f4f5] px-3 py-2">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="mx-auto flex max-w-[60%] min-w-0 items-center gap-1.5 truncate rounded-md bg-white px-3 py-1 text-[11px] text-black/50">
          <Lock className="size-3 shrink-0" aria-hidden />
          <span className="truncate">{url}</span>
        </span>
        <span className="w-[42px]" aria-hidden />
      </div>
      <div className="@container relative">{children}</div>
    </div>
  )
}

/** Grey placeholder text lines for page chrome that isn't the point. */
export function SkeletonLines({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <span aria-hidden className={cn("flex flex-col gap-[1.2cqw]", className)}>
      {Array.from({ length: lines }, (_, i) => (
        <span key={i} className="h-[1.1cqw] min-h-1 rounded-full bg-black/[0.07]" style={{ width: `${92 - ((i * 17) % 40)}%` }} />
      ))}
    </span>
  )
}
