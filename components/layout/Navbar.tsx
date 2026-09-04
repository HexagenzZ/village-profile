"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Menu,
  X,
  ChevronDown,
  ExternalLink,
  BookOpen,
  ArrowRight,
  Landmark,
} from "lucide-react";
import { SearchModal } from "@/components/shared/SearchModal";
import { useScrollPosition } from "@/hooks/useScrollPosition";

interface DropdownItem {
  label: string;
  href: string;
  isExternal?: boolean;
  description?: string;
}

interface NavItem {
  label: string;
  href: string;
  dropdown?: DropdownItem[];
}

export function Navbar() {
  const pathname = usePathname();
  const { isScrolled } = useScrollPosition();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
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

  // Top Tier Dropdown
  const DATA_RESMI_DROPDOWN: DropdownItem[] = [
    {
      label: "Bestie",
      href: "https://bogorkab.go.id/",
      isExternal: true,
      description: "Portal profil wilayah resmi Kabupaten Bogor",
    },
    {
      label: "Situs Resmi Desa",
      href: "https://cijeruk-bogor.desa.id/",
      isExternal: true,
      description: "Portal layanan & administrasi resmi desa.id",
    },
    {
      label: "Profil Desa",
      href: "/profil-desa",
      isExternal: false,
      description: "Ringkasan data, infografis & kependudukan",
    },
  ];

  // Main Nav (Bottom Tier)
  const MAIN_NAV_ITEMS: NavItem[] = [
    {
      label: "Beranda",
      href: "/",
    },
    {
      label: "Wisata & Rekreasi",
      href: "/wisata",
      dropdown: [
        { label: "Jelajah Alam", href: "/wisata?sub=jelajah-alam", description: "Curug alami & keasrian hutan lereng Salak" },
        { label: "Outdoor Activity", href: "/wisata?sub=outdoor-activity", description: "Trekking perkebunan kopi & agrowisata" },
        { label: "Aktivitas Keluarga dan Anak", href: "/wisata?sub=aktivitas-keluarga", description: "Petik nanas madu & taman edukasi" },
        { label: "Spot Foto & Instagrammable", href: "/wisata?sub=spot-foto", description: "Panorama city light & sunrise Alesano" },
      ],
    },
    {
      label: "Kuliner",
      href: "/kuliner",
      dropdown: [
        { label: "Open Now", href: "/kuliner?sub=open-now", description: "Tempat kuliner yang sedang buka hari ini" },
        { label: "Wajib Coba", href: "/kuliner?sub=wajib-coba", description: "Nasi liwet Sunda gurih & hidangan legendaris" },
        { label: "Cafe & Resto Recommended", href: "/kuliner?sub=cafe-resto", description: "Kedai kopi lereng Salak & resto panorama" },
      ],
    },
    {
      label: "Akomodasi",
      href: "/akomodasi",
      dropdown: [
        { label: "Villa & Resort", href: "/akomodasi?sub=villa-resort", description: "Private pool & villa keluarga view Salak" },
        { label: "Camping Ground", href: "/akomodasi?sub=camping-ground", description: "Tenda dome & glamping di atas awan" },
      ],
    },
    {
      label: "Sejarah & Tokoh",
      href: "/sejarah-tokoh",
      dropdown: [
        { label: "Tempat Bersejarah", href: "/sejarah-tokoh?tab=sejarah", description: "Situs mata air & jejak perkebunan kopi kuno" },
        { label: "Tokoh Berpengaruh", href: "/sejarah-tokoh?tab=tokoh", description: "Sesepuh adat, pelestari alam & penggerak desa" },
      ],
    },
    {
      label: "Terdekat",
      href: "/terdekat",
    },
    {
      label: "Contact Us",
      href: "/contact",
    },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 font-sans">
        {/* ========================================================================= */}
        {/* NAVBAR ATAS (Utility Bar - Tampilan Kecil / Muted)                         */}
        {/* Sesuai spesifikasi:                                                       */}
        {/* 1. Data & Profil Resmi (dropdown: Bestie, Situs Resmi Desa, Profil Desa)   */}
        {/* 2. Blog (link langsung)                                                   */}
        {/* 3. Search icon (trigger modal)                                            */}
        {/* ========================================================================= */}
        <div className="bg-[#f3f0e8] text-stone-600 border-b border-stone-300/70 text-[11px] font-medium tracking-wide">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-1.5 flex items-center justify-between">
            {/* Left note */}
            <div className="hidden sm:flex items-center space-x-2 text-stone-500">
              <span className="inline-block w-2 h-2 rounded-full bg-[#2d5026]" />
              <span>Portal Profil & Potensi Desa Cijeruk (Proyek KKN)</span>
            </div>

            {/* Right: Exactly Top Tier 3 Items */}
            <div className="flex items-center space-x-5 ml-auto text-[11px]">
              {/* 1. Data & Profil Resmi (Dropdown) */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("data-resmi")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() =>
                    setOpenDropdown(openDropdown === "data-resmi" ? null : "data-resmi")
                  }
                  className={`flex items-center gap-1 uppercase tracking-wider py-0.5 transition-colors cursor-pointer ${
                    openDropdown === "data-resmi" || pathname === "/profil-desa"
                      ? "text-[#2d5026] font-bold"
                      : "text-stone-700 hover:text-[#2d5026]"
                  }`}
                >
                  <Landmark className="w-3.5 h-3.5 text-[#2d5026]" />
                  <span>Data & Profil Resmi</span>
                  <ChevronDown
                    className={`w-3 h-3 text-stone-500 transition-transform ${
                      openDropdown === "data-resmi" ? "rotate-180 text-[#2d5026]" : ""
                    }`}
                  />
                </button>

                {openDropdown === "data-resmi" && (
                  <div
                    className="absolute right-0 top-full mt-1 w-64 bg-white border border-stone-200 rounded-lg shadow-xl py-1.5 z-50 animate-fadeIn"
                    onMouseEnter={() => handleMouseEnter("data-resmi")}
                    onMouseLeave={handleMouseLeave}
                  >
                    {DATA_RESMI_DROPDOWN.map((sub, idx) =>
                      sub.isExternal ? (
                        <a
                          key={idx}
                          href={sub.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setOpenDropdown(null)}
                          className="flex items-start justify-between px-4 py-2 hover:bg-stone-50 transition group/item"
                        >
                          <div>
                            <div className="text-xs font-semibold text-stone-800 group-hover/item:text-[#2d5026] flex items-center gap-1.5">
                              <span>{sub.label}</span>
                              <ExternalLink className="w-3 h-3 text-stone-400 group-hover/item:text-[#2d5026]" />
                            </div>
                            <p className="text-[10px] text-stone-500 font-normal mt-0.5">
                              {sub.description}
                            </p>
                          </div>
                        </a>
                      ) : (
                        <Link
                          key={idx}
                          href={sub.href}
                          onClick={() => setOpenDropdown(null)}
                          className="block px-4 py-2 hover:bg-stone-50 transition group/item"
                        >
                          <div className="text-xs font-semibold text-stone-800 group-hover/item:text-[#2d5026] flex items-center justify-between">
                            <span>{sub.label}</span>
                            <ArrowRight className="w-3 h-3 text-stone-400 group-hover/item:text-[#2d5026] group-hover/item:translate-x-0.5 transition-transform" />
                          </div>
                          <p className="text-[10px] text-stone-500 font-normal mt-0.5">
                            {sub.description}
                          </p>
                        </Link>
                      )
                    )}
                  </div>
                )}
              </div>

              {/* 2. Blog (Link Langsung Tanpa Dropdown) */}
              <Link
                href="/blog"
                className={`flex items-center gap-1 uppercase tracking-wider transition-colors py-0.5 ${
                  pathname.startsWith("/blog")
                    ? "text-[#2d5026] font-bold"
                    : "text-stone-700 hover:text-[#2d5026]"
                }`}
              >
                <BookOpen className="w-3 h-3 text-[#2d5026]" />
                <span>Blog</span>
              </Link>

              {/* 3. Search Icon (Trigger Modal) */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-1 text-stone-700 hover:text-[#2d5026] transition-colors p-1 cursor-pointer"
                title="Cari Destinasi, Kuliner, atau Cerita Cijeruk"
                aria-label="Cari"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden md:inline text-[10px] uppercase tracking-wider">Cari</span>
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* NAVBAR BAWAH (Main Nav - Tampilan Besar / Branded)                        */}
        {/* Sesuai spesifikasi:                                                       */}
        {/* 1. Beranda (link langsung)                                                */}
        {/* 2. Wisata & Rekreasi (dropdown)                                           */}
        {/* 3. Kuliner (dropdown)                                                     */}
        {/* 4. Akomodasi (dropdown)                                                   */}
        {/* 5. Sejarah & Tokoh (dropdown)                                             */}
        {/* 6. Terdekat (link langsung)                                               */}
        {/* 7. Contact Us (link langsung)                                             */}
        {/* ========================================================================= */}
        <div
          className={`bg-white/98 backdrop-blur-md border-b border-stone-200/90 transition-all duration-300 ${
            isScrolled ? "shadow-md py-2.5" : "py-3 sm:py-3.5"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
            {/* Branded Identity */}
            <Link href="/" className="group flex items-center gap-2">
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-serif-title tracking-tight font-bold text-stone-900 group-hover:text-[#2d5026] transition-colors leading-none">
                  DESA CIJERUK
                </span>
                <span className="text-[9px] tracking-[0.22em] font-medium text-stone-500 uppercase mt-0.5">
                  BOGOR • JAWA BARAT
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1 text-stone-800 font-medium text-[13px] xl:text-[14px]">
              {MAIN_NAV_ITEMS.map((item) => {
                const isActive =
                  item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                const isDropdownOpen = openDropdown === item.label;

                if (!item.dropdown) {
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`px-3 py-2 rounded-md transition-colors relative ${
                        isActive
                          ? "text-[#2d5026] font-semibold"
                          : "text-stone-700 hover:text-[#2d5026] hover:bg-stone-50"
                      }`}
                    >
                      {isActive && (
                        <span className="absolute -top-[14px] left-3 right-3 h-0.5 bg-[#2d5026]" />
                      )}
                      <span>{item.label}</span>
                    </Link>
                  );
                }

                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={item.href}
                      className={`inline-flex items-center gap-1 px-3 py-2 rounded-md transition-colors relative ${
                        isActive
                          ? "text-[#2d5026] font-semibold"
                          : "text-stone-700 hover:text-[#2d5026] hover:bg-stone-50"
                      } ${isDropdownOpen ? "text-[#2d5026]" : ""}`}
                    >
                      {isActive && (
                        <span className="absolute -top-[14px] left-3 right-3 h-0.5 bg-[#2d5026]" />
                      )}
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 text-stone-400 ${
                          isDropdownOpen ? "rotate-180 text-[#2d5026]" : ""
                        }`}
                      />
                    </Link>

                    {isDropdownOpen && (
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

            {/* Right Action: Mobile Menu Trigger only — Admin panel accessed directly via /admin URL */}
            <div className="flex items-center">
              {/* Mobile Menu Trigger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-800 transition cursor-pointer"
                aria-label="Buka Menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE DRAWER NAVIGATION                                                  */}
        {/* ========================================================================= */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-stone-200 max-h-[85vh] overflow-y-auto px-4 py-5 space-y-5 shadow-2xl animate-fadeIn text-stone-800">
            {/* Top Tier Section on Mobile */}
            <div className="bg-stone-50 p-3 rounded-xl border border-stone-200/80 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block px-1">
                Data & Informasi Resmi
              </span>
              <div className="space-y-1">
                {DATA_RESMI_DROPDOWN.map((item, idx) =>
                  item.isExternal ? (
                    <a
                      key={idx}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-stone-700 hover:bg-stone-100 transition"
                    >
                      <span>{item.label}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
                    </a>
                  ) : (
                    <Link
                      key={idx}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-stone-700 hover:bg-stone-100 transition"
                    >
                      <span>{item.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                    </Link>
                  )
                )}
                <Link
                  href="/blog"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-stone-700 hover:bg-stone-100 transition"
                >
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#2d5026]" />
                    Blog Desa
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                </Link>
              </div>
            </div>

            {/* Main Navigation Links on Mobile */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 px-1 block">
                Menu Utama Cijeruk
              </span>
              {MAIN_NAV_ITEMS.map((item) => (
                <div key={item.label} className="space-y-1">
                  <div className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-stone-50 font-semibold text-xs">
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-stone-900"
                    >
                      {item.label}
                    </Link>
                  </div>
                  {item.dropdown && (
                    <div className="pl-4 pr-2 space-y-1 border-l-2 border-[#2d5026]/40 ml-3">
                      {item.dropdown.map((sub, sIdx) => (
                        <Link
                          key={sIdx}
                          href={sub.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block px-2.5 py-1.5 text-xs text-stone-600 hover:text-[#2d5026] hover:bg-stone-50 rounded"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="pt-2 border-t border-stone-200 flex gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-stone-100 text-stone-800 text-xs font-semibold"
              >
                <Search className="w-3.5 h-3.5 text-[#2d5026]" />
                <span>Pencarian</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Instant Search Modal with Fuse.js */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
