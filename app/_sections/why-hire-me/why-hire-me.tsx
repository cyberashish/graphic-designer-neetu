import Image from "next/image"
import Link from "next/link"

import { Counter } from "@/components/motion/counter"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal"
import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { buttonVariants } from "@/components/ui/button"
import { site } from "@/config/site"

import studio from "./images/studio.jpg"

const stats = [
  { value: 250, suffix: "+", label: "Projects completed" },
  { value: 60, suffix: "+", label: "Brands shaped" },
  { value: 12, suffix: "", label: "Design awards" },
]

export function WhyHireMe() {
  return (
    <section id="about" className="px-2 sm:px-4">
      <div className="rounded-[2.5rem] bg-surface py-20 sm:rounded-[3.5rem] sm:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative mx-auto w-[94%] max-w-lg sm:w-full">
            <div aria-hidden className="absolute inset-0 translate-x-2 translate-y-3 rotate-2 rounded-[3rem] bg-primary sm:translate-x-4 sm:translate-y-4 sm:rotate-3" />
            <div className="group relative aspect-[4/5] overflow-hidden rounded-[3rem] shadow-2xl shadow-ink/10">
              <Image
                src={studio}
                alt={`${site.name} working on a colour study with a drawing tablet`}
                placeholder="blur"
                quality={90}
                sizes="(min-width: 1024px) 512px, 92vw"
                className="size-full object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-5 left-6 flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-semibold shadow-xl shadow-ink/10">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
              </span>
              Available for new projects
            </div>
          </Reveal>

          <Stagger>
            <StaggerItem>
              <SectionHeading lead="Why" highlight="Hire me" trail="?" />
            </StaggerItem>
            <StaggerItem>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
                I sit where strategy meets craft. Every colour, kerning pair and paper stock earns its place by
                helping your audience understand you faster. You get a designer who sweats the print details and
                ships on time.
              </p>
            </StaggerItem>
            <StaggerItem className="mt-10 grid grid-cols-3 gap-6 border-y border-ink/10 py-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <Counter value={stat.value} suffix={stat.suffix} className="text-4xl font-bold tracking-tight sm:text-5xl" />
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </StaggerItem>
            <StaggerItem className="mt-10">
              <Link href="#contact" className={buttonVariants({ variant: "outline-ink", size: "pill-lg", className: "px-10" })}>
                Hire me
              </Link>
            </StaggerItem>
          </Stagger>
        </Container>
      </div>
    </section>
  )
}
