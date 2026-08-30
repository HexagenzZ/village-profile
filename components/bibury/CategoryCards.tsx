"use client";

import Link from "next/link";

interface CategoryCardItem {
  id: string;
  title: string;
  buttonLabel: string;
  href: string;
  image: string;
  subtitle: string;
}

const CATEGORY_ITEMS: CategoryCardItem[] = [
  {
    id: "places-to-stay",
    title: "Places to stay",
    buttonLabel: "Penginapan di Cijeruk",
    href: "/penginapan",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    subtitle: "Villa eksklusif, resort alami, & glamping berlatar Gunung Salak",
  },
  {
    id: "cijeruk-attractions",
    title: "Cijeruk attractions",
    buttonLabel: "Wisata & Daya Tarik",
    href: "/wisata",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    subtitle: "Bukit Alesano, Curug Putri Pelangi, camping, & agrowisata",
  },
  {
    id: "places-to-eat",
    title: "Places to eat and drink",
    buttonLabel: "Kuliner & Kafe Cijeruk",
    href: "/kuliner",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
    subtitle: "Kopi Robusta Salak, Nanas Madu, nasi liwet Sunda, & kafe estetik",
  },
];

export function CategoryCards() {
  return (
    <section className="w-full bg-[#f6f5f0] py-12 sm:py-16 px-4 sm:px-8 border-b border-stone-200/80">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CATEGORY_ITEMS.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-lg overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
            >
              {/* Photo Box */}
              <div className="aspect-[4/3] w-full overflow-hidden bg-stone-100 relative group">
                <img
                  src={cat.image}
                  alt={cat.buttonLabel}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Action Button Box - Exactly Bibury centered button style */}
              <div className="p-5 flex flex-col items-center justify-center text-center flex-1 space-y-3 bg-[#fafaf8]">
                <p className="text-xs text-stone-500 font-normal line-clamp-2">
                  {cat.subtitle}
                </p>
                <Link
                  href={cat.href}
                  className="inline-block px-6 py-2.5 rounded-md bg-[#2d5026] hover:bg-[#223e1d] text-white text-xs sm:text-sm font-medium tracking-wide shadow transition-colors"
                >
                  {cat.buttonLabel}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
