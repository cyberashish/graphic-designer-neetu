import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

import { Magnetic } from "@/components/motion/magnetic"
import { Container } from "@/components/shared/container"
import { SparkDoodle } from "@/components/shared/doodle"
import { StarRating } from "@/components/shared/star-rating"
import { buttonVariants } from "@/components/ui/button"
import { site } from "@/config/site"
import { cn } from "@/lib/utils"

import { LayoutGrid, NameCursor, Selection, SwatchFan } from "./hero-art"

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
    <figure {...rise(700)} className={cn("animate-rise", className)}>
      <OpenQuote />
      <blockquote className="mt-5 max-w-[17rem] text-lg leading-snug font-medium text-[#344054]">
        {site.name}&rsquo;s exceptional brand design ensured our launch&rsquo;s success. Highly Recommended
      </blockquote>
    </figure>
  )
}

function Experience({ className }: { className?: string }) {
  return (
    <div {...rise(800)} className={cn("animate-rise text-right", className)}>
      <StarRating className="justify-end gap-1 [&_svg]:size-6" />
      <p className="mt-3 text-[2.75rem] leading-none font-semibold tracking-tight">{site.yearsOfExperience} {site.yearsOfExperience === 1 ? "Year" : "Years"}</p>
      <p className="mt-1.5 text-lg text-ink">Experience</p>
    </div>
  )
}

function Actions({ className }: { className?: string }) {
  return (
    <div {...rise(500)} className={cn("flex animate-rise items-center gap-3", className)}>
      <Magnetic strength={0.25}>
        <Link href="#work" className={buttonVariants({ size: "pill-lg", className: "h-12 px-6 sm:h-14 sm:px-8 sm:text-lg" })}>
          Portfolio
          <ArrowUpRight />
        </Link>
      </Magnetic>
      <Magnetic strength={0.25}>
        <Link
          href="#contact"
          className={buttonVariants({ size: "pill-lg", variant: "outline-ink", className: "h-12 px-6 sm:h-14 sm:px-8 sm:text-lg" })}
        >
          Hire me
        </Link>
      </Magnetic>
    </div>
  )
}

/**
 * Type-led hero. With no portrait, the designer's own tools carry the
 * imagery: a layout grid, a selection frame on the role, a cursor wearing
 * her name, and a fan of palette swatches.
 */
export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-20 lg:pt-[150px] lg:pb-24">
      <Container className="relative">
        <LayoutGrid className="-top-32 lg:-top-[150px]" />

        <SwatchFan className="absolute top-[4.5rem] left-[6%] hidden lg:block xl:left-[9%]" />

        <div className="relative text-center">
          <span
            {...rise(0)}
            className="relative inline-flex animate-rise items-center rounded-full border border-ink bg-background px-6 py-1.5 text-xl font-medium"
          >
            Hello!
            <SparkDoodle className="absolute -top-7 -right-8 size-9" delay="0.6s" />
          </span>

          <h1 className="mt-4 text-[clamp(2.75rem,6.7vw,6rem)] leading-[1.1] font-medium tracking-[-0.02em]">
            <span {...rise(80)} className="block animate-rise">
              I&rsquo;m <span className="text-primary">{site.name}</span>,
            </span>
            <span {...rise(180)} className="mt-[0.12em] block animate-rise">
              <Selection label="Urbanist · Medium">
                {site.role}
                {/* Offsets match the selection frame's em inset, so the tip rests on its corner handle. */}
                <NameCursor className="top-[calc(100%+0.04em)] left-[calc(100%+0.14em)] -mt-1 -ml-1 hidden sm:block" />
              </Selection>
            </span>
          </h1>

          <p {...rise(320)} className="mx-auto mt-10 max-w-xl animate-rise text-lg text-balance text-muted-foreground sm:text-xl">
            {site.tagline}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 items-end gap-x-6 gap-y-14 lg:mt-14 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <Actions className="col-span-2 justify-self-center lg:col-span-1 lg:col-start-2 lg:row-start-1" />
          <Testimonial className="lg:col-start-1 lg:row-start-1" />
          <Experience className="justify-self-end lg:col-start-3 lg:row-start-1" />
        </div>
      </Container>
    </section>
  )
}
