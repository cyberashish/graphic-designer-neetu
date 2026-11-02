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
  url: "https://graphic-designer-neetu.vercel.app",
  // Contact details: shown in the footer and used by every "Hire me" and email link.
  email: "neetu.kumari.design@gmail.com",
  phone: "+91 70114 09126",
  location: "Mumbai, India",
  yearsOfExperience: 1,
  copyrightYear: 2026,
  /** Footer links. Leave `href` empty to hide one until the profile URL is ready. */
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/neetu-kumari-882a5b362?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
    { label: "Dribbble", href: "" },
    { label: "Behance", href: "" },
  ],
  /**
   * Served from `public/`. To update the resume, replace `public/resume.pdf` with a file of
   * the same name; `fileName` is the name the visitor's download is saved under.
   */
  resume: { href: "/resume.pdf", fileName: "Neetu-Resume.pdf" },
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
