export type Testimonial = {
  name: string
  role: string
  quote: string
  rating: number
}

export const testimonials: Testimonial[] = [
  {
    name: "Aarav Mehta",
    role: "Founder, Radical Toast",
    quote: "Our pouches sold out at the first market we took them to. People photographed the packaging before they even tasted the coffee.",
    rating: 5,
  },
  {
    name: "Sofia Romero",
    role: "Editor, Gráfico Quarterly",
    quote: "Neetu rebuilt our editorial grid in three weeks. Layout time per issue dropped by half and the magazine has never looked calmer.",
    rating: 5,
  },
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
    name: "Lukas Weber",
    role: "Director, City Book Fair",
    quote: "The poster became the festival. We saw it framed in cafés across the city for months after the event closed.",
    rating: 5,
  },
  {
    name: "Hana Sato",
    role: "Co-founder, One Coworking",
    quote: "Clear process, fast iterations and print-ready files every single time. Our identity finally matches our ambition.",
    rating: 5,
  },
]
