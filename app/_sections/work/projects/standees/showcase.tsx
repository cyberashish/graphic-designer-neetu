import { Backdrop, RollUpStandee } from "@/components/mockups/standee"
import { ZoomGroup, ZoomTarget } from "@/components/shared/zoom-group"

import { ShowcaseSection, Stage } from "../../showcase-parts"
import { assets } from "./assets"

const floor = "bg-[linear-gradient(to_bottom,#ecebe7_78%,#dedad2_78%)]"

export default function StandeesShowcase() {
  const [english, marathi] = assets.rollups
  const [large, square] = assets.backdrops

  // One viewer for every standee on the page, in this order.
  const items = [
    { image: english, alt: "Roll-up standee, English", caption: "Roll-up standee · 3 × 6 ft · English" },
    { image: marathi, alt: "Roll-up standee, Marathi", caption: "Roll-up standee · 3 × 6 ft · Marathi" },
    { image: large, alt: "10 × 8 ft stage backdrop", caption: "Stage backdrop · 10 × 8 ft" },
    { image: square, alt: "6 × 6 ft backdrop", caption: "Square backdrop · 6 × 6 ft" },
  ]

  return (
    <ZoomGroup items={items}>
      <ShowcaseSection title="At the venue" note="10 × 8 ft backdrop flanked by 3 × 6 ft roll-ups · click any to enlarge.">
        <Stage className={`${floor} px-4 pt-12 pb-10 sm:px-10 sm:pt-16`}>
          <div className="relative mx-auto max-w-5xl">
            <ZoomTarget index={2} label={items[2].alt} className="mx-auto w-[72%]">
              <Backdrop src={large} alt={items[2].alt} sizes="(min-width: 1024px) 760px, 80vw" />
            </ZoomTarget>
            <ZoomTarget index={0} label={items[0].alt} className="absolute bottom-0 left-0 w-[17%]">
              <RollUpStandee src={english} alt={items[0].alt} sizes="(min-width: 1024px) 180px, 18vw" />
            </ZoomTarget>
            <ZoomTarget index={1} label={items[1].alt} className="absolute right-0 bottom-0 w-[17%]">
              <RollUpStandee src={marathi} alt={items[1].alt} sizes="(min-width: 1024px) 180px, 18vw" />
            </ZoomTarget>
          </div>
        </Stage>
      </ShowcaseSection>

      <div className="grid gap-x-5 pb-10 sm:pb-14 lg:grid-cols-[1fr_1.2fr]">
        <ShowcaseSection title="Roll-ups" note="English & Marathi" className="pt-0 sm:pt-0">
          <Stage className={`${floor} flex items-end justify-center gap-10 pt-12 lg:h-[560px]`}>
            <ZoomTarget index={0} label={items[0].alt} className="w-[34%]">
              <RollUpStandee src={english} alt={items[0].alt} sizes="(min-width: 1024px) 200px, 34vw" />
            </ZoomTarget>
            <ZoomTarget index={1} label={items[1].alt} className="w-[34%]">
              <RollUpStandee src={marathi} alt={items[1].alt} sizes="(min-width: 1024px) 200px, 34vw" />
            </ZoomTarget>
          </Stage>
        </ShowcaseSection>
        <ShowcaseSection title="Square backdrop" note="6 × 6 ft" className="pt-0 sm:pt-0">
          <Stage className={`${floor} flex items-end justify-center pt-12 lg:h-[560px]`}>
            <ZoomTarget index={3} label={items[3].alt} className="w-[70%] lg:w-[62%]">
              <Backdrop src={square} alt={items[3].alt} sizes="(min-width: 1024px) 420px, 70vw" />
            </ZoomTarget>
          </Stage>
        </ShowcaseSection>
      </div>
    </ZoomGroup>
  )
}
