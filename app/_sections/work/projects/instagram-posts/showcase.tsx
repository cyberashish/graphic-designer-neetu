import { ArtGrid, ShowcaseSection } from "../../showcase-parts"
import { assets } from "./assets"

export default function InstagramPostsShowcase() {
  return (
    <ShowcaseSection title="Single-image posts" note="Proof points, one idea per post · click to enlarge.">
      <ArtGrid images={assets.posts} alt="Instagram post" className="grid-cols-2 lg:grid-cols-4" />
    </ShowcaseSection>
  )
}
