import { CarouselShowcase } from "../../carousel-showcase"
import { ShowcaseSection } from "../../showcase-parts"
import { assets } from "./assets"

export default function InstagramEducationShowcase() {
  return (
    <ShowcaseSection title="Swipe the carousel" note="Tap or swipe the phone · click a slide to enlarge.">
      <CarouselShowcase
        slides={assets.rootCause}
        caption="Your knee cushion didn't wear out overnight. Swipe to see the real root cause →"
      />
    </ShowcaseSection>
  )
}
