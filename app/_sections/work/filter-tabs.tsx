"use client"

import * as m from "motion/react-m"

import { springs } from "@/lib/motion"
import { cn } from "@/lib/utils"

import { categories, type Category } from "./work.data"

type FilterTabsProps = {
  value: Category
  counts: Record<Category, number>
  onChange: (category: Category) => void
}

export function FilterTabs({ value, counts, onChange }: FilterTabsProps) {
  return (
    <div
      role="group"
      aria-label="Filter projects by category"
      className="-mx-4 flex gap-2 overflow-x-auto px-4 pt-1 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0 [&::-webkit-scrollbar]:hidden"
    >
      {categories.map((category) => {
        const active = category === value
        return (
          <button
            key={category}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(category)}
            className={cn(
              "group/tab relative inline-flex shrink-0 cursor-pointer items-center gap-2.5 rounded-full px-6 py-3 text-base font-medium transition-[color,background-color,box-shadow,translate,scale] duration-300 ease-out-expo focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:outline-none active:scale-95 sm:text-[1.0625rem]",
              active
                ? "text-white"
                : "bg-surface text-ink hover:-translate-y-0.5 hover:bg-[#e4e7ec] hover:shadow-md hover:shadow-ink/5"
            )}
          >
            {active && (
              <m.span layoutId="work-filter-pill" transition={springs.snappy} className="absolute inset-0 rounded-full bg-ink" />
            )}
            <span className="relative">{category}</span>
            <span
              className={cn(
                "relative grid h-6 min-w-7 place-items-center rounded-full px-2 text-sm tabular-nums transition-colors duration-300",
                active
                  ? "bg-primary text-white"
                  : "bg-white text-muted-foreground group-hover/tab:bg-primary group-hover/tab:text-white"
              )}
            >
              {counts[category]}
            </span>
          </button>
        )
      })}
    </div>
  )
}
