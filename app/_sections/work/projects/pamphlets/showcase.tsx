import { FlipCard } from "@/components/mockups/flip-card"
import { Paper } from "@/components/mockups/paper"
import { ZoomGroup, ZoomTarget } from "@/components/shared/zoom-group"

import { ShowcaseSection, Stage } from "../../showcase-parts"
import { assets } from "./assets"

const labels = [
  "Clinic pamphlet · English",
  "Knee gap awareness pamphlet · English",
  "Knee cushion degeneration pamphlet · English",
  "Clinic pamphlet · Hindi",
]

export default function PamphletsShowcase() {
  // Every front plus the back of the clinic pamphlet, in one viewer.
  const items = [
    ...assets.fronts.map((image, i) => ({ image, alt: labels[i], caption: `${labels[i]} · 4 × 11 in` })),
    { image: assets.backs[0], alt: "Clinic pamphlet, back", caption: "Clinic pamphlet · back · 4 × 11 in" },
  ]

  return (
    <ZoomGroup items={items}>
      <ShowcaseSection title="The series" note="4 × 11 inch rack cards · click any to enlarge.">
        <Stage className="bg-[#f2ede6] sm:py-20">
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
            {assets.fronts.map((front, i) => (
              <ZoomTarget key={i} index={i} label={labels[i]}>
                <Paper
                  src={front}
                  alt={labels[i]}
                  sizes="(min-width: 1024px) 220px, 45vw"
                  className="transition-[rotate] duration-500 ease-out-expo group-hover/zoom:rotate-0"
                  style={{ rotate: `${[-2, 1.5, -1, 2][i]}deg` }}
                />
              </ZoomTarget>
            ))}
          </div>
        </Stage>
      </ShowcaseSection>

      <ShowcaseSection title="Front & back" note="Click the card to flip it.">
        <Stage className="bg-surface sm:py-16">
          <FlipCard
            front={assets.fronts[0]}
            back={assets.backs[0]}
            label="Clinic pamphlet"
            sizes="(min-width: 1024px) 300px, 60vw"
            className="mx-auto w-[min(300px,70%)]"
          />
        </Stage>
      </ShowcaseSection>
    </ZoomGroup>
  )
}
