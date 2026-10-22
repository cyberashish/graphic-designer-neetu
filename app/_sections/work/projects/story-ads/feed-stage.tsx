import Image from "next/image"

import { PhoneFrame } from "@/components/mockups/phone-frame"
import { StoryScreen } from "@/components/mockups/story-screen"

import { assets } from "./assets"

const figures = [
  { value: "12", label: "Story ads" },
  { value: "5", label: "Languages" },
  { value: "9:16", label: "Full screen" },
]

const languages = ["English", "Hindi", "Marathi", "Kannada", "Punjabi"]

/** A static phone showing one story, used as a tilted backdrop device. */
function SidePhone({ index, className }: { index: number; className: string }) {
  return (
    <div aria-hidden className={`absolute top-1/2 w-[38%] max-w-[210px] ${className}`}>
      <PhoneFrame>
        <div className="flex h-full items-center bg-black">
          <div className="relative aspect-[9/16] w-full">
            <Image src={assets.stories[index]} alt="" fill sizes="210px" className="object-cover" />
          </div>
        </div>
      </PhoneFrame>
    </div>
  )
}

function Chip({ children, className }: { children: React.ReactNode; className: string }) {
  return (
    <span
      aria-hidden
      className={`absolute z-20 hidden items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/15 backdrop-blur-md sm:inline-flex ${className}`}
    >
      <span className="size-1.5 rounded-full bg-primary" />
      {children}
    </span>
  )
}

export function FeedStage() {
  return (
    <div className="relative overflow-hidden rounded-[1.75rem] bg-[#111] text-white sm:rounded-[2rem]">
      {/* Atmosphere: brand glows plus a faint dot grid. */}
      <span aria-hidden className="absolute -top-1/4 right-[8%] size-[520px] rounded-full bg-primary/25 blur-[120px]" />
      <span aria-hidden className="absolute -bottom-1/3 left-[30%] size-[460px] rounded-full bg-[#0e7461]/40 blur-[120px]" />
      <span
        aria-hidden
        className="absolute inset-0 [background-image:radial-gradient(rgb(255_255_255/0.07)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
      />

      <div className="relative grid items-center gap-12 p-7 sm:p-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-6 lg:p-16">
        <div>
          <p className="text-sm font-semibold tracking-[0.18em] text-primary uppercase">Meta Stories</p>
          <p className="mt-4 text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-[2.75rem]">
            One human moment. One line. One button.
          </p>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-white/65">
            Built for the half-second before a thumb moves on: a single relatable scene, a headline that reads at a glance and
            a call button within reach.
          </p>

          <dl className="mt-9 grid max-w-md grid-cols-3 border-y border-white/10">
            {figures.map((figure, i) => (
              <div key={figure.label} className={i > 0 ? "border-l border-white/10 py-5 pl-5" : "py-5"}>
                <dd className="text-3xl font-semibold tracking-tight sm:text-4xl">{figure.value}</dd>
                <dt className="mt-1 text-sm text-white/55">{figure.label}</dt>
              </div>
            ))}
          </dl>

          <ul className="mt-7 flex flex-wrap gap-2">
            {languages.map((language) => (
              <li key={language} className="rounded-full border border-white/15 px-3.5 py-1.5 text-sm text-white/80">
                {language}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto aspect-[1/1.05] w-full max-w-[560px]">
          <SidePhone index={1} className="left-0 -translate-y-[46%] -rotate-[10deg] opacity-80" />
          <SidePhone index={4} className="right-0 -translate-y-[54%] rotate-[10deg] opacity-80" />
          <div className="absolute top-1/2 left-1/2 z-10 w-[48%] max-w-[270px] -translate-x-1/2 -translate-y-1/2">
            <PhoneFrame className="shadow-[0_50px_100px_-30px_rgb(0_0_0/0.8)]">
              <StoryScreen stories={assets.stories} cta="Call now" sizes="270px" />
            </PhoneFrame>
          </div>
          <Chip className="top-[10%] left-[2%]">Tap to skip</Chip>
          <Chip className="right-0 bottom-[14%]">Call-now CTA</Chip>
        </div>
      </div>
    </div>
  )
}
