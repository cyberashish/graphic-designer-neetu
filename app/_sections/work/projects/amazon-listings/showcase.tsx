"use client"

import * as m from "motion/react-m"
import { useState } from "react"

import { springs } from "@/lib/motion"
import { cn } from "@/lib/utils"

import { ArtGrid, ShowcaseSection, Stage } from "../../showcase-parts"
import { assets } from "./assets"
import { ProductPage } from "./product-page"

const frameCaptions = ["Hero packshot", "Key benefits", "Problem → solution", "Ingredients that work", "How to use", "Trust & quality"]

const products = [
  { id: "vivazen", name: "Vivazen Oil 100 ml", images: assets.vivazen },
  { id: "chi", name: "Chi Essence Tablet", images: assets.chiEssence },
  { id: "zhivartha", name: "Zhivartha Tablet", images: assets.zhivartha },
  { id: "combo", name: "Vivazen Oil + Chi Essence Combo", images: assets.combo },
]

export default function AmazonShowcase() {
  const [active, setActive] = useState(products[0].id)
  const product = products.find((p) => p.id === active) ?? products[0]

  return (
    <>
      <ShowcaseSection title="One system, every product" note="Hover the thumbnails to browse the listing.">
        <div role="tablist" aria-label="Products" className="mb-6 flex flex-wrap gap-2">
          {products.map((p) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={p.id === active}
              onClick={() => setActive(p.id)}
              className={cn(
                "relative cursor-pointer rounded-full px-5 py-2.5 text-base font-medium transition-colors",
                p.id === active ? "text-white" : "bg-surface hover:bg-[#e4e7ec]"
              )}
            >
              {p.id === active && <m.span layoutId="amazon-tab" transition={springs.snappy} className="absolute inset-0 rounded-full bg-ink" />}
              <span className="relative">{p.name}</span>
            </button>
          ))}
        </div>
        <Stage className="bg-[#eef0f2] sm:px-16">
          <ProductPage
            key={product.id}
            images={product.images}
            name={product.name}
            brand="TechClinic Connect"
            interactive
            sizes="(min-width: 1024px) 520px, 50vw"
          />
        </Stage>
      </ShowcaseSection>

      <ShowcaseSection title="The full image set" note={`Key frames · 1:1 · ${product.name}`}>
        {/* Six frames keep the 3-up grid even for every product. */}
        <ArtGrid
          key={product.id}
          images={product.images.slice(0, 6)}
          alt={`${product.name} listing image`}
          captions={frameCaptions}
          layout="feature"
          className="grid-cols-2 sm:grid-cols-3"
          sizes="(min-width: 1024px) 380px, 50vw"
        />
      </ShowcaseSection>
    </>
  )
}
