"use client"

import { useScroll, useSpring } from "motion/react"
import * as m from "motion/react-m"
import { useRef } from "react"

import { easeOutExpo, inViewOnce } from "@/lib/motion"

import type { Role } from "./experience.data"

/** A dashed ring that fills with the accent once its row is reached. */
function Milestone() {
  return (
    <m.span
      aria-hidden
      initial="idle"
      whileInView="reached"
      viewport={{ once: true, margin: "0px 0px -45% 0px" }}
      className="relative grid size-9 place-items-center rounded-full border-2 border-dashed border-primary bg-background"
    >
      <m.span
        variants={{ idle: { scale: 0.4, backgroundColor: "#d0d5dd" }, reached: { scale: 1, backgroundColor: "#fd853a" } }}
        transition={{ type: "spring", stiffness: 400, damping: 18 }}
        className="size-5 rounded-full"
      />
    </m.span>
  )
}

const rowVariants = {
  hidden: (fromLeft: boolean) => ({ opacity: 0, x: fromLeft ? -32 : 32 }),
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: easeOutExpo } },
}

export function Timeline({ roles }: { roles: Role[] }) {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 55%"] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <ol ref={ref} className="relative mx-auto grid max-w-5xl gap-14">
      {/* Track + scroll-linked fill, centred on desktop and on the left on mobile. */}
      <span aria-hidden className="absolute top-2 bottom-2 left-[17px] w-0.5 bg-border md:left-1/2 md:-translate-x-1/2" />
      <m.span
        aria-hidden
        style={{ scaleY: fill }}
        className="absolute top-2 bottom-2 left-[17px] w-0.5 origin-top bg-primary md:left-1/2 md:-translate-x-1/2"
      />

      {roles.map((role) => (
        <li key={role.company} className="relative grid grid-cols-[36px_1fr] gap-x-6 md:grid-cols-[1fr_36px_1fr] md:gap-x-12">
          <m.div
            custom={true}
            variants={rowVariants}
            initial="hidden"
            whileInView="visible"
            viewport={inViewOnce}
            className="col-start-2 md:col-start-1 md:text-right"
          >
            <h3 className="text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
              {role.company}, <span className="text-muted-foreground">{role.location}</span>
            </h3>
            <p className="mt-1 text-sm font-medium text-muted-foreground">{role.period}</p>
          </m.div>

          <div className="col-start-1 row-span-2 row-start-1 md:col-start-2 md:row-span-1">
            <Milestone />
          </div>

          <m.div
            custom={false}
            variants={rowVariants}
            initial="hidden"
            whileInView="visible"
            viewport={inViewOnce}
            className="col-start-2 mt-3 md:col-start-3 md:row-start-1 md:mt-0"
          >
            <h4 className="text-2xl font-semibold tracking-tight sm:text-[1.75rem]">{role.title}</h4>
            <p className="mt-2 max-w-md leading-relaxed text-muted-foreground">{role.description}</p>
          </m.div>
        </li>
      ))}
    </ol>
  )
}
