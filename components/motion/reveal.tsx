"use client"

import * as m from "motion/react-m"

import { fadeUp, inViewOnce, staggerContainer } from "@/lib/motion"

type RevealProps = React.ComponentProps<typeof m.div> & {
  delay?: number
}

/** Fades and lifts its children into view once, when scrolled to. */
export function Reveal({ delay = 0, transition, ...props }: RevealProps) {
  return (
    <m.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
      transition={{ delay, ...transition }}
      {...props}
    />
  )
}

type StaggerProps = React.ComponentProps<typeof m.div> & {
  stagger?: number
  delay?: number
}

/** Reveals each direct `StaggerItem` in sequence. */
export function Stagger({ stagger, delay, ...props }: StaggerProps) {
  return (
    <m.div
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
      {...props}
    />
  )
}

export function StaggerItem(props: React.ComponentProps<typeof m.div>) {
  return <m.div variants={fadeUp} {...props} />
}
