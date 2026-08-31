"use client";

import { useState, useMemo } from "react";
import { VILLAGE_NEWS, NewsItem } from "@/data/news";
import { Newspaper, Calendar, User, Clock, ArrowLeft, ArrowRight, Tag, Search, X } from "lucide-react";
import Link from "next/link";

export default function BeritaPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeNewsModal, setActiveNewsModal] = useState<NewsItem | null>(null);

  const categories = ["all", "Pemerintahan", "Pembangunan", "Pertanian", "Pariwisata", "Sosial"];

  const filteredNews = useMemo(() => {
    return VILLAGE_NEWS.filter((item) => {
      const matchCategory = selectedCategory === "all" || item.category === selectedCategory;
      const matchSearch =
        searchQuery.trim() === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <main className="min-h-screen bg-[#fafaf8] text-stone-900 pt-28 pb-20 px-4 sm:px-8 md:px-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center text-xs font-semibold text-stone-500 hover:text-[#2d5026] transition"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Kembali ke Beranda
        </Link>

        {/* Page Header */}
        <div className="border-b border-stone-200 pb-6">
          <div className="flex items-center gap-2 text-[#2d5026] text-xs font-bold uppercase tracking-wider mb-1">
            <Newspaper className="w-4 h-4" />
            Warta & Kabar Resmi Desa
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif-title font-semibold text-stone-900 tracking-tight">
            Berita & Pengumuman Desa Cijeruk
          </h1>
          <p className="text-sm text-stone-600 max-w-3xl mt-1.5 leading-relaxed">
            Informasi terkini seputar kegiatan pemerintahan desa, pembangunan infrastruktur, perkembangan pertanian nanas madu & kopi, agenda budaya, serta pelayanan warga Desa Cijeruk.
          </p>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-md text-xs font-medium capitalize transition cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#2d5026] text-white font-semibold shadow-xs"
                    : "bg-white hover:bg-stone-100 text-stone-700 border border-stone-200"
                }`}
              >
                {cat === "all" ? "Semua Kategori" : cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Cari warta desa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-1.5 text-xs rounded-md bg-white border border-stone-200 text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#2d5026]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {filteredNews.map((item) => (
            <article
              key={item.id}
              onClick={() => setActiveNewsModal(item)}
              className="group rounded-xl bg-white border border-stone-200 hover:border-[#2d5026]/40 hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/9] w-full overflow-hidden bg-stone-100 relative">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {item.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded bg-[#2d5026] text-white text-[11px] font-semibold shadow-xs">
                      {item.badge}
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-stone-200 text-[11px]">
                    {item.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-4 text-xs text-stone-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#2d5026]" />
                      {item.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#2d5026]" />
                      {item.readTime}
                    </span>
                  </div>

                  <h2 className="text-lg font-serif-title font-semibold text-stone-900 group-hover:text-[#2d5026] transition-colors leading-snug">
                    {item.title}
                  </h2>

                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                    {item.summary}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-5 pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span className="flex items-center gap-1.5 font-medium">
                  <User className="w-3.5 h-3.5 text-stone-400" />
                  {item.author}
                </span>
                <span className="text-[#2d5026] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Baca Selengkapnya <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="py-16 text-center text-stone-500 space-y-2">
            <p className="text-base font-serif-title">Tidak ada berita yang sesuai dengan filter.</p>
            <p className="text-xs text-stone-400">Coba gunakan kata kunci lain atau reset filter kategori.</p>
          </div>
        )}
      </div>

      {/* News Detail Modal */}
      {activeNewsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
          <div
            className="relative w-full max-w-2xl bg-white rounded-xl border border-stone-200 shadow-2xl overflow-hidden text-stone-800 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveNewsModal(null)}
              className="absolute top-4 right-4 z-20 p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="overflow-y-auto flex-1 scrollbar-hide">
              <div className="aspect-[21/9] w-full bg-stone-100 relative">
                <img
                  src={activeNewsModal.coverImage}
                  alt={activeNewsModal.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500">
                  <span className="px-2.5 py-0.5 rounded bg-[#2d5026]/10 text-[#2d5026] font-semibold">
                    {activeNewsModal.category}
                  </span>
                  <span>{activeNewsModal.date}</span>
                  <span>•</span>
                  <span>{activeNewsModal.author}</span>
                  <span>•</span>
                  <span>{activeNewsModal.readTime}</span>
                </div>

                <h2 className="text-2xl font-serif-title font-semibold text-stone-900 leading-tight">
                  {activeNewsModal.title}
                </h2>

                <div className="text-sm text-stone-700 leading-relaxed space-y-4 pt-2 border-t border-stone-100">
                  <p className="font-medium text-stone-800 leading-relaxed">{activeNewsModal.summary}</p>
                  <p>{activeNewsModal.content}</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setActiveNewsModal(null)}
                className="px-4 py-2 rounded-md bg-stone-800 hover:bg-stone-900 text-white text-xs font-medium transition"
              >
                Tutup Berita
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
