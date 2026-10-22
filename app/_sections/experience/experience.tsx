import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"

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
      </Container>
    </section>
  )
}
