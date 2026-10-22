import { Award, BadgeCheck, Star } from "lucide-react"

import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal"
import { Container } from "@/components/shared/container"
import { EmailCaptureForm } from "@/components/shared/email-capture/email-capture-form"

const proofPoints = [
  { icon: Star, label: "4.9/5 average rating" },
  { icon: Award, label: "25+ design awards" },
  { icon: BadgeCheck, label: "Certified print specialist" },
]

export function ContactCta() {
  return (
    <section id="contact" className="py-24 sm:py-32">
      <Container className="max-w-3xl text-center">
        <Reveal>
          <h2 className="text-[2.25rem] leading-[1.1] font-semibold tracking-tight text-balance sm:text-5xl">
            Have an Awesome Project Idea? <span className="text-primary">Let&rsquo;s Discuss</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-muted-foreground">
            Drop your email and I&rsquo;ll reply within a day with availability, a rough timeline and a few questions
            about your brand.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-10 max-w-xl">
          <EmailCaptureForm source="contact" cta="Send" />
        </Reveal>

        <Stagger className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-3" delay={0.2}>
          {proofPoints.map(({ icon: Icon, label }) => (
            <StaggerItem key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="grid size-7 place-items-center rounded-full bg-accent text-primary">
                <Icon className="size-4" />
              </span>
              {label}
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  )
}
