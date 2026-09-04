import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getWisataBySlug, getRekomendasiTempat } from "@/lib/dataService";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Ticket,
  Star,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

interface WisataDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function WisataDetailPage({ params }: WisataDetailPageProps) {
  const { slug } = await params;
  const wisata = await getWisataBySlug(slug);

  if (!wisata) {
    notFound();
  }

  const recommendations = await getRekomendasiTempat("wisata", wisata.slug, 3);

  return (
    <main className="min-h-screen bg-[#fafaf8] text-stone-900 pt-28 sm:pt-36 pb-24 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Back Link */}
        <div>
          <Link
            href="/wisata"
            className="inline-flex items-center gap-2 text-xs font-bold text-stone-500 hover:text-[#2d5026] transition py-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Semua Wisata & Rekreasi</span>
          </Link>
        </div>

        {/* Hero Gallery Container */}
        <div className="space-y-4">
          <div className="relative aspect-[21/9] sm:aspect-[2.4/1] w-full rounded-3xl overflow-hidden shadow-xl bg-stone-100">
            <Image
              src={wisata.coverImage}
              alt={wisata.judul}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Badges Over Image */}
            <div className="absolute top-5 left-5 flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#2d5026] text-xs font-bold uppercase tracking-wider shadow-sm">
                {wisata.subKategoriLabel}
              </span>
              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                <span>{wisata.rating} / 5.0</span>
              </div>
            </div>

            {/* Title Over Image */}
            <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 text-white space-y-2">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif-title font-bold tracking-tight">
                {wisata.judul}
              </h1>
              <p className="text-sm sm:text-base text-white/90 italic max-w-2xl">
                &ldquo;{wisata.tagline}&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Editorial Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 space-y-4 shadow-xs">
              <h2 className="text-xl font-serif-title font-bold text-stone-900 border-b border-stone-100 pb-3">
                Tentang Destinasi
              </h2>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {wisata.deskripsi}
              </p>
            </div>

            {/* Daya Tarik Utama (Highlights) */}
            {wisata.highlights.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 space-y-4 shadow-xs">
                <h2 className="text-xl font-serif-title font-bold text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#2d5026]" />
                  <span>Daya Tarik Utama</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {wisata.highlights.map((hl, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-100 text-xs sm:text-sm text-stone-700 font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#2d5026] shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Fasilitas */}
            {wisata.fasilitas.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 space-y-4 shadow-xs">
                <h2 className="text-xl font-serif-title font-bold text-stone-900 border-b border-stone-100 pb-3">
                  Fasilitas yang Tersedia
                </h2>
                <div className="flex flex-wrap gap-2 pt-1">
                  {wisata.fasilitas.map((f, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-lg bg-[#2d5026]/10 text-[#2d5026] text-xs font-semibold"
                    >
                      ✓ {f}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Sidebar: Info Lokasi, Jam, Tiket */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-5 sticky top-36">
              <h3 className="text-base font-bold text-stone-900 border-b border-stone-100 pb-3">
                Informasi Kunjungan
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#2d5026] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                      Jam Operasional
                    </span>
                    <span className="font-semibold text-stone-800">{wisata.jamBuka}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Ticket className="w-4 h-4 text-[#2d5026] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                      Tiket Masuk
                    </span>
                    <span className="font-semibold text-stone-800">{wisata.hargaTiket}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#2d5026] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                      Lokasi & Alamat
                    </span>
                    <span className="font-bold text-stone-900 block">{wisata.lokasi.namaTempat}</span>
                    <span className="text-stone-600 block mt-0.5">{wisata.lokasi.alamat}</span>
                    {/* Lat/Long prepared in model without Leaflet */}
                    {wisata.lokasi.latitude && (
                      <span className="text-[10px] text-stone-400 font-mono mt-1 block">
                        Koordinat: {wisata.lokasi.latitude}, {wisata.lokasi.longitude}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-100">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${wisata.judul} ${wisata.lokasi.namaTempat}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#2d5026] hover:bg-[#223e1d] text-white text-xs font-bold tracking-wide transition shadow-sm"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Petunjuk Arah Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION OTOMATIS: REKOMENDASI TEMPAT LAINNYA                              */}
        {/* ========================================================================= */}
        {recommendations.length > 0 && (
          <section className="pt-12 border-t border-stone-200 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-serif-title font-bold text-stone-900">
                  Rekomendasi Wisata Lainnya
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Jelajahi tempat menarik lain di sekitar Desa Cijeruk
                </p>
              </div>
              <Link
                href="/wisata"
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
                      <span className="px-2.5 py-0.5 rounded-full bg-white/95 text-[#2d5026] text-[10px] font-bold uppercase tracking-wider">
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
