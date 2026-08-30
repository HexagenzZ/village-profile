"use client";

import { FUN_FACTS } from "@/data/funFacts";
import { Sparkles, HelpCircle, Droplets, Eye, Coffee } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Droplets,
  Sparkles,
  Eye,
  Coffee,
};

export function QuickFactBanner() {
  return (
    <section className="px-4 sm:px-8 md:px-12 py-10">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-950/80 via-neutral-900 to-neutral-950 border border-emerald-800/40 p-6 sm:p-10 shadow-2xl">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex items-center gap-2.5 mb-6">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Tahukah Anda tentang Cijeruk?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400">
              Fakta unik, kekayaan alam, dan sejarah Desa Cijeruk di lereng Gunung Salak
            </p>
          </div>
        </div>

        {/* Facts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FUN_FACTS.map((fact) => {
            const Icon = (fact.iconName && iconMap[fact.iconName]) || Sparkles;
            return (
              <div
                key={fact.id}
                className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800/90 hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/30">
                    {fact.category}
                  </span>
                  <Icon className="w-4 h-4 text-neutral-400 group-hover:text-emerald-400 transition" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1.5 group-hover:text-emerald-300 transition">
                  {fact.title}
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">{fact.fact}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
