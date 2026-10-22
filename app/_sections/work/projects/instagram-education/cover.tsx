import Image from "next/image"

import { InstagramPost } from "@/components/mockups/instagram-post"
import { PhoneFrame } from "@/components/mockups/phone-frame"

import { assets } from "./assets"

const floating = [
  { image: assets.rootCause[2], className: "top-[16%] right-[8%] rotate-[8deg] group-hover:rotate-[12deg] group-hover:translate-x-2" },
  { image: assets.rootCause[4], className: "bottom-[14%] right-[18%] -rotate-[6deg] group-hover:-rotate-[10deg] group-hover:-translate-y-2" },
]

export function InstagramEducationCover() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {floating.map(({ image, className }, i) => (
        <div
          key={i}
          className={`absolute overflow-hidden rounded-[10px] shadow-[0_24px_44px_-20px_rgb(0_0_0/0.45)] transition-transform duration-700 ease-out-expo ${className}`}
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
          <InstagramPost
            slides={assets.rootCause}
            caption="Your knee cushion didn't wear out overnight. Swipe to see the real root cause →"
            autoplay
            sizes="300px"
          />
        </PhoneFrame>
      </div>
    </div>
  )
}
