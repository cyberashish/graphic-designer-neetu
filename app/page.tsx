import { ContactCta } from "./_sections/contact-cta/contact-cta"
import { Experience } from "./_sections/experience/experience"
import { Hero } from "./_sections/hero/hero"
import { Services } from "./_sections/services/services"
import { SkillsTicker } from "./_sections/skills-ticker/skills-ticker"
import { Testimonials } from "./_sections/testimonials/testimonials"
import { WhyHireMe } from "./_sections/why-hire-me/why-hire-me"
import { Work } from "./_sections/work/work"

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Experience />
      <WhyHireMe />
      <SkillsTicker />
      <Work />
      <Testimonials />
      <ContactCta />
    </>
  )
}
