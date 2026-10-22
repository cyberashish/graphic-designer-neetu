import type { Metadata, Viewport } from "next"
import { Urbanist } from "next/font/google"

import { Footer } from "@/components/layout/footer/footer"
import { Navbar } from "@/components/layout/navbar/navbar"
import { MotionProvider } from "@/components/motion/motion-provider"
import { site } from "@/config/site"

import "./globals.css"

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.fullName} | ${site.role}`,
  description: site.description,
  openGraph: {
    title: `${site.fullName} | ${site.role}`,
    description: site.description,
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#171717",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${urbanist.variable} h-full`}>
      <body className="min-h-full">
        <MotionProvider>
          <a
            href="#main"
            className="sr-only z-100 rounded-full bg-primary px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  )
}
