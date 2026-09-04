import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getTerdekatBySlug, getRekomendasiTempat } from "@/lib/dataService";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Car,
  Ticket,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface TerdekatDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function TerdekatDetailPage({ params }: TerdekatDetailPageProps) {
  const { slug } = await params;
  const item = await getTerdekatBySlug(slug);

  if (!item) {
    notFound();
  }

  const recommendations = await getRekomendasiTempat("terdekat", item.slug, 3);

  return (
    <main className="min-h-screen bg-[#fafaf8] text-stone-900 pt-28 sm:pt-36 pb-24 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Back Link */}
        <div>
          <Link
            href="/terdekat"
            className="inline-flex items-center gap-2 text-xs font-bold text-stone-500 hover:text-[#2d5026] transition py-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Semua Destinasi Terdekat</span>
          </Link>
        </div>

        {/* Hero Header */}
        <div className="relative aspect-[21/9] sm:aspect-[2.4/1] w-full rounded-3xl overflow-hidden shadow-xl bg-stone-100">
          <Image
            src={item.coverImage}
            alt={item.judul}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

          {/* Distance Badge Over Image */}
          <div className="absolute top-5 left-5 flex flex-wrap items-center gap-2">
            <span className="px-3.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-amber-300 text-xs font-bold shadow-sm flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{item.jarakWaktu}</span>
            </span>
            <span className="px-3.5 py-1 rounded-full bg-teal-600 text-white text-xs font-bold uppercase tracking-wider">
              {item.kategori}
            </span>
          </div>

          {/* Title Over Image */}
          <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 text-white space-y-2">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif-title font-bold tracking-tight">
              {item.judul}
            </h1>
            <p className="text-sm sm:text-base text-white/90 italic max-w-2xl">
              &ldquo;{item.tagline}&rdquo;
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
                Tentang Destinasi & Daya Tarik
              </h2>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {item.deskripsi}
              </p>
            </div>

            {/* Rekomendasi Kunjungan */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 space-y-4 shadow-xs">
              <h2 className="text-xl font-serif-title font-bold text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-teal-600" />
                <span>Tips Kunjungan & Rencana Day-Trip</span>
              </h2>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Destinasi ini berjarak sangat dekat dari Desa Cijeruk. Anda dapat menjadikannya destinasi lanjutan setelah menikmati pagi di Curug Cijeruk atau sarapan di warung desa. Waktu terbaik berkunjung adalah pagi atau sore menjelang sunset.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-5 sticky top-36">
              <h3 className="text-base font-bold text-stone-900 border-b border-stone-100 pb-3">
                Informasi Perjalanan
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                      Waktu Tempuh
                    </span>
                    <span className="font-bold text-stone-900">{item.jarakWaktu}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Car className="w-4 h-4 text-[#2d5026] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                      Panduan Rute
                    </span>
                    <span className="text-stone-700">{item.ruteAkses}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Ticket className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                      Tiket / Biaya
                    </span>
                    <span className="font-bold text-stone-900">{item.hargaTiket}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#2d5026] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                      Alamat Lengkap
                    </span>
                    <span className="font-bold text-stone-900 block">{item.lokasi.namaTempat}</span>
                    <span className="text-stone-600 block mt-0.5">{item.lokasi.alamat}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-100">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${item.judul} ${item.lokasi.namaTempat}`
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

        {/* Rekomendasi Terdekat Lainnya */}
        {recommendations.length > 0 && (
          <section className="pt-12 border-t border-stone-200 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-serif-title font-bold text-stone-900">
                  Destinasi Sekitar Lainnya
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Ide perjalanan satu hari lainnya di perbatasan Cijeruk
                </p>
              </div>
              <Link
                href="/terdekat"
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
                      <span className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-amber-300 text-[10px] font-bold">
                        {rec.extraInfo}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 space-y-1.5">
                    <h4 className="font-serif-title font-bold text-stone-900 group-hover:text-[#2d5026] transition-colors truncate">
                      {rec.judul}
                    </h4>
                    <p className="text-xs text-stone-500">{rec.subLabel}</p>
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
