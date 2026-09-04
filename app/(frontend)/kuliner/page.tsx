import Link from "next/link";
import Image from "next/image";
import { getKulinerList } from "@/lib/dataService";
import { UtensilsCrossed, Clock, Star, MapPin, ArrowRight, DollarSign, Sparkles } from "lucide-react";

interface KulinerPageProps {
  searchParams: Promise<{ sub?: string }>;
}

function isPlaceOpenNow(jamBuka: string, jamTutup: string): boolean {
  try {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTotal = currentHour * 60 + currentMinute;

    const [bukaH, bukaM] = jamBuka.split(":").map(Number);
    const [tutupH, tutupM] = jamTutup.split(":").map(Number);

    const bukaTotal = bukaH * 60 + bukaM;
    const tutupTotal = tutupH * 60 + tutupM;

    return currentTotal >= bukaTotal && currentTotal <= tutupTotal;
  } catch (e) {
    return true;
  }
}

export default async function KulinerPage({ searchParams }: KulinerPageProps) {
  const { sub } = await searchParams;
  const allKuliner = await getKulinerList();

  const activeSub = sub || "all";
  const filtered =
    activeSub === "all"
      ? allKuliner
      : activeSub === "open-now"
      ? allKuliner.filter((k) => isPlaceOpenNow(k.jamBuka, k.jamTutup))
      : allKuliner.filter((k) => k.subKategori === activeSub);

  const subCategoryOptions = [
    { label: "Semua Kuliner", value: "all" },
    { label: "Open Now", value: "open-now" },
    { label: "Wajib Coba", value: "wajib-coba" },
    { label: "Cafe & Resto Recommended", value: "cafe-resto" },
  ];

  return (
    <main className="min-h-screen bg-[#fafaf8] text-stone-900 pt-28 sm:pt-36 pb-20 px-4 sm:px-8 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section: Taste & Hospitality Focus */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 pb-8">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 text-xs font-bold uppercase tracking-wider">
              <UtensilsCrossed className="w-3.5 h-3.5 text-amber-700" />
              <span>Kuliner & Kafe Cijeruk</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold text-stone-900 tracking-tight leading-tight">
              Cita Rasa Tradisional Sunda & Kopi Lereng Salak
            </h1>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Nikmati hangatnya nasi liwet kastrol bertabur ikan asin peda, hidangan gurame segar dari kolam mata air pegunungan, hingga racikan kopi Robusta single origin lokal.
            </p>
          </div>

          {/* Sub-category Filter Tabs */}
          <div className="flex flex-wrap gap-2 shrink-0">
            {subCategoryOptions.map((opt) => {
              const isActive = activeSub === opt.value;
              return (
                <Link
                  key={opt.value}
                  href={opt.value === "all" ? "/kuliner" : `/kuliner?sub=${opt.value}`}
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

        {/* Food-Centric Cards Grid with Live Status & Price Ranges */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-2xl border border-stone-200">
            <p className="text-stone-500 font-medium">Tidak ada tempat kuliner pada pilihan filter ini.</p>
            <Link
              href="/kuliner"
              className="mt-3 inline-block text-xs font-semibold text-[#2d5026] hover:underline"
            >
              Lihat Semua Kuliner
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filtered.map((item) => {
              const isOpen = isPlaceOpenNow(item.jamBuka, item.jamTutup);

              return (
                <Link
                  key={item.id}
                  href={`/kuliner/${item.slug}`}
                  className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-stone-300 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  {/* Image with Open/Close status badge & Price Range */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
                    <Image
                      src={item.coverImage}
                      alt={item.judul}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70 group-hover:opacity-85 transition-opacity" />

                    {/* LIVE Status Badge (Open / Closed) */}
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm ${
                          isOpen
                            ? "bg-emerald-600 text-white"
                            : "bg-rose-600 text-white"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        <span>{isOpen ? "Buka Sekarang" : "Sedang Tutup"}</span>
                      </span>
                    </div>

                    {/* Price Range Badge on Top Right */}
                    <div className="absolute top-3.5 right-3.5">
                      <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-medium">
                        {item.hargaKisaran}
                      </span>
                    </div>

                    {/* Operating hours text on image bottom */}
                    <div className="absolute bottom-3 left-3.5 right-3.5 text-white flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-white/90">
                        <Clock className="w-3.5 h-3.5 text-amber-300" />
                        <span>
                          {item.jamBuka} - {item.jamTutup} WIB
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-300 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-300" />
                        <span>{item.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="text-[11px] font-bold text-[#2d5026] uppercase tracking-wider">
                        {item.subKategoriLabel}
                      </div>
                      <h2 className="text-xl font-serif-title font-bold text-stone-900 group-hover:text-[#2d5026] transition-colors line-clamp-1">
                        {item.judul}
                      </h2>
                      <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed">
                        {item.deskripsi}
                      </p>
                    </div>

                    {/* Recommended Dishes Preview Chips */}
                    {item.menuFavorit.length > 0 && (
                      <div className="pt-2 border-t border-stone-100 space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                          Menu Rekomendasi
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {item.menuFavorit.slice(0, 2).map((m, idx) => (
                            <span
                              key={idx}
                              className="text-[11px] bg-amber-50 text-amber-900 px-2.5 py-0.5 rounded-md border border-amber-200/60 font-medium truncate max-w-[220px]"
                            >
                              🍲 {m.namaMenu}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Location & Action */}
                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                      <div className="flex items-center gap-1 truncate max-w-[180px]">
                        <MapPin className="w-3.5 h-3.5 text-[#2d5026] shrink-0" />
                        <span className="truncate">{item.lokasi.namaTempat}</span>
                      </div>
                      <span className="font-semibold text-[#2d5026] flex items-center gap-1 shrink-0">
                        Detail Menu
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
