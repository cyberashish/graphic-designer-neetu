import { CarouselShowcase } from "../../carousel-showcase"
import { ArtGrid, ShowcaseSection } from "../../showcase-parts"
import { assets } from "./assets"

export default function InstagramEducationShowcase() {
  return (
    <>
      <ShowcaseSection title="Swipe the carousel" note="Tap or swipe the phone · click a slide to enlarge.">
        <CarouselShowcase
          slides={assets.rootCause}
          caption="Your knee cushion didn't wear out overnight. Swipe to see the real root cause →"
        />
      </ShowcaseSection>

      <ShowcaseSection title="Single-image posts" note="Proof points, one idea per post.">
        <ArtGrid images={assets.posts} alt="Instagram post" className="grid-cols-2 lg:grid-cols-4" />
      </ShowcaseSection>
    </>
  )
}
