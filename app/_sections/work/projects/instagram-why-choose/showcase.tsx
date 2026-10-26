import { CarouselShowcase } from "../../carousel-showcase"
import { ShowcaseSection } from "../../showcase-parts"
import { assets } from "./assets"

export default function InstagramWhyChooseShowcase() {
  return (
    <ShowcaseSection title="Swipe the carousel" note="Tap or swipe the phone · click a slide to enlarge.">
      <CarouselShowcase
        slides={assets.trust}
        caption="Why choose ResearchAyu for your knee & spine care? Swipe →"
        alt="Why Choose slide"
        tone="bg-[#e8eeec]"
      />
    </ShowcaseSection>
  )
}
