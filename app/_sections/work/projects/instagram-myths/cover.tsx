import Image from "next/image"

import { InstagramProfile } from "@/components/mockups/instagram-profile"
import { PhoneFrame } from "@/components/mockups/phone-frame"

import { assets } from "./assets"

const grid = [...assets.myths.slice(0, 6), ...assets.trust.slice(0, 3), ...assets.myths.slice(6), ...assets.trust.slice(3)]

export function InstagramMythsCover() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="absolute -translate-x-[62%] -rotate-[7deg] overflow-hidden rounded-[10px] shadow-[0_24px_44px_-20px_rgb(0_0_0/0.45)] transition-transform duration-700 ease-out-expo group-hover:-translate-x-[70%] group-hover:-rotate-[10deg]"
        style={{ width: "min(30cqw, 36cqh)", aspectRatio: "4 / 5" }}
      >
        <Image src={assets.myths[0]} alt="" fill sizes="300px" className="object-cover" />
      </div>
      <div
        className="relative translate-x-[30%] transition-transform duration-700 ease-out-expo group-hover:-translate-y-2"
        style={{ width: "min(34cqw, 39cqh)" }}
      >
        <PhoneFrame>
          <InstagramProfile posts={grid} bio="Research-led Ayurveda for knees & spine. Myth vs Reality every week." sizes="140px" />
        </PhoneFrame>
      </div>
    </div>
  )
}
