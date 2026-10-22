import Image, { type StaticImageData } from "next/image"

import { cn } from "@/lib/utils"

type StandeeProps = {
  src: StaticImageData
  alt: string
  sizes?: string
  className?: string
}

/** A pull-up roll-up banner: top rail, printed graphic, cassette base and feet. */
export function RollUpStandee({ src, alt, sizes = "300px", className }: StandeeProps) {
  return (
    <div className={cn("relative flex flex-col items-center", className)}>
      <span aria-hidden className="relative z-10 h-1.5 w-[104%] sm:h-2 rounded-full bg-gradient-to-b from-[#d6d6d6] to-[#9a9a9a]" />
      <div className="relative w-full shadow-[0_20px_40px_-20px_rgb(0_0_0/0.4)]" style={{ aspectRatio: `${src.width} / ${src.height}` }}>
        <Image src={src} alt={alt} fill sizes={sizes} quality={90} className="object-cover" />
        <span aria-hidden className="absolute inset-0 bg-gradient-to-r from-black/[0.06] via-white/10 to-black/[0.08]" />
      </div>
      <span aria-hidden className="relative z-10 h-3 w-[108%] sm:h-4 rounded-[4px] bg-gradient-to-b from-[#bdbdbd] via-[#8c8c8c] to-[#5c5c5c]" />
      <span aria-hidden className="flex w-[118%] justify-between">
        <span className="h-1 w-[18%] rounded-full bg-[#4a4a4a]" />
        <span className="h-1 w-[18%] rounded-full bg-[#4a4a4a]" />
      </span>
      <span aria-hidden className="mt-1 h-3 w-[140%] rounded-[50%] bg-black/20 blur-md" />
    </div>
  )
}

/** A free-standing event backdrop on a slim frame with feet. */
export function Backdrop({ src, alt, sizes = "900px", className }: StandeeProps) {
  return (
    <div className={cn("relative flex flex-col items-center", className)}>
      <div
        className="relative w-full border-[6px] border-[#2b2b2b] bg-white shadow-[0_40px_70px_-30px_rgb(0_0_0/0.5)]"
        style={{ aspectRatio: `${src.width} / ${src.height}` }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} quality={90} className="object-cover" />
      </div>
      <span aria-hidden className="flex w-[92%] justify-between">
        <span className="h-3 w-2 bg-[#2b2b2b]" />
        <span className="h-3 w-2 bg-[#2b2b2b]" />
      </span>
      <span aria-hidden className="flex w-[100%] justify-between">
        <span className="h-1.5 w-[14%] rounded-full bg-[#2b2b2b]" />
        <span className="h-1.5 w-[14%] rounded-full bg-[#2b2b2b]" />
      </span>
      <span aria-hidden className="mt-1 h-4 w-[110%] rounded-[50%] bg-black/15 blur-lg" />
    </div>
  )
}
