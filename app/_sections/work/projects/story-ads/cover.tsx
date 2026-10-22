import Image from "next/image"

import { PhoneFrame } from "@/components/mockups/phone-frame"
import { StoryScreen } from "@/components/mockups/story-screen"

import { assets } from "./assets"

const featured = [assets.stories[0], assets.stories[1], assets.stories[4], assets.stories[9]]

export function StoryAdsCover() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Back phone */}
      <div
        className="absolute translate-x-[38%] rotate-[9deg] opacity-80 transition-transform duration-700 ease-out-expo group-hover:translate-x-[48%] group-hover:rotate-[13deg]"
        style={{ width: "min(38cqw, 37cqh)" }}
      >
        <PhoneFrame>
          <div className="flex h-full items-center bg-black">
            <div className="relative aspect-[9/16] w-full">
              <Image src={assets.stories[2]} alt="" fill sizes="260px" className="object-cover" />
            </div>
          </div>
        </PhoneFrame>
      </div>
      <div
        className="relative -translate-x-[18%] transition-transform duration-700 ease-out-expo group-hover:-translate-x-[24%] group-hover:-rotate-2"
        style={{ width: "min(46cqw, 42cqh)" }}
      >
        <PhoneFrame>
          <StoryScreen stories={featured} interactive={false} sizes="300px" />
        </PhoneFrame>
      </div>
    </div>
  )
}
