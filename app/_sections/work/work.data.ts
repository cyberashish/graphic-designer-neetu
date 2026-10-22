import dynamic from "next/dynamic"
import type { ComponentType } from "react"

import { ShowcaseSkeleton } from "./showcase-parts"
import { AmazonCover } from "./projects/amazon-listings/cover"
import { BookletCover } from "./projects/booklet/cover"
import { InstagramEducationCover } from "./projects/instagram-education/cover"
import { InstagramMythsCover } from "./projects/instagram-myths/cover"
import { NativeRcsCover } from "./projects/native-rcs/cover"
import { PamphletsCover } from "./projects/pamphlets/cover"
import { PmaxKneeCover } from "./projects/pmax-knee/cover"
import { PmaxSpineCover } from "./projects/pmax-spine/cover"
import { StandeesCover } from "./projects/standees/cover"
import { StoryAdsCover } from "./projects/story-ads/cover"
import { VoucherCover } from "./projects/voucher/cover"

export const categories = ["All", "Booklet", "Branding", "Events", "Social", "Ads"] as const
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

/** Order is tuned so the "All" view packs into gapless rows of 6 columns. */
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
    span: "wide",
    Cover: BookletCover,
    Showcase: lazy(() => import("./projects/booklet/showcase")),
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
    slug: "instagram-education",
    title: "Root-Cause Carousel",
    client: "ResearchAyu",
    category: "Social",
    year: 2026,
    summary:
      "An eight-slide explainer that tells the story of knee degeneration like a short documentary, from gut health to metabolic waste to joint space, ending on the treatment approach. Paired with single-image posts that carry the clinical proof points.",
    deliverables: ["Instagram carousels", "Static posts", "3D medical visuals"],
    facts: [
      { label: "Format", value: "4:5" },
      { label: "Slides", value: "8" },
      { label: "Posts", value: "4" },
    ],
    tone: "bg-[#e1ede6]",
    span: "half",
    Cover: InstagramEducationCover,
    Showcase: lazy(() => import("./projects/instagram-education/showcase")),
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
    span: "third",
    Cover: PmaxSpineCover,
    Showcase: lazy(() => import("./projects/pmax-spine/showcase")),
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
      "Roll-ups and backdrops for clinics and health camps, built on one layout that scales from a 3×6 ft roll-up to a 10×8 ft stage backdrop without losing the headline, the 3-step recovery path or the call to action.",
    deliverables: ["Roll-up banners", "Stage backdrops", "Large-format print"],
    facts: [
      { label: "Sizes", value: "3×6 ft → 10×8 ft" },
      { label: "Languages", value: "2" },
      { label: "Variants", value: "7" },
    ],
    tone: "bg-[linear-gradient(to_bottom,#ecebe7_72%,#e0ddd6_72%)]",
    span: "third",
    Cover: StandeesCover,
    Showcase: lazy(() => import("./projects/standees/showcase")),
  },
  {
    slug: "native-rcs",
    title: "Native & RCS Ads",
    client: "ResearchAyu",
    category: "Ads",
    year: 2026,
    summary:
      "Native ads that sit naturally inside news feeds, plus rich RCS message cards that land straight in patients' inboxes with call and booking buttons. Wide compositions keep the person on one side and the promise on the other.",
    deliverables: ["Taboola native ads", "RCS rich cards", "Copy layouts"],
    facts: [
      { label: "Native", value: "2.2:1" },
      { label: "RCS", value: "2:1" },
      { label: "Channels", value: "2" },
    ],
    tone: "bg-[#eaeef1]",
    span: "wide",
    Cover: NativeRcsCover,
    Showcase: lazy(() => import("./projects/native-rcs/showcase")),
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
  {
    slug: "instagram-myths",
    title: "Myth vs Reality Series",
    client: "ResearchAyu",
    category: "Social",
    year: 2026,
    summary:
      "A split-layout carousel format that pits a common knee myth against the clinical truth, followed by a trust-building series on research and results. The diagonal teal panel became a recognisable device across the feed.",
    deliverables: ["Carousel templates", "Myth/Truth system", "Trust series"],
    facts: [
      { label: "Carousels", value: "2" },
      { label: "Slides", value: "12" },
      { label: "Format", value: "4:5" },
    ],
    tone: "bg-[#e4eee9]",
    span: "half",
    Cover: InstagramMythsCover,
    Showcase: lazy(() => import("./projects/instagram-myths/showcase")),
  },
]
