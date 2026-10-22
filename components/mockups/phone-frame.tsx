import { cn } from "@/lib/utils"

/**
 * A minimal modern smartphone. Sized by its parent's width; bezel, radius and
 * the UI inside (which uses `cqw` units) all scale with it.
 */
export function PhoneFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-[9/19.5] w-full rounded-[15%/7%] bg-[#141414] p-[3%] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.45),0_18px_30px_-18px_rgb(0_0_0/0.3)] ring-1 ring-black/20",
        className
      )}
    >
      <span aria-hidden className="absolute top-[18%] -left-[1.6%] h-[7%] w-[1.6%] rounded-l-sm bg-[#2a2a2a]" />
      <span aria-hidden className="absolute top-[28%] -left-[1.6%] h-[11%] w-[1.6%] rounded-l-sm bg-[#2a2a2a]" />
      <span aria-hidden className="absolute top-[24%] -right-[1.6%] h-[14%] w-[1.6%] rounded-r-sm bg-[#2a2a2a]" />

      <div className="@container relative size-full overflow-hidden rounded-[12.5%/5.8%] bg-white">
        {children}
        <span aria-hidden className="absolute top-[1.6%] left-1/2 z-30 h-[3.3%] w-[31%] -translate-x-1/2 rounded-full bg-black" />
      </div>
    </div>
  )
}

/** Status bar row: time on the left, signal/battery on the right. */
export function StatusBar({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <div
      aria-hidden
      className={cn(
        "flex h-[11cqw] items-end justify-between px-[7cqw] pb-[1.5cqw] text-[3.4cqw] font-semibold",
        tone === "dark" ? "text-black" : "text-white"
      )}
    >
      <span>9:41</span>
      <span className="flex items-center gap-[1cqw]">
        <span className="h-[2.2cqw] w-[4cqw] rounded-[0.6cqw] bg-current opacity-80" />
        <span className="h-[2.4cqw] w-[5.5cqw] rounded-[0.8cqw] border-[0.4cqw] border-current" />
      </span>
    </div>
  )
}

/** The client's monogram, used as the account avatar in app screens. */
export function BrandAvatar({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("grid shrink-0 place-items-center rounded-full bg-[#0e7461] font-bold text-white", className)}
    >
      R
    </span>
  )
}
