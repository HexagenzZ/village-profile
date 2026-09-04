"use client";

import Link from "next/link";

interface FeatureStoriesProps {
  onOpenBukitAlesano?: () => void;
  onOpenVilla?: () => void;
}

export function FeatureStories({ onOpenBukitAlesano, onOpenVilla }: FeatureStoriesProps) {
  return (
    <section className="w-full bg-[#fdfcf9] py-14 sm:py-20 px-4 sm:px-8 border-b border-stone-200/80">
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Story 1: Bukit Alesano (Arlington Row Equivalent - Photo Left, Text Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Photo Left */}
          <div className="relative rounded-lg overflow-hidden border border-stone-200 shadow-sm aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] group">
            <img
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80"
              alt="Bukit Alesano Cijeruk Panorama"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded text-white text-xs">
              Bukit Alesano, Desa Cijeruk
            </div>
          </div>

          {/* Text Right */}
          <div className="space-y-4 lg:pl-4">
            <h3 className="text-2xl sm:text-3xl font-serif-title font-semibold text-stone-800 tracking-tight">
              Bukit Alesano
            </h3>
            <div className="space-y-3 text-stone-600 text-sm sm:text-base leading-relaxed">
              <p>
                Bukit Alesano sering kali disebut sebagai salah satu tempat paling fotogenik dan memukau di kawasan selatan Bogor. Bertengger di ketinggian lereng Gunung Salak, bukit ini menyajikan lanskap terbuka dengan sudut pandang 360 derajat.
              </p>
              <p>
                Dikenal luas sebagai lokasi berkemah favorit, pengunjung disuguhi pemandangan matahari terbit (<em>sunrise</em>) yang dramatis di pagi hari serta kerlap-kerlip lampu perkotaan (<em>city light</em>) Bogor hingga Depok yang berkilau di malam hari.
              </p>
              <p>
                Jika Anda mencari pengalaman wisata alam tak terlupakan di Cijeruk, menikmati secangkir kopi hangat sambil memandang lembah berkabut dari Bukit Alesano harus berada di urutan teratas daftar liburan Anda!
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/wisata"
                className="inline-block px-6 py-2.5 rounded-md bg-[#2d5026] hover:bg-[#223e1d] text-white text-xs sm:text-sm font-medium tracking-wide shadow transition-colors"
              >
                Jelajahi Wisata Cijeruk
              </Link>
            </div>
          </div>
        </div>

        {/* Story 2: Stay in Cijeruk (Text Left, Photo Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Text Left */}
          <div className="space-y-4 lg:pr-4 order-2 lg:order-1">
            <h3 className="text-2xl sm:text-3xl font-serif-title font-semibold text-stone-800 tracking-tight">
              Stay in Cijeruk
            </h3>
            <div className="space-y-3 text-stone-600 text-sm sm:text-base leading-relaxed">
              <p>
                Mengapa tidak menjadikan Cijeruk sebagai titik singgah utama Anda saat menjelajahi pesona lereng Gunung Salak dan Bogor? Cijeruk menawarkan beragam pilihan akomodasi istimewa untuk segala kebutuhan.
              </p>
              <p>
                Mulai dari villa privat keluarga bergaya estetik dengan <em>infinity pool</em> menghadap perbukitan, resor bertaraf bintang di tepi hutan pinus, hingga tenda glamping mewah yang menyatu dengan alam bebas.
              </p>
              <p>
                Cijeruk berjarak sangat strategis—hanya beberapa menit dari Gerbang Tol Bocimi (Caringin/Cigombong), dekat dengan Danau Lido, pusat rafting Caringin, serta jalur agrowisata kopi dan buah.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/akomodasi"
                className="inline-block px-6 py-2.5 rounded-md bg-[#2d5026] hover:bg-[#223e1d] text-white text-xs sm:text-sm font-medium tracking-wide shadow transition-colors"
              >
                Pilihan Akomodasi Cijeruk
              </Link>
            </div>
          </div>

          {/* Photo Right */}
          <div className="relative rounded-lg overflow-hidden border border-stone-200 shadow-sm aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] group order-1 lg:order-2">
            <img
              src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1000&q=80"
              alt="Villa & Resort Pemandangan Alam di Cijeruk"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded text-white text-xs">
              Villa & Glamping Cijeruk
            </div>
          </div>
        </div>

        {/* Story 3: Narrative Visitor Welcome Lore (Bibury style closing narrative) */}
        <div className="pt-6 border-t border-stone-200/80 max-w-4xl mx-auto space-y-4 text-stone-600 text-sm sm:text-base leading-relaxed text-justify sm:text-center">
          <p>
            Desa Cijeruk menyambut ribuan wisatawan setiap tahunnya, baik wisatawan lokal dari wilayah Jabodetabek maupun pelancong dari berbagai penjuru nusantara. Keindahan alam Cijeruk mencakup barisan perbukitan yang hijau subur, aliran sungai jernih berbatu alami di kaki lembah, serta aroma khas perkebunan cengkeh dan kopi lereng Salak yang menyejukkan.
          </p>
          <p>
            Aliran air jernih yang mengalir melintasi desa berasal langsung dari mata air vulkanik pegunungan Gunung Salak, menjadikannya lanskap alami yang asri dan menenteramkan bagi siapa pun yang melangkahkan kaki di Desa Cijeruk.
          </p>
        </div>
      </div>
    </section>
  );
}
