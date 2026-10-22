import { InstagramPost } from "@/components/mockups/instagram-post"
import { PhoneFrame } from "@/components/mockups/phone-frame"

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
]

export default function PmaxKneeShowcase() {
  return (
    <>
      <ShowcaseSection title="In the feed" note="Tap or swipe inside the phone.">
        <Stage className="grid items-center gap-10 bg-[#efe9e1] lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-16 lg:px-20">
          <div className="mx-auto w-[min(300px,80%)]">
            <PhoneFrame>
              <InstagramPost slides={assets.concepts} caption="Knee pain and surgery recommended? There's another door." aspect="square" sizes="300px" />
            </PhoneFrame>
          </div>
          <div>
            <p className="max-w-md text-2xl leading-snug font-semibold tracking-tight text-balance">
              Doors, stairs and shadows: simple metaphors for choosing a path without surgery.
            </p>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">
              Each concept was built as a 1:1 master, then adapted to 4:5 and 1.91:1 and translated for Delhi, Hyderabad and
              Maharashtra.
            </p>
          </div>
        </Stage>
      </ShowcaseSection>

      <ShowcaseSection title="The series" note="English, Hindi, Marathi & Telugu">
        <ArtGrid images={assets.concepts} alt="Knee care ad" captions={captions} className="grid-cols-2 sm:grid-cols-4" />
      </ShowcaseSection>
    </>
  )
}
