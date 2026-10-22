import { InstagramPost } from "@/components/mockups/instagram-post"
import { PhoneFrame } from "@/components/mockups/phone-frame"

import { ArtGrid, ShowcaseSection, Stage } from "../../showcase-parts"
import { assets } from "./assets"

const series = [
  { title: "Myth vs Reality", slides: assets.myths, caption: "5 knee pain myths you probably believe. Swipe for the truth →" },
  { title: "Backed by research", slides: assets.trust, caption: "Results backed by research, trusted at scale." },
]

export default function InstagramMythsShowcase() {
  return (
    <>
      <ShowcaseSection title="Two carousels" note="Tap or swipe inside each phone.">
        <Stage className="grid gap-10 bg-[#e4eee9] sm:grid-cols-2 sm:px-16">
          {series.map((s) => (
            <figure key={s.title} className="mx-auto w-[min(290px,80%)]">
              <PhoneFrame>
                <InstagramPost slides={s.slides} caption={s.caption} sizes="290px" />
              </PhoneFrame>
              <figcaption className="mt-4 text-center text-base font-medium">{s.title}</figcaption>
            </figure>
          ))}
        </Stage>
      </ShowcaseSection>

      <ShowcaseSection title="Myth vs Reality, slide by slide" note={`${assets.myths.length} slides`}>
        <ArtGrid images={assets.myths} alt="Myth vs Reality slide" className="grid-cols-2 sm:grid-cols-4" />
      </ShowcaseSection>

      <ShowcaseSection title="Trust series" note={`${assets.trust.length} slides`}>
        <ArtGrid images={assets.trust} alt="Trust series slide" className="grid-cols-2 sm:grid-cols-5" />
      </ShowcaseSection>
    </>
  )
}
