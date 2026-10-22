import Image from "next/image"

import { ArrowBadge } from "@/components/shared/arrow-badge"

import { WorkFilterLink } from "../work/work-filter-link"
import type { Service } from "./services.data"

/**
 * Hover lifts an inner card while the link itself stays put, so the hover
 * target never slides out from under the cursor (no flicker at the edges).
 * Only GPU-friendly properties animate: translate, scale and opacity.
 */
export function ServiceCard({ service }: { service: Service }) {
  return (
    <WorkFilterLink
      category={service.category}
      aria-label={`${service.title}: see related work`}
      className="group relative isolate block h-full rounded-[2rem] focus-visible:outline-none"
    >
      <div className="relative flex h-full flex-col rounded-[2rem] bg-[#222] p-3 ring-1 ring-white/10 transition-[translate,background-color,box-shadow] duration-700 ease-out-expo group-hover:-translate-y-2 group-hover:bg-[#262626] group-focus-visible:ring-2 group-focus-visible:ring-primary">
        {/*
          Warm light that fades in from the arrow corner. A radial gradient kept
          inside the card has no hard edges, unlike a blurred box that the
          carousel track would clip.
        */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(90%_70%_at_100%_100%,rgb(253_133_58/0.28),rgb(253_133_58/0.08)_45%,transparent_75%)] opacity-0 transition-opacity duration-700 ease-out-expo group-hover:opacity-100"
        />

        <div className="relative px-3 pt-3 pb-5">
          <h3 className="text-2xl font-semibold">{service.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/60">{service.description}</p>
        </div>

        <div className="relative mt-auto aspect-[4/3] overflow-hidden rounded-[1.5rem]">
          <Image
            src={service.image}
            alt=""
            placeholder="blur"
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 60vw, 85vw"
            className="size-full object-cover transition-[scale] duration-1000 ease-out-expo group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
        </div>

        {/* The ink ring carves a notch out of the image corner. */}
        <ArrowBadge tone="light" className="absolute right-0 bottom-0 ring-[10px] ring-ink" />
      </div>
    </WorkFilterLink>
  )
}
