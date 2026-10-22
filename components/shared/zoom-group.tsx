"use client"

import { Maximize2 } from "lucide-react"
import { createContext, use, useState } from "react"

import { cn } from "@/lib/utils"

import { ImageLightbox, type LightboxItem } from "./image-lightbox"

const ZoomContext = createContext<((index: number) => void) | null>(null)

/**
 * Shares one image viewer between several mockups. Wrap any mockup in
 * `ZoomTarget` to open the flat artwork for that index.
 */
export function ZoomGroup({ items, children }: { items: LightboxItem[]; children: React.ReactNode }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <ZoomContext value={setOpen}>
      {children}
      <ImageLightbox items={items} index={open} onIndexChange={setOpen} />
    </ZoomContext>
  )
}

type ZoomTargetProps = {
  index: number
  label: string
  children: React.ReactNode
  className?: string
}

export function ZoomTarget({ index, label, children, className }: ZoomTargetProps) {
  const open = use(ZoomContext)
  if (!open) throw new Error("ZoomTarget must be rendered inside a ZoomGroup")

  return (
    <button
      type="button"
      onClick={() => open(index)}
      aria-label={`View larger: ${label}`}
      className={cn(
        "group/zoom relative block w-full cursor-zoom-in text-left transition-[translate] duration-500 ease-out-expo hover:-translate-y-1.5 focus-visible:outline-none",
        className
      )}
    >
      {children}
      <span
        aria-hidden
        className="absolute top-3 right-3 z-10 grid size-10 scale-75 place-items-center rounded-full bg-ink/75 text-white opacity-0 shadow-lg ring-1 ring-white/25 backdrop-blur-sm transition-[opacity,scale] duration-300 group-hover/zoom:scale-100 group-hover/zoom:opacity-100 group-focus-visible/zoom:scale-100 group-focus-visible/zoom:opacity-100"
      >
        <Maximize2 className="size-4" />
      </span>
    </button>
  )
}
