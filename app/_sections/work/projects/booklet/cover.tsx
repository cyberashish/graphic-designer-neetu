import { BookCover, BookSpread } from "@/components/mockups/book"

import { assets } from "./assets"

export function BookletCover() {
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-[4cqw] px-[6cqw]">
      <div
        className="shrink-0 -rotate-6 transition-transform duration-700 ease-out-expo group-hover:-translate-y-2 group-hover:-rotate-[9deg]"
        style={{ width: "min(24cqw, 56cqh)" }}
      >
        <BookCover cover={assets.cover[0]} alt="Booklet cover" sizes="(min-width: 1024px) 340px, 40vw" />
      </div>
      <div
        className="shrink-0 transition-transform duration-700 ease-out-expo group-hover:-translate-y-2"
        style={{ width: "min(68cqw, 110cqh)" }}
      >
        <BookSpread spread={assets.spreads[2]} alt="Booklet spread: Giloy, nectar or poison" tilt={0} sizes="(min-width: 1024px) 960px, 90vw" />
      </div>
    </div>
  )
}
