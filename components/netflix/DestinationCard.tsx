"use client";

import { Star, MapPin, Bookmark, ChevronRight } from "lucide-react";
import { DestinationItem } from "@/lib/types";
import { useFavorites } from "@/hooks/useFavorites";

interface DestinationCardProps {
  destination: DestinationItem;
  onSelect: (dest: DestinationItem) => void;
}

export function DestinationCard({ destination, onSelect }: DestinationCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(destination.id);

  return (
    <div
      onClick={() => onSelect(destination)}
      className="group relative flex-none w-[280px] sm:w-[320px] md:w-[360px] rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800/80 cursor-pointer select-none transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-emerald-950/40 hover:border-emerald-500/50 hover:z-20"
    >
      {/* Image Container with 16:9 Aspect Ratio */}
      <div className="relative aspect-video w-full overflow-hidden bg-neutral-800">
        <img
          src={destination.coverImage}
          alt={destination.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          {destination.badge ? (
            <span className="px-2 py-0.5 text-[11px] font-bold rounded-md bg-emerald-500 text-neutral-950 shadow-md backdrop-blur-sm">
              {destination.badge}
            </span>
          ) : (
            <span className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-neutral-900/80 text-neutral-300 border border-neutral-700/50 backdrop-blur-sm capitalize">
              {destination.subCategory}
            </span>
          )}

          {/* Bookmark button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(destination.id);
            }}
            className={`pointer-events-auto p-1.5 rounded-full transition ${
              isFav
                ? "bg-rose-600 text-white"
                : "bg-black/60 text-neutral-300 hover:text-white hover:bg-black/80"
            } backdrop-blur-sm`}
            title={isFav ? "Hapus dari Favorit" : "Simpan Favorit"}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isFav ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Rating & Area floating badge */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-xs text-neutral-300">
          <span className="flex items-center gap-1 font-semibold text-amber-400 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-sm">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            {destination.rating}
          </span>
          <span className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-sm text-[11px]">
            <MapPin className="w-3 h-3 text-neutral-400" />
            {destination.location.area}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-3.5 flex flex-col justify-between space-y-2">
        <div>
          <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
            {destination.title}
          </h3>
          <p className="text-xs text-neutral-400 line-clamp-1 mt-0.5">{destination.tagline}</p>
        </div>

        {/* Bottom info: Price range + View More arrow */}
        <div className="flex items-center justify-between pt-1 border-t border-neutral-800 text-xs">
          <span className="text-emerald-400 font-semibold">{destination.priceRange}</span>
          <span className="text-neutral-400 group-hover:text-emerald-400 font-medium flex items-center transition">
            Lihat Detail
            <ChevronRight className="w-3.5 h-3.5 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </div>
  );
}
