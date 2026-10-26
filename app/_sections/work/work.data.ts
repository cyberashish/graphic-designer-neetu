import dynamic from "next/dynamic"
import type { ComponentType } from "react"

import { ShowcaseSkeleton } from "./showcase-parts"
import { AmazonCover } from "./projects/amazon-listings/cover"
import { BookletCover } from "./projects/booklet/cover"
import { InstagramEducationCover } from "./projects/instagram-education/cover"
import { InstagramMythsCover } from "./projects/instagram-myths/cover"
import { InstagramPostsCover } from "./projects/instagram-posts/cover"
import { InstagramWhyChooseCover } from "./projects/instagram-why-choose/cover"
import { TaboolaRcsCover } from "./projects/taboola-rcs/cover"
import { PamphletsCover } from "./projects/pamphlets/cover"
import { PmaxKneeCover } from "./projects/pmax-knee/cover"
import { PmaxSpineCover } from "./projects/pmax-spine/cover"
import { StandeesCover } from "./projects/standees/cover"
import { StoryAdsCover } from "./projects/story-ads/cover"
import { VoucherCover } from "./projects/voucher/cover"

export const categories = ["All", "Booklet", "Branding", "Events", "Social media", "Ads"] as const
export type Category = (typeof categories)[number]
export type ProjectCategory = Exclude<Category, "All">

export type Project = {
  slug: string
  title: string
  client: string
  category: ProjectCategory
  year: number
  summary: string
  deliverables: string[]
  facts: { label: string; value: string }[]
  /** Background (and text) of the card stage. */
  tone: string
  /** Footprint in the 6-column "All" grid. */
  span: "wide" | "half" | "third"
  Cover: ComponentType
  Showcase: ComponentType
}

// Showcases are code-split: their JS and images load only when a case study opens.
const lazy = (load: () => Promise<{ default: ComponentType }>) => dynamic(load, { loading: ShowcaseSkeleton })

/** Grouped by category (in tab order), with spans tuned so each group fills whole rows of 6 columns. */
export const projects: Project[] = [
  {
    slug: "booklet",
    title: "Patient Education Booklet",
    client: "ResearchAyu",
    category: "Booklet",
    year: 2026,
    summary:
      "A 28-page clinic booklet that walks patients through what happens before a medicine reaches them, from sourcing true Giloy to Charaka's 21-cycle Amalaki process. Calm teal grids, generous photography and step diagrams turn dense Ayurvedic science into something a patient reads in the waiting room.",
    deliverables: ["Editorial layout", "Infographics", "Photo direction", "Print-ready files"],
    facts: [
      { label: "Format", value: "8.5 × 11 in" },
      { label: "Pages", value: "28" },
      { label: "Spreads", value: "13" },
    ],
    tone: "bg-[#e4eee9]",
    span: "half",
    Cover: BookletCover,
    Showcase: lazy(() => import("./projects/booklet/showcase")),
  },
  {
    slug: "amazon-listings",
    title: "Amazon Listing System",
    client: "TechClinic Connect",
    category: "Branding",
    year: 2026,
    summary:
      "A reusable 8-frame listing system for an Ayurvedic product range: hero packshot, benefits, problem and solution, ingredients, how-to-use and a trust frame. One grid and one icon language across every SKU make the range instantly recognisable in search results.",
    deliverables: ["Listing images", "Packshots", "Icon system", "Combo & multipack art"],
    facts: [
      { label: "Products", value: "8 SKUs" },
      { label: "Frames each", value: "8" },
      { label: "Marketplace", value: "Amazon" },
    ],
    tone: "bg-[#eef0f2]",
    span: "half",
    Cover: AmazonCover,
    Showcase: lazy(() => import("./projects/amazon-listings/showcase")),
  },
  {
    slug: "voucher",
    title: "Clinic Discount Voucher",
    client: "ResearchAyu",
    category: "Events",
    year: 2026,
    summary:
      "A two-sided DL voucher handed out at health camps: the offer on the front, the credibility on the back (clinical approvals and press mentions), so it works as a sales tool and a trust builder in one card.",
    deliverables: ["Voucher design", "Print production", "4 language versions"],
    facts: [
      { label: "Sides", value: "2" },
      { label: "Languages", value: "4" },
      { label: "Use", value: "Health camps" },
    ],
    tone: "bg-[#efebe4]",
    span: "third",
    Cover: VoucherCover,
    Showcase: lazy(() => import("./projects/voucher/showcase")),
  },
  {
    slug: "standees",
    title: "Event Standees",
    client: "ResearchAyu",
    category: "Events",
    year: 2026,
    summary:
      "Roll-ups and backdrops for clinics and health camps, built on one layout that scales from a 3×6 ft roll-up to a 10×8 ft stage backdrop without losing the headline, the 3-step recovery path or the call to action, plus a set of roll-ups written for each stop on the event floor: entrance, booth and main stage.",
    deliverables: ["Roll-up banners", "Stage backdrops", "Large-format print"],
    facts: [
      { label: "Sizes", value: "3×6 ft → 10×8 ft" },
      { label: "Languages", value: "2" },
      { label: "Variants", value: "13" },
    ],
    tone: "bg-[linear-gradient(to_bottom,#ecebe7_72%,#e0ddd6_72%)]",
    span: "third",
    Cover: StandeesCover,
    Showcase: lazy(() => import("./projects/standees/showcase")),
  },
  {
    slug: "pamphlets",
    title: "Rack Card Pamphlets",
    client: "ResearchAyu",
    category: "Events",
    year: 2026,
    summary:
      "Slim 4×11 inch pamphlets that compare treatment options at a glance. A strong doctor-led cover, colour-coded comparison rows and a QR back keep each one readable in under a minute.",
    deliverables: ["Pamphlet series", "Comparison tables", "Regional versions"],
    facts: [
      { label: "Size", value: "4×11 in" },
      { label: "Languages", value: "4" },
      { label: "Series", value: "3" },
    ],
    tone: "bg-[#f2ede6]",
    span: "third",
    Cover: PamphletsCover,
    Showcase: lazy(() => import("./projects/pamphlets/showcase")),
  },
  {
    slug: "instagram-education",
    title: "Root-Cause Carousel",
    client: "ResearchAyu",
    category: "Social media",
    year: 2026,
    summary:
      "An eight-slide explainer that tells the story of knee degeneration like a short documentary, from gut health to metabolic waste to joint space, ending on the treatment approach.",
    deliverables: ["Instagram carousel", "3D medical visuals", "Slide storytelling"],
    facts: [
      { label: "Format", value: "4:5" },
      { label: "Slides", value: "8" },
      { label: "Platform", value: "Instagram" },
    ],
    tone: "bg-[#e1ede6]",
    span: "half",
    Cover: InstagramEducationCover,
    Showcase: lazy(() => import("./projects/instagram-education/showcase")),
  },
  {
    slug: "instagram-myths",
    title: "Myth vs Reality Series",
    client: "ResearchAyu",
    category: "Social media",
    year: 2026,
    summary:
      "A split-layout carousel format that pits a common knee myth against the clinical truth. The diagonal teal panel became a recognisable device across the feed.",
    deliverables: ["Carousel templates", "Myth/Truth system"],
    facts: [
      { label: "Format", value: "4:5" },
      { label: "Slides", value: "7" },
      { label: "Platform", value: "Instagram" },
    ],
    tone: "bg-[#e4eee9]",
    span: "half",
    Cover: InstagramMythsCover,
    Showcase: lazy(() => import("./projects/instagram-myths/showcase")),
  },
  {
    slug: "instagram-why-choose",
    title: "Why Choose ResearchAyu",
    client: "ResearchAyu",
    category: "Social media",
    year: 2026,
    summary:
      "A trust-building carousel that answers the question every patient asks before booking: why this clinic? Research, doctors and results are laid out one proof point per slide, closing on a clear call to action.",
    deliverables: ["Instagram carousel", "Trust messaging", "Photo direction"],
    facts: [
      { label: "Format", value: "4:5" },
      { label: "Slides", value: "5" },
      { label: "Platform", value: "Instagram" },
    ],
    tone: "bg-[#e8eeec]",
    span: "half",
    Cover: InstagramWhyChooseCover,
    Showcase: lazy(() => import("./projects/instagram-why-choose/showcase")),
  },
  {
    slug: "instagram-posts",
    title: "Single Image Posts",
    client: "ResearchAyu",
    category: "Social media",
    year: 2026,
    summary:
      "Standalone feed posts that each carry one idea, from how knee cushions regrow to choosing the best care for your parents. Bold headlines, 3D anatomy and clinical proof points keep every post readable at a glance.",
    deliverables: ["Static posts", "3D medical visuals", "Headline copy"],
    facts: [
      { label: "Format", value: "4:5" },
      { label: "Posts", value: "4" },
      { label: "Platform", value: "Instagram" },
    ],
    tone: "bg-[#e1ede6]",
    span: "half",
    Cover: InstagramPostsCover,
    Showcase: lazy(() => import("./projects/instagram-posts/showcase")),
  },
  {
    slug: "story-ads",
    title: "Knee Care Story Ads",
    client: "ResearchAyu",
    category: "Ads",
    year: 2026,
    summary:
      "Full-screen Meta stories for a non-surgical knee treatment. Each one opens on a single human moment (a run, a dance, a staircase) and keeps the message to a thumb-stopping line plus a call button, localised for five regional audiences.",
    deliverables: ["Meta story ads", "Localisation", "Key visuals"],
    facts: [
      { label: "Format", value: "9:16" },
      { label: "Languages", value: "5" },
      { label: "Placement", value: "Meta" },
    ],
    tone: "bg-[#151515] text-white",
    span: "third",
    Cover: StoryAdsCover,
    Showcase: lazy(() => import("./projects/story-ads/showcase")),
  },
  {
    slug: "taboola-rcs",
    title: "Taboola & RCS Ads",
    client: "ResearchAyu",
    category: "Ads",
    year: 2026,
    summary:
      "Taboola ads that sit naturally inside news feeds, plus rich RCS message cards that land straight in patients' inboxes with call and booking buttons. Wide compositions keep the person on one side and the promise on the other.",
    deliverables: ["Taboola ads", "RCS rich cards", "Copy layouts"],
    facts: [
      { label: "Taboola", value: "2.2:1" },
      { label: "RCS", value: "2:1" },
      { label: "Channels", value: "2" },
    ],
    tone: "bg-[#eaeef1]",
    span: "wide",
    Cover: TaboolaRcsCover,
    Showcase: lazy(() => import("./projects/taboola-rcs/showcase")),
  },
  {
    slug: "pmax-spine",
    title: "Spine Care Campaign",
    client: "ResearchAyu",
    category: "Ads",
    year: 2026,
    summary:
      "Conceptual Performance Max creatives that make back pain visible: a man pulled by puppet strings, a backpack stuffed with \"long sitting hours\", a boulder labelled BACK PAIN. Every visual metaphor lands before the copy is read.",
    deliverables: ["Performance Max", "Visual concepts", "Multi-format adaptations"],
    facts: [
      { label: "Formats", value: "1:1 · 4:5 · 1.91:1" },
      { label: "Languages", value: "3" },
      { label: "Concepts", value: "20+" },
    ],
    tone: "bg-[#0e3f37] text-white",
    span: "half",
    Cover: PmaxSpineCover,
    Showcase: lazy(() => import("./projects/pmax-spine/showcase")),
  },
  {
    slug: "pmax-knee",
    title: "Knee Care Campaign",
    client: "ResearchAyu",
    category: "Ads",
    year: 2026,
    summary:
      "A Performance Max family built around doors, stairs and shadows, simple metaphors for choosing a path without surgery. Designed once and adapted across English, Hindi, Marathi and Telugu for three regions.",
    deliverables: ["Performance Max", "Concept series", "Regional adaptations"],
    facts: [
      { label: "Formats", value: "3 sizes" },
      { label: "Languages", value: "4" },
      { label: "Regions", value: "3" },
    ],
    tone: "bg-[#efe9e1]",
    span: "half",
    Cover: PmaxKneeCover,
    Showcase: lazy(() => import("./projects/pmax-knee/showcase")),
  },
]
