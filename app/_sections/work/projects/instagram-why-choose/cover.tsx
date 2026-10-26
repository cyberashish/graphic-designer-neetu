import { SocialCover } from "../../social-cover"
import { assets } from "./assets"

export function InstagramWhyChooseCover() {
  return (
    <SocialCover
      slides={assets.trust}
      floating={[assets.trust[2], assets.trust[4]]}
      caption="Why choose ResearchAyu for your knee & spine care? Swipe →"
    />
  )
}
