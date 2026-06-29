import { Header } from "@/components/homePage/Header";
import { HeroSection } from "@/components/homePage/HeroSection";
import { ConstituencySection } from "@/components/homePage/ConstituencySection";
import { AboutSection } from "@/components/homePage/AboutSection";
import { WorkAreasSection } from "@/components/homePage/WorkAreasSection";
import { VideosSection } from "@/components/homePage/VideosSection";
import { NewsSection } from "@/components/homePage/NewsSection";
import { AchievementsSection } from "@/components/homePage/AchievementsSection";
import { ContactSection } from "@/components/homePage/ContactSection";
import { Footer } from "@/components/homePage/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <HeroSection />
      <ConstituencySection />
      <VideosSection />
      <WorkAreasSection />
      <AboutSection />
      <NewsSection />
      <AchievementsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
