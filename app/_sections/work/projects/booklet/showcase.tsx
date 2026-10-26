"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"
import Image from "next/image"
import { useRef, useState } from "react"

import { BookCover } from "@/components/mockups/book"
import { FlipBook, type FlipBookHandle, type FlipBookPage } from "@/components/mockups/flip-book"
import { cn } from "@/lib/utils"

import { ShowcaseSection, Stage } from "../../showcase-parts"
import { assets } from "./assets"

/** What the controls step through: the covers and each two-page spread. */
const views = [
  { image: assets.cover[0], label: "Front cover" },
  ...assets.spreads.map((image, i) => ({ image, label: `Spread ${i + 1}` })),
  { image: assets.back[0], label: "Back cover" },
]

/** The physical pages: covers on board, each spread image cut down the spine. */
const bookPages: FlipBookPage[] = [
  { image: assets.cover[0], alt: "Front cover", hard: true },
  ...assets.spreads.flatMap((image, i): FlipBookPage[] => [
    { image, half: "left", alt: `Spread ${i + 1}, left page` },
    { image, half: "right", alt: `Spread ${i + 1}, right page` },
  ]),
  { image: assets.back[0], alt: "Back cover", hard: true },
]

// The cover opens onto spread 1 (pages 1–2), spread 2 is pages 3–4, and so on.
const pageOfView = (view: number) => (view === 0 ? 0 : view * 2 - 1)
const viewOfPage = (page: number) => Math.ceil(page / 2)

export default function BookletShowcase() {
  const bookRef = useRef<FlipBookHandle>(null)
  const [index, setIndex] = useState(0)
  const view = views[index]

  const go = (next: number) => {
    if (next < 0 || next >= views.length || next === index) return
    bookRef.current?.flipTo(pageOfView(next))
  }

  return (
    <>
      <ShowcaseSection title="Flip through the booklet" note="Drag a page corner, click a page, or use the arrows.">
        <Stage className="bg-[#e4eee9]">
          <FlipBook
            ref={bookRef}
            pages={bookPages}
            onFlip={(page) => setIndex(viewOfPage(page))}
            label="ResearchAyu patient booklet"
            // Below ~600px the book shows single pages, so each half-spread image renders at twice the book's width.
            sizes="(min-width: 1280px) 1024px, (min-width: 600px) 94vw, 188vw"
            className="mx-auto w-full max-w-5xl"
          />

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => bookRef.current?.prev()}
              disabled={index === 0}
              aria-label="Previous spread"
              className="grid size-12 cursor-pointer place-items-center rounded-full bg-white shadow-sm transition-[scale,opacity] hover:scale-105 active:scale-95 disabled:cursor-default disabled:opacity-40"
            >
              <ArrowLeft className="size-5" />
            </button>
            <p className="min-w-40 text-center text-base font-medium tabular-nums" aria-live="polite">
              {view.label} <span className="text-muted-foreground">· {index + 1} / {views.length}</span>
            </p>
            <button
              type="button"
              onClick={() => bookRef.current?.next()}
              disabled={index === views.length - 1}
              aria-label="Next spread"
              className="grid size-12 cursor-pointer place-items-center rounded-full bg-white shadow-sm transition-[scale,opacity] hover:scale-105 active:scale-95 disabled:cursor-default disabled:opacity-40"
            >
              <ArrowRight className="size-5" />
            </button>
          </div>
        </Stage>

        <div className="mt-5 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:thin]">
          {views.map((p, i) => (
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
