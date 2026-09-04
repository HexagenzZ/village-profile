import Link from "next/link";
import Image from "next/image";
import { getTerdekatList } from "@/lib/dataService";
import { Compass, Clock, MapPin, ArrowRight, Car, Ticket } from "lucide-react";

export default async function TerdekatPage() {
  const terdekatList = await getTerdekatList();

  return (
    <main className="min-h-screen bg-[#fafaf8] text-stone-900 pt-28 sm:pt-36 pb-20 px-4 sm:px-8 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section: "Places Near Cijeruk" Style */}
        <div className="border-b border-stone-200 pb-8 space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 text-teal-800 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-teal-700" />
            <span>Destinasi Sekitar • Day Trip Ideas</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold text-stone-900 tracking-tight leading-tight">
            Destinasi Menarik di Sekitar Cijeruk
          </h1>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Daftar tempat wisata unggulan di luar batas desa yang berjarak sangat dekat (15–30 menit perjalanan). Sempurna dijadikan rencana perjalanan satu hari (one-day trip) saat berlibur di Cijeruk.
          </p>
        </div>

        {/* Places Near List: Emphasizing Distance & Drive Time */}
        <div className="space-y-6">
          {terdekatList.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl border border-stone-200 hover:border-stone-300 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col md:flex-row"
            >
              {/* Image Side */}
              <div className="relative md:w-2/5 aspect-[16/10] md:aspect-auto shrink-0 bg-stone-100">
                <Image
                  src={item.coverImage}
                  alt={item.judul}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 via-transparent to-transparent" />

                {/* Distance & Travel Time Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md text-amber-300 text-xs font-bold shadow-md">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{item.jarakWaktu}</span>
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white md:hidden">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-teal-300 block">
                    {item.kategori}
                  </span>
                </div>
              </div>

              {/* Information Side */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="hidden md:inline-block text-[11px] font-bold text-teal-700 uppercase tracking-wider bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200">
                      {item.kategori}
                    </span>
                    <span className="inline-block text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                      ✨ {item.tipeTrip}
                    </span>
                  </div>

                  <Link href={`/terdekat/${item.slug}`}>
                    <h2 className="text-2xl font-serif-title font-bold text-stone-900 group-hover:text-[#2d5026] transition-colors">
                      {item.judul}
                    </h2>
                  </Link>

                  <p className="text-xs sm:text-sm text-stone-500 italic">
                    &ldquo;{item.tagline}&rdquo;
                  </p>

                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed line-clamp-2">
                    {item.deskripsi}
                  </p>
                </div>

                {/* Practical Access & Tickets Note */}
                <div className="pt-4 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-600">
                  <div className="flex items-start gap-2">
                    <Car className="w-4 h-4 text-[#2d5026] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-stone-800 block">Akses Rute:</span>
                      <span>{item.ruteAkses}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Ticket className="w-4 h-4 text-[#2d5026] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-stone-800 block">Estimasi Tiket:</span>
                      <span>{item.hargaTiket}</span>
                    </div>
                  </div>
                </div>

                {/* Action Footer */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-stone-500">
                    <MapPin className="w-3.5 h-3.5 text-[#2d5026]" />
                    <span>{item.lokasi.namaTempat}</span>
                  </div>
                  <Link
                    href={`/terdekat/${item.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-100 hover:bg-[#2d5026] text-stone-800 hover:text-white text-xs font-bold transition-all"
                  >
                    <span>Panduan Kunjungan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
