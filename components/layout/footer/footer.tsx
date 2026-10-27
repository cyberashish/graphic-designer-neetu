import { ArrowUp, ArrowUpRight } from "lucide-react"
import Link from "next/link"

import { Magnetic } from "@/components/motion/magnetic"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/shared/container"
import { EmailCaptureForm } from "@/components/shared/email-capture/email-capture-form"
import { Logo } from "@/components/shared/logo"
import { ResumeButton } from "@/components/shared/resume-button"
import { buttonVariants } from "@/components/ui/button"
import { allNavItems, site } from "@/config/site"

const linkClass = "text-white/60 transition-colors duration-300 hover:text-primary"

export function Footer() {
  return (
    <footer className="px-2 pb-2 sm:px-4 sm:pb-4">
      <div className="overflow-hidden rounded-[2.5rem] bg-ink-glow text-white sm:rounded-[3.5rem]">
        <Container className="py-16 sm:py-20">
          <Reveal className="flex flex-wrap items-center justify-between gap-8 border-b border-white/10 pb-12">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              Let&rsquo;s Connect <span className="text-primary">there</span>
            </h2>
            <div className="flex flex-wrap items-center gap-3">
              <Magnetic>
                <a href={`mailto:${site.email}`} className={buttonVariants({ size: "pill-lg", className: "group px-8" })}>
                  Hire me
                  <ArrowUpRight className="transition-transform duration-500 ease-out-expo group-hover:rotate-45" />
                </a>
              </Magnetic>
              <Magnetic>
                <ResumeButton tone="dark" />
              </Magnetic>
            </div>
          </Reveal>

          <div className="grid gap-12 pt-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_1fr_1.4fr]">
            <div>
              <Logo className="text-white" />
              <p className="mt-5 max-w-xs leading-relaxed text-white/60">{site.tagline}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {site.socials.filter((social) => social.href).map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex rounded-full border border-white/15 px-3.5 py-1.5 text-sm text-white/70 transition-colors duration-300 hover:border-primary hover:bg-primary hover:text-white"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <nav aria-label="Footer">
              <h3 className="font-semibold text-primary">Navigation</h3>
              <ul className="mt-5 grid gap-3">
                {allNavItems.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h3 className="font-semibold text-primary">Contact</h3>
              <ul className="mt-5 grid gap-3">
                <li>
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`} className={linkClass}>
                    {site.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.email}`} className={linkClass}>
                    {site.email}
                  </a>
                </li>
                <li className="text-white/60">{site.location}</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-primary">Get the latest information</h3>
              <p className="mt-5 mb-4 text-sm text-white/60">Monthly notes on branding, print and process. No spam.</p>
              <EmailCaptureForm source="newsletter" cta="Subscribe" tone="dark" size="md" placeholder="Email address" />
            </div>
          </div>
        </Container>

        <div className="border-t border-white/10">
          <Container className="flex flex-wrap items-center justify-between gap-4 py-6 text-sm text-white/50">
            <p>
              &copy; {site.copyrightYear} {site.fullName}. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className={linkClass}>
                Terms
              </a>
              <a href="#" className={linkClass}>
                Privacy
              </a>
              <a
                href="#home"
                aria-label="Back to top"
                className="group grid size-10 place-items-center rounded-full bg-white/10 text-white transition-colors duration-300 hover:bg-primary"
              >
                <ArrowUp className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </Container>
        </div>
      </div>
    </footer>
  )
}
