"use client"

import * as m from "motion/react-m"

import type { NavItem } from "@/config/site"
import { springs } from "@/lib/motion"
import { cn } from "@/lib/utils"

type NavLinkProps = {
  item: NavItem
  active: boolean
  onNavigate?: () => void
}

/** The orange pill glides between links via a shared `layoutId`. */
export function NavLink({ item, active, onNavigate }: NavLinkProps) {
  return (
    <a
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? "location" : undefined}
      className={cn(
        "relative inline-flex h-12 items-center rounded-full px-4 text-base text-white transition-colors duration-300 lg:h-14 lg:px-7 xl:px-8",
        active ? "font-semibold" : "font-normal hover:text-primary"
      )}
    >
      {active && (
        <m.span layoutId="nav-active-pill" transition={springs.snappy} className="absolute inset-0 rounded-full bg-primary" />
      )}
      <span className="relative">{item.label}</span>
    </a>
  )
}
