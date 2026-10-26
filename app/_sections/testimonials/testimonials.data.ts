export type Testimonial = {
  name: string
  role: string
  quote: string
  rating: number
}

export const testimonials: Testimonial[] = [
  {
    name: "Daniel Kim",
    role: "Marketing Lead, Chronos",
    quote: "One line, one red board, and our recall numbers doubled. She knows when to say less, and that's rare.",
    rating: 5,
  },
  {
    name: "Priya Nair",
    role: "Partner, Sigma Architects",
    quote: "The annual booklet feels like holding one of our buildings. The paper choices alone got clients calling us.",
    rating: 5,
  },
  {
    name: "Hana Sato",
    role: "Co-founder, One Coworking",
    quote: "Clear process, fast iterations and print-ready files every single time. Our identity finally matches our ambition.",
    rating: 5,
  },
]
