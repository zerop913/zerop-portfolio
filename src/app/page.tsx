import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/main/hero";
import { SkillsGrid } from "@/components/sections/main/skills";
import { ProjectsSection } from "@/components/sections/main/projects";
import { FaqSection } from "@/components/sections/main/faq";
import { PricingSection } from "@/components/sections/main/pricing";
import { ContactSection } from "@/components/sections/main/contact";
import { ScrollTracker } from "@/components/analytics/ScrollTracker";

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden">
      <Header />
      <main className="min-h-screen">
        <ScrollTracker sectionId="hero">
          <HeroSection />
        </ScrollTracker>

        <ScrollTracker sectionId="skills">
          <SkillsGrid />
        </ScrollTracker>

        <ScrollTracker sectionId="projects">
          <ProjectsSection />
        </ScrollTracker>

        <ScrollTracker sectionId="pricing">
          <PricingSection />
        </ScrollTracker>

        <ScrollTracker sectionId="faq">
          <FaqSection />
        </ScrollTracker>

        <ScrollTracker sectionId="contact">
          <ContactSection />
        </ScrollTracker>
      </main>
      <Footer />
    </div>
  );
}
