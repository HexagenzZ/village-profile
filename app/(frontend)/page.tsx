import Link from "next/link";
import Image from "next/image";
import {
  Mountain,
  UtensilsCrossed,
  Bed,
  Landmark,
  Compass,
  ArrowRight,
  Star,
  Clock,
  MapPin,
  Sparkles,
  Users,
  Check,
  Calendar,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import {
  getFeaturedWisata,
  getFeaturedKuliner,
  getFeaturedAkomodasi,
  getFeaturedSejarah,
  getFeaturedTokoh,
  getFeaturedTerdekat,
  getFeaturedBlog,
} from "@/lib/dataService";

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
  } catch {
    return true;
  }
}

export default async function HomePage() {
  const [
    featuredWisata,
    featuredKuliner,
    featuredAkomodasi,
    featuredSejarah,
    featuredTokoh,
    featuredTerdekat,
    featuredBlog,
  ] = await Promise.all([
    getFeaturedWisata(),
    getFeaturedKuliner(),
    getFeaturedAkomodasi(),
    getFeaturedSejarah(),
    getFeaturedTokoh(),
    getFeaturedTerdekat(),
    getFeaturedBlog(),
  ]);

  return (
    <main className="min-h-screen bg-[#fafaf8] text-stone-900 font-sans">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Hardcoded layout, dynamic imagery & scenic tagline)       */}
      {/* ========================================================================= */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-8 overflow-hidden bg-stone-900 text-white">
        {/* Background Scenic Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85"
            alt="Pemandangan Lereng Gunung Salak Cijeruk"
            fill
            priority
            className="object-cover object-center opacity-45 scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/70 via-stone-900/50 to-[#fafaf8]" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6 sm:space-y-8">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider text-amber-300">
            <Mountain className="w-3.5 h-3.5" />
            <span>Kaki Gunung Salak • Kabupaten Bogor</span>
          </div>

          {/* Main Title & Tagline */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif-title font-bold tracking-tight text-white leading-[1.1]">
              Pesona Asri, Cita Rasa & Warisan Cerita Cijeruk
            </h1>
            <p className="max-w-3xl mx-auto text-base sm:text-xl text-stone-200 font-light leading-relaxed">
              Panduan lengkap pariwisata alam, kuliner khas Sunda, villa peristirahatan, serta jejak sejarah tokoh Desa Cijeruk.
            </p>
          </div>

          {/* Quick CTA Buttons */}
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 pt-2">
            <Link
              href="/wisata"
              className="px-6 py-3 rounded-xl bg-[#2d5026] hover:bg-[#223e1d] text-white text-xs sm:text-sm font-bold tracking-wide shadow-lg shadow-[#2d5026]/30 transition-all hover:scale-105"
            >
              Jelajahi Wisata
            </Link>
            <Link
              href="/kuliner"
              className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-bold tracking-wide shadow-lg shadow-amber-600/30 transition-all hover:scale-105"
            >
              Kuliner & Kafe
            </Link>
            <Link
              href="/akomodasi"
              className="px-6 py-3 rounded-xl bg-white/90 hover:bg-white text-stone-900 text-xs sm:text-sm font-bold tracking-wide shadow-md transition-all hover:scale-105"
            >
              Villa & Glamping
            </Link>
          </div>

          {/* Quick Facts Pills */}
          <div className="pt-6 sm:pt-10 flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-xs text-stone-300">
            <div className="flex items-center gap-2 bg-stone-900/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Ketinggian ~650 mdpl</span>
            </div>
            <div className="flex items-center gap-2 bg-stone-900/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Suhu Sejuk 19 - 27°C</span>
            </div>
            <div className="flex items-center gap-2 bg-stone-900/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span>15 Menit Tol Bocimi</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. EDITORIAL INTRO SECTION (Bibury-style Narrative & Scope)               */}
      {/* ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-8 py-14 sm:py-20 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#2d5026]">
          Portal Potensi Desa (Proyek KKN)
        </span>
        <h2 className="text-2xl sm:text-4xl font-serif-title font-bold text-stone-900 leading-tight">
          Menyingkap Keindahan & Cerita yang Belum Terjamah
        </h2>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-3xl mx-auto">
          Jika data statistik administratif dan kependudukan resmi telah terhimpun di portal Pemerintah Kabupaten Bogor dan situs resmi desa.id, website ini hadir untuk menonjolkan jiwa Desa Cijeruk: gemericik curug alami, aroma seduhan kopi lereng Salak, keramahan warga lokal, serta sejarah yang mengalir di setiap sudut kampung.
        </p>
        <div className="pt-2">
          <Link
            href="/profil-desa"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#2d5026] hover:underline"
          >
            <span>Buka Ringkasan & Data Profil Resmi Desa</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. FOUR MAIN PILLARS CATEGORY NAVIGATION                                 */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            href="/wisata"
            className="group relative rounded-2xl overflow-hidden bg-white border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col p-6 space-y-4"
          >
            <div className="w-12 h-12 rounded-xl bg-[#2d5026]/10 text-[#2d5026] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Mountain className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif-title font-bold text-lg text-stone-900 group-hover:text-[#2d5026] transition-colors">
                Wisata & Rekreasi
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Curug alami, trekking kebun nanas & kopi, spot foto sunrise dan perkemahan.
              </p>
            </div>
            <span className="text-xs font-bold text-[#2d5026] flex items-center gap-1 pt-2">
              Jelajahi 4 Kategori <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <Link
            href="/kuliner"
            className="group relative rounded-2xl overflow-hidden bg-white border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col p-6 space-y-4"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif-title font-bold text-lg text-stone-900 group-hover:text-amber-700 transition-colors">
                Kuliner & Kafe
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Nasi liwet Sunda kastrol, olahan nanas segar, dan kedai kopi panorama.
              </p>
            </div>
            <span className="text-xs font-bold text-amber-700 flex items-center gap-1 pt-2">
              Buka Sekarang & Rekomendasi <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <Link
            href="/akomodasi"
            className="group relative rounded-2xl overflow-hidden bg-white border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col p-6 space-y-4"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Bed className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif-title font-bold text-lg text-stone-900 group-hover:text-blue-700 transition-colors">
                Akomodasi & Stay
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Villa private pool keluarga dan glamping dome berhawa sejuk lereng Salak.
              </p>
            </div>
            <span className="text-xs font-bold text-blue-700 flex items-center gap-1 pt-2">
              Villa & Camping Ground <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <Link
            href="/sejarah-tokoh"
            className="group relative rounded-2xl overflow-hidden bg-white border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col p-6 space-y-4"
          >
            <div className="w-12 h-12 rounded-xl bg-stone-200 text-stone-800 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Landmark className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif-title font-bold text-lg text-stone-900 group-hover:text-[#2d5026] transition-colors">
                Sejarah & Tokoh
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Asal usul nama desa, jejak situs warisan, dan keteladanan tokoh sesepuh.
              </p>
            </div>
            <span className="text-xs font-bold text-stone-800 flex items-center gap-1 pt-2">
              Cerita & Warisan <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. HIGHLIGHT WISATA UNGGULAN (Dinamis CMS: featured = true)                */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#2d5026] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Sorotan Destinasi Wisata
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif-title font-bold text-stone-900 mt-1">
              Wisata Pilihan di Kaki Gunung Salak
            </h2>
          </div>
          <Link
            href="/wisata"
            className="text-xs sm:text-sm font-bold text-[#2d5026] hover:underline flex items-center gap-1 shrink-0"
          >
            <span>Lihat Semua Wisata</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {featuredWisata.map((item) => (
            <Link
              key={item.id}
              href={`/wisata/${item.slug}`}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-stone-300 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
                <Image
                  src={item.coverImage}
                  alt={item.judul}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                <div className="absolute top-3.5 left-3.5">
                  <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#2d5026] text-[11px] font-bold uppercase tracking-wider shadow-sm">
                    {item.subKategoriLabel}
                  </span>
                </div>

                <div className="absolute top-3.5 right-3.5 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                  <span>{item.rating}</span>
                </div>

                <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                  <p className="text-xs text-white/90 line-clamp-1 font-medium italic">
                    &ldquo;{item.tagline}&rdquo;
                  </p>
                </div>
              </div>

              <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-serif-title font-bold text-stone-900 group-hover:text-[#2d5026] transition-colors line-clamp-1">
                    {item.judul}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed">
                    {item.deskripsi}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <div className="flex items-center gap-1 truncate max-w-[180px]">
                    <MapPin className="w-3.5 h-3.5 text-[#2d5026] shrink-0" />
                    <span className="truncate">{item.lokasi.namaTempat}</span>
                  </div>
                  <span className="font-semibold text-[#2d5026] flex items-center gap-1 shrink-0">
                    Detail
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. HIGHLIGHT KULINER (Dinamis CMS: featured = true)                        */}
      {/* ========================================================================= */}
      <section className="bg-[#f5f3ec] py-16 sm:py-20 border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-300/80 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-800 flex items-center gap-1.5">
                <UtensilsCrossed className="w-3.5 h-3.5 text-amber-700" />
                Kuliner & Kafe Favorit
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif-title font-bold text-stone-900 mt-1">
                Kelezatan Khas & Kedai Kopi Bernuansa Sejuk
              </h2>
            </div>
            <Link
              href="/kuliner"
              className="text-xs sm:text-sm font-bold text-amber-800 hover:underline flex items-center gap-1 shrink-0"
            >
              <span>Lihat Semua Kuliner</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {featuredKuliner.map((item) => {
              const isOpen = isPlaceOpenNow(item.jamBuka, item.jamTutup);

              return (
                <Link
                  key={item.id}
                  href={`/kuliner/${item.slug}`}
                  className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-stone-300 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
                    <Image
                      src={item.coverImage}
                      alt={item.judul}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70 group-hover:opacity-85 transition-opacity" />

                    {/* LIVE Status Badge */}
                    <div className="absolute top-3.5 left-3.5">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm ${
                          isOpen ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        <span>{isOpen ? "Buka Sekarang" : "Sedang Tutup"}</span>
                      </span>
                    </div>

                    {/* Price Range */}
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

                  <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                        {item.subKategoriLabel}
                      </div>
                      <h3 className="text-xl font-serif-title font-bold text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-1">
                        {item.judul}
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed">
                        {item.deskripsi}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                      <div className="flex items-center gap-1 truncate max-w-[180px]">
                        <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        <span className="truncate">{item.lokasi.namaTempat}</span>
                      </div>
                      <span className="font-semibold text-amber-800 flex items-center gap-1 shrink-0">
                        Menu & Lokasi
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. HIGHLIGHT AKOMODASI (Dinamis CMS: featured = true)                      */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-20 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-800 flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-blue-700" />
              Penginapan Pilihan
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif-title font-bold text-stone-900 mt-1">
              Villa Estetik & Area Camping Terbuka
            </h2>
          </div>
          <Link
            href="/akomodasi"
            className="text-xs sm:text-sm font-bold text-blue-800 hover:underline flex items-center gap-1 shrink-0"
          >
            <span>Lihat Semua Penginapan</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {featuredAkomodasi.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-stone-300 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
                <Image
                  src={item.coverImage}
                  alt={item.judul}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                <div className="absolute top-3.5 left-3.5">
                  <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-blue-900 text-[11px] font-bold uppercase tracking-wider shadow-sm">
                    {item.subKategoriLabel}
                  </span>
                </div>

                <div className="absolute top-3.5 right-3.5 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                  <span>{item.rating}</span>
                </div>

                <div className="absolute bottom-3 left-3.5 right-3.5 text-white flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-md">
                    <Users className="w-3.5 h-3.5 text-blue-300" />
                    <span>{item.kapasitas}</span>
                  </span>
                </div>
              </div>

              <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-xs font-bold text-[#2d5026]">{item.hargaPerMalam}</div>
                  <Link href={`/akomodasi/${item.slug}`}>
                    <h3 className="text-xl font-serif-title font-bold text-stone-900 group-hover:text-[#2d5026] transition-colors line-clamp-1">
                      {item.judul}
                    </h3>
                  </Link>
                  <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed">
                    {item.deskripsi}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-stone-500 truncate max-w-[170px]">
                    <MapPin className="w-3.5 h-3.5 text-[#2d5026] shrink-0" />
                    <span className="truncate">{item.lokasi.namaTempat}</span>
                  </div>
                  <Link
                    href={`/akomodasi/${item.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#2d5026] hover:underline"
                  >
                    <span>Detail Stay</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. HIGHLIGHT SEJARAH & TOKOH (Dinamis CMS)                                 */}
      {/* ========================================================================= */}
      {(featuredSejarah.length > 0 || featuredTokoh.length > 0) && (
        <section className="bg-stone-100/70 py-16 border-t border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-stone-700 flex items-center gap-1.5">
                  <Landmark className="w-3.5 h-3.5 text-[#2d5026]" />
                  Warisan Sejarah & Budaya
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif-title font-bold text-stone-900 mt-1">
                  Kisah Masa Lalu & Jejak Para Tokoh
                </h2>
              </div>
              <Link
                href="/sejarah-tokoh"
                className="text-xs sm:text-sm font-bold text-[#2d5026] hover:underline flex items-center gap-1 shrink-0"
              >
                <span>Lihat Sejarah & Tokoh Lengkap</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Sejarah Item */}
              {featuredSejarah[0] && (
                <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col">
                  <div className="relative aspect-[16/9] w-full bg-stone-100">
                    <Image
                      src={featuredSejarah[0].coverImage}
                      alt={featuredSejarah[0].judul}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                    <div className="absolute top-3.5 left-3.5">
                      <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-stone-800 text-[11px] font-bold">
                        {featuredSejarah[0].era}
                      </span>
                    </div>
                    <div className="absolute bottom-3.5 left-4 right-4 text-white">
                      <h3 className="text-xl font-serif-title font-bold leading-tight">
                        {featuredSejarah[0].judul}
                      </h3>
                    </div>
                  </div>
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed">
                      {featuredSejarah[0].deskripsi}
                    </p>
                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                      <span className="text-stone-500">{featuredSejarah[0].lokasi.namaTempat}</span>
                      <Link
                        href={`/sejarah/${featuredSejarah[0].slug}`}
                        className="font-bold text-[#2d5026] hover:underline flex items-center gap-1"
                      >
                        <span>Baca Sejarah</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Tokoh Item */}
              {featuredTokoh[0] && (
                <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-lg transition-all p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-center">
                  <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shrink-0 shadow-md bg-stone-100">
                    <Image
                      src={featuredTokoh[0].coverImage}
                      alt={featuredTokoh[0].nama}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-3 flex-1 text-center sm:text-left">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#2d5026]/10 text-[#2d5026] text-[10px] font-bold uppercase tracking-wider mb-1">
                        {featuredTokoh[0].peran}
                      </span>
                      <h3 className="text-xl font-serif-title font-bold text-stone-900">
                        {featuredTokoh[0].nama}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-600 italic line-clamp-3">
                      &ldquo;{featuredTokoh[0].ringkasanBio}&rdquo;
                    </p>
                    <div className="pt-2">
                      <Link
                        href="/sejarah-tokoh?tab=tokoh"
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#2d5026] hover:underline"
                      >
                        <span>Kisah Kiprah Tokoh</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 8. HIGHLIGHT BLOG & KABAR TERBARU (Dinamis CMS: featured = true)           */}
      {/* ========================================================================= */}
      {featuredBlog.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#2d5026]">
                Jurnal & Kabar KKN
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif-title font-bold text-stone-900 mt-1">
                Catatan Perjalanan & Informasi Terkini
              </h2>
            </div>
            <Link
              href="/blog"
              className="text-xs sm:text-sm font-bold text-[#2d5026] hover:underline flex items-center gap-1 shrink-0"
            >
              <span>Semua Artikel Blog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {featuredBlog.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-stone-300 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
                  <Image
                    src={post.coverImage}
                    alt={post.judul}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-[#2d5026] text-[10px] font-bold uppercase tracking-wider">
                      {post.kategoriLabel}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[11px] text-stone-400">
                      <span>{post.publishedAt}</span>
                      <span>•</span>
                      <span>{post.waktuBaca}</span>
                    </div>

                    <h3 className="text-lg font-serif-title font-bold text-stone-900 group-hover:text-[#2d5026] transition-colors line-clamp-2 leading-snug">
                      {post.judul}
                    </h3>

                    <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed">
                      {post.ringkasan}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                    <span className="font-medium text-stone-700">{post.penulis}</span>
                    <span className="font-bold text-[#2d5026] flex items-center gap-1">
                      Baca
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 9. DESTINASI TERDEKAT PREVIEW (Sekitar Cijeruk)                            */}
      {/* ========================================================================= */}
      {featuredTerdekat.length > 0 && (
        <section className="bg-teal-900 text-white py-16 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-teal-800 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-teal-300 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  Rencana Day-Trip
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif-title font-bold text-white mt-1">
                  Destinasi Menarik di Sekitar Cijeruk
                </h2>
              </div>
              <Link
                href="/terdekat"
                className="text-xs sm:text-sm font-bold text-teal-300 hover:text-white flex items-center gap-1 shrink-0"
              >
                <span>Lihat Tempat Terdekat Lainnya</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredTerdekat.map((item) => (
                <Link
                  key={item.id}
                  href={`/terdekat/${item.slug}`}
                  className="group bg-teal-950/60 rounded-2xl border border-teal-800/80 overflow-hidden hover:border-teal-400/80 transition-all flex flex-col"
                >
                  <div className="relative aspect-[16/10] w-full bg-teal-900">
                    <Image
                      src={item.coverImage}
                      alt={item.judul}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-black/70 text-amber-300 text-xs font-bold flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{item.jarakWaktu}</span>
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-teal-300 tracking-wider block">
                        {item.kategori}
                      </span>
                      <h3 className="font-serif-title font-bold text-lg text-white group-hover:text-teal-200 transition-colors mt-1">
                        {item.judul}
                      </h3>
                      <p className="text-xs text-teal-100/80 line-clamp-2 mt-1">
                        {item.deskripsi}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-teal-900 flex items-center justify-between text-xs text-teal-300">
                      <span>{item.lokasi.namaTempat}</span>
                      <span className="font-bold flex items-center gap-1">
                        Rute <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 10. OFFICIAL DATA ACCESS CALLOUT BANNER                                   */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-14">
        <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2d5026]/10 text-[#2d5026] text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              Transparansi & Layanan Publik
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-title font-bold text-stone-900">
              Akses Data Resmi Pemerintahan Desa Cijeruk
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
              Website ini berfokus pada informasi pariwisata, kuliner, dan kearifan lokal. Untuk informasi administrasi formal, jumlah penduduk detail, transparansi APBDes, dan portal resmi daerah, silakan kunjungi portal resmi terkait:
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="https://bogorkab.go.id/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition"
            >
              <span>Portal Bestie Kab. Bogor</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://cijeruk-bogor.desa.id/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#2d5026] hover:bg-[#223e1d] text-white text-xs font-bold transition shadow-sm"
            >
              <span>Situs Resmi Desa.id</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
