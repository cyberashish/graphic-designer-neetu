import { TiltedWall } from "@/components/mockups/tilted-wall"

import { ArtGrid, ShowcaseSection, Stage } from "../../showcase-parts"
import { assets } from "./assets"

const captions = [
  "Puppet strings: pain pulls every move",
  "The backpack: posture, sitting hours, stress",
  "The magnet: drawing the pain away",
  "Dragging the boulder of back pain",
  "35 lakh+ patients form the map of India",
  "Anchored down by spine pain",
  "A tower of boxes, one strain away",
  "Two paths: surgery, or a smarter alternative",
  "Slip disc and sciatica, made visible",
]

export default function PmaxSpineShowcase() {
  return (
    <>
      <ShowcaseSection title="Visual metaphors" note="One idea per frame, readable at thumbnail size.">
        <Stage className="h-[420px] bg-[#0e3f37] sm:h-[520px]">
          <TiltedWall images={assets.concepts} columns={4} sizes="(min-width: 1024px) 240px, 30vw" />
        </Stage>
      </ShowcaseSection>

      <ShowcaseSection title="The concepts" note="1:1 masters, adapted to 4:5 and 1.91:1">
        <ArtGrid images={assets.concepts} alt="Spine care ad" captions={captions} layout="feature" className="grid-cols-2 sm:grid-cols-3" sizes="(min-width: 1024px) 380px, 50vw" />
      </ShowcaseSection>
    </>
  )
}
