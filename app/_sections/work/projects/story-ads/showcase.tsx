import { ArtGrid, ShowcaseSection } from "../../showcase-parts"
import { assets } from "./assets"
import { FeedStage } from "./feed-stage"

const captions = [
  "Ready to run again · English",
  "Freedom, expressed through dance · English",
  "The weight of knee pain · Kannada",
  "Strong knees, steady steps · Marathi",
  "The tired shadow · Marathi",
  "Knee cushion regrowth, explained · English",
  "Skip the balms and painkillers · English",
  "A setback on the court · English",
  "From knee pain to free movement · English",
  "Worn joint vs restored joint · Marathi",
  "Restore the knee gap · Marathi",
  "Today's pain, tomorrow's mobility · Hindi",
]

export default function StoryAdsShowcase() {
  return (
    <>
      <ShowcaseSection title="As seen in the feed" note="The centre phone plays the full set.">
        <FeedStage />
      </ShowcaseSection>

      <ShowcaseSection title="The full set" note="Click any ad to view it larger.">
        <ArtGrid
          images={assets.stories}
          alt="Story ad"
          captions={captions}
          className="grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-4"
          sizes="(min-width: 1024px) 300px, 50vw"
        />
      </ShowcaseSection>
    </>
  )
}
