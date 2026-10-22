import { Grid3x3 } from "lucide-react"
import Image, { type StaticImageData } from "next/image"

import { BrandAvatar, StatusBar } from "./phone-frame"

type InstagramProfileProps = {
  posts: StaticImageData[]
  handle?: string
  bio: string
  sizes?: string
}

/** An Instagram profile grid (4:5 tiles) for use inside `PhoneFrame`. */
export function InstagramProfile({ posts, handle = "researchayu", bio, sizes = "120px" }: InstagramProfileProps) {
  return (
    <div className="flex h-full flex-col bg-white text-black">
      <StatusBar />
      <p className="px-[4cqw] pb-[3cqw] text-[4.2cqw] font-bold">{handle}</p>
      <div className="flex items-center gap-[4cqw] px-[4cqw]">
        <span className="rounded-full bg-gradient-to-tr from-amber-400 via-pink-500 to-fuchsia-600 p-[0.8cqw]">
          <BrandAvatar className="size-[17cqw] text-[7cqw] ring-[0.8cqw] ring-white" />
        </span>
        <span className="min-w-0 leading-snug">
          <span className="block text-[3.6cqw] font-semibold">ResearchAyu</span>
          <span className="line-clamp-2 block text-[3cqw] text-black/60">{bio}</span>
        </span>
      </div>
      <div aria-hidden className="mx-[4cqw] mt-[3.5cqw] grid grid-cols-2 gap-[1.5cqw]">
        <span className="rounded-[1.5cqw] bg-black/[0.06] py-[1.8cqw] text-center text-[3cqw] font-semibold">Follow</span>
        <span className="rounded-[1.5cqw] bg-black/[0.06] py-[1.8cqw] text-center text-[3cqw] font-semibold">Message</span>
      </div>
      <div className="mt-[3.5cqw] flex justify-center border-b border-black/10 pb-[2cqw]">
        <Grid3x3 className="size-[5cqw]" aria-hidden />
      </div>
      <div className="grid grid-cols-3 gap-[0.6cqw]">
        {posts.map((post, i) => (
          <div key={i} className="relative aspect-[4/5]">
            <Image src={post} alt="" fill sizes={sizes} className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  )
}
