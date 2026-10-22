import Image, { type StaticImageData } from "next/image"

import { cn } from "@/lib/utils"

type BookSpreadProps = {
  spread: StaticImageData
  alt: string
  /** Page curl in degrees; 0 lies flat. */
  tilt?: number
  sizes?: string
  className?: string
  priority?: boolean
}

/**
 * An open, perfect-bound booklet. The spread is split into two halves that
 * hinge slightly toward the viewer, with a gutter shadow and page edges.
 */
export function BookSpread({ spread, alt, tilt = 6, sizes = "800px", className, priority }: BookSpreadProps) {
  const half = (side: "left" | "right") => (
    <div
      className="relative h-full w-1/2 overflow-hidden transition-transform duration-700 ease-out-expo"
      style={{
        transform: `rotateY(${side === "left" ? tilt : -tilt}deg)`,
        transformOrigin: side === "left" ? "right center" : "left center",
      }}
    >
      <Image
        src={spread}
        alt={side === "left" ? alt : ""}
        sizes={sizes}
        quality={90}
        preload={priority}
        className={cn("absolute top-0 h-full w-[200%] max-w-none object-cover", side === "left" ? "left-0" : "-left-full")}
      />
      {/* Gutter shading */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-y-0 w-[16%]",
          side === "left"
            ? "right-0 bg-gradient-to-l from-black/25 via-black/5 to-transparent"
            : "left-0 bg-gradient-to-r from-black/20 via-white/10 to-transparent"
        )}
      />
    </div>
  )

  return (
    <div className={cn("relative [perspective:2200px]", className)} style={{ aspectRatio: `${spread.width} / ${spread.height}` }}>
      {/* Page block under the spread */}
      <span aria-hidden className="absolute inset-x-[0.6%] -bottom-[1.4%] h-full rounded-b-[3px] bg-[#e9e6df] shadow-[0_30px_60px_-25px_rgb(0_0_0/0.45)]" />
      <span aria-hidden className="absolute inset-x-[0.3%] -bottom-[0.7%] h-full rounded-b-[2px] bg-[#f6f4ef]" />
      <div className="relative flex size-full [transform-style:preserve-3d]">
        {half("left")}
        {half("right")}
      </div>
    </div>
  )
}

type BookCoverProps = {
  cover: StaticImageData
  alt: string
  sizes?: string
  className?: string
}

/** A closed booklet seen from the front, with spine crease and page edge. */
export function BookCover({ cover, alt, sizes = "400px", className }: BookCoverProps) {
  return (
    <div className={cn("relative", className)} style={{ aspectRatio: `${cover.width} / ${cover.height}` }}>
      <span aria-hidden className="absolute inset-y-[0.8%] -right-[2.2%] w-[3%] rounded-r-[3px] bg-[repeating-linear-gradient(90deg,#f4f2ec_0_1px,#dcd8cf_1px_2px)]" />
      <div className="relative size-full overflow-hidden rounded-r-[4px] rounded-l-[2px] shadow-[0_35px_60px_-25px_rgb(0_0_0/0.5),0_10px_20px_-10px_rgb(0_0_0/0.25)]">
        <Image src={cover} alt={alt} fill sizes={sizes} quality={90} className="object-cover" />
        <span aria-hidden className="absolute inset-y-0 left-0 w-[7%] bg-gradient-to-r from-black/25 via-white/20 to-transparent" />
        <span aria-hidden className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-black/10" />
      </div>
    </div>
  )
}
