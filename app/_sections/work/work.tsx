import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { buttonVariants } from "@/components/ui/button"

import { WorkGallery } from "./work-gallery"

export function Work() {
  return (
    <section id="work" className="pt-12 pb-24 sm:pt-16 sm:pb-32">
      <Container>
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading lead={<>Let&rsquo;s have a look at my</>} highlight="Portfolio" className="max-w-xl" />
          <Link href="#contact" className={buttonVariants({ size: "pill-lg", className: "group" })}>
            Let&rsquo;s work together
            <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <WorkGallery />
        </Reveal>
      </Container>
    </section>
  )
}
