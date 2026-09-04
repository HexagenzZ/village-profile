import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Building2,
  ShieldAlert,
  ArrowLeft,
  Users,
} from "lucide-react";
import { ContactForm } from "@/components/shared/ContactForm";

export const metadata = {
  title: "Hubungi Kami • Pemerintah & Wisata Desa Cijeruk",
  description:
    "Kontak resmi kantor Desa Cijeruk, posko informasi wisata, narahubung mahasiswa KKN, dan nomor darurat wilayah.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#fafaf8] text-stone-900 pt-28 sm:pt-36 pb-24 px-4 sm:px-8 md:px-12 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Back Link */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-stone-500 hover:text-[#2d5026] transition py-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>

        {/* Header */}
        <div className="border-b border-stone-200 pb-8 space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2d5026]/10 text-[#2d5026] text-xs font-bold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5" />
            <span>Kontak & Layanan Informasi</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold text-stone-900 tracking-tight leading-tight">
            Hubungi Pemerintah Desa & Tim Pengelola Wisata Cijeruk
          </h1>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Punya pertanyaan seputar panduan wisata, perizinan kunjungan rombongan, reservasi akomodasi, atau keperluan KKN? Silakan hubungi kami melalui saluran resmi berikut.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Details Cards */}
          <div className="lg:col-span-1 space-y-4">
            {/* Kantor Desa */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
              <div className="flex items-center gap-3 border-b border-stone-100 pb-3">
                <div className="w-10 h-10 rounded-xl bg-[#2d5026]/10 text-[#2d5026] flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif-title font-bold text-stone-900 text-base">
                    Kantor Desa Cijeruk
                  </h3>
                  <p className="text-xs text-stone-500">Pemerintah Desa</p>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-stone-600">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#2d5026] shrink-0 mt-0.5" />
                  <span>Jl. Kolonel Bustomi No. 12, Desa Cijeruk, Kec. Cijeruk, Kab. Bogor 16740</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#2d5026] shrink-0" />
                  <span>Senin - Jumat: 08.00 - 16.00 WIB</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#2d5026] shrink-0" />
                  <span>(0251) 8234-900</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#2d5026] shrink-0" />
                  <span>pemdes@cijeruk-bogor.desa.id</span>
                </div>
              </div>
            </div>

            {/* Posko Wisata & Narahubung KKN */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
              <div className="flex items-center gap-3 border-b border-stone-100 pb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif-title font-bold text-stone-900 text-base">
                    Posko KKN & Info Wisata
                  </h3>
                  <p className="text-xs text-stone-500">Pendampingan Pariwisata</p>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-stone-600">
                <p className="text-xs text-stone-500 leading-relaxed">
                  Layanan informasi bagi rombongan wisatawan, komunitas pecinta alam, dan penelitian mahasiswa.
                </p>
                <a
                  href="https://wa.me/6281234567890?text=Halo%20Admin%20Wisata%20Cijeruk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Posko Wisata</span>
                </a>
              </div>
            </div>

            {/* Hotline Darurat */}
            <div className="bg-rose-50 p-5 rounded-2xl border border-rose-200 text-xs text-rose-900 space-y-2">
              <div className="flex items-center gap-2 font-bold text-rose-800">
                <ShieldAlert className="w-4 h-4" />
                <span>Nomor Darurat Penting</span>
              </div>
              <ul className="space-y-1 text-rose-800/90 text-xs">
                <li>• Puskesmas Cijeruk: (0251) 8234-118</li>
                <li>• Polsek Cijeruk: (0251) 8234-110</li>
                <li>• Babinsa & Bhabinkamtibmas Desa: 0812-9988-7766</li>
              </ul>
            </div>
          </div>

          {/* Contact Inquiry Form */}
          <div className="lg:col-span-2 bg-white p-6 sm:p-10 rounded-2xl border border-stone-200 shadow-xs space-y-6">
            <div className="space-y-1 border-b border-stone-100 pb-4">
              <h2 className="text-2xl font-serif-title font-bold text-stone-900">
                Kirim Pesan atau Pertanyaan
              </h2>
              <p className="text-xs sm:text-sm text-stone-500">
                Isi formulir di bawah ini. Pesan Anda akan diteruskan ke tim pengelola desa.
              </p>
            </div>

            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
