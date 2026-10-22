import { Paper } from "@/components/mockups/paper"

import { assets } from "./assets"

export function VoucherCover() {
  const [front, back] = assets.sides
  return (
    <div className="absolute inset-0">
      <div
        className="absolute top-[16%] left-[8%] -rotate-[9deg] transition-transform duration-700 ease-out-expo group-hover:-translate-x-2 group-hover:-translate-y-2 group-hover:-rotate-[12deg]"
        style={{ width: "min(76cqw, 120cqh)" }}
      >
        <Paper src={back} alt="Voucher back" sizes="(min-width: 1024px) 560px, 90vw" />
      </div>
      <div
        className="absolute right-[6%] bottom-[18%] rotate-[5deg] transition-transform duration-700 ease-out-expo group-hover:translate-x-2 group-hover:translate-y-1 group-hover:rotate-[7deg]"
        style={{ width: "min(76cqw, 120cqh)" }}
      >
        <Paper src={front} alt="Voucher front" sizes="(min-width: 1024px) 560px, 90vw" />
      </div>
    </div>
  )
}
