import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getKulinerBySlug, getRekomendasiTempat } from "@/lib/dataService";
import {
  ArrowLeft,
  MapPin,
  Clock,
  DollarSign,
  Star,
  UtensilsCrossed,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface KulinerDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function KulinerDetailPage({ params }: KulinerDetailPageProps) {
  const { slug } = await params;
  const kuliner = await getKulinerBySlug(slug);

  if (!kuliner) {
    notFound();
  }

  const recommendations = await getRekomendasiTempat("kuliner", kuliner.slug, 3);

  return (
    <main className="min-h-screen bg-[#fafaf8] text-stone-900 pt-28 sm:pt-36 pb-24 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Back Link */}
        <div>
          <Link
            href="/kuliner"
            className="inline-flex items-center gap-2 text-xs font-bold text-stone-500 hover:text-[#2d5026] transition py-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Semua Kuliner & Kafe</span>
          </Link>
        </div>

        {/* Hero Header */}
        <div className="relative aspect-[21/9] sm:aspect-[2.4/1] w-full rounded-3xl overflow-hidden shadow-xl bg-stone-100">
          <Image
            src={kuliner.coverImage}
            alt={kuliner.judul}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

          {/* Badges Over Image */}
          <div className="absolute top-5 left-5 flex flex-wrap items-center gap-2">
            <span className="px-3.5 py-1 rounded-full bg-amber-500 text-stone-900 text-xs font-bold uppercase tracking-wider shadow-sm">
              {kuliner.subKategoriLabel}
            </span>
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              <span>{kuliner.rating} / 5.0</span>
            </div>
          </div>

          {/* Title Over Image */}
          <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 text-white space-y-2">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif-title font-bold tracking-tight">
              {kuliner.judul}
            </h1>
            <p className="text-sm sm:text-base text-white/90 italic max-w-2xl">
              &ldquo;{kuliner.tagline}&rdquo;
            </p>
          </div>
        </div>

        {/* Two-Column Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 space-y-4 shadow-xs">
              <h2 className="text-xl font-serif-title font-bold text-stone-900 border-b border-stone-100 pb-3">
                Tentang Rumah Makan & Suasana
              </h2>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {kuliner.deskripsi}
              </p>
            </div>

            {/* Menu Rekomendasi / Wajib Coba */}
            {kuliner.menuFavorit.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 space-y-5 shadow-xs">
                <h2 className="text-xl font-serif-title font-bold text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2">
                  <UtensilsCrossed className="w-5 h-5 text-amber-600" />
                  <span>Menu Andalan & Rekomendasi</span>
                </h2>
                <div className="divide-y divide-stone-100">
                  {kuliner.menuFavorit.map((menu, idx) => (
                    <div
                      key={idx}
                      className="py-3.5 flex items-center justify-between gap-4 first:pt-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-xs shrink-0">
                          {idx + 1}
                        </span>
                        <div>
                          <h4 className="font-semibold text-stone-900 text-sm sm:text-base">
                            {menu.namaMenu}
                          </h4>
                          <span className="text-xs text-stone-400">Rekomendasi Wajib Pesan</span>
                        </div>
                      </div>
                      {menu.harga && (
                        <span className="text-xs sm:text-sm font-bold text-[#2d5026] bg-[#2d5026]/10 px-3 py-1 rounded-md shrink-0">
                          {menu.harga}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Info Card */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-5 sticky top-36">
              <h3 className="text-base font-bold text-stone-900 border-b border-stone-100 pb-3">
                Informasi Jam & Harga
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#2d5026] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                      Jam Operasional
                    </span>
                    <span className="font-bold text-stone-900">
                      {kuliner.jamBuka} - {kuliner.jamTutup} WIB
                    </span>
                    <span className="block text-xs text-stone-500 mt-0.5">Buka Setiap Hari</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <DollarSign className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                      Kisaran Harga
                    </span>
                    <span className="font-bold text-amber-800">{kuliner.hargaKisaran}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#2d5026] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                      Lokasi & Alamat
                    </span>
                    <span className="font-bold text-stone-900 block">{kuliner.lokasi.namaTempat}</span>
                    <span className="text-stone-600 block mt-0.5">{kuliner.lokasi.alamat}</span>
                    {kuliner.lokasi.latitude && (
                      <span className="text-[10px] text-stone-400 font-mono mt-1 block">
                        Koordinat: {kuliner.lokasi.latitude}, {kuliner.lokasi.longitude}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-100">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${kuliner.judul} ${kuliner.lokasi.namaTempat}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#2d5026] hover:bg-[#223e1d] text-white text-xs font-bold tracking-wide transition shadow-sm"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Buka di Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Rekomendasi Kuliner Lainnya */}
        {recommendations.length > 0 && (
          <section className="pt-12 border-t border-stone-200 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-serif-title font-bold text-stone-900">
                  Rekomendasi Kuliner Lainnya
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Eksplorasi tempat santap dan kedai kopi khas Cijeruk lainnya
                </p>
              </div>
              <Link
                href="/kuliner"
                className="text-xs font-bold text-[#2d5026] hover:underline flex items-center gap-1"
              >
                <span>Lihat Semua</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendations.map((rec) => (
                <Link
                  key={rec.id}
                  href={rec.href}
                  className="group bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-stone-300 shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
                    <Image
                      src={rec.coverImage}
                      alt={rec.judul}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/95 text-amber-800 text-[10px] font-bold uppercase tracking-wider">
                        {rec.subLabel}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 space-y-1.5">
                    <h4 className="font-serif-title font-bold text-stone-900 group-hover:text-[#2d5026] transition-colors truncate">
                      {rec.judul}
                    </h4>
                    <p className="text-xs text-stone-500">{rec.extraInfo}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
