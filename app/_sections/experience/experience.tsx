import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/shared/container"
import { ResumeButton } from "@/components/shared/resume-button"
import { SectionHeading } from "@/components/shared/section-heading"
import { buttonVariants } from "@/components/ui/button"

import { roles } from "./experience.data"
import { Timeline } from "./timeline"

export function Experience() {
  return (
    <section id="experience" className="overflow-x-clip py-24 sm:py-32">
      <Container>
        <Reveal className="mb-16 text-center sm:mb-20">
          <SectionHeading lead="My Work" highlight="Experience" />
        </Reveal>
        <Timeline roles={roles} />
        <Reveal className="mt-16 flex flex-wrap justify-center gap-4 sm:mt-20">
          <Link href="#contact" className={buttonVariants({ size: "pill-lg", className: "group px-8" })}>
            Hire me
            <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <ResumeButton />
        </Reveal>
      </Container>
    </section>
  )
}
