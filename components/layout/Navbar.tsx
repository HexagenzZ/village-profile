"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Menu,
  X,
  ChevronDown,
  CloudSun,
  Building2,
  Newspaper,
  Users,
  FileText,
  Landmark,
  PhoneCall,
  Sparkles,
  Mountain,
  Bed,
  UtensilsCrossed,
  Calendar,
  Compass,
  ShoppingBag,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import { SITE_CONFIG } from "@/data/siteConfig";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { SearchModal } from "@/components/shared/SearchModal";
import { DetailModal } from "@/components/bibury/BiburyDetailModal";
import { DestinationItem } from "@/lib/types";

interface NavDropdownItem {
  label: string;
  href: string;
  description?: string;
}

interface NavMenuItem {
  label: string;
  href: string;
  dropdown?: NavDropdownItem[];
}

const MAIN_NAV_ITEMS: NavMenuItem[] = [
  {
    label: "Wisata & Rekreasi",
    href: "/wisata",
    dropdown: [
      { label: "Wisata Alam & Curug", href: "/wisata", description: "Air terjun alami berair jernih dan lembah hijau" },
      { label: "Spot Camping & Panorama", href: "/wisata", description: "Bukit Alesano, sunrise & city light Bogor" },
      { label: "Agrowisata & Petik Buah", href: "/wisata", description: "Kebun nanas madu & perkebunan kopi Salak" },
      { label: "Rekreasi Edukasi & Keluarga", href: "/wisata", description: "Taman wisata alam dan edukasi pertanian" },
      { label: "Semua Destinasi Wisata →", href: "/wisata", description: "Lihat daftar lengkap tempat wisata Cijeruk" },
    ],
  },
  {
    label: "Penginapan",
    href: "/penginapan",
    dropdown: [
      { label: "Villa Eksklusif & Keluarga", href: "/penginapan", description: "Private pool berpanorama Gunung Salak" },
      { label: "Glamping & Camping Ground", href: "/penginapan", description: "Tenda mewah menyatu dengan alam bebas" },
      { label: "Resort & Hotel Alam", href: "/penginapan", description: "Fasilitas lengkap untuk liburan & gathering" },
      { label: "Homestay Warga Desa", href: "/penginapan", description: "Penginapan nyaman khas keramahan desa" },
      { label: "Semua Pilihan Penginapan →", href: "/penginapan", description: "Temukan akomodasi terbaik di Cijeruk" },
    ],
  },
  {
    label: "Kuliner & Kafe",
    href: "/kuliner",
    dropdown: [
      { label: "Saung Liwet Tradisional Sunda", href: "/kuliner", description: "Lesehan di atas kolam ikan air pegunungan" },
      { label: "Kafe & Kedai Kopi Lereng Salak", href: "/kuliner", description: "Kopi Robusta lokal racikan barista handal" },
      { label: "Sentra Nanas Madu & Durian", href: "/kuliner", description: "Hasil bumi manis legit langsung dari kebun" },
      { label: "Semua Kuliner & Kafe →", href: "/kuliner", description: "Eksplorasi rasa autentik khas Cijeruk" },
    ],
  },
  {
    label: "Hal Menarik & Acara",
    href: "/#welcome-section",
    dropdown: [
      { label: "Spot Foto & Sunrise Terbaik", href: "/wisata", description: "Waktu terbaik fotografi di perbukitan" },
      { label: "Fakta Unik & Trivia Cijeruk", href: "/#welcome-section", description: "Did you know seputar kekayaan desa" },
      { label: "Etika & Panduan Wisatawan", href: "/peta-panduan", description: "Tips ramah lingkungan & kenyamanan" },
      { label: "Warta & Agenda Desa", href: "/berita", description: "Kabar terbaru dan agenda kegiatan desa" },
    ],
  },
  {
    label: "Kawasan Sekitar",
    href: "/sekitar-cijeruk",
    dropdown: [
      { label: "Danau Lido & Kawasan KEK", href: "/sekitar-cijeruk", description: "Danau alami dan resort terdekat" },
      { label: "Rafting Cisadane Caringin", href: "/sekitar-cijeruk", description: "Petualangan arung jeram seru" },
      { label: "Kawasan Tamansari & Curug Nangka", href: "/sekitar-cijeruk", description: "Wisata alam tetangga lereng Salak" },
      { label: "Lihat Destinasi Sekitar →", href: "/sekitar-cijeruk", description: "Lengkapi rencana liburan Anda" },
    ],
  },
  {
    label: "UMKM & Belanja",
    href: "/umkm-belanja",
  },
];

export function Navbar() {
  const pathname = usePathname();
  const { isScrolled } = useScrollPosition();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedDestination, setSelectedDestination] =
    useState<DestinationItem | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 font-sans">
        {/* ========================================================================= */}
        {/* TOP TIER: GOVERNMENT & CITIZEN PORTAL UTILITY BAR (Woodstock Style)       */}
        {/* ========================================================================= */}
        <div className="bg-[#ede9df] text-stone-700 border-b border-stone-300/80 text-[11px] font-medium tracking-wide">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-1.5 flex items-center justify-between">
            {/* Left: Weather & Village Status Widget */}
            <div className="hidden md:flex items-center space-x-3 text-stone-600">
              <span className="flex items-center gap-1.5">
                <CloudSun className="w-3.5 h-3.5 text-[#2d5026]" />
                <strong className="text-stone-800">22°C</strong> Cijeruk, Kaki G. Salak
              </span>
              <span className="text-stone-400">•</span>
              <span className="flex items-center gap-1 text-[11px]">
                <Building2 className="w-3 h-3 text-[#2d5026]" />
                Kantor Desa Buka: 08.00 - 16.00 WIB
              </span>
            </div>

            {/* Right: Government Links (Berita, Kependudukan, Layanan, APBDes, Search) */}
            <div className="flex items-center space-x-4 sm:space-x-5 ml-auto text-[11px]">
              <Link
                href="/berita"
                className={`flex items-center gap-1 uppercase tracking-wider transition-colors py-0.5 ${
                  pathname === "/berita"
                    ? "text-[#2d5026] font-bold"
                    : "text-stone-700 hover:text-[#2d5026]"
                }`}
              >
                <Newspaper className="w-3 h-3 text-[#2d5026]" />
                <span>Berita Desa</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#2d5026] inline-block" />
              </Link>

              <Link
                href="/profil-desa#kependudukan"
                className={`hidden sm:flex items-center gap-1 uppercase tracking-wider transition-colors py-0.5 ${
                  pathname === "/profil-desa"
                    ? "text-[#2d5026] font-bold"
                    : "text-stone-700 hover:text-[#2d5026]"
                }`}
              >
                <Users className="w-3 h-3 text-[#2d5026]" />
                <span>Profil & Kependudukan</span>
              </Link>

              <Link
                href="/profil-desa#layanan-warga"
                className="hidden md:flex items-center gap-1 uppercase tracking-wider text-stone-700 hover:text-[#2d5026] transition-colors py-0.5"
              >
                <FileText className="w-3 h-3 text-[#2d5026]" />
                <span>Layanan Warga</span>
              </Link>

              <Link
                href="/profil-desa#apbdes"
                className="hidden lg:flex items-center gap-1 uppercase tracking-wider text-stone-700 hover:text-[#2d5026] transition-colors py-0.5"
              >
                <Landmark className="w-3 h-3 text-[#2d5026]" />
                <span>Transparansi APBDes</span>
              </Link>

              {/* Quick Search Icon */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-1 text-stone-700 hover:text-[#2d5026] transition-colors p-1 cursor-pointer"
                title="Cari Destinasi atau Informasi Desa"
                aria-label="Cari"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px] uppercase tracking-wider">Cari</span>
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MAIN TIER: PRIMARY TOURISM, STAY & DINING NAVBAR WITH DROPDOWNS           */}
        {/* ========================================================================= */}
        <div
          className={`bg-white/98 backdrop-blur-md border-b border-stone-200/90 transition-shadow duration-300 ${
            isScrolled ? "shadow-md py-2.5" : "py-3.5"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
            {/* Brand Typography */}
            <Link href="/" className="group flex items-center gap-2">
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-serif-title tracking-tight font-semibold text-stone-900 group-hover:text-[#2d5026] transition-colors leading-none">
                  CIJERUK
                </span>
                <span className="text-[9px] tracking-[0.2em] font-medium text-stone-500 uppercase mt-0.5">
                  BOGOR • JAWA BARAT
                </span>
              </div>
            </Link>

            {/* Center: Desktop Navigation with Interactive Dropdowns */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 text-sm font-medium text-stone-800">
              {MAIN_NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                const isDropdownOpen = openDropdown === item.label;

                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => item.dropdown && handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={item.href}
                      className={`inline-flex items-center gap-1 px-3 py-2 rounded-md transition-colors relative tracking-normal text-[13px] xl:text-[14px] ${
                        isActive
                          ? "text-[#2d5026] font-semibold"
                          : "text-stone-700 hover:text-[#2d5026]"
                      } ${isDropdownOpen ? "text-[#2d5026]" : ""}`}
                    >
                      {/* Top Active Bar Indicator (Woodstock Style) */}
                      {isActive && (
                        <span className="absolute -top-[14px] left-3 right-3 h-0.5 bg-[#2d5026]" />
                      )}
                      <span>{item.label}</span>
                      {item.dropdown && (
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 text-stone-400 ${
                            isDropdownOpen ? "rotate-180 text-[#2d5026]" : ""
                          }`}
                        />
                      )}
                    </Link>

                    {/* Dropdown Floating Card - Woodstock Style */}
                    {item.dropdown && isDropdownOpen && (
                      <div
                        className="absolute top-full left-0 w-64 bg-white border border-stone-200 rounded-lg shadow-xl py-2 z-50 animate-fadeIn"
                        onMouseEnter={() => handleMouseEnter(item.label)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {item.dropdown.map((sub, idx) => (
                          <Link
                            key={idx}
                            href={sub.href}
                            onClick={() => setOpenDropdown(null)}
                            className="block px-4 py-2.5 hover:bg-stone-50 transition-colors group/sub"
                          >
                            <div className="text-xs font-semibold text-stone-800 group-hover/sub:text-[#2d5026] transition-colors flex items-center justify-between">
                              <span>{sub.label}</span>
                              <ArrowRight className="w-3 h-3 opacity-0 group-hover/sub:opacity-100 group-hover/sub:translate-x-0.5 transition-all text-[#2d5026]" />
                            </div>
                            {sub.description && (
                              <p className="text-[11px] text-stone-500 font-normal mt-0.5 line-clamp-1">
                                {sub.description}
                              </p>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Right: "Plan Your Visit" Primary Action Button (Woodstock Style) */}
            <div className="flex items-center space-x-3">
              <Link
                href="/peta-panduan"
                className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-[#2d5026] hover:bg-[#223e1d] text-white text-xs sm:text-sm font-medium tracking-wide shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                Plan Your Visit
              </Link>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-800 transition"
                aria-label="Buka Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE ACCORDION DRAWER MENU                                              */}
        {/* ========================================================================= */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-stone-200 max-h-[80vh] overflow-y-auto px-4 py-4 space-y-4 shadow-2xl animate-fadeIn text-stone-800">
            {/* Mobile Plan Your Visit CTA */}
            <div className="pt-1">
              <Link
                href="/peta-panduan"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-md bg-[#2d5026] text-white text-xs font-semibold shadow-xs text-center"
              >
                Plan Your Visit / Panduan Wisata →
              </Link>
            </div>

            {/* Main Tourism Navigation Links */}
            <div className="space-y-1 border-b border-stone-200 pb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 px-2 block mb-1">
                Eksplorasi & Wisata Cijeruk
              </span>
              {MAIN_NAV_ITEMS.map((item) => (
                <div key={item.label} className="space-y-1">
                  <div className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-stone-50">
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-xs font-semibold text-stone-800"
                    >
                      {item.label}
                    </Link>
                  </div>
                  {item.dropdown && (
                    <div className="pl-4 pr-2 space-y-1 border-l-2 border-[#2d5026]/30 ml-3">
                      {item.dropdown.map((sub, sIdx) => (
                        <Link
                          key={sIdx}
                          href={sub.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block px-2 py-1.5 text-xs text-stone-600 hover:text-[#2d5026]"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Government & Citizen Portal Links on Mobile */}
            <div className="space-y-1 pt-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 px-2 block mb-1">
                Pemerintahan & Layanan Warga
              </span>
              <Link
                href="/berita"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium text-stone-700 hover:bg-stone-50"
              >
                <Newspaper className="w-4 h-4 text-[#2d5026]" />
                <span>Berita & Pengumuman Desa</span>
              </Link>
              <Link
                href="/profil-desa#kependudukan"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium text-stone-700 hover:bg-stone-50"
              >
                <Users className="w-4 h-4 text-[#2d5026]" />
                <span>Profil & Data Kependudukan</span>
              </Link>
              <Link
                href="/profil-desa#layanan-warga"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium text-stone-700 hover:bg-stone-50"
              >
                <FileText className="w-4 h-4 text-[#2d5026]" />
                <span>Layanan Surat & Administrasi Warga</span>
              </Link>
              <Link
                href="/profil-desa#apbdes"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium text-stone-700 hover:bg-stone-50"
              >
                <Landmark className="w-4 h-4 text-[#2d5026]" />
                <span>Transparansi Anggaran APBDes</span>
              </Link>
              <Link
                href="/profil-desa#kontak-kantor"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium text-stone-700 hover:bg-stone-50"
              >
                <PhoneCall className="w-4 h-4 text-[#2d5026]" />
                <span>Kontak Kantor Desa & Darurat</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Instant Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectDestination={(dest) => setSelectedDestination(dest)}
      />

      {/* Quick Detail Modal from Search */}
      <DetailModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
      />
    </>
  );
}

