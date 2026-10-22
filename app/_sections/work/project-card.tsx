"use client"

import { ArrowUpRight } from "lucide-react"
import * as m from "motion/react-m"

import { easeOutExpo } from "@/lib/motion"
import { cn } from "@/lib/utils"

import type { Project } from "./work.data"

type ProjectCardProps = {
  project: Project
  number: number
  /** Grid footprint classes, decided by the gallery for the current filter. */
  spanClassName: string
  onOpen: (project: Project, trigger: HTMLElement) => void
  ref?: React.Ref<HTMLElement>
}

export function ProjectCard({ project, number, spanClassName, onOpen, ref }: ProjectCardProps) {
  const { Cover } = project

  return (
    <m.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
      transition={{ duration: 0.6, ease: easeOutExpo }}
      className={cn("group relative min-w-0", spanClassName)}
    >
      {/* One overlay button covers the whole card, so covers may hold their own controls without nesting. */}
      <button
        type="button"
        data-cursor="view"
        onClick={(event) => onOpen(project, event.currentTarget)}
        aria-label={`Open case study: ${project.title}`}
        className="absolute inset-0 z-10 cursor-pointer rounded-[1.75rem] focus-visible:outline-none lg:rounded-[2rem] [@media(pointer:fine)]:cursor-none"
      />
      <div aria-hidden>
        <div
          className={cn(
            "relative h-[360px] overflow-hidden rounded-[1.75rem] ring-1 ring-black/5 transition-[box-shadow] duration-500 [container-type:size] group-hover:shadow-[0_30px_60px_-30px_rgb(0_0_0/0.35)] group-has-[button:focus-visible]:ring-4 group-has-[button:focus-visible]:ring-primary/50 sm:h-[400px] lg:h-[440px] lg:rounded-[2rem]",
            project.tone
          )}
        >
          <Cover />
          <span className="pointer-events-none absolute top-4 left-4 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-ink backdrop-blur-md sm:top-5 sm:left-5">
            {project.category}
          </span>
        </div>

        <div className="flex items-start justify-between gap-4 px-1 pt-5 sm:pt-6">
          <div className="min-w-0">
            <p className="flex items-baseline gap-3">
              <span className="w-7 shrink-0 font-mono text-sm text-muted-foreground tabular-nums">{String(number).padStart(2, "0")}</span>
              <span className="truncate text-xl font-semibold tracking-tight sm:text-[1.625rem] sm:leading-tight">{project.title}</span>
            </p>
            <p className="mt-1.5 pl-10 text-base text-muted-foreground sm:text-[1.0625rem]">
              {project.client} · {project.deliverables.slice(0, 2).join(", ")}
            </p>
          </div>
          <span className="grid size-12 shrink-0 place-items-center rounded-full border border-ink/15 transition-colors duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-white">
            <ArrowUpRight className="size-5 transition-transform duration-500 ease-out-expo group-hover:rotate-45" aria-hidden />
          </span>
        </div>
      </div>
    </m.article>
  )
}
