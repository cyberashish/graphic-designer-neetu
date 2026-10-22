import Image from "next/image"

import { site } from "@/config/site"

import portrait from "./images/hero-girl.webp"
import { RiseOnLoad } from "./rise-on-load"
import { SinkOnScroll } from "./sink-on-scroll"

/**
 * Cut-out bust in front of a peach hemisphere whose flat edge sits on the
 * section bottom. Sized from the parent's `--h` (portrait height), so disc,
 * photo and CTA scale together. On load the person rises from behind the
 * edge; on scroll she sinks back behind it.
 */
export function HeroPortrait({ children }: { children?: React.ReactNode }) {
  return (
    <div className="absolute inset-y-0 left-1/2 w-[calc(var(--h)*1.4)] -translate-x-1/2 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-x-0 top-[calc(var(--h)*0.3)] aspect-square animate-pop rounded-full bg-[#feb273] [animation-delay:200ms]"
      />

      <SinkOnScroll className="absolute inset-x-0 bottom-0 h-full">
        <RiseOnLoad className="flex h-full justify-center">
          {/*
            No blur placeholder or fade: on a transparent cut-out the blurred
            preview renders as a dark smudge until the real image arrives.
          */}
          <Image
            src={portrait}
            alt={`${site.fullName}, ${site.role}`}
            fetchPriority="high"
            loading="eager"
            sizes="(min-width: 1440px) 645px, 45vw"
            className="h-full w-auto max-w-none object-contain object-bottom"
          />
        </RiseOnLoad>
      </SinkOnScroll>

      {children}
    </div>
  )
}
