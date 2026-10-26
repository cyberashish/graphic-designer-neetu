import { CarouselShowcase } from "../../carousel-showcase"
import { ShowcaseSection } from "../../showcase-parts"
import { assets } from "./assets"

export default function InstagramMythsShowcase() {
  return (
    <ShowcaseSection title="Swipe the carousel" note="Tap or swipe the phone · click a slide to enlarge.">
      <CarouselShowcase
        slides={assets.myths}
        caption="5 knee pain myths you probably believe. Swipe for the truth →"
        alt="Myth vs Reality slide"
        tone="bg-[#e4eee9]"
      />
    </ShowcaseSection>
  )
}
