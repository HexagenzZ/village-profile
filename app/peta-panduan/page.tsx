import { MapPin, Navigation, Car, Bus, Train, CloudSun, Clock, ArrowLeft, ShieldAlert, CheckCircle, HelpCircle } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Peta & Panduan Wisatawan Desa Cijeruk",
  description: "Panduan transportasi rute menuju Cijeruk Bogor, peta lokasi wisata, tips cuaca, dan etika berkunjung.",
};

const FAQS = [
  {
    q: "Berapa lama perjalanan dari Jakarta ke Cijeruk?",
    a: "Sekitar 1 hingga 1.5 jam melalui Tol Jagorawi lanjut Tol Bocimi dengan keluar di Gerbang Tol Caringin/Cigombong.",
  },
  {
    q: "Apakah jalan menuju wisata Cijeruk dapat dilalui mobil?",
    a: "Ya, akses jalan utama beraspal dan dapat dilalui mobil pribadi, elf, maupun bus pariwisata medium hingga ke area parkir utama.",
  },
  {
    q: "Kapan waktu terbaik berkunjung ke Cijeruk?",
    a: "Pagi hari (pukul 06.00 - 10.00) untuk menyaksikan pemandangan jelas Gunung Salak tanpa kabut, atau sore menjelang malam untuk menikmati panorama city light di Bukit Alesano.",
  },
  {
    q: "Apakah perlu reservasi sebelum menginap di villa atau glamping?",
    a: "Sangat disarankan melakukan reservasi terlebih dahulu, terutama saat akhir pekan atau musim liburan panjang.",
  },
];

export default function PetaPanduanPage() {
  return (
    <main className="min-h-screen bg-[#fafaf8] text-stone-900 pt-24 pb-20 px-4 sm:px-8 md:px-12">
      <div className="max-w-6xl mx-auto space-y-10">
        <Link
          href="/"
          className="inline-flex items-center text-xs font-semibold text-stone-500 hover:text-[#2d5026] transition"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Kembali ke Beranda
        </Link>

        {/* Page Header */}
        <div className="border-b border-stone-200 pb-6">
          <div className="flex items-center gap-2 text-[#2d5026] text-xs font-bold uppercase tracking-wider mb-1">
            <Navigation className="w-4 h-4" />
            Panduan Lengkap Wisatawan
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif-title font-semibold text-stone-900 tracking-tight">
            Peta Lokasi & Akses Menuju Cijeruk
          </h1>
          <p className="text-sm text-stone-600 max-w-2xl mt-1.5 leading-relaxed">
            Petunjuk rute perjalanan darat, peta interaktif, estimasi waktu tempuh dari Jakarta & Bandung, serta tips berkunjung ke lereng Gunung Salak.
          </p>
        </div>

        {/* Map & Coordinates Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-xl overflow-hidden bg-white border border-stone-200 p-2 shadow-sm flex flex-col">
            <div className="relative w-full h-[400px] sm:h-[450px] rounded-lg overflow-hidden bg-stone-100">
              <iframe
                title="Peta Desa Cijeruk Bogor"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.775891398865!2d106.7766!3d-6.6853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69cd1536ff4b5f%3A0x7d6a541604a11f2a!2sCijeruk%2C%20Kec.%20Cijeruk%2C%20Kabupaten%20Bogor%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
              />
            </div>
            <div className="p-4 flex items-center justify-between text-xs text-stone-600">
              <span className="flex items-center gap-1.5 font-medium">
                <MapPin className="w-4 h-4 text-[#2d5026]" />
                Koordinat: 6°41&apos;07.1&quot;S 106°46&apos;35.8&quot;E
              </span>
              <a
                href="https://maps.google.com/?q=Desa+Cijeruk+Bogor"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2d5026] hover:underline font-semibold"
              >
                Buka di Google Maps App ↗
              </a>
            </div>
          </div>

          {/* Quick Weather & Distance Info */}
          <div className="space-y-4">
            <div className="p-6 rounded-xl bg-white border border-stone-200 space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-[#2d5026] font-semibold text-xs uppercase tracking-wider">
                <CloudSun className="w-4 h-4" />
                Cuaca & Waktu Terbaik
              </div>
              <h3 className="text-lg font-serif-title font-semibold text-stone-900">Suhu Rata-rata 20°C - 26°C</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Pagi hari (06:00 - 10:00) biasanya cerah dan sangat ideal untuk foto panorama Gunung Salak. Sore hari berpotensi turun kabut atau hujan ringan pegunungan.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-stone-200 space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-[#2d5026] font-semibold text-xs uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                Estimasi Waktu Tempuh
              </div>
              <ul className="space-y-2 text-xs text-stone-600">
                <li className="flex justify-between border-b border-stone-100 pb-1.5">
                  <span>Dari Jakarta (via Tol Bocimi)</span>
                  <span className="font-semibold text-stone-900">± 1 - 1.5 Jam</span>
                </li>
                <li className="flex justify-between border-b border-stone-100 pb-1.5">
                  <span>Dari Stasiun Bogor Kota</span>
                  <span className="font-semibold text-stone-900">± 45 Menit</span>
                </li>
                <li className="flex justify-between">
                  <span>Dari Bandung (via Tol Jagorawi)</span>
                  <span className="font-semibold text-stone-900">± 2.5 - 3 Jam</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Transportation Options */}
        <section className="space-y-6 pt-4">
          <h2 className="text-2xl font-serif-title font-semibold text-stone-900">Pilihan Transportasi Menuju Cijeruk</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Kendaraan Pribadi */}
            <div className="p-6 rounded-xl bg-white border border-stone-200 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-[#2d5026]/10 text-[#2d5026] flex items-center justify-center">
                <Car className="w-5 h-5" />
              </div>
              <h3 className="text-base font-serif-title font-semibold text-stone-900">Kendaraan Pribadi (Mobil / Motor)</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Rute tercepat melalui <strong>Tol Jagorawi</strong> lanjut ke <strong>Tol Bocimi (Bogor - Ciawi - Sukabumi)</strong>. Ambil <strong>Exit Tol Caringin / Cigombong</strong>, kemudian belok ke arah Cijeruk via Jl. Kolonel Bustomi (hanya 10-15 menit dari gerbang tol).
              </p>
            </div>

            {/* Kereta Api (KRL & Pangrango) */}
            <div className="p-6 rounded-xl bg-white border border-stone-200 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-[#2d5026]/10 text-[#2d5026] flex items-center justify-center">
                <Train className="w-5 h-5" />
              </div>
              <h3 className="text-base font-serif-title font-semibold text-stone-900">Kereta Api (KRL / KA Pangrango)</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Naik KRL Commuter Line turun di <strong>Stasiun Bogor</strong>, lalu lanjut transportasi online (Gojek/Grab) langsung ke Cijeruk. Atau naik KA Pangrango jurusan Sukabumi dan turun di <strong>Stasiun Maseng / Cigombong</strong> yang sangat dekat ke Cijeruk.
              </p>
            </div>

            {/* Angkutan Umum */}
            <div className="p-6 rounded-xl bg-white border border-stone-200 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-[#2d5026]/10 text-[#2d5026] flex items-center justify-center">
                <Bus className="w-5 h-5" />
              </div>
              <h3 className="text-base font-serif-title font-semibold text-stone-900">Angkutan Umum / Bus</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Dari Terminal Baranangsiang Bogor atau Sukasari, naik angkot jurusan <strong>Ciapus - Cijeruk (No. 03 / 04)</strong> atau angkot jurusan <strong>Ciawi - Cicurug</strong> turun di pertigaan Caringin/Maseng, lanjut ojek pangkalan/online menuju Cijeruk.
              </p>
            </div>
          </div>
        </section>

        {/* Tips & Visitor Guidelines */}
        <section className="p-8 rounded-xl bg-white border border-stone-200 space-y-4 shadow-xs">
          <h2 className="text-xl font-serif-title font-semibold text-stone-900 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-[#2d5026]" />
            Tips Penting Bagi Wisatawan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-stone-600 pt-2">
            <div className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-[#2d5026] shrink-0 mt-0.5" />
              <span>Pastikan rem dan kondisi kendaraan prima karena terdapat tanjakan khas lereng pegunungan.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-[#2d5026] shrink-0 mt-0.5" />
              <span>Bawa jaket atau pakaian hangat terutama jika berencana camping di Bukit Alesano atau menginap di villa.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-[#2d5026] shrink-0 mt-0.5" />
              <span>Sediakan uang tunai pecahan kecil untuk tiket masuk curug/spot wisata lokal atau jajan di warung warga.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-[#2d5026] shrink-0 mt-0.5" />
              <span>Selalu jaga kebersihan alam dan bawa kantong sampah mandiri saat berkemah atau trekking.</span>
            </div>
          </div>
        </section>

        {/* FAQ Section (Cijeruk FAQs) */}
        <section id="faq" className="p-8 rounded-xl bg-white border border-stone-200 space-y-6 shadow-xs scroll-mt-24">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#2d5026]" />
            <h2 className="text-xl font-serif-title font-semibold text-stone-900">
              Cijeruk FAQs (Tanya Jawab Seputar Cijeruk)
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {FAQS.map((faq, i) => (
              <div key={i} className="p-4 rounded-lg bg-stone-50 border border-stone-200 space-y-2">
                <h3 className="text-sm font-semibold text-stone-900 font-serif-title">
                  {faq.q}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed font-light">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
