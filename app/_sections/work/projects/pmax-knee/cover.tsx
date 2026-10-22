import Image from "next/image"

import { Marquee } from "@/components/shared/marquee"

import { assets } from "./assets"

const rows = [assets.concepts.slice(0, 4), assets.concepts.slice(4)]

/** Two ad rows gliding in opposite directions, like a feed scrolling by. */
export function PmaxKneeCover() {
  return (
    <div aria-hidden className="absolute inset-0 flex -rotate-3 flex-col justify-center gap-[3cqh] [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      {rows.map((row, r) => (
        <Marquee key={r} duration={38} reverse={r === 1} trackClassName="gap-[2.5cqh] pr-[2.5cqh]">
          {row.map((image, i) => (
            <div
              key={i}
              className="relative shrink-0 overflow-hidden rounded-[12px] shadow-[0_18px_30px_-16px_rgb(0_0_0/0.4)]"
              style={{ width: "40cqh", height: "40cqh" }}
            >
              <Image src={image} alt="" fill sizes="(min-width: 1024px) 280px, 50vw" className="object-cover" />
            </div>
          ))}
        </Marquee>
      ))}
    </div>
  )
}
