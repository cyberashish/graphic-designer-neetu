import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/shared/container"
import { SparkDoodle } from "@/components/shared/doodle"

import { TestimonialCard } from "./testimonial-card"
import { testimonials } from "./testimonials.data"

export function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title" className="px-2 sm:px-4">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-ink-glow py-20 text-white sm:rounded-[3.5rem] sm:py-28">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2
              id="testimonials-title"
              className="relative inline-block text-[2.25rem] leading-[1.1] font-semibold tracking-tight sm:text-5xl"
            >
              Testimonials That
              <br />
              Speak to <span className="text-primary">My Results</span>
              <SparkDoodle className="absolute -top-5 -right-8" />
            </h2>
            <p className="mt-5 text-white/60">
              Clients and marketing teams on what it&rsquo;s like to work together, and what changed after launch.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-14 grid gap-5 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.name} testimonial={testimonial} />
            ))}
          </Reveal>
        </Container>
      </div>
    </section>
  )
}
