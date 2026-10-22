"use client"

import { Maximize2 } from "lucide-react"
import Image, { type StaticImageData } from "next/image"
import { useState } from "react"

import { ImageLightbox } from "@/components/shared/image-lightbox"
import { cn } from "@/lib/utils"

type ArtGridProps = {
  images: StaticImageData[]
  alt: string
  /** One short line per image, shown under the tile and in the viewer. */
  captions?: string[]
  /**
   * `feature` turns the first image into a 2×2 hero tile. Use it when the
   * remaining tiles fill the rows evenly (e.g. 6 or 9 images on 3 columns).
   */
  layout?: "even" | "feature"
  className?: string
  sizes?: string
}

/** Artwork tiles that keep their native ratio and open in a large viewer. */
export function ArtGrid({ images, alt, captions, layout = "even", className, sizes = "(min-width: 1024px) 25vw, 50vw" }: ArtGridProps) {
  const [open, setOpen] = useState<number | null>(null)
  const items = images.map((image, i) => ({
    image,
    alt: `${alt} ${i + 1}`,
    caption: captions?.[i] ? `${String(i + 1).padStart(2, "0")} · ${captions[i]}` : undefined,
  }))

  return (
    <>
      <div className={cn("grid gap-3 sm:gap-5", captions && "gap-y-6 sm:gap-y-8", className)}>
        {items.map((item, i) => {
          const featured = layout === "feature" && i === 0
          return (
            <figure key={i} className={cn("min-w-0", featured && "col-span-2 row-span-2")}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`View larger: ${captions?.[i] ?? item.alt}`}
                className={cn(
                  "group/tile relative block w-full cursor-zoom-in overflow-hidden rounded-xl bg-surface ring-1 ring-black/5 transition-shadow duration-500 hover:shadow-[0_24px_50px_-28px_rgb(0_0_0/0.45)] focus-visible:ring-4 focus-visible:ring-primary/50 focus-visible:outline-none sm:rounded-2xl",
                  featured && captions && "h-[calc(100%-2.75rem)]"
                )}
                style={featured && captions ? undefined : { aspectRatio: `${item.image.width} / ${item.image.height}` }}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes={featured ? sizes.replace(/(\d+)vw/g, (_, n) => `${Math.min(+n * 2, 100)}vw`) : sizes}
                  placeholder="blur"
                  className="object-cover transition-[scale] duration-700 ease-out-expo group-hover/tile:scale-[1.04]"
                />
                <span className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover/tile:bg-ink/15" aria-hidden />
                <span
                  aria-hidden
                  className="absolute top-3 right-3 grid size-10 scale-75 place-items-center rounded-full bg-white text-ink opacity-0 shadow-lg transition-[opacity,scale] duration-300 group-hover/tile:scale-100 group-hover/tile:opacity-100"
                >
                  <Maximize2 className="size-4" />
                </span>
              </button>
              {captions?.[i] && (
                <figcaption className="mt-3 flex gap-3 text-base leading-snug">
                  <span className="font-mono text-sm text-primary tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-ink/80">{captions[i]}</span>
                </figcaption>
              )}
            </figure>
          )
        })}
      </div>
      <ImageLightbox items={items} index={open} onIndexChange={setOpen} />
    </>
  )
}
