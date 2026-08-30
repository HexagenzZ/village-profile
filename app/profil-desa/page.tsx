import { VILLAGE_PROFILE } from "@/data/villageProfile";
import { Mountain, Users, Home, Compass, Building2, CheckCircle2, ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Profil & Sejarah Desa Cijeruk",
  description: "Informasi lengkap profil, sejarah, visi misi, statistik kependudukan, dan pemerintahan Desa Cijeruk, Kab. Bogor.",
};

export default function ProfilDesaPage() {
  return (
    <main className="min-h-screen bg-[#fafaf8] text-stone-900 pt-24 pb-20 px-4 sm:px-8 md:px-12">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center text-xs font-semibold text-stone-500 hover:text-[#2d5026] transition"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Kembali ke Beranda
        </Link>

        {/* Hero Section */}
        <div className="relative rounded-xl overflow-hidden bg-stone-900 text-white p-8 sm:p-12 shadow-sm">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2d5026] text-white text-xs font-medium uppercase tracking-wider">
              <Mountain className="w-4 h-4" />
              Pemerintah Desa Cijeruk
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif-title font-semibold text-white tracking-tight">
              Profil & Potensi Desa Cijeruk
            </h1>
            <p className="text-base text-stone-300 leading-relaxed font-light">
              {VILLAGE_PROFILE.overview}
            </p>
          </div>
        </div>

        {/* Key Statistics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="p-4 rounded-lg bg-white border border-stone-200 text-center shadow-xs">
            <Users className="w-5 h-5 text-[#2d5026] mx-auto mb-2" />
            <span className="text-xl sm:text-2xl font-serif-title font-bold text-stone-900">
              {VILLAGE_PROFILE.statistics.population.toLocaleString("id-ID")}
            </span>
            <p className="text-xs text-stone-500 mt-0.5">Jiwa Penduduk</p>
          </div>

          <div className="p-4 rounded-lg bg-white border border-stone-200 text-center shadow-xs">
            <Home className="w-5 h-5 text-[#2d5026] mx-auto mb-2" />
            <span className="text-xl sm:text-2xl font-serif-title font-bold text-stone-900">
              {VILLAGE_PROFILE.statistics.households.toLocaleString("id-ID")}
            </span>
            <p className="text-xs text-stone-500 mt-0.5">Kepala Keluarga</p>
          </div>

          <div className="p-4 rounded-lg bg-white border border-stone-200 text-center shadow-xs">
            <Compass className="w-5 h-5 text-[#2d5026] mx-auto mb-2" />
            <span className="text-xl sm:text-2xl font-serif-title font-bold text-stone-900">
              {VILLAGE_PROFILE.statistics.areaSizeKm2} km²
            </span>
            <p className="text-xs text-stone-500 mt-0.5">Luas Wilayah</p>
          </div>

          <div className="p-4 rounded-lg bg-white border border-stone-200 text-center shadow-xs">
            <Mountain className="w-5 h-5 text-[#2d5026] mx-auto mb-2" />
            <span className="text-xl sm:text-2xl font-serif-title font-bold text-stone-900">
              {VILLAGE_PROFILE.statistics.altitudeMeters} mdpl
            </span>
            <p className="text-xs text-stone-500 mt-0.5">Ketinggian Rata-rata</p>
          </div>

          <div className="p-4 rounded-lg bg-white border border-stone-200 text-center shadow-xs">
            <Building2 className="w-5 h-5 text-[#2d5026] mx-auto mb-2" />
            <span className="text-xl sm:text-2xl font-serif-title font-bold text-stone-900">
              {VILLAGE_PROFILE.statistics.rwCount} RW / {VILLAGE_PROFILE.statistics.rtCount} RT
            </span>
            <p className="text-xs text-stone-500 mt-0.5">Wilayah Rukun</p>
          </div>

          <div className="p-4 rounded-lg bg-white border border-stone-200 text-center shadow-xs">
            <ShieldCheck className="w-5 h-5 text-[#2d5026] mx-auto mb-2" />
            <span className="text-xl sm:text-2xl font-serif-title font-bold text-stone-900">
              19-27°C
            </span>
            <p className="text-xs text-stone-500 mt-0.5">Suhu Pegunungan</p>
          </div>
        </div>

        {/* History Section (Bibury Style) */}
        <section className="p-8 sm:p-10 rounded-xl bg-white border border-stone-200 space-y-4 shadow-xs">
          <h2 className="text-2xl font-serif-title font-semibold text-stone-900 flex items-center gap-2">
            <span className="w-2.5 h-6 bg-[#2d5026] rounded-full" />
            Sejarah & Asal Usul Nama Cijeruk
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            {VILLAGE_PROFILE.history}
          </p>
        </section>

        {/* Vision & Mission */}
        <div id="visi-misi" className="grid grid-cols-1 md:grid-cols-2 gap-6 scroll-mt-24">
          <div className="p-8 rounded-xl bg-white border border-stone-200 space-y-4 shadow-xs">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#2d5026]">
              Arah Kebijakan
            </span>
            <h2 className="text-xl sm:text-2xl font-serif-title font-semibold text-stone-900">Visi Desa Cijeruk</h2>
            <p className="text-sm text-stone-700 leading-relaxed italic bg-stone-50 p-4 rounded-lg border border-stone-200">
              &quot;{VILLAGE_PROFILE.vision}&quot;
            </p>
          </div>

          <div className="p-8 rounded-xl bg-white border border-stone-200 space-y-4 shadow-xs">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#2d5026]">
              Program Strategis
            </span>
            <h2 className="text-xl sm:text-2xl font-serif-title font-semibold text-stone-900">Misi Desa Cijeruk</h2>
            <ul className="space-y-3 text-xs sm:text-sm text-stone-600">
              {VILLAGE_PROFILE.mission.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2d5026] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Village Head Message */}
        <div id="struktur" className="p-8 rounded-xl bg-white border border-stone-200 flex flex-col md:flex-row items-center gap-8 scroll-mt-24 shadow-xs">
          <img
            src={VILLAGE_PROFILE.villageHead.photoUrl}
            alt={VILLAGE_PROFILE.villageHead.name}
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-xl object-cover border border-stone-300 shadow-md shrink-0"
          />
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-semibold text-[#2d5026] uppercase tracking-wider">
              {VILLAGE_PROFILE.villageHead.title} (Periode {VILLAGE_PROFILE.villageHead.period})
            </span>
            <h3 className="text-2xl font-serif-title font-semibold text-stone-900">{VILLAGE_PROFILE.villageHead.name}</h3>
            <p className="text-sm text-stone-600 leading-relaxed italic pt-1">
              &quot;{VILLAGE_PROFILE.villageHead.message}&quot;
            </p>
          </div>
        </div>

        {/* Geographic Borders */}
        <div id="demografi" className="p-8 rounded-xl bg-white border border-stone-200 space-y-4 scroll-mt-24 shadow-xs">
          <h2 className="text-xl font-serif-title font-semibold text-stone-900">Batas Administratif Wilayah</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
              <span className="text-xs text-stone-500 font-medium uppercase block">Sebelah Utara</span>
              <span className="text-sm text-stone-900 font-semibold mt-1 block">{VILLAGE_PROFILE.geography.north}</span>
            </div>
            <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
              <span className="text-xs text-stone-500 font-medium uppercase block">Sebelah Selatan</span>
              <span className="text-sm text-stone-900 font-semibold mt-1 block">{VILLAGE_PROFILE.geography.south}</span>
            </div>
            <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
              <span className="text-xs text-stone-500 font-medium uppercase block">Sebelah Timur</span>
              <span className="text-sm text-stone-900 font-semibold mt-1 block">{VILLAGE_PROFILE.geography.east}</span>
            </div>
            <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
              <span className="text-xs text-stone-500 font-medium uppercase block">Sebelah Barat</span>
              <span className="text-sm text-stone-900 font-semibold mt-1 block">{VILLAGE_PROFILE.geography.west}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
