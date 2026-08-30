"use client";

import { useState } from "react";
import { HeroSection } from "@/components/bibury/HeroSection";
import { IntroSection } from "@/components/bibury/IntroSection";
import { CategoryCards } from "@/components/bibury/CategoryCards";
import { FeatureStories } from "@/components/bibury/FeatureStories";
import { DidYouKnowBanner } from "@/components/bibury/DidYouKnowBanner";
import { DetailModal } from "@/components/bibury/BiburyDetailModal";
import { DestinationItem } from "@/lib/types";

export default function HomePage() {
  const [selectedDestination, setSelectedDestination] =
    useState<DestinationItem | null>(null);

  const handleExploreClick = () => {
    const el = document.getElementById("welcome-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-[#fafaf8] text-stone-900">
      {/* 1. Hero Section - Full width scenic with centered quote & Explore button */}
      <HeroSection onExploreClick={handleExploreClick} />

      {/* 2. Welcome Editorial Intro Section */}
      <IntroSection />

      {/* 3. Three-Column Category Navigation Cards */}
      <CategoryCards />

      {/* 4. Zig-Zag Editorial Feature Stories (Bukit Alesano & Stay in Cijeruk) */}
      <FeatureStories />

      {/* 5. Dark "Cijeruk facts - Did you know?" Callout Banner */}
      <DidYouKnowBanner />

      {/* Interactive Detail Modal */}
      <DetailModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
      />
    </main>
  );
}

