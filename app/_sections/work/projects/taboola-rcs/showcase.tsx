import { PhoneFrame } from "@/components/mockups/phone-frame"
import { RcsChat } from "@/components/mockups/rcs-chat"

import { ArtGrid, ShowcaseSection, Stage } from "../../showcase-parts"
import { assets } from "./assets"
import { NewsPage } from "./news-page"

const rcsTitles = ["Knee pain with every movement?", "Struggling with knee pain?", "Been avoiding stairs because of knee pain?"]

export default function TaboolaRcsShowcase() {
  return (
    <>
      <ShowcaseSection title="Taboola, inside the news" note="Placements on a health article.">
        <Stage className="bg-[#eaeef1] sm:px-16">
          <NewsPage ads={assets.taboola.slice(0, 4)} sizes="(min-width: 1024px) 440px, 45vw" />
        </Stage>
      </ShowcaseSection>

      <ShowcaseSection title="RCS rich cards" note="Delivered straight to the inbox with call and booking actions.">
        <Stage className="grid items-center gap-10 bg-surface lg:grid-cols-[minmax(0,320px)_1fr] lg:px-20">
          <div className="mx-auto w-[min(300px,80%)]">
            <PhoneFrame>
              <RcsChat cards={assets.rcs.map((image, i) => ({ image, title: rcsTitles[i] }))} sizes="280px" />
            </PhoneFrame>
          </div>
          <ArtGrid images={assets.rcs} alt="RCS card" className="grid-cols-1" sizes="(min-width: 1024px) 600px, 90vw" />
        </Stage>
      </ShowcaseSection>

      <ShowcaseSection title="All Taboola ads" note="2.2:1">
        <ArtGrid images={assets.taboola.slice(4)} alt="Featured Taboola ad" className="mb-3 grid-cols-1 sm:mb-5" sizes="(min-width: 1024px) 1140px, 90vw" />
        <ArtGrid images={assets.taboola.slice(0, 4)} alt="Taboola ad" className="grid-cols-1 sm:grid-cols-2" sizes="(min-width: 1024px) 560px, 90vw" />
      </ShowcaseSection>
    </>
  )
}
