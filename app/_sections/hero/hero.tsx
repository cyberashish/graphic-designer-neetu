import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

import { Magnetic } from "@/components/motion/magnetic"
import { Container } from "@/components/shared/container"
import { BurstDoodle, SparkDoodle } from "@/components/shared/doodle"
import { StarRating } from "@/components/shared/star-rating"
import { buttonVariants } from "@/components/ui/button"
import { site } from "@/config/site"
import { cn } from "@/lib/utils"

import { HeroPortrait } from "./hero-portrait"

/** Staggers the CSS `animate-rise` entrance without any client JS. */
const rise = (delayMs: number) => ({ style: { animationDelay: `${delayMs}ms` } })

function OpenQuote({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 22" aria-hidden className={cn("h-[22px] w-7 fill-[#344054]", className)}>
      <path d="M0 22V13.6C0 6.9 3.6 2.4 10.6 0l1.5 2.6C8.4 4.3 6.6 7 6.4 10.6H12V22H0Zm16 0V13.6C16 6.9 19.6 2.4 26.6 0l1.4 2.6c-3.7 1.7-5.5 4.4-5.7 8H28V22H16Z" />
    </svg>
  )
}

function Testimonial({ className }: { className?: string }) {
  return (
    <figure {...rise(500)} className={cn("animate-rise", className)}>
      <OpenQuote />
      <blockquote className="mt-5 max-w-[17rem] text-lg leading-snug font-medium text-[#344054]">
        {site.name}&rsquo;s exceptional brand design ensured our launch&rsquo;s success. Highly Recommended
      </blockquote>
    </figure>
  )
}

function Experience({ className }: { className?: string }) {
  return (
    <div {...rise(600)} className={cn("animate-rise text-right", className)}>
      <StarRating className="justify-end gap-1 [&_svg]:size-6" />
      <p className="mt-3 text-[2.75rem] leading-none font-semibold tracking-tight">{site.yearsOfExperience} Years</p>
      <p className="mt-1.5 text-lg text-ink">Experience</p>
    </div>
  )
}

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-32 lg:pt-[150px]">
      <Container className="relative">
        <div className="relative z-0 text-center">
          <span
            {...rise(0)}
            className="relative inline-flex animate-rise items-center rounded-full border border-ink px-6 py-1.5 text-xl font-medium"
          >
            Hello!
            <SparkDoodle className="absolute -top-7 -right-8 size-9" delay="0.6s" />
          </span>

          <h1 className="mt-4 text-[clamp(2.75rem,6.7vw,6rem)] leading-[1.1] font-medium tracking-[-0.02em]">
            <span {...rise(80)} className="block animate-rise">
              I&rsquo;m <span className="text-primary">{site.name}</span>,
            </span>
            <span {...rise(180)} className="block animate-rise">
              {site.role}
            </span>
          </h1>
        </div>

        {/* `--h` is the portrait height; every hero measurement below derives from it. */}
        <div className="relative z-10 -mt-[calc(var(--h)*0.17)] h-(--h) [--h:clamp(300px,42vw,600px)]">
          <BurstDoodle
            className="absolute top-[calc(var(--h)*0.05)] left-[calc(50%-var(--h)*0.74)] h-auto w-[calc(var(--h)*0.13)]"
            delay="0.9s"
          />

          <Testimonial className="absolute top-[calc(var(--h)*0.22)] left-0 hidden lg:block" />
          <Experience className="absolute top-[calc(var(--h)*0.22)] right-0 hidden lg:block" />

          <HeroPortrait>
            <div
              {...rise(700)}
              className="absolute bottom-[calc(var(--h)*0.075)] left-1/2 z-10 flex -translate-x-1/2 animate-rise items-center gap-1 rounded-full border border-white/70 bg-white/10 p-1.5 backdrop-blur-xl"
            >
              <Magnetic strength={0.25}>
                <Link href="#work" className={buttonVariants({ size: "pill-lg", className: "h-12 px-6 text-base font-medium sm:h-14 sm:px-8 sm:text-lg" })}>
                  Portfolio
                  <ArrowUpRight />
                </Link>
              </Magnetic>
              <Magnetic strength={0.25}>
                <Link
                  href="#contact"
                  className={buttonVariants({
                    size: "pill-lg",
                    variant: "ghost",
                    className: "h-12 px-6 text-base font-light text-white hover:bg-white/15 hover:text-white sm:h-14 sm:px-8 sm:text-lg",
                  })}
                >
                  Hire me
                </Link>
              </Magnetic>
            </div>
          </HeroPortrait>
        </div>
      </Container>

      <Container className="grid grid-cols-2 items-end gap-6 py-10 lg:hidden">
        <Testimonial />
        <Experience />
      </Container>
    </section>
  )
}
