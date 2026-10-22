import Image, { type StaticImageData } from "next/image"

import { cn } from "@/lib/utils"

type TiltedWallProps = {
  images: StaticImageData[]
  columns?: number
  className?: string
  sizes?: string
}

/**
 * An isometric wall of artwork drifting in alternating directions. The motion
 * is a pure CSS transform loop, so it never touches the main thread.
 */
export function TiltedWall({ images, columns = 3, className, sizes = "220px" }: TiltedWallProps) {
  const cols = Array.from({ length: columns }, (_, c) => images.filter((_, i) => i % columns === c))

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden [perspective:1600px]", className)}>
      <div className="absolute top-1/2 left-1/2 flex w-[130%] gap-3 sm:gap-4 [transform:translate(-50%,-50%)_rotateX(38deg)_rotateZ(-24deg)]">
        {cols.map((col, c) => (
          <div key={c} className="flex-1 overflow-visible">
            <div
              className={cn("flex animate-marquee-y flex-col gap-3 sm:gap-4", c % 2 === 1 && "[animation-direction:reverse]")}
              style={{ "--marquee-duration": `${34 + c * 6}s` } as React.CSSProperties}
            >
              {[...col, ...col, ...col, ...col].map((image, i) => (
                <div key={i} className="relative aspect-square w-full overflow-hidden rounded-[10px] shadow-[0_24px_40px_-18px_rgb(0_0_0/0.5)]">
                  <Image src={image} alt="" fill sizes={sizes} className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
