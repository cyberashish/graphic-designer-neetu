export type Role = {
  company: string
  location: string
  period: string
  title: string
  description: string
}

export const roles: Role[] = [
  {
    company: "Pixel & Press Studio",
    location: "Mumbai",
    period: "Jan 2016 – Jul 2020",
    title: "Junior Graphic Designer",
    description:
      "Designed catalogues, menus and event collateral for 40+ local brands, and learned prepress the hard way, on press checks at 6 am.",
  },
  {
    company: "Northbeam Advertising",
    location: "Mumbai",
    period: "Aug 2020 – Jul 2023",
    title: "Senior Graphic Designer",
    description:
      "Led key visuals for national OOH and print campaigns, and built the agency's packaging practice from two clients to twelve.",
  },
  {
    company: "Independent Studio",
    location: "Remote",
    period: "Aug 2023 – Present",
    title: "Brand & Print Designer",
    description:
      "Partnering directly with founders on identities, booklets and packaging, from first sketch to final print run.",
  },
]
