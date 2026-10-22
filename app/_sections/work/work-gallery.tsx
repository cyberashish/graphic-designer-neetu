"use client"

import { AnimatePresence } from "motion/react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { CaseStudy } from "./case-study"
import { FilterTabs } from "./filter-tabs"
import { ProjectCard } from "./project-card"
import { ViewCursor } from "./view-cursor"
import { WORK_FILTER_EVENT } from "./work-filter-link"
import { categories, projects, type Category, type Project } from "./work.data"

const counts = Object.fromEntries(
  categories.map((category) => [
    category,
    category === "All" ? projects.length : projects.filter((p) => p.category === category).length,
  ])
) as Record<Category, number>

/** Bento spans in the curated "All" layout (6-column grid on desktop). */
const allSpans: Record<Project["span"], string> = {
  wide: "md:col-span-2 lg:col-span-4",
  half: "lg:col-span-3",
  third: "lg:col-span-2",
}

export function WorkGallery() {
  const [filter, setFilter] = useState<Category>("All")
  const [openSlug, setOpenSlug] = useState<string | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  const visible = useMemo(() => (filter === "All" ? projects : projects.filter((p) => p.category === filter)), [filter])
  const openIndex = visible.findIndex((p) => p.slug === openSlug)
  const openProject = openIndex >= 0 ? visible[openIndex] : null
  const nextProject = openIndex >= 0 && visible.length > 1 ? visible[(openIndex + 1) % visible.length] : null

  // Other sections deep-link here with a category (see WorkFilterLink).
  useEffect(() => {
    const onFilter = (event: Event) => setFilter((event as CustomEvent<Category>).detail)
    window.addEventListener(WORK_FILTER_EVENT, onFilter)
    return () => window.removeEventListener(WORK_FILTER_EVENT, onFilter)
  }, [])

  const open = useCallback((project: Project, trigger: HTMLElement) => {
    triggerRef.current = trigger
    setOpenSlug(project.slug)
  }, [])

  const close = useCallback(() => {
    setOpenSlug(null)
    triggerRef.current?.focus({ preventScroll: true })
  }, [])

  const step = useCallback(
    (direction: 1 | -1) =>
      setOpenSlug((current) => {
        const index = visible.findIndex((p) => p.slug === current)
        return visible[(index + direction + visible.length) % visible.length].slug
      }),
    [visible]
  )

  // Filtered views use an even 2-up grid; a single result spans the full width.
  const spanFor = (project: Project) =>
    filter === "All" ? allSpans[project.span] : visible.length === 1 ? "md:col-span-2 lg:col-span-6" : "lg:col-span-3"

  return (
    <>
      <FilterTabs value={filter} counts={counts} onChange={setFilter} />

      <div ref={gridRef} className="mt-10 grid grid-cols-1 gap-x-5 gap-y-10 md:grid-cols-2 lg:grid-cols-6 lg:gap-y-12">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              number={projects.indexOf(project) + 1}
              spanClassName={spanFor(project)}
              onOpen={open}
            />
          ))}
        </AnimatePresence>
      </div>

      <ViewCursor container={gridRef} />
      <CaseStudy
        project={openProject}
        position={{ index: Math.max(openIndex, 0), total: visible.length }}
        next={nextProject}
        onClose={close}
        onStep={step}
      />
    </>
  )
}
