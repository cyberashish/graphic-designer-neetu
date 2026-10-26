import { SocialCover } from "../../social-cover"
import { assets } from "./assets"

export function InstagramMythsCover() {
  return (
    <SocialCover
      slides={assets.myths}
      floating={[assets.myths[2], assets.myths[4]]}
      caption="5 knee pain myths you probably believe. Swipe for the truth →"
    />
  )
}
