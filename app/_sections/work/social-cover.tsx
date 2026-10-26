import Image, { type StaticImageData } from "next/image"

import { InstagramPost } from "@/components/mockups/instagram-post"
import { PhoneFrame } from "@/components/mockups/phone-frame"

const floatingPositions = [
  "top-[16%] right-[8%] rotate-[8deg] group-hover:rotate-[12deg] group-hover:translate-x-2",
  "bottom-[14%] right-[18%] -rotate-[6deg] group-hover:-rotate-[10deg] group-hover:-translate-y-2",
]

type SocialCoverProps = {
  /** What plays inside the phone; a single image reads as a static post. */
  slides: StaticImageData[]
  /** Two pieces of artwork that float beside the phone. */
  floating: [StaticImageData, StaticImageData]
  caption: string
}

/** Shared card cover for the Social projects: a feed post in a phone with two loose slides beside it. */
export function SocialCover({ slides, floating, caption }: SocialCoverProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {floating.map((image, i) => (
        <div
          key={i}
          className={`absolute overflow-hidden rounded-[10px] shadow-[0_24px_44px_-20px_rgb(0_0_0/0.45)] transition-transform duration-700 ease-out-expo ${floatingPositions[i]}`}
          style={{ width: "min(24cqw, 30cqh)", aspectRatio: "4 / 5" }}
        >
          <Image src={image} alt="" fill sizes="300px" className="object-cover" />
        </div>
      ))}
      <div
        className="relative -translate-x-[22%] transition-transform duration-700 ease-out-expo group-hover:-translate-y-2"
        style={{ width: "min(34cqw, 39cqh)" }}
      >
        <PhoneFrame>
          <InstagramPost slides={slides} caption={caption} autoplay={slides.length > 1} sizes="300px" />
        </PhoneFrame>
      </div>
    </div>
  )
}
