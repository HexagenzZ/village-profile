"use client";

import { useEffect } from "react";
import {
  X,
  Star,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Globe,
  Share2,
  Bookmark,
  CheckCircle2,
  Navigation,
  Camera,
} from "lucide-react";
import { DestinationItem } from "@/lib/types";
import { useFavorites } from "@/hooks/useFavorites";

interface DetailModalProps {
  destination: DestinationItem | null;
  onClose: () => void;
}

export function DetailModal({ destination, onClose }: DetailModalProps) {
  const { isFavorite, toggleFavorite } = useFavorites();

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

  const isFav = isFavorite(destination.id);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: destination.title,
          text: destination.tagline,
          url: window.location.href,
        });
      } catch {
        // Share cancelled or not supported
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Tautan destinasi berhasil disalin ke clipboard!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div
        className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden text-neutral-200 my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-sm border border-neutral-700 transition"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Container */}
        <div className="overflow-y-auto">
          {/* Hero Banner Header */}
          <div className="relative h-64 sm:h-80 w-full overflow-hidden">
            <img
              src={destination.coverImage}
              alt={destination.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-black/30" />

            {/* Floating details on hero */}
            <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {destination.badge && (
                  <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-md bg-emerald-500 text-neutral-950 shadow-md">
                    {destination.badge}
                  </span>
                )}
                <span className="px-2.5 py-1 text-xs font-medium rounded-md bg-neutral-800/80 backdrop-blur-sm border border-neutral-700 text-neutral-300 capitalize">
                  {destination.subCategory}
                </span>
                {destination.isOutsideCijeruk && (
                  <span className="px-2.5 py-1 text-xs font-medium rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    Destinasi Sekitar Cijeruk
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-md">
                {destination.title}
              </h2>
              <p className="text-sm text-neutral-300 line-clamp-1 mt-1">{destination.tagline}</p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 mt-4">
                <a
                  href={destination.location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-sm transition shadow-lg shadow-emerald-950/50"
                >
                  <Navigation className="w-4 h-4 fill-current" />
                  Buka Rute Maps
                </a>

                {destination.contact.whatsapp && (
                  <a
                    href={`https://wa.me/${destination.contact.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-sm border border-neutral-700 transition"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    Hubungi WhatsApp
                  </a>
                )}

                <button
                  onClick={() => toggleFavorite(destination.id)}
                  className={`p-2.5 rounded-xl border transition ${
                    isFav
                      ? "bg-rose-600/20 border-rose-500 text-rose-400"
                      : "bg-neutral-800/80 border-neutral-700 text-neutral-300 hover:text-white"
                  }`}
                  title={isFav ? "Hapus dari Daftar Favorit" : "Simpan ke Daftar Favorit"}
                >
                  <Bookmark className={`w-4 h-4 ${isFav ? "fill-current" : ""}`} />
                </button>

                <button
                  onClick={handleShare}
                  className="p-2.5 rounded-xl bg-neutral-800/80 border border-neutral-700 text-neutral-300 hover:text-white transition"
                  title="Bagikan Destinasi"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Modal Body Content */}
          <div className="p-5 sm:p-7 space-y-6">
            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800 text-xs">
              <div>
                <span className="text-neutral-500 block">Rating & Ulasan</span>
                <span className="font-semibold text-white flex items-center mt-0.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" />
                  {destination.rating} / 5.0 ({destination.reviewCount} ulasan)
                </span>
              </div>
              <div>
                <span className="text-neutral-500 block">Estimasi Biaya</span>
                <span className="font-semibold text-emerald-400 mt-0.5 block">{destination.priceRange}</span>
              </div>
              <div>
                <span className="text-neutral-500 block">Jam Operasional</span>
                <span className="font-semibold text-white flex items-center mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-neutral-400 mr-1" />
                  {destination.openingHours}
                </span>
              </div>
              <div>
                <span className="text-neutral-500 block">Lokasi & Jarak</span>
                <span className="font-semibold text-white flex items-center mt-0.5 truncate">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400 mr-1 shrink-0" />
                  {destination.location.distanceFromCenter || destination.location.area}
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                Tentang Destinasi
              </h3>
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                {destination.description}
              </p>
            </div>

            {/* Highlights */}
            {destination.highlights && destination.highlights.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                  Daya Tarik Utama
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {destination.highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-2.5 p-2.5 rounded-lg bg-neutral-800/40 border border-neutral-800 text-xs sm:text-sm text-neutral-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Facilities */}
            {destination.facilities && destination.facilities.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                  Fasilitas yang Tersedia
                </h3>
                <div className="flex flex-wrap gap-2">
                  {destination.facilities.map((fac, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-neutral-800 text-neutral-300 text-xs border border-neutral-700"
                    >
                      {fac}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery Thumbnails */}
            {destination.gallery && destination.gallery.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                  Galeri Foto
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {destination.gallery.map((imgUrl, i) => (
                    <img
                      key={i}
                      src={imgUrl}
                      alt={`${destination.title} foto ${i + 1}`}
                      className="w-full h-28 sm:h-36 object-cover rounded-xl border border-neutral-800 hover:scale-105 transition-transform duration-300 cursor-pointer"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Contact & Socials Bar */}
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  Alamat Lengkap
                </h4>
                <p className="text-xs text-neutral-300 mt-1">{destination.location.address}</p>
              </div>

              <div className="flex items-center gap-2">
                {destination.contact.phone && (
                  <a
                    href={`tel:${destination.contact.phone}`}
                    className="p-2 rounded-lg bg-neutral-800 text-neutral-300 hover:text-white transition"
                    title="Telepon"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                )}
                {destination.contact.instagram && (
                  <a
                    href={`https://instagram.com/${destination.contact.instagram.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-neutral-800 text-neutral-300 hover:text-rose-400 transition"
                    title="Instagram"
                  >
                    <Camera className="w-4 h-4" />
                  </a>
                )}
                {destination.contact.website && (
                  <a
                    href={destination.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-neutral-800 text-neutral-300 hover:text-blue-400 transition"
                    title="Website Resmi"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
