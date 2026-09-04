"use client";

import { useState, useMemo } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import { searchAllItems } from "@/lib/searchService";
import { SearchResultItem } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    return searchAllItems(query);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-stone-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white border border-stone-200 rounded-2xl shadow-2xl overflow-hidden text-stone-800">
        {/* Search Input Box */}
        <div className="flex items-center px-4 sm:px-5 py-4 border-b border-stone-200 bg-stone-50/80">
          <Search className="w-5 h-5 text-[#2d5026] mr-3 shrink-0" />
          <input
            type="text"
            placeholder="Cari curug, villa, saung liwet, sejarah, tokoh Cijeruk..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-stone-900 placeholder-stone-400 focus:outline-none text-base sm:text-lg font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200 mr-2"
              aria-label="Bersihkan pencarian"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-stone-200/80 hover:bg-stone-300/80 rounded-md transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Search Results / Suggestions */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          {query.trim() === "" ? (
            <div className="py-8 text-center text-stone-400">
              <Search className="w-10 h-10 mx-auto text-stone-300 mb-2" />
              <p className="text-sm font-medium text-stone-600">Pencarian Cepat Wisata Cijeruk</p>
              <p className="text-xs text-stone-400 mt-1 max-w-sm mx-auto">
                Ketik nama destinasi wisata alam, saung liwet, kafe kopi, villa lereng Salak, atau cerita sejarah desa.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-1.5 mt-4">
                {["Bukit Alesano", "Curug", "Nasi Liwet", "Villa Salak", "Kopi Robusta", "Danau Lido"].map((chip) => (
                  <button
                    key={chip}
                    onClick={() => setQuery(chip)}
                    className="text-xs bg-stone-100 hover:bg-stone-200 text-stone-700 px-3 py-1 rounded-full transition cursor-pointer"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-10 text-center text-stone-500">
              <p className="text-sm font-medium">Tidak ada hasil yang cocok dengan &quot;{query}&quot;</p>
              <p className="text-xs text-stone-400 mt-1">Coba kata kunci umum seperti &quot;alam&quot;, &quot;kopi&quot;, &quot;villa&quot;, atau &quot;makan&quot;.</p>
            </div>
          ) : (
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 px-2 mb-1">
                Ditemukan {results.length} Hasil
              </div>
              {results.map((item: SearchResultItem) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-stone-50 transition border border-transparent hover:border-stone-200/80 group"
                >
                  {item.image && (
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-stone-100">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                        {item.categoryLabel}
                      </span>
                      {item.badge && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#2d5026]/10 text-[#2d5026] font-semibold">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-semibold text-stone-900 group-hover:text-[#2d5026] transition-colors truncate mt-0.5">
                      {item.title}
                    </h4>
                    <p className="text-xs text-stone-500 truncate mt-0.5">{item.subtitle}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#2d5026] group-hover:translate-x-1 transition-all shrink-0" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
