import { TiltedWall } from "@/components/mockups/tilted-wall"

import { ArtGrid, ShowcaseSection, Stage } from "../../showcase-parts"
import { assets } from "./assets"

const captions = [
  "A spotlight on the one open door",
  "Type-led: tried everything for PAIN",
  "A queue walking through the green door",
  "Morning stiffness, and the shadow that walks free",
  "The brand initial becomes the clinic",
  "A helping hand up the stairs",
  "Two doors: surgery, or the alternative",
  "Floating steps back to easy walking",
  "The switch: surgery off, ResearchAyu on",
]

export default function PmaxKneeShowcase() {
  return (
    <>
      <ShowcaseSection title="Visual metaphors" note="Doors, stairs and shadows, one idea per frame.">
        <Stage className="h-[420px] bg-[#efe9e1] sm:h-[520px]">
          <TiltedWall images={assets.concepts} columns={4} sizes="(min-width: 1024px) 240px, 30vw" />
        </Stage>
      </ShowcaseSection>

      <ShowcaseSection title="The concepts" note="1:1 masters in English, Hindi & Marathi">
        <ArtGrid images={assets.concepts} alt="Knee care ad" captions={captions} layout="feature" className="grid-cols-2 sm:grid-cols-3" sizes="(min-width: 1024px) 380px, 50vw" />
      </ShowcaseSection>
    </>
  )
}
