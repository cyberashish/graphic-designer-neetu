export type Testimonial = {
  name: string
  role: string
  quote: string
  rating: number
}

export const testimonials: Testimonial[] = [
  {
    name: "Ashish Kumar",
    role: "Owner, Bharat Tech Healthcare",
    quote: "One line, one red board, and our recall numbers doubled. She knows when to say less, and that's rare.",
    rating: 5,
  },
  {
    // Placeholder: replace with a real client before launch.
    name: "Rohan Deshmukh",
    role: "Founder, Nirmal Ayurveda Clinic",
    quote: "The patient booklet explains our treatment the way our doctors do. People read it in the waiting room and walk in with better questions.",
    rating: 5,
  },
  {
    // Placeholder: replace with a real client before launch.
    name: "Sneha Kulkarni",
    role: "Marketing Manager, Arogya Plus Pharma",
    quote: "Clear process, fast iterations and print-ready files every single time. Our brand finally matches our ambition.",
    rating: 5,
  },
]
