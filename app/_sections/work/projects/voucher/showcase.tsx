"use client"

import * as m from "motion/react-m"
import { useState } from "react"

import { FlipCard } from "@/components/mockups/flip-card"
import { Paper } from "@/components/mockups/paper"
import { ZoomGroup, ZoomTarget } from "@/components/shared/zoom-group"
import { springs } from "@/lib/motion"
import { cn } from "@/lib/utils"

import { ShowcaseSection, Stage } from "../../showcase-parts"
import { assets } from "./assets"

// Tabs show each language in its own script; `lang` lets the browser pick a matching font.
const languages = [
  { id: "en", name: "English", native: "English", sides: assets.sides },
  { id: "hi", name: "Hindi", native: "हिंदी", sides: assets.hindi },
  { id: "mr", name: "Marathi", native: "मराठी", sides: assets.marathi },
  { id: "te", name: "Telugu", native: "తెలుగు", sides: assets.telugu },
]

export default function VoucherShowcase() {
  const [active, setActive] = useState(languages[0].id)
  const language = languages.find((l) => l.id === active) ?? languages[0]
  const [front, back] = language.sides

  // One viewer for the language grid: each front followed by its back.
  const items = languages.flatMap(({ name, sides: [front, back] }) => [
    { image: front, alt: `Voucher front, ${name}`, caption: `Front · ${name}` },
    { image: back, alt: `Voucher back, ${name}`, caption: `Back · ${name}` },
  ])

  return (
    <>
      <ShowcaseSection title="Turn it over" note="Offer on the front, credibility on the back.">
        <div role="tablist" aria-label="Voucher language" className="mb-6 flex flex-wrap gap-2">
          {languages.map((l) => (
            <button
              key={l.id}
              type="button"
              role="tab"
              lang={l.id}
              aria-label={l.name}
              aria-selected={l.id === active}
              onClick={() => setActive(l.id)}
              className={cn(
                "relative cursor-pointer rounded-full px-5 py-2.5 text-sm font-medium transition-colors focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:outline-none",
                l.id === active ? "text-white" : "bg-surface hover:bg-[#e4e7ec]"
              )}
            >
              {l.id === active && <m.span layoutId="voucher-tab" transition={springs.snappy} className="absolute inset-0 rounded-full bg-ink" />}
              <span className="relative">{l.native}</span>
            </button>
          ))}
        </div>
        <Stage className="bg-[#efebe4] sm:px-24 sm:py-20">
          <FlipCard front={front} back={back} label={`Discount voucher, ${language.name}`} sizes="(min-width: 1024px) 900px, 90vw" className="mx-auto max-w-4xl" />
        </Stage>
      </ShowcaseSection>

      <ZoomGroup items={items}>
        <ShowcaseSection title="Four languages" note="One layout, re-set per region · click to enlarge.">
          <div className="grid gap-5 sm:grid-cols-2">
            {languages.map(({ id, name, native, sides: [front] }, i) => (
              <Stage key={id} className="bg-surface">
                <ZoomTarget index={i * 2} label={items[i * 2].alt}>
                  <Paper src={front} alt={items[i * 2].alt} sizes="(min-width: 1024px) 560px, 90vw" className={i % 2 ? "rotate-1" : "-rotate-1"} />
                </ZoomTarget>
                <p className="mt-6 flex items-baseline justify-between text-base">
                  <span className="font-semibold">{name}</span>
                  {native !== name && (
                    <span lang={id} className="text-muted-foreground">
                      {native}
                    </span>
                  )}
                </p>
              </Stage>
            ))}
          </div>
        </ShowcaseSection>
      </ZoomGroup>
    </>
  )
}
