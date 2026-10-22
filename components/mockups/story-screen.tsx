"use client"

import { ChevronUp } from "lucide-react"
import Image, { type StaticImageData } from "next/image"

import { useAutoplay } from "@/hooks/use-autoplay"

import { BrandAvatar } from "./phone-frame"

type StoryScreenProps = {
  stories: StaticImageData[]
  cta?: string
  /** Seconds each story stays up. */
  duration?: number
  autoplay?: boolean
  /** Render tap-to-skip zones (off when embedded in another control). */
  interactive?: boolean
  sizes?: string
}

/**
 * A full-screen story viewer for use inside `PhoneFrame`, with progress bars
 * and tap-to-skip zones. 9:16 artwork is letterboxed, never cropped, exactly as
 * it would appear on a tall phone.
 */
export function StoryScreen({ stories, cta = "Learn more", duration = 3.2, autoplay = true, interactive = true, sizes = "320px" }: StoryScreenProps) {
  const { ref, index, select, playing } = useAutoplay(stories.length, { interval: duration * 1000, enabled: autoplay })

  return (
    <div ref={ref} className="relative flex h-full flex-col justify-center bg-black text-white">
      <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[3cqw]">
        {stories.map((story, i) => (
          <Image
            key={i}
            src={story}
            alt={`Story ad ${i + 1}`}
            fill
            sizes={sizes}
            className="object-cover transition-opacity duration-500"
            style={{ opacity: i === index ? 1 : 0 }}
          />
        ))}
        {interactive && (
          <>
            <button type="button" aria-label="Previous story" onClick={() => select(index - 1)} className="absolute inset-y-0 left-0 w-1/3 cursor-pointer" />
            <button type="button" aria-label="Next story" onClick={() => select(index + 1)} className="absolute inset-y-0 right-0 w-2/3 cursor-pointer" />
          </>
        )}
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-[12cqw] px-[3cqw]">
        <div className="flex gap-[1cqw]">
          {stories.map((_, i) => (
            <span key={i} className="h-[0.7cqw] flex-1 overflow-hidden rounded-full bg-white/35">
              <span
                key={i === index ? `active-${index}` : i}
                className="block h-full origin-left bg-white"
                style={
                  i < index
                    ? { transform: "scaleX(1)" }
                    : i === index && playing
                      ? { animation: `story-progress ${duration}s linear forwards` }
                      : { transform: i === index ? "scaleX(1)" : "scaleX(0)" }
                }
              />
            </span>
          ))}
        </div>
        <div className="mt-[2.5cqw] flex items-center gap-[2cqw]">
          <BrandAvatar className="size-[7cqw] text-[3.2cqw]" />
          <span className="text-[3.3cqw] font-semibold">researchayu</span>
          <span className="text-[3cqw] text-white/70">Sponsored</span>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-[5cqw] flex flex-col items-center text-[3.2cqw] font-semibold">
        <ChevronUp className="size-[5cqw]" aria-hidden />
        <span className="rounded-full bg-white px-[5cqw] py-[1.8cqw] text-black">{cta}</span>
      </div>
    </div>
  )
}
