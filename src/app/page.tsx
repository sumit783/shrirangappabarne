"use client";

import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { InfoCard } from "@/components/site/InfoCard";
import { About } from "@/components/site/About";
import { VisionMission } from "@/components/site/VisionMission";
import { DevelopmentWorks } from "@/components/site/DevelopmentWorks";
import { Gallery } from "@/components/site/Gallery";
import { SocialMedia } from "@/components/site/SocialMedia";
import { News } from "@/components/site/News";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { Toaster } from "@/components/ui/sonner";

export default function Home() {
  return (
    <div className="bg-background">
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Shrirang Appa Barne",
            jobTitle: "Member of Parliament",
            affiliation: "Lok Sabha, Maval Constituency",
            url: "/",
            sameAs: ["https://instagram.com", "https://facebook.com", "https://twitter.com"],
          }),
        }}
      />
      <Navbar />
      <main>
        <Hero />
        <InfoCard />
        <About />
        <VisionMission />
        <DevelopmentWorks />
        {/* <Constituency /> */}
        <Gallery />
        <SocialMedia />
        <News />
        {/* <Books /> */}
        <Contact />
      </main>
      <Footer />
      <Toaster position="top-right" richColors />
    </div>
  );
}
