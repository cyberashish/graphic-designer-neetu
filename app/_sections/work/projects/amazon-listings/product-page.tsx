"use client"

import { Check } from "lucide-react"
import Image, { type StaticImageData } from "next/image"
import { useState } from "react"

import { BrowserFrame, SkeletonLines } from "@/components/mockups/browser-frame"
import { cn } from "@/lib/utils"

type ProductPageProps = {
  images: StaticImageData[]
  name: string
  brand: string
  /** Interactive thumbnails (case study) vs a static, hover-swapped preview (card). */
  interactive?: boolean
  sizes?: string
  className?: string
}

/** A marketplace product detail page rendered with the listing's real images. */
export function ProductPage({ images, name, brand, interactive = false, sizes = "600px", className }: ProductPageProps) {
  const [active, setActive] = useState(0)
  const thumbs = images.slice(0, interactive ? images.length : 5)

  return (
    <BrowserFrame url={`amazon.in/${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className={className}>
      <div className="grid grid-cols-[8%_1fr_38%] gap-[2.5cqw] p-[3cqw]">
        <div className="flex flex-col gap-[1.2cqw]">
          {thumbs.map((image, i) => {
            const selected = i === active
            const thumb = (
              <span
                className={cn(
                  "relative block aspect-square overflow-hidden rounded-[0.8cqw] bg-white ring-1 transition-shadow",
                  selected ? "ring-2 ring-[#e77600]" : "ring-black/10"
                )}
              >
                <Image src={image} alt="" fill sizes="80px" className="object-cover" />
              </span>
            )
            return interactive ? (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                aria-label={`Show image ${i + 1}`}
                aria-pressed={selected}
                className="cursor-pointer"
              >
                {thumb}
              </button>
            ) : (
              <span key={i}>{thumb}</span>
            )
          })}
        </div>

        <div className="relative aspect-square overflow-hidden rounded-[1cqw] bg-white">
          {interactive ? (
            <Image key={active} src={images[active]} alt={`${name}, listing image ${active + 1}`} fill sizes={sizes} quality={90} className="animate-in fade-in object-cover duration-300" />
          ) : (
            <>
              <Image src={images[0]} alt={`${name}, main listing image`} fill sizes={sizes} className="object-cover" />
              <Image
                src={images[1]}
                alt=""
                fill
                sizes={sizes}
                className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              />
            </>
          )}
        </div>

        <div className="flex min-w-0 flex-col gap-[1.6cqw] pt-[0.5cqw]">
          <span className="truncate text-[1.6cqw] font-medium text-[#007185]">Visit the {brand} store</span>
          <span className="text-[2.6cqw] leading-tight font-semibold text-black">{name}</span>
          <span className="h-px bg-black/10" />
          <SkeletonLines lines={3} />
          <span className="flex flex-col gap-[1cqw]">
            {["Traditional Ayurvedic formula", "Quality tested", "Made in India"].map((point) => (
              <span key={point} className="flex items-center gap-[1cqw] text-[1.5cqw] text-black/70">
                <Check className="size-[1.8cqw] shrink-0 text-[#0e7461]" aria-hidden />
                <span className="truncate">{point}</span>
              </span>
            ))}
          </span>
          <span aria-hidden className="mt-auto flex flex-col gap-[1cqw]">
            <span className="rounded-full bg-[#ffd814] py-[1.2cqw] text-center text-[1.5cqw] font-medium text-black">Add to cart</span>
            <span className="rounded-full bg-[#ffa41c] py-[1.2cqw] text-center text-[1.5cqw] font-medium text-black">Buy now</span>
          </span>
        </div>
      </div>
    </BrowserFrame>
  )
}
