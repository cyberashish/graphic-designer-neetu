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

/**
 * A roll-up shown up close: capped top rail, gently curved print with sheen,
 * an aluminium cassette base on two feet, and a contact shadow on the floor.
 * Sized from its own width, so it holds together at any scale.
 */
export function RollUpBanner({ src, alt, sizes = "320px", className }: StandeeProps) {
  return (
    <div className={cn("@container relative flex flex-col items-center", className)}>
      {/* Top rail with dark end caps */}
      <span
        aria-hidden
        className="relative z-10 -mb-[1cqw] h-[4.5cqw] w-[104%] rounded-[2cqw] bg-[linear-gradient(to_bottom,#fafafa,#cfcfcf_40%,#8f8f8f)] shadow-[0_2px_3px_rgb(0_0_0/0.25)] before:absolute before:inset-y-0 before:left-0 before:w-[4%] before:rounded-l-[2cqw] before:bg-[#3b3b3b] after:absolute after:inset-y-0 after:right-0 after:w-[4%] after:rounded-r-[2cqw] after:bg-[#3b3b3b]"
      />
      <div
        className="relative w-full shadow-[14px_18px_40px_-14px_rgb(0_0_0/0.35),0_2px_6px_rgb(0_0_0/0.08)]"
        style={{ aspectRatio: `${src.width} / ${src.height}` }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} quality={90} className="object-cover" />
        {/* The vinyl bows slightly between rail and base */}
        <span aria-hidden className="absolute inset-0 bg-[linear-gradient(to_right,rgb(0_0_0/0.10),rgb(255_255_255/0.08)_35%,transparent_60%,rgb(0_0_0/0.12))]" />
        <span aria-hidden className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/15 to-transparent" />
      </div>
      {/* Cassette base */}
      <span
        aria-hidden
        className="relative z-10 -mt-[1cqw] h-[10cqw] w-[112%] rounded-t-[2.5cqw] rounded-b-[3.5cqw] bg-[linear-gradient(to_bottom,#f4f4f4,#c4c4c4_28%,#8a8a8a_70%,#5d5d5d)] shadow-[0_6px_10px_-4px_rgb(0_0_0/0.4)] after:absolute after:inset-x-[5%] after:top-[34%] after:h-px after:bg-black/20"
      />
      {/* Feet */}
      <span aria-hidden className="relative z-0 -mt-[1.5cqw] flex w-[124%] justify-between">
        <span className="h-[2.5cqw] w-[24%] rounded-full bg-[#2e2e2e]" />
        <span className="h-[2.5cqw] w-[24%] rounded-full bg-[#2e2e2e]" />
      </span>
      {/* Contact shadow */}
      <span aria-hidden className="-mt-[3cqw] h-[9cqw] w-[150%] rounded-[50%] bg-black/25 blur-[8px]" />
    </div>
  )
}
