"use client"

import { Menu, X } from "lucide-react"
import { AnimatePresence, useScroll, useSpring } from "motion/react"
import * as m from "motion/react-m"
import { useState } from "react"

import { Logo } from "@/components/shared/logo"
import { allNavItems, navigation } from "@/config/site"
import { useActiveSection } from "@/hooks/use-active-section"
import { easeOutExpo } from "@/lib/motion"
import { cn } from "@/lib/utils"

import { NavLink } from "./nav-link"

const sectionIds = allNavItems.map((item) => item.href.slice(1))

export function Navbar() {
  const active = useActiveSection(sectionIds)
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })

  return (
    <>
      <m.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-60 h-[3px] origin-left bg-primary"
      />
      {/* Always pinned to the top of the viewport. */}
      <header className="fixed inset-x-0 top-4 z-50 mx-auto max-w-[68rem] px-4 sm:top-6 sm:px-6 lg:px-8">
        {/* Mirrors the content container so the bar lines up with the hero copy. */}
        <nav
          aria-label="Primary"
          className="flex animate-rise items-center justify-between rounded-full bg-ink p-2 [--rise-from:-24px] md:grid md:grid-cols-[1fr_auto_1fr]"
        >
          <ul className="hidden items-center justify-between pr-[4%] md:flex lg:pr-[10%] xl:pr-[12%]">
            {navigation.left.map((item) => (
              <li key={item.href}>
                <NavLink item={item} active={active === item.href.slice(1)} />
              </li>
            ))}
          </ul>

          <Logo className="px-2 text-white md:px-4" />

          <ul className="hidden items-center justify-between pl-[4%] md:flex lg:pl-[10%] xl:pl-[12%]">
            {navigation.right.map((item) => (
              <li key={item.href}>
                <NavLink item={item} active={active === item.href.slice(1)} />
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 cursor-pointer place-items-center rounded-full bg-primary text-white transition-transform active:scale-90 md:hidden"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <m.span
                key={open ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </m.span>
            </AnimatePresence>
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <m.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.35, ease: easeOutExpo }}
              className="mt-2 origin-top rounded-3xl bg-ink p-3 ring-1 ring-white/10 md:hidden"
            >
              <ul className="grid gap-1">
                {allNavItems.map((item, i) => (
                  <m.li
                    key={item.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.3 }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "block rounded-2xl px-4 py-3 text-base font-medium transition-colors",
                        active === item.href.slice(1) ? "bg-primary text-white" : "text-white/80 hover:bg-white/5"
                      )}
                    >
                      {item.label}
                    </a>
                  </m.li>
                ))}
              </ul>
            </m.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
