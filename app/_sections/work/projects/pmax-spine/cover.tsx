import { TiltedWall } from "@/components/mockups/tilted-wall"

import { assets } from "./assets"

export function PmaxSpineCover() {
  return (
    <>
      <TiltedWall images={assets.concepts} columns={3} sizes="(min-width: 1024px) 260px, 40vw" />
      {/* Fade the wall into the stage colour at the edges. */}
      <span aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,#0e3f37_95%)]" />
    </>
  )
}
