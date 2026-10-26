"use client"

import type { NavItem } from "@/config/site"
import { cn } from "@/lib/utils"

type NavLinkProps = {
  item: NavItem
  active: boolean
  onNavigate?: () => void
}

/** A bar link; the orange pill behind the active one is drawn by the navbar. */
export function NavLink({ item, active, onNavigate }: NavLinkProps) {
  return (
    <a
      href={item.href}
      onClick={onNavigate}
      data-nav-link={item.href}
      aria-current={active ? "location" : undefined}
      className={cn(
        "relative inline-flex h-12 items-center rounded-full px-4 text-base text-white transition-colors duration-300 lg:h-14 lg:px-7 xl:px-8",
        !active && "hover:text-primary"
      )}
    >
      {/* An invisible bold copy reserves the width, so switching weight never nudges the bar. */}
      <span className="relative grid">
        <span aria-hidden className="invisible col-start-1 row-start-1 font-semibold">
          {item.label}
        </span>
        <span className={cn("col-start-1 row-start-1 text-center", active ? "font-semibold" : "font-normal")}>{item.label}</span>
      </span>
    </a>
  )
}
