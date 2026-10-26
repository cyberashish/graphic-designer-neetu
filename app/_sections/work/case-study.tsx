"use client"

import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react"
import { AnimatePresence } from "motion/react"
import * as m from "motion/react-m"
import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"

import { Container } from "@/components/shared/container"
import { buttonVariants } from "@/components/ui/button"
import { easeOutExpo } from "@/lib/motion"
import { cn } from "@/lib/utils"

import type { Project } from "./work.data"

type CaseStudyProps = {
  project: Project | null
  position: { index: number; total: number }
  next: Project | null
  onClose: () => void
  onStep: (direction: 1 | -1) => void
}

/** A full-screen case study sheet that slides up over the page. */
export function CaseStudy({ project, position, next, onClose, onStep }: CaseStudyProps) {
  const sheetRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const open = project !== null

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus({ preventScroll: true })
    const { overflow } = document.documentElement.style
    document.documentElement.style.overflow = "hidden"
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
      if (event.key === "Tab") trapFocus(event, sheetRef.current)
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.documentElement.style.overflow = overflow
      window.removeEventListener("keydown", onKey)
    }
  }, [open, onClose])

  // Each new project starts at the top.
  useEffect(() => {
    sheetRef.current?.scrollTo({ top: 0 })
  }, [project?.slug])

  if (typeof document === "undefined") return null

  return createPortal(
    <AnimatePresence>
      {project && (
        <m.div
          ref={sheetRef}
          key="case-study"
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.7, ease: easeOutExpo }}
          className="fixed inset-0 z-70 overflow-y-auto overscroll-contain bg-background"
        >
          <header className="sticky top-0 z-30 border-b border-black/5 bg-background/95 backdrop-blur-xl">
            <Container className="flex h-16 items-center justify-between gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex cursor-pointer items-center gap-2 rounded-full py-2 pr-3 text-base font-medium transition-colors hover:text-primary"
              >
                <ArrowLeft className="size-4" aria-hidden />
                All work
              </button>
              <span className="font-mono text-sm text-muted-foreground tabular-nums">
                {String(position.index + 1).padStart(2, "0")} / {String(position.total).padStart(2, "0")}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onStep(-1)}
                  aria-label="Previous project"
                  className="grid size-10 cursor-pointer place-items-center rounded-full border transition-colors hover:bg-ink hover:text-white active:scale-95"
                >
                  <ArrowLeft className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onStep(1)}
                  aria-label="Next project"
                  className="grid size-10 cursor-pointer place-items-center rounded-full border transition-colors hover:bg-ink hover:text-white active:scale-95"
                >
                  <ArrowRight className="size-4" />
                </button>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close case study"
                  className="grid size-10 cursor-pointer place-items-center rounded-full bg-ink text-white transition-transform hover:rotate-90 active:scale-95"
                >
                  <X className="size-4" />
                </button>
              </div>
            </Container>
          </header>

          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={project.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: easeOutExpo }}
              // Own stacking context, so nothing in the page can paint above the sticky header.
              className="relative isolate z-0 overflow-x-clip"
            >
              {/* Hero band in the project's own colour, led by its mockup. */}
              <section className={cn("relative overflow-hidden", project.tone)}>
                <Container className="grid items-center gap-8 pt-10 pb-6 sm:pt-14 lg:grid-cols-[1fr_1.15fr] lg:gap-12 lg:py-16">
                  <div className="relative z-10">
                    <p className="flex flex-wrap items-center gap-2 text-base font-medium">
                      <span className="rounded-full bg-primary px-3 py-1 text-sm text-white">{project.category}</span>
                      <span className="opacity-70">
                        {project.client} · {project.year}
                      </span>
                    </p>
                    <h3
                      id="case-study-title"
                      className="mt-5 text-[2.75rem] leading-[0.98] font-semibold tracking-[-0.03em] text-balance sm:text-7xl lg:text-[5.25rem]"
                    >
                      {project.title}
                    </h3>
                    <p className="mt-6 max-w-xl text-lg leading-relaxed opacity-80 sm:text-xl sm:leading-relaxed">{project.summary}</p>
                    <ul className="mt-7 flex flex-wrap gap-2">
                      {project.deliverables.map((item) => (
                        <li key={item} className="rounded-full border border-current/20 bg-white/40 px-4 py-2 text-base">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div aria-hidden className="relative h-[320px] [container-type:size] sm:h-[440px] lg:h-[560px]">
                    <project.Cover />
                  </div>
                </Container>
              </section>

              {/* Key figures */}
              <Container>
                <dl className="grid grid-cols-2 border-b border-black/10 sm:grid-cols-4">
                  {[{ label: "Client", value: project.client }, ...project.facts].map((fact, i) => (
                    <div
                      key={fact.label}
                      className={cn("py-7 sm:py-10", i > 0 && "sm:border-l sm:border-black/10 sm:pl-8", i % 2 === 1 && "pl-6 sm:pl-8")}
                    >
                      <dt className="text-sm font-medium tracking-wide text-muted-foreground uppercase">{fact.label}</dt>
                      <dd className="mt-2 text-2xl font-semibold tracking-tight sm:text-[2rem] sm:leading-tight">{fact.value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="[counter-reset:showcase]">
                  <project.Showcase />
                </div>
              </Container>

              <Container className="pt-6 pb-10">
                <div className="flex flex-col items-start justify-between gap-6 rounded-[2rem] bg-ink p-8 text-white sm:flex-row sm:items-center sm:p-12">
                  <div>
                    <p className="text-base text-white/60">Like what you see?</p>
                    <p className="mt-1 text-2xl font-semibold tracking-tight sm:text-4xl">Let&rsquo;s make yours next.</p>
                  </div>
                  <a href="#contact" onClick={onClose} className={buttonVariants({ size: "pill-lg" })}>
                    Start a project
                    <ArrowUpRight />
                  </a>
                </div>
              </Container>

              {next && (
                <div className={cn("group relative overflow-hidden", next.tone)}>
                  {/* One overlay button covers the strip, so the cover's own controls never nest inside it. */}
                  <button
                    type="button"
                    onClick={() => onStep(1)}
                    aria-label={`Next project: ${next.title}`}
                    className="absolute inset-0 z-10 cursor-pointer"
                  />
                  <Container className="grid items-center gap-6 py-12 sm:grid-cols-[1fr_auto_minmax(0,0.9fr)] sm:py-16">
                    <span>
                      <span className="text-base opacity-60">Next project</span>
                      <span className="mt-2 block text-4xl leading-none font-semibold tracking-tight sm:text-6xl">{next.title}</span>
                    </span>
                    <span className="grid size-16 shrink-0 place-items-center rounded-full bg-primary text-white transition-transform duration-500 ease-out-expo group-hover:translate-x-2">
                      <ArrowRight className="size-7" />
                    </span>
                    <span inert className="relative hidden h-[260px] [container-type:size] sm:block">
                      <next.Cover />
                    </span>
                  </Container>
                </div>
              )}
            </m.div>
          </AnimatePresence>
        </m.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

/** Keeps Tab / Shift+Tab cycling inside the open sheet. */
function trapFocus(event: KeyboardEvent, container: HTMLElement | null) {
  if (!container) return
  const focusable = container.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), [tabindex='0']")
  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last?.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first?.focus()
  }
}
