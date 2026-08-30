"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import { DestinationItem } from "@/lib/types";
import { DestinationCard } from "./DestinationCard";

interface ContentRowProps {
  title: string;
  subtitle?: string;
  items: DestinationItem[];
  categoryHref?: string;
  onSelectDestination: (dest: DestinationItem) => void;
}

export function ContentRow({
  title,
  subtitle,
  items,
  categoryHref,
  onSelectDestination,
}: ContentRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftArrow(scrollLeft > 20);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
    }
  };

  const slide = (direction: "left" | "right") => {
    if (rowRef.current) {
      const { clientWidth } = rowRef.current;
      const scrollAmount = direction === "left" ? -clientWidth * 0.75 : clientWidth * 0.75;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <section className="relative py-4 sm:py-6 space-y-3 group/row">
      {/* Row Header */}
      <div className="flex items-end justify-between px-4 sm:px-8 md:px-12">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            {title}
          </h2>
          {subtitle && <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">{subtitle}</p>}
        </div>

        {categoryHref && (
          <Link
            href={categoryHref}
            className="flex items-center text-xs sm:text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition group/link shrink-0"
          >
            Lihat Semua
            <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>

      {/* Row Content with Smooth Scrolling & Netflix Navigation Chevrons */}
      <div className="relative">
        {/* Left Arrow Button */}
        {showLeftArrow && (
          <button
            onClick={() => slide("left")}
            className="absolute left-0 top-0 bottom-0 z-30 w-12 sm:w-16 bg-gradient-to-r from-black/90 to-transparent flex items-center justify-center text-white opacity-0 group-hover/row:opacity-100 transition-all duration-300 hover:scale-110"
            aria-label="Geser ke kiri"
          >
            <div className="p-2 rounded-full bg-neutral-900/80 border border-neutral-700 backdrop-blur-md shadow-lg">
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </button>
        )}

        {/* Horizontal Card Track */}
        <div
          ref={rowRef}
          onScroll={handleScroll}
          className="flex space-x-4 sm:space-x-5 overflow-x-auto scrollbar-hide px-4 sm:px-8 md:px-12 py-2 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {items.map((item) => (
            <div key={item.id} className="snap-start">
              <DestinationCard destination={item} onSelect={onSelectDestination} />
            </div>
          ))}
        </div>

        {/* Right Arrow Button */}
        {showRightArrow && (
          <button
            onClick={() => slide("right")}
            className="absolute right-0 top-0 bottom-0 z-30 w-12 sm:w-16 bg-gradient-to-l from-black/90 to-transparent flex items-center justify-center text-white opacity-0 group-hover/row:opacity-100 transition-all duration-300 hover:scale-110"
            aria-label="Geser ke kanan"
          >
            <div className="p-2 rounded-full bg-neutral-900/80 border border-neutral-700 backdrop-blur-md shadow-lg">
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </button>
        )}
      </div>
    </section>
  );
}
