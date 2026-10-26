import { SocialCover } from "../../social-cover"
import { assets } from "./assets"

export function InstagramEducationCover() {
  return (
    <SocialCover
      slides={assets.rootCause}
      floating={[assets.rootCause[2], assets.rootCause[4]]}
      caption="Your knee cushion didn't wear out overnight. Swipe to see the real root cause →"
    />
  )
}
