"use client";

import { useState, useMemo } from "react";
import { Search, X, MapPin, Star, ArrowRight } from "lucide-react";
import { DESTINATIONS } from "@/data/destinations";
import { DestinationItem } from "@/lib/types";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDestination: (dest: DestinationItem) => void;
}

export function SearchModal({ isOpen, onClose, onSelectDestination }: SearchModalProps) {
  const [query, setQuery] = useState("");

  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return DESTINATIONS.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.tagline.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.subCategory.toLowerCase().includes(q) ||
        item.location.area.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white border border-stone-200 rounded-xl shadow-2xl overflow-hidden text-stone-800">
        {/* Search Input Box */}
        <div className="flex items-center px-4 py-3.5 border-b border-stone-200 bg-stone-50">
          <Search className="w-5 h-5 text-stone-400 mr-3 shrink-0" />
          <input
            type="text"
            placeholder="Cari wisata, villa, kopi, curug, atau kuliner Cijeruk..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-stone-900 placeholder-stone-400 focus:outline-none text-base sm:text-lg"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200 mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-medium text-stone-600 hover:text-stone-900 bg-stone-200 hover:bg-stone-300 rounded transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          {query.trim() === "" ? (
            <div className="py-8 text-center text-stone-500 space-y-3">
              <p className="text-sm">Ketik kata kunci untuk mencari destinasi di Cijeruk.</p>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {["Bukit Alesano", "Curug Putri Pelangi", "Villa Salak", "Kopi Cijeruk", "Danau Lido", "Nanas Madu"].map(
                  (suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setQuery(suggestion)}
                      className="px-3 py-1 text-xs rounded-full bg-stone-100 text-stone-700 hover:bg-[#2d5026] hover:text-white transition"
                    >
                      {suggestion}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : filteredResults.length === 0 ? (
            <div className="py-12 text-center text-stone-500">
              <p className="text-base font-medium">Tidak ada hasil ditemukan untuk &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-stone-400 mt-1">Coba cari kata kunci lain seperti &quot;villa&quot;, &quot;curug&quot;, atau &quot;kopi&quot;.</p>
            </div>
          ) : (
            filteredResults.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectDestination(item);
                  onClose();
                }}
                className="group flex items-center justify-between p-3 rounded-lg bg-stone-50 hover:bg-stone-100 border border-stone-200 hover:border-[#2d5026]/40 transition cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-14 h-14 rounded-md object-cover shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-stone-900 group-hover:text-[#2d5026] transition">
                        {item.title}
                      </h4>
                      {item.badge && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#2d5026]/10 text-[#2d5026] font-medium">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">{item.tagline}</p>
                    <div className="flex items-center gap-3 mt-1 text-[11px] text-stone-500">
                      <span className="flex items-center text-amber-600 font-medium">
                        <Star className="w-3 h-3 fill-current mr-1 text-amber-500" />
                        {item.rating}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1 text-stone-400" />
                        {item.location.area}
                      </span>
                      <span className="text-[#2d5026] font-medium">{item.priceRange}</span>
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#2d5026] group-hover:translate-x-1 transition" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
