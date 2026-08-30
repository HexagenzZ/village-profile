"use client";

import { useEffect } from "react";
import {
  X,
  Star,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Share2,
  CheckCircle2,
  Navigation,
} from "lucide-react";
import { DestinationItem } from "@/lib/types";

interface DetailModalProps {
  destination: DestinationItem | null;
  onClose: () => void;
}

export function DetailModal({ destination, onClose }: DetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (destination) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [destination, onClose]);

  if (!destination) return null;

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: destination.title,
          text: destination.tagline,
          url: window.location.href,
        });
      } catch {
        // cancelled
      }
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert("Tautan destinasi berhasil disalin ke clipboard!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div
        className="relative w-full max-w-3xl bg-white border border-stone-200 rounded-xl shadow-2xl overflow-hidden text-stone-800 my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-colors"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto overflow-x-hidden flex-1 scrollbar-hide">
          {/* Cover Image Header */}
          <div className="relative aspect-video sm:aspect-[21/9] w-full overflow-hidden bg-stone-100">
            <img
              src={destination.coverImage}
              alt={destination.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <span className="px-3 py-1 text-xs font-semibold rounded bg-[#2d5026] text-white shadow">
                {destination.subCategory}
              </span>
              <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded text-stone-900 text-xs font-bold shadow-sm">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{destination.rating}</span>
                <span className="text-stone-400 font-normal">({destination.reviewCount})</span>
              </div>
            </div>
          </div>

          {/* Details Body */}
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif-title font-semibold text-stone-900">
                {destination.title}
              </h2>
              <p className="text-sm text-stone-600 italic mt-1">{destination.tagline}</p>
            </div>

            {/* Quick Badges Row */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-3 py-1 rounded bg-stone-100 text-stone-700 font-medium">
                💰 {destination.priceRange}
              </span>
              <span className="px-3 py-1 rounded bg-stone-100 text-stone-700 font-medium">
                🕒 {destination.openingHours}
              </span>
            </div>

            {/* Description */}
            <div className="text-sm text-stone-700 leading-relaxed">
              <p>{destination.description}</p>
            </div>

            {/* Highlights */}
            {destination.highlights && destination.highlights.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  Daya Tarik Utama
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600">
                  {destination.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2d5026] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Facilities */}
            {destination.facilities && destination.facilities.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  Fasilitas Tersedia
                </h4>
                <div className="flex flex-wrap gap-1.5 text-xs">
                  {destination.facilities.map((fac, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded bg-stone-100 text-stone-700 border border-stone-200"
                    >
                      {fac}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Photo Gallery */}
            {destination.gallery && destination.gallery.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  Galeri Foto
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {destination.gallery.map((img, i) => (
                    <div
                      key={i}
                      className="aspect-video rounded overflow-hidden bg-stone-100 border border-stone-200"
                    >
                      <img
                        src={img}
                        alt={`${destination.title} ${i + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location & Map */}
            <div className="p-4 rounded-lg bg-[#f6f5f0] border border-stone-200 text-xs space-y-2">
              <div className="flex items-start gap-2 text-stone-800 font-medium">
                <MapPin className="w-4 h-4 text-[#2d5026] shrink-0 mt-0.5" />
                <span>{destination.location.address}</span>
              </div>
              <p className="text-stone-500 pl-6">{destination.location.distanceFromCenter}</p>
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-4 py-2 rounded-md bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-medium transition"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Bagikan</span>
          </button>

          <div className="flex items-center gap-2">
            {destination.location.mapsUrl && (
              <a
                href={destination.location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-md bg-stone-800 hover:bg-stone-900 text-white text-xs font-medium transition"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Buka Google Maps</span>
              </a>
            )}

            {destination.contact?.whatsapp && (
              <a
                href={`https://wa.me/${destination.contact.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-5 py-2 rounded-md bg-[#2d5026] hover:bg-[#223e1d] text-white text-xs font-semibold tracking-wide shadow transition"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Reservasi / Tanya Info</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
