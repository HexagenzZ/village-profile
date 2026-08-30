"use client";

import { CATEGORIES } from "@/data/categories";
import { Mountain, Bed, UtensilsCrossed, Compass, ShoppingBag, Grid } from "lucide-react";
import { DestinationCategory } from "@/lib/types";

interface CategoryFilterProps {
  selectedCategory: DestinationCategory | "all";
  onSelectCategory: (category: DestinationCategory | "all") => void;
}

const iconMap = {
  all: Grid,
  wisata: Mountain,
  penginapan: Bed,
  kuliner: UtensilsCrossed,
  sekitar: Compass,
  umkm: ShoppingBag,
};

export function CategoryFilter({
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  const options = [
    { id: "all", name: "Semua Kategori" },
    ...CATEGORIES.map((c) => ({ id: c.id, name: c.name })),
  ];

  return (
    <div className="w-full overflow-x-auto scrollbar-hide py-2 px-4 sm:px-8 md:px-12">
      <div className="flex items-center space-x-2.5 min-w-max">
        {options.map((opt) => {
          const isSelected = selectedCategory === opt.id;
          const Icon = iconMap[opt.id as keyof typeof iconMap] || Grid;

          return (
            <button
              key={opt.id}
              onClick={() => onSelectCategory(opt.id as DestinationCategory | "all")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "bg-emerald-500 text-neutral-950 shadow-lg shadow-emerald-950/60 scale-105"
                  : "bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800"
              }`}
            >
              <Icon className={`w-4 h-4 ${isSelected ? "text-neutral-950" : "text-emerald-400"}`} />
              {opt.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
