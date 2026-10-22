import { Quote } from "lucide-react"

import { StarRating } from "@/components/shared/star-rating"

import type { Testimonial } from "./testimonials.data"

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="relative mx-2.5 w-[320px] shrink-0 rounded-[1.75rem] bg-white/[0.06] p-6 ring-1 ring-white/10 backdrop-blur-sm transition-colors duration-300 hover:bg-white/10 sm:w-[400px] sm:p-7">
      <Quote aria-hidden className="absolute top-6 right-6 size-12 fill-white/5 text-white/10" />
      <figcaption className="flex items-center gap-3">
        <span
          aria-hidden
          className="grid size-12 place-items-center rounded-full bg-gradient-to-br from-primary to-[#ffb37f] text-sm font-bold text-white"
        >
          {initials(testimonial.name)}
        </span>
        <span>
          <span className="block font-semibold text-white">{testimonial.name}</span>
          <span className="block text-sm text-white/50">{testimonial.role}</span>
        </span>
      </figcaption>
      <div className="mt-5 flex items-center gap-2">
        <StarRating value={testimonial.rating} className="[&_svg]:size-4" />
        <span className="text-sm font-semibold text-white">{testimonial.rating.toFixed(1)}</span>
      </div>
      <blockquote className="mt-3 leading-relaxed text-white/70">&ldquo;{testimonial.quote}&rdquo;</blockquote>
    </figure>
  )
}
