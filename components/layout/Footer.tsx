import Link from "next/link";
import { MapPin, Phone, Clock } from "lucide-react";
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
            Portal profil dan potensi desa fokus pada wisata alam, kuliner, akomodasi, dan sejarah/tokoh Desa Cijeruk, Kecamatan Cijeruk, Kabupaten Bogor, Jawa Barat. Proyek KKN Kolaboratif.
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
            Eksplorasi Desa
          </h4>
          <ul className="space-y-1.5 text-stone-400">
            <li>
              <Link href="/wisata" className="hover:text-white transition">
                Wisata & Rekreasi Alam
              </Link>
            </li>
            <li>
              <Link href="/kuliner" className="hover:text-white transition">
                Kuliner Khas & Kafe Lereng Salak
              </Link>
            </li>
            <li>
              <Link href="/akomodasi" className="hover:text-white transition">
                Akomodasi (Villa & Camping)
              </Link>
            </li>
            <li>
              <Link href="/sejarah-tokoh" className="hover:text-white transition">
                Sejarah & Tokoh Berpengaruh
              </Link>
            </li>
            <li>
              <Link href="/terdekat" className="hover:text-white transition">
                Destinasi Sekitar (Day-Trip)
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Layanan & Informasi Resmi */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Informasi & Data
          </h4>
          <ul className="space-y-1.5 text-stone-400">
            <li>
              <Link href="/profil-desa" className="hover:text-white transition">
                Profil Desa & Infografis Kependudukan
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-white transition">
                Blog & Catatan KKN
              </Link>
            </li>
            <li>
              <a
                href="https://bogorkab.go.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition flex items-center gap-1"
              >
                <span>Portal Bestie Kab. Bogor</span>
                <span className="text-[10px]">↗</span>
              </a>
            </li>
            <li>
              <a
                href="https://cijeruk-bogor.desa.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition flex items-center gap-1"
              >
                <span>Situs Resmi Desa.id</span>
                <span className="text-[10px]">↗</span>
              </a>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition">
                Hubungi Kami & Posko KKN
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

      {/* Horizontal Links Strip */}
      <div className="border-t border-stone-800 py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-stone-400 text-[11px]">
          <Link href="/wisata" className="hover:text-stone-200 transition">
            Wisata
          </Link>
          <span className="text-stone-700 hidden sm:inline">|</span>
          <Link href="/kuliner" className="hover:text-stone-200 transition">
            Kuliner
          </Link>
          <span className="text-stone-700 hidden sm:inline">|</span>
          <Link href="/akomodasi" className="hover:text-stone-200 transition">
            Akomodasi
          </Link>
          <span className="text-stone-700 hidden sm:inline">|</span>
          <Link href="/sejarah-tokoh" className="hover:text-stone-200 transition">
            Sejarah & Tokoh
          </Link>
          <span className="text-stone-700 hidden sm:inline">|</span>
          <Link href="/terdekat" className="hover:text-stone-200 transition">
            Terdekat
          </Link>
          <span className="text-stone-700 hidden sm:inline">|</span>
          <Link href="/blog" className="hover:text-stone-200 transition">
            Blog
          </Link>
          <span className="text-stone-700 hidden sm:inline">|</span>
          <Link href="/profil-desa" className="hover:text-stone-200 transition">
            Profil Resmi
          </Link>
          <span className="text-stone-700 hidden sm:inline">|</span>
          <Link href="/contact" className="hover:text-stone-200 transition">
            Kontak
          </Link>
        </div>
      </div>

      {/* Copyright Notice */}
      <div className="border-t border-stone-900 bg-[#0d0d0d] py-4 px-4 sm:px-8 text-center text-[11px] text-stone-400">
        <p>
          © {new Date().getFullYear()} Website Profil Desa Cijeruk • Disusun oleh Tim KKN Mahasiswa untuk Pemerintah Desa Cijeruk, Kecamatan Cijeruk, Kabupaten Bogor.
        </p>
      </div>
    </footer>
  );
}
