import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/shared/container"
import { SparkDoodle } from "@/components/shared/doodle"
import { Marquee } from "@/components/shared/marquee"

import { TestimonialCard } from "./testimonial-card"
import { testimonials } from "./testimonials.data"

const half = Math.ceil(testimonials.length / 2)
const rows = [testimonials.slice(0, half), testimonials.slice(half)]

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
              Founders, editors and marketing teams on what it&rsquo;s like to work together, and what changed after
              launch.
            </p>
          </Reveal>
        </Container>

        <Reveal
          delay={0.15}
          className="mt-14 grid gap-5 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        >
          {rows.map((row, i) => (
            <Marquee key={i} duration={45} reverse={i % 2 === 1} pauseOnHover>
              {[...row, ...row].map((testimonial, j) => (
                <TestimonialCard key={`${testimonial.name}-${j}`} testimonial={testimonial} />
              ))}
            </Marquee>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
