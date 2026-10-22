import Link from "next/link"

import { site } from "@/config/site"
import { cn } from "@/lib/utils"

/** Orange "N" monogram drawn as a single rounded stroke. */
function Monogram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden className={cn("size-10 shrink-0", className)}>
      <circle cx="20" cy="20" r="20" className="fill-primary" />
      <path
        d="M13.5 27V13l13 14V13"
        fill="none"
        stroke="white"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="#home"
      aria-label={`${site.brand}, back to top`}
      className={cn("group inline-flex items-center gap-2.5 text-[1.375rem] font-bold tracking-tight", className)}
    >
      <Monogram className="transition-transform duration-500 ease-out-expo group-hover:-rotate-12 group-hover:scale-105" />
      <span>{site.brand}</span>
    </Link>
  )
}
