import { RollUpStandee } from "@/components/mockups/standee"

import { assets } from "./assets"

export function StandeesCover() {
  const [english, marathi] = assets.rollups
  return (
    <div className="absolute inset-x-0 bottom-[14%] flex items-end justify-center gap-[7cqw]">
      <div className="transition-transform duration-700 ease-out-expo group-hover:-translate-x-1" style={{ width: "min(30cqw, 34cqh)" }}>
        <RollUpStandee src={english} alt="Roll-up standee, English" sizes="(min-width: 1024px) 240px, 40vw" />
      </div>
      <div className="transition-transform duration-700 ease-out-expo group-hover:translate-x-1" style={{ width: "min(30cqw, 34cqh)" }}>
        <RollUpStandee src={marathi} alt="Roll-up standee, Marathi" sizes="(min-width: 1024px) 240px, 40vw" />
      </div>
    </div>
  )
}
