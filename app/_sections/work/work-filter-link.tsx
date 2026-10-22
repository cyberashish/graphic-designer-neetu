"use client"

import type { ProjectCategory } from "./work.data"

export const WORK_FILTER_EVENT = "work:filter"

type WorkFilterLinkProps = Omit<React.ComponentProps<"a">, "href"> & {
  category: ProjectCategory
}

/**
 * Jumps to the portfolio with a category pre-selected, so other sections
 * (e.g. Services) can deep-link into relevant work.
 */
export function WorkFilterLink({ category, onClick, ...props }: WorkFilterLinkProps) {
  return (
    <a
      href="#work"
      onClick={(event) => {
        window.dispatchEvent(new CustomEvent<ProjectCategory>(WORK_FILTER_EVENT, { detail: category }))
        onClick?.(event)
      }}
      {...props}
    />
  )
}
