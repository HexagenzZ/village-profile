"use client";

import { useState, useEffect } from "react";
import { Play, Info, Star, MapPin, Sparkles, Navigation } from "lucide-react";
import { DestinationItem } from "@/lib/types";

interface HeroBillboardProps {
  featuredItems: DestinationItem[];
  onOpenDetail: (dest: DestinationItem) => void;
}

export function HeroBillboard({ featuredItems, onOpenDetail }: HeroBillboardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate hero spot every 8 seconds if user doesn't interact
  useEffect(() => {
    if (featuredItems.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredItems.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [featuredItems.length]);

  const current = featuredItems[currentIndex] || featuredItems[0];
  if (!current) return null;

  return (
    <div className="relative w-full h-[80vh] min-h-[580px] max-h-[850px] overflow-hidden select-none bg-neutral-950">
      {/* Background Hero Image with Fade Transition */}
      <div className="absolute inset-0">
        <img
          key={current.id}
          src={current.coverImage}
          alt={current.title}
          className="w-full h-full object-cover object-center animate-fadeIn duration-1000 scale-105 transition-transform duration-[10000ms] hover:scale-100"
        />

        {/* Netflix Gradients (Top, Left, Bottom) */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-neutral-950/50 to-transparent sm:w-3/4" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent h-32" />
      </div>

      {/* Hero Content Information */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-16 sm:pb-24 px-4 sm:px-8 md:px-12 max-w-4xl">
        <div className="space-y-4">
          {/* Top Badge */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/90 text-neutral-950 text-xs font-extrabold uppercase tracking-wider shadow-lg">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              Rekomendasi Utama Desa Cijeruk
            </span>
            <span className="px-3 py-1 rounded-full bg-black/60 text-white border border-neutral-700 text-xs font-medium backdrop-blur-md">
              {current.subCategory}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-none drop-shadow-xl">
            {current.title}
          </h1>

          {/* Quick Metrics */}
          <div className="flex items-center gap-4 text-xs sm:text-sm text-neutral-300">
            <span className="flex items-center gap-1 font-bold text-amber-400">
              <Star className="w-4 h-4 fill-current" />
              {current.rating} ({current.reviewCount} ulasan)
            </span>
            <span className="w-1 h-1 rounded-full bg-neutral-600" />
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-emerald-400" />
              {current.location.area}
            </span>
            <span className="w-1 h-1 rounded-full bg-neutral-600" />
            <span className="text-emerald-400 font-semibold">{current.priceRange}</span>
          </div>

          {/* Tagline / Description */}
          <p className="text-sm sm:text-base text-neutral-300 line-clamp-2 sm:line-clamp-3 max-w-2xl leading-relaxed drop-shadow">
            {current.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onOpenDetail(current)}
              className="flex items-center gap-2.5 px-6 sm:px-8 py-3 rounded-xl bg-white hover:bg-neutral-200 text-neutral-950 font-bold text-sm sm:text-base transition-all duration-200 shadow-xl hover:scale-105 cursor-pointer"
            >
              <Play className="w-5 h-5 fill-current" />
              Jelajahi Sekarang
            </button>

            <a
              href={current.location.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-neutral-800/80 hover:bg-neutral-700/90 text-white font-semibold text-sm sm:text-base border border-neutral-700 backdrop-blur-md transition-all duration-200 hover:scale-105"
            >
              <Navigation className="w-4 h-4 text-emerald-400" />
              Petunjuk Arah
            </a>

            <button
              onClick={() => onOpenDetail(current)}
              className="p-3 rounded-xl bg-neutral-800/60 hover:bg-neutral-700/80 text-neutral-300 hover:text-white border border-neutral-700 backdrop-blur-md transition"
              title="Informasi Lengkap"
            >
              <Info className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Slide Indicators for Carousel Billboard */}
      {featuredItems.length > 1 && (
        <div className="absolute right-4 sm:right-12 bottom-12 z-20 flex items-center space-x-2">
          {featuredItems.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex ? "w-8 bg-emerald-400" : "w-3 bg-neutral-600 hover:bg-neutral-400"
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
