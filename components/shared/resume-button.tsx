import { Download } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { site } from "@/config/site"
import { cn } from "@/lib/utils"

type ResumeButtonProps = {
  /** `light` for pale sections, `dark` for ink panels like the footer. */
  tone?: "light" | "dark"
  className?: string
}

/** Downloads the PDF configured in `site.resume` rather than opening it in a tab. */
export function ResumeButton({ tone = "light", className }: ResumeButtonProps) {
  return (
    <a
      href={site.resume.href}
      download={site.resume.fileName}
      className={buttonVariants({
        size: "pill-lg",
        variant: tone === "dark" ? "glass" : "outline-ink",
        className: cn("group px-8", className),
      })}
    >
      Download resume
      <Download className="transition-transform duration-500 ease-out-expo group-hover:translate-y-0.5" />
    </a>
  )
}
