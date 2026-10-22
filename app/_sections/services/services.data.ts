import type { StaticImageData } from "next/image"

import type { ProjectCategory } from "../work/work.data"
import advertising from "./images/advertising.jpg"
import brandIdentity from "./images/brand-identity.jpg"
import editorial from "./images/editorial.jpg"
import packaging from "./images/packaging.jpg"

export type Service = {
  title: string
  description: string
  image: StaticImageData
  /** Portfolio filter this service deep-links to. */
  category: ProjectCategory
}

export const services: Service[] = [
  {
    title: "Brand Identity",
    description: "Logos, colour and type systems that scale from business card to billboard.",
    image: brandIdentity,
    category: "Branding",
  },
  {
    title: "Booklets & Editorial",
    description: "Magazines, brochures and annual reports with grids that make reading effortless.",
    image: editorial,
    category: "Booklet",
  },
  {
    title: "Packaging",
    description: "Shelf-stopping boxes, pouches and labels, from concept to print-ready die-line.",
    image: packaging,
    category: "Branding",
  },
  {
    title: "Advertising",
    description: "Campaign key visuals, out-of-home and social ads built around one sharp idea.",
    image: advertising,
    category: "Ads",
  },
]
