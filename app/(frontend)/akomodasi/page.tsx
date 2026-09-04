import Link from "next/link";
import Image from "next/image";
import { getAkomodasiList } from "@/lib/dataService";
import { Bed, Users, Star, MapPin, ArrowRight, MessageCircle, Check } from "lucide-react";

interface AkomodasiPageProps {
  searchParams: Promise<{ sub?: string }>;
}

export default async function AkomodasiPage({ searchParams }: AkomodasiPageProps) {
  const { sub } = await searchParams;
  const allAkomodasi = await getAkomodasiList();

  const activeSub = sub || "all";
  const filtered =
    activeSub === "all"
      ? allAkomodasi
      : allAkomodasi.filter((item) => item.subKategori === activeSub);

  const subCategoryOptions = [
    { label: "Semua Penginapan", value: "all" },
    { label: "Villa & Resort", value: "villa-resort" },
    { label: "Camping Ground", value: "camping-ground" },
  ];

  return (
    <main className="min-h-screen bg-[#fafaf8] text-stone-900 pt-28 sm:pt-36 pb-20 px-4 sm:px-8 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 pb-8">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-800 text-xs font-bold uppercase tracking-wider">
              <Bed className="w-3.5 h-3.5 text-blue-700" />
              <span>Akomodasi & Penginapan Cijeruk</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold text-stone-900 tracking-tight leading-tight">
              Villa Eksklusif & Camping Ground Kaki Gunung Salak
            </h1>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Temukan tempat peristirahatan sempurna: villa private pool berlatar panorama Gunung Salak untuk keluarga, atau tenda dome perkemahan sejuk di atas awan.
            </p>
          </div>

          {/* Sub-category Filter Tabs */}
          <div className="flex flex-wrap gap-2 shrink-0">
            {subCategoryOptions.map((opt) => {
              const isActive = activeSub === opt.value;
              return (
                <Link
                  key={opt.value}
                  href={opt.value === "all" ? "/akomodasi" : `/akomodasi?sub=${opt.value}`}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
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

        {/* Accommodation Cards Grid */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-2xl border border-stone-200">
            <p className="text-stone-500 font-medium">Tidak ada akomodasi pada sub-kategori ini.</p>
            <Link
              href="/akomodasi"
              className="mt-3 inline-block text-xs font-semibold text-[#2d5026] hover:underline"
            >
              Lihat Semua Penginapan
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-stone-300 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Image Container with Capacity & Price Badges */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
                  <Image
                    src={item.coverImage}
                    alt={item.judul}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  {/* Sub-category Badge */}
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-blue-900 text-[11px] font-bold uppercase tracking-wider shadow-sm">
                      {item.subKategoriLabel}
                    </span>
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-3.5 right-3.5 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                    <span>{item.rating}</span>
                  </div>

                  {/* Bottom Image Overlay: Capacity */}
                  <div className="absolute bottom-3 left-3.5 right-3.5 text-white flex items-center justify-between text-xs">
                    <span className="inline-flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-md">
                      <Users className="w-3.5 h-3.5 text-blue-300" />
                      <span>{item.kapasitas}</span>
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-[#2d5026]">{item.hargaPerMalam}</div>
                    <Link href={`/akomodasi/${item.slug}`}>
                      <h2 className="text-xl font-serif-title font-bold text-stone-900 group-hover:text-[#2d5026] transition-colors line-clamp-1">
                        {item.judul}
                      </h2>
                    </Link>
                    <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed">
                      {item.deskripsi}
                    </p>
                  </div>

                  {/* Key Amenities */}
                  {item.fasilitas.length > 0 && (
                    <div className="pt-2 border-t border-stone-100 flex flex-wrap gap-1">
                      {item.fasilitas.slice(0, 3).map((f, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 text-[11px] text-stone-600 bg-stone-100 px-2 py-0.5 rounded"
                        >
                          <Check className="w-3 h-3 text-[#2d5026]" />
                          <span>{f}</span>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons: WhatsApp Booking & Detail Link */}
                  <div className="pt-3 border-t border-stone-100 flex items-center gap-2">
                    {item.kontakBooking.whatsapp && (
                      <a
                        href={`https://wa.me/${item.kontakBooking.whatsapp}?text=${encodeURIComponent(
                          `Halo, saya ingin menanyakan reservasi ${item.judul} Cijeruk.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition shrink-0"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Chat WA</span>
                      </a>
                    )}
                    <Link
                      href={`/akomodasi/${item.slug}`}
                      className="flex-1 inline-flex items-center justify-center gap-1 py-2 px-3 rounded-lg bg-stone-100 hover:bg-[#2d5026] text-stone-800 hover:text-white text-xs font-semibold transition"
                    >
                      <span>Lihat Detail</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
