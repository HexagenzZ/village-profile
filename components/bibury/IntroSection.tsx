"use client";

export function IntroSection() {
  return (
    <section id="welcome-section" className="w-full bg-[#fdfcf9] py-14 sm:py-20 px-4 sm:px-8 border-b border-stone-200/60">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        {/* Main Heading - Exact Bibury Style */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif-title font-semibold text-stone-800 tracking-tight leading-tight">
          Cijeruk, nikmati pesona dan ketenangan alam di kaki Gunung Salak
        </h2>

        {/* Editorial Body Text */}
        <div className="space-y-4 text-stone-600 text-sm sm:text-base leading-relaxed font-normal text-justify sm:text-center">
          <p>
            Desa Cijeruk merupakan kawasan perbukitan asri di selatan Bogor yang berada tepat di lereng megah Gunung Salak. Dikenal dengan hamparan perbukitan hijau, udara sejuk yang menyegarkan, serta aliran mata air pegunungan yang jernih, Cijeruk adalah pelarian sempurna dari hiruk-pikuk perkotaan.
          </p>
          <p>
            Mulai dari pemandangan spektakuler <em>city light</em> dan <em>sunrise</em> di Bukit Alesano, segarnya air terjun alami Curug Putri Pelangi, hingga hamparan kebun kopi dan nanas madu legendaris, Cijeruk menyajikan keasrian alam tropis yang berpadu selaras dengan kehangatan budaya warga desa.
          </p>
          <p>
            Tak heran jika Cijeruk kini menjadi destinasi favorit untuk staycation di villa bernuansa alam, glamping tepi perbukitan, serta rekreasi keluarga yang tak terlupakan. Kunjungi Cijeruk dan temukan ketenangan sejati Anda di sini.
          </p>
        </div>
      </div>
    </section>
  );
}
