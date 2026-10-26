import { Backdrop, RollUpBanner, RollUpStandee } from "@/components/mockups/standee"
import { ZoomGroup, ZoomTarget } from "@/components/shared/zoom-group"

import { ShowcaseSection, Stage } from "../../showcase-parts"
import { assets } from "./assets"

const floor = "bg-[linear-gradient(to_bottom,#ecebe7_78%,#dedad2_78%)]"

// Roll-ups for each stop on the event floor, in the order a visitor meets them.
const placements = [
  {
    name: "Entrance",
    job: "Stops passers-by with a stat they recognise, then points them inside.",
    wall: "bg-[#ece6dc]",
    designs: [
      { image: assets.entrance[0], alt: "Entrance standee: 1 out of 3 Indians over 40 have knee pain", headline: "1 out of 3 Indians over 40" },
      { image: assets.entrance[1], alt: "Entrance standee: 1 out of 2 Indians over 50 have knee pain", headline: "1 out of 2 Indians over 50" },
    ],
  },
  {
    name: "Booth",
    job: "Builds trust where people stop to talk: numbers, partners and a free knee check.",
    wall: "bg-[#e2ebe7]",
    designs: [
      { image: assets.booth[0], alt: "Booth standee: Regrow your knee cushion while you still can", headline: "Regrow your knee cushion" },
      { image: assets.booth[1], alt: "Booth standee: Knee surgery? Check this first", headline: "Knee surgery? Check this first" },
    ],
  },
  {
    name: "Main stage",
    job: "Carries the core knee-cushion promise in type that reads from the back row.",
    wall: "bg-[#e8e9ea]",
    designs: [
      { image: assets.stage[0], alt: "Main stage standee: Chronic knee pain? How we help", headline: "Chronic knee pain? How we help" },
      { image: assets.stage[1], alt: "Main stage standee: Advised knee replacement? Pause", headline: "Advised knee replacement? Pause." },
    ],
  },
]

export default function StandeesShowcase() {
  const [english, marathi] = assets.rollups
  const [large] = assets.backdrops

  // One viewer for every standee on the page, in this order.
  const items = [
    { image: english, alt: "Roll-up standee, English", caption: "Roll-up standee · 3 × 6 ft · English" },
    { image: marathi, alt: "Roll-up standee, Marathi", caption: "Roll-up standee · 3 × 6 ft · Marathi" },
    { image: large, alt: "10 × 8 ft stage backdrop", caption: "Stage backdrop · 10 × 8 ft" },
    ...placements.flatMap(({ name, designs }) =>
      designs.map(({ image, alt }, i) => ({ image, alt, caption: `${name} standee ${i + 1} · 3 × 6 ft` }))
    ),
  ]
  const firstPlacementItem = 3

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

      {placements.map(({ name, job, wall, designs }, p) => (
        <ShowcaseSection key={name} title={name} note={job} className={p === placements.length - 1 ? "pb-10 sm:pb-14" : undefined}>
          <Stage className={`${wall} px-4 pt-14 pb-8 sm:px-12 sm:pt-20 sm:pb-10`}>
            {/* Soft overhead light on the wall, and the floor the stands rest on */}
            <span aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_0%,rgb(255_255_255/0.65),transparent)]" />
            <span aria-hidden className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-b from-black/[0.07] to-black/[0.03] shadow-[inset_0_1px_0_rgb(0_0_0/0.06)]" />
            <div className="relative flex items-end justify-center gap-[10%] sm:gap-[12%]">
              {designs.map(({ image, alt, headline }, i) => (
                <figure key={alt} className="flex w-[40%] max-w-72 flex-col items-center sm:w-[30%]">
                  <ZoomTarget index={firstPlacementItem + p * 2 + i} label={alt} className="w-full">
                    <RollUpBanner src={image} alt={alt} sizes="(min-width: 1024px) 290px, 40vw" />
                  </ZoomTarget>
                  <figcaption className="mt-3 text-center text-sm font-medium text-balance sm:text-base">{headline}</figcaption>
                </figure>
              ))}
            </div>
          </Stage>
        </ShowcaseSection>
      ))}
    </ZoomGroup>
  )
}
