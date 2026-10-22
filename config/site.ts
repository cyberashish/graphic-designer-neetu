/**
 * Single source of truth for personal details. Every section reads from here,
 * so rebranding the portfolio is a one-file change.
 */
export const site = {
  name: "Neetu",
  fullName: "Neetu",
  /** Studio wordmark shown in the header and footer. */
  brand: "Neetu",
  role: "Graphic Designer",
  tagline: "Brand identities, editorial print and campaigns that people remember.",
  description:
    "Neetu is a graphic designer crafting brand identities, booklets, packaging and advertising for ambitious teams.",
  url: "https://neetu.studio",
  email: "hello@neetu.studio",
  phone: "+91 98765 43210",
  location: "Mumbai, India",
  yearsOfExperience: 10,
  copyrightYear: 2026,
  socials: [
    { label: "Dribbble", href: "https://dribbble.com" },
    { label: "Instagram", href: "https://www.instagram.com" },
    { label: "LinkedIn", href: "https://www.linkedin.com" },
  ],
} as const

export type NavItem = { label: string; href: `#${string}` }

/** Split around the centred logo on desktop, a single list on mobile. */
export const navigation = {
  left: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Service", href: "#services" },
  ],
  right: [
    { label: "Resume", href: "#experience" },
    { label: "Project", href: "#work" },
    { label: "Contact", href: "#contact" },
  ],
} satisfies Record<string, NavItem[]>

export const allNavItems: NavItem[] = [...navigation.left, ...navigation.right]
