import Link from "next/link";
import Image from "next/image";
import { getSejarahList, getTokohList } from "@/lib/dataService";
import { Landmark, Users, MapPin, Sparkles, Award, Quote, ArrowRight } from "lucide-react";

interface SejarahTokohPageProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function SejarahTokohPage({ searchParams }: SejarahTokohPageProps) {
  const { tab } = await searchParams;
  const activeTab = tab === "tokoh" ? "tokoh" : "sejarah";

  const sejarahList = await getSejarahList();
  const tokohList = await getTokohList();

  return (
    <main className="min-h-screen bg-[#fafaf8] text-stone-900 pt-28 sm:pt-36 pb-20 px-4 sm:px-8 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section: Cultural Heritage */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 pb-8">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-200 text-stone-800 text-xs font-bold uppercase tracking-wider">
              <Landmark className="w-3.5 h-3.5 text-[#2d5026]" />
              <span>Warisan Sejarah & Budaya Cijeruk</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold text-stone-900 tracking-tight leading-tight">
              Cerita Masa Lalu & Jejak Langkah Para Tokoh Desa
            </h1>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Mengenal asal-usul nama Desa Cijeruk, situs peninggalan era kolonial lereng Salak, serta keteladanan para tokoh yang mendedikasikan hidupnya bagi kelestarian dan kemajuan desa.
            </p>
          </div>

          {/* Tab Navigation: Tempat Bersejarah vs Tokoh Berpengaruh */}
          <div className="flex bg-stone-200/80 p-1 rounded-xl shrink-0">
            <Link
              href="/sejarah-tokoh?tab=sejarah"
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "sejarah"
                  ? "bg-white text-stone-900 shadow-sm"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <Landmark className="w-3.5 h-3.5 text-[#2d5026]" />
              <span>Tempat Bersejarah</span>
            </Link>
            <Link
              href="/sejarah-tokoh?tab=tokoh"
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "tokoh"
                  ? "bg-white text-stone-900 shadow-sm"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <Users className="w-3.5 h-3.5 text-[#2d5026]" />
              <span>Tokoh Berpengaruh</span>
            </Link>
          </div>
        </div>

        {/* TAB 1: TEMPAT BERSEJARAH */}
        {activeTab === "sejarah" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {sejarahList.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col"
                >
                  <div className="relative aspect-[16/9] w-full bg-stone-100">
                    <Image
                      src={item.coverImage}
                      alt={item.judul}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-stone-800 text-[11px] font-bold tracking-wide">
                        {item.era}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <Link href={`/sejarah/${item.slug}`}>
                        <h3 className="text-xl sm:text-2xl font-serif-title font-bold text-white hover:text-amber-200 transition-colors leading-tight">
                          {item.judul}
                        </h3>
                      </Link>
                    </div>
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed italic border-l-2 border-[#2d5026] pl-3 py-0.5">
                        &ldquo;{item.ringkasan}&rdquo;
                      </p>
                      <p className="text-xs sm:text-sm text-stone-700 leading-relaxed line-clamp-3">
                        {item.deskripsi}
                      </p>
                    </div>

                    {/* Fakta Menarik Checklist */}
                    {item.faktaMenarik.length > 0 && (
                      <div className="pt-3 border-t border-stone-100 space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                          Fakta Sejarah & Warisan
                        </span>
                        <div className="space-y-1.5">
                          {item.faktaMenarik.map((f, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2 text-xs text-stone-700 font-medium"
                            >
                              <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                              <span>{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#2d5026]" />
                        <span>{item.lokasi.namaTempat}</span>
                      </div>
                      <Link
                        href={`/sejarah/${item.slug}`}
                        className="font-semibold text-[#2d5026] hover:underline flex items-center gap-1"
                      >
                        <span>Baca Cerita</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: TOKOH BERPENGARUH */}
        {activeTab === "tokoh" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {tokohList.map((tokoh) => (
                <div
                  key={tokoh.id}
                  className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-lg transition-all p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start"
                >
                  {/* Portrait Photo */}
                  <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shrink-0 shadow-md bg-stone-100 mx-auto sm:mx-0">
                    <Image
                      src={tokoh.coverImage}
                      alt={tokoh.nama}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Biography Info */}
                  <div className="space-y-3 flex-1">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#2d5026]/10 text-[#2d5026] text-[10px] font-bold uppercase tracking-wider mb-1">
                        {tokoh.peran}
                      </span>
                      <h3 className="text-xl font-serif-title font-bold text-stone-900">
                        {tokoh.nama}
                      </h3>
                    </div>

                    <div className="text-xs text-stone-600 italic bg-stone-50 p-3 rounded-xl border border-stone-100 flex gap-2">
                      <Quote className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                      <p>{tokoh.ringkasanBio}</p>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                      {tokoh.biografiLengkap}
                    </p>

                    {/* Kontribusi */}
                    {tokoh.kontribusi.length > 0 && (
                      <div className="pt-2 space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                          Kontribusi Nyata bagi Cijeruk
                        </span>
                        <div className="space-y-1">
                          {tokoh.kontribusi.map((c, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-1.5 text-xs text-stone-700"
                            >
                              <Award className="w-3.5 h-3.5 text-[#2d5026] shrink-0 mt-0.5" />
                              <span>{c}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
