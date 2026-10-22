import { Sparkle } from "lucide-react"

import { Marquee } from "@/components/shared/marquee"

const skills = [
  "Brand Identity",
  "Booklets",
  "Packaging",
  "Posters",
  "Typography",
  "Art Direction",
  "Advertising",
  "Print Production",
]

function Band({ className, reverse }: { className: string; reverse?: boolean }) {
  return (
    <div className={className}>
      <Marquee duration={40} reverse={reverse} trackClassName="items-center">
        {skills.map((skill) => (
          <span key={skill} className="flex items-center gap-6 pr-6 text-2xl font-semibold whitespace-nowrap sm:text-3xl">
            {skill}
            <Sparkle aria-hidden className="size-6 fill-current" />
          </span>
        ))}
      </Marquee>
    </div>
  )
}

/** Two crossing tickers listing disciplines, a print-poster flourish between sections. */
export function SkillsTicker() {
  return (
    <section aria-label="Disciplines" className="relative overflow-hidden py-16">
      <Band className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 rotate-2 bg-ink py-4 text-white/80" reverse />
      <Band className="relative -mx-[5%] -rotate-2 bg-primary py-4 text-white shadow-xl shadow-primary/20" />
    </section>
  )
}
