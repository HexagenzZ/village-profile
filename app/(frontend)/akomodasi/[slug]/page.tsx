import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAkomodasiBySlug, getRekomendasiTempat } from "@/lib/dataService";
import {
  ArrowLeft,
  MapPin,
  Users,
  Bed,
  Star,
  CheckCircle2,
  MessageCircle,
  Phone,
  ArrowRight,
} from "lucide-react";

interface AkomodasiDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function AkomodasiDetailPage({ params }: AkomodasiDetailPageProps) {
  const { slug } = await params;
  const akomodasi = await getAkomodasiBySlug(slug);

  if (!akomodasi) {
    notFound();
  }

  const recommendations = await getRekomendasiTempat("akomodasi", akomodasi.slug, 3);

  return (
    <main className="min-h-screen bg-[#fafaf8] text-stone-900 pt-28 sm:pt-36 pb-24 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Back Link */}
        <div>
          <Link
            href="/akomodasi"
            className="inline-flex items-center gap-2 text-xs font-bold text-stone-500 hover:text-[#2d5026] transition py-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Semua Akomodasi & Penginapan</span>
          </Link>
        </div>

        {/* Hero Header */}
        <div className="relative aspect-[21/9] sm:aspect-[2.4/1] w-full rounded-3xl overflow-hidden shadow-xl bg-stone-100">
          <Image
            src={akomodasi.coverImage}
            alt={akomodasi.judul}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

          {/* Badges Over Image */}
          <div className="absolute top-5 left-5 flex flex-wrap items-center gap-2">
            <span className="px-3.5 py-1 rounded-full bg-blue-600 text-white text-xs font-bold uppercase tracking-wider shadow-sm">
              {akomodasi.subKategoriLabel}
            </span>
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              <span>{akomodasi.rating} / 5.0</span>
            </div>
          </div>

          {/* Title Over Image */}
          <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 text-white space-y-2">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif-title font-bold tracking-tight">
              {akomodasi.judul}
            </h1>
            <p className="text-sm sm:text-base text-white/90 italic max-w-2xl">
              &ldquo;{akomodasi.tagline}&rdquo;
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
                Tentang Penginapan
              </h2>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {akomodasi.deskripsi}
              </p>
            </div>

            {/* Fasilitas Kamar & Properti */}
            {akomodasi.fasilitas.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 space-y-4 shadow-xs">
                <h2 className="text-xl font-serif-title font-bold text-stone-900 border-b border-stone-100 pb-3">
                  Fasilitas & Kelengkapan
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {akomodasi.fasilitas.map((f, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-100 text-xs sm:text-sm text-stone-700 font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#2d5026] shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Sidebar: Booking Card */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-5 sticky top-36">
              <div className="border-b border-stone-100 pb-4">
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                  Harga Sewa
                </span>
                <span className="text-lg sm:text-xl font-bold text-[#2d5026] mt-1 block">
                  {akomodasi.hargaPerMalam}
                </span>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <Users className="w-4 h-4 text-[#2d5026] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                      Kapasitas Tamu
                    </span>
                    <span className="font-semibold text-stone-800">{akomodasi.kapasitas}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#2d5026] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                      Lokasi & Alamat
                    </span>
                    <span className="font-bold text-stone-900 block">
                      {akomodasi.lokasi.namaTempat}
                    </span>
                    <span className="text-stone-600 block mt-0.5">{akomodasi.lokasi.alamat}</span>
                    {akomodasi.lokasi.latitude && (
                      <span className="text-[10px] text-stone-400 font-mono mt-1 block">
                        Koordinat: {akomodasi.lokasi.latitude}, {akomodasi.lokasi.longitude}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Direct Booking Actions */}
              <div className="pt-3 border-t border-stone-100 space-y-2.5">
                {akomodasi.kontakBooking.whatsapp && (
                  <a
                    href={`https://wa.me/${akomodasi.kontakBooking.whatsapp}?text=${encodeURIComponent(
                      `Halo pengelola ${akomodasi.judul} Cijeruk, saya ingin reservasi tanggal...`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold tracking-wide transition shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Pesan via WhatsApp</span>
                  </a>
                )}
                {akomodasi.kontakBooking.telepon && (
                  <a
                    href={`tel:${akomodasi.kontakBooking.telepon}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Hubungi Pengelola</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Rekomendasi Akomodasi Lainnya */}
        {recommendations.length > 0 && (
          <section className="pt-12 border-t border-stone-200 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-serif-title font-bold text-stone-900">
                  Rekomendasi Penginapan Lainnya
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Pilihan villa dan camping ground lain di lereng Gunung Salak Cijeruk
                </p>
              </div>
              <Link
                href="/akomodasi"
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
                      <span className="px-2.5 py-0.5 rounded-full bg-white/95 text-blue-800 text-[10px] font-bold uppercase tracking-wider">
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
