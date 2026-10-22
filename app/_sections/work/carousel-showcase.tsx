import type { StaticImageData } from "next/image"

import { InstagramPost } from "@/components/mockups/instagram-post"
import { PhoneFrame } from "@/components/mockups/phone-frame"
import { cn } from "@/lib/utils"

import { ArtGrid } from "./art-grid"

type CarouselShowcaseProps = {
  slides: StaticImageData[]
  caption: string
  /** Alt text prefix for the tiles, e.g. "Carousel slide". */
  alt?: string
  aspect?: "portrait" | "square"
  tone?: string
}

/**
 * A phone playing the set as a swipe/tap carousel, beside the same artwork as
 * tiles that open in the large viewer.
 */
export function CarouselShowcase({ slides, caption, alt = "Carousel slide", aspect = "portrait", tone = "bg-[#e1ede6]" }: CarouselShowcaseProps) {
  return (
    <div
      className={cn(
        "grid items-center gap-10 rounded-[1.75rem] p-6 sm:rounded-[2rem] sm:p-12 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-16 lg:px-20",
        tone
      )}
    >
      <div className="mx-auto w-[min(300px,80%)]">
        <PhoneFrame>
          <InstagramPost slides={slides} caption={caption} aspect={aspect} sizes="300px" />
        </PhoneFrame>
      </div>
      <ArtGrid images={slides} alt={alt} className="grid-cols-4" sizes="(min-width: 1024px) 180px, 25vw" />
    </div>
  )
}
