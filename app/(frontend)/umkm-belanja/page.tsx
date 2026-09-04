"use client";

import { useState, useMemo } from "react";
import { DESTINATIONS } from "@/data/destinations";
import { DestinationItem } from "@/lib/types";
import { DetailModal } from "@/components/bibury/BiburyDetailModal";
import { Star, MapPin, ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function UmkmPage() {
  const [selectedDestination, setSelectedDestination] = useState<DestinationItem | null>(null);

  const umkmList = useMemo(() => {
    return DESTINATIONS.filter((d) => d.category === "umkm");
  }, []);

  return (
    <main className="min-h-screen bg-[#fafaf8] text-stone-900 pt-32 pb-20 px-4 sm:px-8 md:px-12">
      <div className="max-w-7xl mx-auto space-y-6">
        <Link
          href="/"
          className="inline-flex items-center text-xs font-semibold text-stone-500 hover:text-[#2d5026] transition"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Kembali ke Beranda
        </Link>

        <div className="border-b border-stone-200 pb-6">
          <div className="flex items-center gap-2 text-[#2d5026] text-xs font-bold uppercase tracking-wider mb-1">
            <ShoppingBag className="w-4 h-4" />
            Produk Lokal & Oleh-Oleh
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif-title font-semibold text-stone-900 tracking-tight">
            UMKM & Oleh-Oleh Khas Cijeruk
          </h1>
          <p className="text-sm text-stone-600 max-w-3xl mt-1.5 leading-relaxed">
            Dukung ekonomi petani dan pengrajin lokal warga Desa Cijeruk. Bawa pulang oleh-oleh khas hasil perkebunan lereng Gunung Salak: Kopi Cijeruk harum, Nanas Madu manis segar, dan kerajinan anyaman bambu bernilai seni tinggi.
          </p>
        </div>

        {/* Grid List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {umkmList.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedDestination(item)}
              className="group rounded-lg bg-white border border-stone-200 hover:border-[#2d5026]/50 hover:shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <div className="aspect-[16/10] relative overflow-hidden bg-stone-100">
                <img
                  src={item.coverImage}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                {item.badge && (
                  <span className="absolute top-3 left-3 px-2 py-0.5 text-xs font-semibold rounded bg-[#2d5026] text-white shadow">
                    {item.badge}
                  </span>
                )}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <span className="flex items-center gap-1 font-bold text-amber-300 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {item.rating}
                  </span>
                  <span className="bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm text-stone-200 font-medium">
                    {item.priceRange}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-[#2d5026] uppercase tracking-wider block mb-1">
                    {item.subCategory}
                  </span>
                  <h3 className="text-lg font-serif-title font-semibold text-stone-900 group-hover:text-[#2d5026] transition">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-2 mt-1 leading-relaxed">
                    {item.tagline}
                  </p>
                </div>

                <div className="flex items-center text-xs text-stone-500 pt-3 border-t border-stone-100">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 mr-1.5 shrink-0" />
                  <span className="truncate">{item.location.address}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <DetailModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
      />
    </main>
  );
}
