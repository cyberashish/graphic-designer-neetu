import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  /** Plain lead-in, e.g. "My". */
  lead: React.ReactNode
  /** Highlighted words rendered in the brand colour, e.g. "Services". */
  highlight: React.ReactNode
  /** Optional text after the highlight, e.g. "?". */
  trail?: React.ReactNode
  as?: "h1" | "h2" | "h3"
  id?: string
  className?: string
}

export function SectionHeading({ lead, highlight, trail, as: Tag = "h2", id, className }: SectionHeadingProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "text-[2.25rem] leading-[1.1] font-semibold tracking-tight text-balance sm:text-5xl",
        className
      )}
    >
      {lead} <span className="text-primary">{highlight}</span>
      {trail}
    </Tag>
  )
}
