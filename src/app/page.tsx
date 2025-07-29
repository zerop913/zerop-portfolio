import { Header, Footer } from "@/components/layout";
import { 
  HeroSection, 
  SkillsGrid, 
  ProjectsSection, 
  FaqSection, 
  PricingSection, 
  ContactSection 
} from "@/components/sections";

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
