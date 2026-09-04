import Link from "next/link";
import Image from "next/image";
import { getWisataList } from "@/lib/dataService";
import { Mountain, MapPin, Star, ArrowRight, Sparkles } from "lucide-react";

interface WisataPageProps {
  searchParams: Promise<{ sub?: string }>;
}

export default async function WisataPage({ searchParams }: WisataPageProps) {
  const { sub } = await searchParams;
  const allWisata = await getWisataList();

  const activeSub = sub || "all";
  const filtered =
    activeSub === "all"
      ? allWisata
      : allWisata.filter((item) => item.subKategori === activeSub);

  const subCategoryOptions = [
    { label: "Semua Wisata", value: "all" },
    { label: "Jelajah Alam", value: "jelajah-alam" },
    { label: "Outdoor Activity", value: "outdoor-activity" },
    { label: "Aktivitas Keluarga & Anak", value: "aktivitas-keluarga" },
    { label: "Spot Foto & Instagrammable", value: "spot-foto" },
  ];

  return (
    <main className="min-h-screen bg-[#fafaf8] text-stone-900 pt-28 sm:pt-36 pb-20 px-4 sm:px-8 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section: Photo-Forward & Scenic */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 pb-8">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2d5026]/10 text-[#2d5026] text-xs font-bold uppercase tracking-wider">
              <Mountain className="w-3.5 h-3.5" />
              <span>Wisata & Rekreasi Cijeruk</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold text-stone-900 tracking-tight leading-tight">
              Eksplorasi Alam & Wahana Lereng Gunung Salak
            </h1>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Temukan kesegaran curug alami berair jernih, kebun kopi sejuk, agrowisata petik nanas madu, hingga perbukitan dengan pemandangan gemerlap city light Bogor.
            </p>
          </div>

          {/* Sub-category Filter Tabs */}
          <div className="flex flex-wrap gap-2 shrink-0">
            {subCategoryOptions.map((opt) => {
              const isActive = activeSub === opt.value;
              return (
                <Link
                  key={opt.value}
                  href={opt.value === "all" ? "/wisata" : `/wisata?sub=${opt.value}`}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-[#2d5026] text-white shadow-md shadow-[#2d5026]/20"
                      : "bg-white hover:bg-stone-100 text-stone-700 border border-stone-200"
                  }`}
                >
                  {opt.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Big Visual Grid: Photo-Forward Cards */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-2xl border border-stone-200">
            <p className="text-stone-500 font-medium">Tidak ada destinasi pada sub-kategori ini.</p>
            <Link
              href="/wisata"
              className="mt-3 inline-block text-xs font-semibold text-[#2d5026] hover:underline"
            >
              Tampilkan Semua Wisata
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filtered.map((item) => (
              <Link
                key={item.id}
                href={`/wisata/${item.slug}`}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-stone-300 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Image Container with Badge */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
                  <Image
                    src={item.coverImage}
                    alt={item.judul}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  {/* Sub-kategori Badge */}
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#2d5026] text-[11px] font-bold uppercase tracking-wider shadow-sm">
                      {item.subKategoriLabel}
                    </span>
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-3.5 right-3.5 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                    <span>{item.rating}</span>
                  </div>

                  {/* Bottom Image Overlay Tagline */}
                  <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                    <p className="text-xs text-white/90 line-clamp-1 font-medium italic">
                      &ldquo;{item.tagline}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h2 className="text-xl font-serif-title font-bold text-stone-900 group-hover:text-[#2d5026] transition-colors line-clamp-1">
                      {item.judul}
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed">
                      {item.deskripsi}
                    </p>
                  </div>

                  {/* Highlights Pill Tags */}
                  {item.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.highlights.slice(0, 2).map((hl, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 text-[11px] text-stone-600 bg-stone-100 px-2.5 py-0.5 rounded-md"
                        >
                          <Sparkles className="w-3 h-3 text-[#2d5026]" />
                          <span className="truncate max-w-[200px]">{hl}</span>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Footer Meta */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                    <div className="flex items-center gap-1 truncate max-w-[180px]">
                      <MapPin className="w-3.5 h-3.5 text-[#2d5026] shrink-0" />
                      <span className="truncate">{item.lokasi.namaTempat}</span>
                    </div>
                    <span className="font-semibold text-[#2d5026] flex items-center gap-1 shrink-0">
                      Lihat Detail
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
