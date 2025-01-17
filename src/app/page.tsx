import { Footer } from "@/components/landing/footer";
import { HeroSection } from "@/components/landing/hero-section";
import { MainContent } from "@/components/landing/main-content";
import { NavBar } from "@/components/landing/nav-bar";

export default function Landing() {

  return (
    <div className="flex flex-col">
      <NavBar />
      <HeroSection />
      <MainContent />
      <Footer />
    </div>
  )
}
