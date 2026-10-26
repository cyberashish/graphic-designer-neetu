import Image, { type StaticImageData } from "next/image"

import { BrowserFrame, SkeletonLines } from "@/components/mockups/browser-frame"

type NewsPageProps = {
  ads: StaticImageData[]
  sizes?: string
  className?: string
}

/** A news article page whose "Around the web" module carries the Taboola ads. */
export function NewsPage({ ads, sizes = "400px", className }: NewsPageProps) {
  return (
    <BrowserFrame url="dailyhealthnews.in/health/joint-care" className={className}>
      <div className="p-[4cqw]">
        <span aria-hidden className="flex items-center justify-between border-b border-black/10 pb-[2cqw]">
          <span className="font-serif text-[3cqw] font-bold tracking-tight text-black">The Daily Health</span>
          <span className="flex gap-[2cqw]">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="h-[1cqw] w-[6cqw] rounded-full bg-black/10" />
            ))}
          </span>
        </span>
        <span aria-hidden className="mt-[3cqw] block h-[2.4cqw] w-[70%] rounded-full bg-black/15" />
        <SkeletonLines lines={3} className="mt-[2cqw]" />

        <p className="mt-[3.5cqw] text-[1.8cqw] font-semibold tracking-wide text-black/50 uppercase">Around the web</p>
        <div className="mt-[1.5cqw] grid grid-cols-2 gap-[2.5cqw]">
          {ads.map((ad, i) => (
            <div key={i}>
              <div className="relative overflow-hidden rounded-[1cqw]" style={{ aspectRatio: `${ad.width} / ${ad.height}` }}>
                <Image src={ad} alt={`Taboola ad ${i + 1}`} fill sizes={sizes} className="object-cover" />
              </div>
              <span className="mt-[1cqw] block text-[1.6cqw] text-black/45">Sponsored · ResearchAyu</span>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  )
}
