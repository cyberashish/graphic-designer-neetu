import { Paper } from "@/components/mockups/paper"

import { assets } from "./assets"

// Rack cards fanned from a shared pivot at the bottom; hover opens the fan wider.
const fan = [
  "-rotate-[16deg] group-hover:-rotate-[22deg]",
  "-rotate-[5deg] group-hover:-rotate-[8deg]",
  "rotate-[6deg] group-hover:rotate-[9deg]",
  "rotate-[17deg] group-hover:rotate-[23deg]",
]

export function PamphletsCover() {
  return (
    <div className="absolute inset-x-0 top-[12%] flex justify-center">
      <div className="relative" style={{ width: "min(24cqw, 26cqh)", aspectRatio: "4 / 11" }}>
        {assets.fronts.map((front, i) => (
          <div
            key={i}
            className={`absolute inset-0 origin-[50%_92%] transition-transform duration-700 ease-out-expo ${fan[i]}`}
          >
            <Paper src={front} alt={`Pamphlet ${i + 1}`} sizes="(min-width: 1024px) 200px, 35vw" className="w-full" />
          </div>
        ))}
      </div>
    </div>
  )
}
