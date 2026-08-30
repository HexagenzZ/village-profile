import Link from "next/link";
import { Mountain, MapPin, Phone, Mail, Clock } from "lucide-react";
import { SITE_CONFIG } from "@/data/siteConfig";
import { VILLAGE_PROFILE } from "@/data/villageProfile";

export function Footer() {
  return (
    <footer className="bg-[#141414] text-stone-300 text-xs border-t border-stone-800">
      {/* Upper Village Info Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Col 1: Village Identity */}
        <div className="space-y-3">
          <h3 className="text-sm font-serif-title tracking-wider text-white uppercase font-bold">
            Desa Cijeruk Bogor
          </h3>
          <p className="text-stone-400 text-xs leading-relaxed">
            Portal panduan resmi wisata alam, akomodasi penginapan lereng Salak, sentra kuliner tradisional & UMKM Desa Cijeruk, Kecamatan Cijeruk, Kabupaten Bogor, Jawa Barat.
          </p>
          <div className="pt-2 flex items-center space-x-3">
            <a
              href={SITE_CONFIG.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-white transition"
              aria-label="Instagram"
            >
              Instagram
            </a>
            <span className="text-stone-600">•</span>
            <a
              href={SITE_CONFIG.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-white transition"
              aria-label="YouTube"
            >
              YouTube
            </a>
            <span className="text-stone-600">•</span>
            <a
              href={SITE_CONFIG.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-white transition"
              aria-label="Facebook"
            >
              Facebook
            </a>
          </div>
        </div>

        {/* Col 2: Navigasi Utama */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Navigasi Panduan
          </h4>
          <ul className="space-y-1.5 text-stone-400">
            <li>
              <Link href="/penginapan" className="hover:text-white transition">
                Where to stay / Penginapan di Cijeruk
              </Link>
            </li>
            <li>
              <Link href="/wisata" className="hover:text-white transition">
                Attractions / Wisata Alam & Curug
              </Link>
            </li>
            <li>
              <Link href="/kuliner" className="hover:text-white transition">
                Food and drink / Kuliner & Kafe
              </Link>
            </li>
            <li>
              <Link href="/sekitar-cijeruk" className="hover:text-white transition">
                Local area / Destinasi Sekitar Cijeruk
              </Link>
            </li>
            <li>
              <Link href="/umkm-belanja" className="hover:text-white transition">
                Produk Lokal & Oleh-oleh Cijeruk
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Layanan Desa */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Informasi Desa
          </h4>
          <ul className="space-y-1.5 text-stone-400">
            <li>
              <Link href="/profil-desa" className="hover:text-white transition">
                Profil & Sejarah Desa Cijeruk
              </Link>
            </li>
            <li>
              <Link href="/profil-desa#visi-misi" className="hover:text-white transition">
                Visi, Misi & Struktur Desa
              </Link>
            </li>
            <li>
              <Link href="/peta-panduan" className="hover:text-white transition">
                Peta Desa & Rute Transportasi
              </Link>
            </li>
            <li>
              <Link href="/peta-panduan#faq" className="hover:text-white transition">
                Cijeruk FAQs & Tanya Jawab
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Kantor & Kontak Darurat */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Kantor & Layanan
          </h4>
          <div className="space-y-1 text-stone-400 text-xs">
            <p className="flex items-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#4a8041] shrink-0 mt-0.5" />
              <span>{VILLAGE_PROFILE.office.address}</span>
            </p>
            <p className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#4a8041] shrink-0" />
              <span>{VILLAGE_PROFILE.office.phone}</span>
            </p>
            <p className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#4a8041] shrink-0" />
              <span>{VILLAGE_PROFILE.office.operatingHours}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Bibury-style Horizontal Links Strip */}
      <div className="border-t border-stone-800 py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-stone-400 text-[11px]">
          <Link href="/penginapan" className="hover:text-stone-200 transition">
            Where to stay
          </Link>
          <span className="text-stone-700 hidden sm:inline">|</span>
          <Link href="/kuliner" className="hover:text-stone-200 transition">
            Food and drink
          </Link>
          <span className="text-stone-700 hidden sm:inline">|</span>
          <Link href="/wisata" className="hover:text-stone-200 transition">
            Things to do in Cijeruk
          </Link>
          <span className="text-stone-700 hidden sm:inline">|</span>
          <Link href="/wisata" className="hover:text-stone-200 transition">
            Photos of Cijeruk
          </Link>
          <span className="text-stone-700 hidden sm:inline">|</span>
          <Link href="/peta-panduan" className="hover:text-stone-200 transition">
            Parking & Transport in Cijeruk
          </Link>
          <span className="text-stone-700 hidden sm:inline">|</span>
          <Link href="/peta-panduan#faq" className="hover:text-stone-200 transition">
            Cijeruk FAQs
          </Link>
          <span className="text-stone-700 hidden sm:inline">|</span>
          <Link href="/sekitar-cijeruk" className="hover:text-stone-200 transition">
            Local area
          </Link>
          <span className="text-stone-700 hidden sm:inline">|</span>
          <Link href="/profil-desa" className="hover:text-stone-200 transition">
            Sitemap / Links
          </Link>
          <span className="text-stone-700 hidden sm:inline">|</span>
          <Link href="/peta-panduan" className="hover:text-stone-200 transition">
            Privacy Policy
          </Link>
        </div>
      </div>

      {/* Copyright Notice */}
      <div className="border-t border-stone-900 bg-[#0d0d0d] py-4 px-4 sm:px-8 text-center text-[11px] text-stone-400">
        <p>
          © Copyright 2010-{new Date().getFullYear()}, Cijeruk Village & Tourism Portal. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
