import { PhoneFrame } from "@/components/mockups/phone-frame"
import { RcsChat } from "@/components/mockups/rcs-chat"

import { assets } from "./assets"
import { NewsPage } from "./news-page"

export function NativeRcsCover() {
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-[3cqw] px-[6cqw]">
      <div
        className="shrink-0 transition-transform duration-700 ease-out-expo group-hover:-translate-y-2"
        style={{ width: "min(60cqw, 118cqh)" }}
      >
        <NewsPage ads={[assets.native[0], assets.native[4]]} sizes="(min-width: 1024px) 560px, 60vw" />
      </div>
      <div
        className="-ml-[8cqw] shrink-0 translate-y-[6%] transition-transform duration-700 ease-out-expo group-hover:translate-y-[2%] group-hover:rotate-2"
        style={{ width: "min(22cqw, 38cqh)" }}
      >
        <PhoneFrame>
          <RcsChat
            cards={[
              { image: assets.rcs[0], title: "Knee pain with every movement?" },
              { image: assets.rcs[1], title: "Struggling with knee pain?" },
            ]}
            sizes="260px"
          />
        </PhoneFrame>
      </div>
    </div>
  )
}
