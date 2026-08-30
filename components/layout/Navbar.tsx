"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
import { SITE_CONFIG } from "@/data/siteConfig";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { SearchModal } from "@/components/shared/SearchModal";
import { DetailModal } from "@/components/bibury/BiburyDetailModal";
import { DestinationItem } from "@/lib/types";

export function Navbar() {
  const pathname = usePathname();
  const { isScrolled } = useScrollPosition();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] =
    useState<DestinationItem | null>(null);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm py-3 text-stone-900"
            : "bg-gradient-to-b from-black/75 via-black/35 to-transparent py-4 text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Brand Logo - Bibury Style */}
          <Link href="/" className="group flex items-center gap-2">
            <span
              className={`text-2xl sm:text-3xl font-serif-title tracking-tight font-normal transition-colors ${
                isScrolled
                  ? "text-stone-900 group-hover:text-[#2d5026]"
                  : "text-white group-hover:text-stone-200 drop-shadow-sm"
              }`}
            >
              Cijeruk
            </span>
          </Link>

          {/* Desktop Navigation Links - Bibury Clean Style */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-7 text-sm">
            {SITE_CONFIG.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors py-1 relative tracking-wide ${
                    isScrolled
                      ? isActive
                        ? "text-[#2d5026] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#2d5026]"
                        : "text-stone-700 hover:text-[#2d5026]"
                      : isActive
                      ? "text-white font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-white"
                      : "text-stone-100 hover:text-white drop-shadow-sm"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions: Search Button & Mobile Menu */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs transition cursor-pointer ${
                isScrolled
                  ? "bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300"
                  : "bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30"
              }`}
              title="Cari Destinasi"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cari...</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition ${
                isScrolled
                  ? "bg-stone-100 text-stone-800 hover:bg-stone-200"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-stone-200 px-4 py-4 space-y-1 shadow-lg animate-fadeIn text-stone-800">
            {SITE_CONFIG.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-sm transition ${
                    isActive
                      ? "bg-[#2d5026]/10 text-[#2d5026] font-semibold"
                      : "text-stone-700 hover:bg-stone-100"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
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
