import Image, { type StaticImageData } from "next/image"

import { cn } from "@/lib/utils"

type PaperProps = {
  src: StaticImageData
  alt: string
  sizes?: string
  className?: string
  style?: React.CSSProperties
}

/** A printed sheet: soft contact shadow, a hint of paper sheen. */
export function Paper({ src, alt, sizes = "400px", className, style }: PaperProps) {
  return (
    <div
      className={cn("relative overflow-hidden rounded-[3px] bg-white shadow-[0_28px_50px_-22px_rgb(0_0_0/0.45),0_6px_14px_-6px_rgb(0_0_0/0.2)]", className)}
      style={{ aspectRatio: `${src.width} / ${src.height}`, ...style }}
    >
      <Image src={src} alt={alt} fill sizes={sizes} quality={90} className="object-cover" />
      <span aria-hidden className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/[0.06]" />
    </div>
  )
}
