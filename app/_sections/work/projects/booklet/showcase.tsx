"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"
import { AnimatePresence } from "motion/react"
import * as m from "motion/react-m"
import Image from "next/image"
import { useState } from "react"

import { BookCover, BookSpread } from "@/components/mockups/book"
import { easeOutExpo } from "@/lib/motion"
import { cn } from "@/lib/utils"

import { ShowcaseSection, Stage } from "../../showcase-parts"
import { assets } from "./assets"

const pages = [
  { kind: "cover" as const, image: assets.cover[0], label: "Front cover" },
  ...assets.spreads.map((image, i) => ({ kind: "spread" as const, image, label: `Spread ${i + 1}` })),
  { kind: "cover" as const, image: assets.back[0], label: "Back cover" },
]

export default function BookletShowcase() {
  const [index, setIndex] = useState(1)
  const [direction, setDirection] = useState<1 | -1>(1)
  const page = pages[index]

  const go = (next: number) => {
    if (next < 0 || next >= pages.length) return
    setDirection(next > index ? 1 : -1)
    setIndex(next)
  }

  return (
    <>
      <ShowcaseSection title="Flip through the booklet" note="Use the arrows or pick a spread below.">
        <Stage className="bg-[#e4eee9]">
          <div className="relative mx-auto flex aspect-[1.6] max-w-5xl items-center justify-center">
            <AnimatePresence mode="popLayout" initial={false} custom={direction}>
              <m.div
                key={index}
                custom={direction}
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d * 60, rotateY: d * -8 }),
                  center: { opacity: 1, x: 0, rotateY: 0 },
                  exit: (d: number) => ({ opacity: 0, x: d * -60, rotateY: d * 8 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: easeOutExpo }}
                className={cn("[perspective:2000px]", page.kind === "cover" ? "h-[92%]" : "w-[96%]")}
              >
                {page.kind === "cover" ? (
                  <BookCover cover={page.image} alt={page.label} sizes="(min-width: 1024px) 560px, 70vw" className="h-full" />
                ) : (
                  <BookSpread spread={page.image} alt={page.label} tilt={0} sizes="(min-width: 1280px) 1180px, 94vw" />
                )}
              </m.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => go(index - 1)}
              disabled={index === 0}
              aria-label="Previous spread"
              className="grid size-12 cursor-pointer place-items-center rounded-full bg-white shadow-sm transition-[scale,opacity] hover:scale-105 active:scale-95 disabled:cursor-default disabled:opacity-40"
            >
              <ArrowLeft className="size-5" />
            </button>
            <p className="min-w-40 text-center text-base font-medium tabular-nums" aria-live="polite">
              {page.label} <span className="text-muted-foreground">· {index + 1} / {pages.length}</span>
            </p>
            <button
              type="button"
              onClick={() => go(index + 1)}
              disabled={index === pages.length - 1}
              aria-label="Next spread"
              className="grid size-12 cursor-pointer place-items-center rounded-full bg-white shadow-sm transition-[scale,opacity] hover:scale-105 active:scale-95 disabled:cursor-default disabled:opacity-40"
            >
              <ArrowRight className="size-5" />
            </button>
          </div>
        </Stage>

        <div className="mt-5 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:thin]">
          {pages.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show ${p.label}`}
              aria-current={i === index}
              className={cn(
                "relative h-20 shrink-0 cursor-pointer overflow-hidden rounded-lg ring-2 transition-[box-shadow,opacity] sm:h-24",
                i === index ? "ring-primary" : "opacity-60 ring-transparent hover:opacity-100"
              )}
              style={{ aspectRatio: `${p.image.width} / ${p.image.height}` }}
            >
              <Image src={p.image} alt="" fill sizes="160px" className="object-cover" />
            </button>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Front & back" note="Printed on matte stock with a teal spot palette.">
        <Stage className="grid grid-cols-2 items-center gap-6 bg-surface sm:gap-16 sm:px-20">
          <BookCover cover={assets.cover[0]} alt="Front cover" sizes="(min-width: 1024px) 420px, 45vw" className="-rotate-2" />
          <BookCover cover={assets.back[0]} alt="Back cover" sizes="(min-width: 1024px) 420px, 45vw" className="rotate-2" />
        </Stage>
      </ShowcaseSection>
    </>
  )
}
