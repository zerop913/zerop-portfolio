import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero";
import { SkillsGrid } from "@/components/sections/skills";
import { ProjectsSection } from "@/components/sections/projects";
import { FaqSection } from "@/components/sections/faq";
import { PricingSection } from "@/components/sections/pricing";
import { ContactSection } from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden">
      <Header />
      <main className="min-h-screen">
        <HeroSection />
        <SkillsGrid />
        <ProjectsSection />
        <PricingSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
