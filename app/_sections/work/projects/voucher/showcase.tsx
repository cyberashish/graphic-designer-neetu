import { FlipCard } from "@/components/mockups/flip-card"
import { Paper } from "@/components/mockups/paper"

import { ShowcaseSection, Stage } from "../../showcase-parts"
import { assets } from "./assets"

export default function VoucherShowcase() {
  const [front, back] = assets.sides
  return (
    <>
      <ShowcaseSection title="Turn it over" note="Offer on the front, credibility on the back.">
        <Stage className="bg-[#efebe4] sm:px-24 sm:py-20">
          <FlipCard front={front} back={back} label="Discount voucher" sizes="(min-width: 1024px) 900px, 90vw" className="mx-auto max-w-4xl" />
        </Stage>
      </ShowcaseSection>

      <ShowcaseSection title="Both sides" note="Also produced in Hindi, Marathi and Telugu.">
        <div className="grid gap-5 sm:grid-cols-2">
          <Stage className="bg-surface">
            <Paper src={front} alt="Voucher front" sizes="(min-width: 1024px) 560px, 90vw" className="-rotate-1" />
          </Stage>
          <Stage className="bg-surface">
            <Paper src={back} alt="Voucher back" sizes="(min-width: 1024px) 560px, 90vw" className="rotate-1" />
          </Stage>
        </div>
      </ShowcaseSection>
    </>
  )
}
