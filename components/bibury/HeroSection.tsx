"use client";

import { ChevronDown } from "lucide-react";

interface HeroSectionProps {
  onExploreClick?: () => void;
}

export function HeroSection({ onExploreClick }: HeroSectionProps) {
  const handleScrollToContent = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      const el = document.getElementById("welcome-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section className="relative w-full h-[88vh] sm:h-[92vh] min-h-[620px] pt-24 sm:pt-28 flex items-center justify-center overflow-hidden">
      {/* Background Scenic Photography */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85"
          alt="Pemandangan Asri Desa Cijeruk Gunung Salak"
          className="w-full h-full object-cover object-center transform scale-105 animate-subtle-zoom"
        />
        {/* Natural Vignette & Soft Gradient Overlay */}
        <div className="absolute inset-0 bg-black/40 via-black/25 to-black/50" />
      </div>

      {/* Hero Center Content - Exactly Bibury Style */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center text-white space-y-6 animate-fadeIn">
        {/* Main Title */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif-title tracking-tight font-normal text-white drop-shadow-md">
          Cijeruk
        </h1>

        {/* Subtitle Tagline Quote */}
        <p className="text-lg sm:text-xl md:text-2xl font-light italic text-stone-100 max-w-2xl mx-auto drop-shadow leading-relaxed">
          &ldquo;Pesona alam asri dan ketenangan di kaki Gunung Salak&rdquo;
        </p>

        {/* Explore Button */}
        <div className="pt-2">
          <button
            onClick={handleScrollToContent}
            className="inline-flex items-center justify-center px-8 py-3 rounded-md bg-[#2d5026] hover:bg-[#223e1d] text-white font-medium text-sm sm:text-base tracking-wide shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
          >
            Explore Cijeruk
          </button>
        </div>
      </div>

      {/* Subtle Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white/70 animate-bounce">
        <button
          onClick={handleScrollToContent}
          className="p-1 text-white/80 hover:text-white transition"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
