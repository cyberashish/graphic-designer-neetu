import { BadgeCheck, ChevronLeft, MoreVertical, Phone, Plus, SendHorizontal } from "lucide-react"
import Image, { type StaticImageData } from "next/image"

import { BrandAvatar, StatusBar } from "./phone-frame"

type RcsChatProps = {
  cards: { image: StaticImageData; title: string }[]
  sizes?: string
}

/**
 * A verified business conversation in a messaging app (RCS rich cards), for
 * use inside `PhoneFrame`. Messages stack from the bottom like a real chat, so
 * older cards slide under the header rather than the newest being cut off.
 */
export function RcsChat({ cards, sizes = "300px" }: RcsChatProps) {
  return (
    <div className="flex h-full flex-col bg-[#eef3f1] text-black">
      <div className="relative z-10 bg-white shadow-[0_1px_0_rgb(0_0_0/0.06)]">
        <StatusBar />
        <div className="flex items-center gap-[2.5cqw] px-[3cqw] pb-[3cqw]">
          <ChevronLeft className="size-[5.5cqw]" aria-hidden />
          <BrandAvatar className="size-[9cqw] text-[4cqw]" />
          <span className="min-w-0 flex-1 leading-tight">
            <span className="flex items-center gap-[1cqw] text-[3.7cqw] font-semibold">
              ResearchAyu <BadgeCheck className="size-[3.8cqw] shrink-0 fill-[#1a73e8] text-white" aria-label="Verified" />
            </span>
            <span className="block text-[2.8cqw] text-black/50">Verified business</span>
          </span>
          <Phone className="size-[4.8cqw]" aria-hidden />
          <MoreVertical className="size-[4.8cqw]" aria-hidden />
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col justify-end gap-[3cqw] overflow-hidden px-[3cqw] pb-[3cqw]">
        <span className="mx-auto shrink-0 rounded-full bg-black/5 px-[3cqw] py-[0.8cqw] text-[2.6cqw] text-black/50">Today</span>
        {cards.map((card, i) => (
          <div key={i} className="flex shrink-0 items-end gap-[2cqw] pr-[6cqw]">
            <BrandAvatar className="mb-[1cqw] size-[6.5cqw] text-[3cqw]" />
            <div className="min-w-0 flex-1 overflow-hidden rounded-[4cqw] rounded-bl-[1.2cqw] bg-white shadow-[0_1px_2px_rgb(0_0_0/0.08)]">
              <div className="relative" style={{ aspectRatio: `${card.image.width} / ${card.image.height}` }}>
                <Image src={card.image} alt={card.title} fill sizes={sizes} className="object-cover" />
              </div>
              <p className="px-[3.5cqw] pt-[2.5cqw] text-[3.2cqw] leading-snug font-semibold">{card.title}</p>
              <div className="grid grid-cols-2 gap-[1.5cqw] px-[3cqw] py-[2.8cqw] text-[2.8cqw] font-medium text-[#0e7461]">
                <span className="rounded-full border border-[#0e7461]/30 py-[1.2cqw] text-center">Call now</span>
                <span className="truncate rounded-full border border-[#0e7461]/30 px-[1cqw] py-[1.2cqw] text-center">Book consultation</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div aria-hidden className="flex items-center gap-[2cqw] bg-white px-[3cqw] pt-[2.5cqw] pb-[5cqw]">
        <span className="grid size-[7.5cqw] shrink-0 place-items-center rounded-full bg-black/5">
          <Plus className="size-[4.5cqw] text-black/60" />
        </span>
        <span className="flex-1 rounded-full bg-black/5 px-[3.5cqw] py-[2cqw] text-[3cqw] text-black/40">RCS message</span>
        <span className="grid size-[7.5cqw] shrink-0 place-items-center rounded-full bg-[#0e7461]">
          <SendHorizontal className="size-[4cqw] text-white" />
        </span>
      </div>
    </div>
  )
}
