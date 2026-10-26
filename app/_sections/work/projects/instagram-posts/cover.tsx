import { SocialCover } from "../../social-cover"
import { assets } from "./assets"

export function InstagramPostsCover() {
  return (
    <SocialCover
      slides={[assets.posts[0]]}
      floating={[assets.posts[1], assets.posts[2]]}
      caption="Understanding knee pain starts here. Learn how natural cushion regrowth works."
    />
  )
}
