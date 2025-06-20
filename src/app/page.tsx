"use client";

import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import ClientLayout from "@/components/layout/ClientLayout";

export default function Home() {
  return (
    <ClientLayout>
      <div className="min-h-screen">
        <main>
          <Hero />
          <Projects />
          <FAQ />
          <Contact />
        </main>
        <Footer />
      </div>
    </ClientLayout>
  );
}
