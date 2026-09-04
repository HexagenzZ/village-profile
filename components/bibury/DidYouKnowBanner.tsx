"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

export function DidYouKnowBanner() {
  return (
    <section className="relative w-full bg-[#18181b] text-white py-16 sm:py-20 px-4 sm:px-8 overflow-hidden border-b border-stone-800">
      {/* Background Graphic / Overlay */}
      <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(#4a8041_1px,transparent_1px)] [background-size:20px_20px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black/90 pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto space-y-8 text-stone-200 text-center sm:text-left">
        {/* Section Heading - Bibury Style */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 text-[#68b35c] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Trivia & Wawasan</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif-title font-semibold text-white tracking-tight">
            Cijeruk facts – Did you know?
          </h2>
        </div>

        {/* Fact Paragraphs */}
        <div className="space-y-4 text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
          <p>
            Nama <strong>Cijeruk</strong> berasal dari gabungan kata bahasa Sunda <em>&quot;Ci&quot;</em> (aliran air/sungai) dan <em>&quot;Jeruk&quot;</em>, merujuk pada wilayah lembah subur yang sejak masa lampau dialiri sumber mata air melimpah dari lereng Gunung Salak.
          </p>
          <p>
            Kawasan Cijeruk merupakan salah satu zona resapan air alami terbaik di Jawa Barat. Tanah vulkanik yang gembur menghasilkan varietas <strong>Nanas Madu Cijeruk</strong> yang terkenal manis tanpa rasa gatal di lidah, serta biji kopi Robusta pegunungan bercita rasa rempah khas.
          </p>
          <p>
            Dari ketinggian bukit di Cijeruk (&plusmn;700–900 mdpl), pengunjung dapat menyaksikan pemandangan <em>city light</em> gemerlap Kota Bogor dan Depok secara langsung tanpa terhalang polusi cahaya kota.
          </p>
          <p className="pt-2 text-stone-400">
            Untuk pertanyaan yang sering diajukan mengenai akomodasi, parkir, dan rute perjalanan menuju Cijeruk, silakan kunjungi laman{" "}
            <Link
              href="/profil-desa"
              className="text-[#68b35c] hover:text-[#88d97a] underline font-medium"
            >
              Profil & Panduan Desa Cijeruk
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
