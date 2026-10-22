import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal"
import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { SnapCarousel } from "@/components/shared/snap-carousel"

import { ServiceCard } from "./service-card"
import { services } from "./services.data"

export function Services() {
  return (
    <section id="services" className="px-2 sm:px-4">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-ink-glow py-20 text-white sm:rounded-[3.5rem] sm:py-24">
        <Container>
          <Reveal className="grid gap-6 md:grid-cols-2 md:items-end">
            <SectionHeading lead="My" highlight="Services" className="text-white" />
            <p className="max-w-md text-white/60 md:justify-self-end">
              From the first sketch to the final print run, I design the pieces that make a brand feel real in
              people&rsquo;s hands. Pick a service to jump to related work.
            </p>
          </Reveal>

          <Stagger className="mt-14">
            <SnapCarousel
              label="Services"
              tone="dark"
              trackClassName="-mx-4 px-4 scroll-px-4 py-4 sm:-mx-6 sm:px-6 sm:scroll-px-6 lg:mx-0 lg:px-0 lg:scroll-px-0"
            >
              {services.map((service) => (
                <StaggerItem
                  key={service.title}
                  className="shrink-0 basis-[85%] sm:basis-[60%] lg:basis-[calc((100%-2.5rem)/3)]"
                >
                  <ServiceCard service={service} />
                </StaggerItem>
              ))}
            </SnapCarousel>
          </Stagger>
        </Container>
      </div>
    </section>
  )
}
