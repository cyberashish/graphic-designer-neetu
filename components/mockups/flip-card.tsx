"use client"

import { RotateCw } from "lucide-react"
import Image, { type StaticImageData } from "next/image"
import { useState } from "react"

import { cn } from "@/lib/utils"

type FlipCardProps = {
  front: StaticImageData
  back: StaticImageData
  label: string
  sizes?: string
  className?: string
}

/** A printed card that turns over on click to show its reverse side. */
export function FlipCard({ front, back, label, sizes = "800px", className }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false)
  const face = "absolute inset-0 overflow-hidden rounded-[6px] bg-white shadow-[0_30px_60px_-25px_rgb(0_0_0/0.45)] [backface-visibility:hidden]"

  return (
    <div className={cn("group/flip", className)}>
      <button
        type="button"
        onClick={() => setFlipped((value) => !value)}
        aria-pressed={flipped}
        aria-label={`${label}: show ${flipped ? "front" : "back"}`}
        className="relative block w-full cursor-pointer [perspective:2000px] focus-visible:outline-none"
        style={{ aspectRatio: `${front.width} / ${front.height}` }}
      >
        <span
          className="absolute inset-0 transition-transform duration-[900ms] ease-out-expo [transform-style:preserve-3d] group-hover/flip:[--lift:-6px]"
          style={{ transform: `translateY(var(--lift, 0)) rotateY(${flipped ? 180 : 0}deg)` }}
        >
          <span className={face}>
            <Image src={front} alt={`${label}, front`} fill sizes={sizes} quality={90} className="object-cover" />
          </span>
          <span className={cn(face, "[transform:rotateY(180deg)]")}>
            <Image src={back} alt={`${label}, back`} fill sizes={sizes} quality={90} className="object-cover" />
          </span>
        </span>
      </button>
      <p className="mt-5 flex items-center justify-center gap-2 text-base text-muted-foreground">
        <RotateCw className="size-4 transition-transform duration-500 group-hover/flip:rotate-180" aria-hidden />
        Click to see the {flipped ? "front" : "back"}
      </p>
    </div>
  )
}
