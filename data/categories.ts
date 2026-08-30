import { CategoryMeta } from "@/lib/types";

export const CATEGORIES: CategoryMeta[] = [
  {
    id: "wisata",
    name: "Wisata Alam",
    title: "Eksplorasi Alam & Curug",
    description: "Pesona alam asri di kaki Gunung Salak, curug alami, dan agrowisata sejuk.",
    icon: "Mountain",
    accentColor: "from-emerald-600 to-teal-800",
    href: "/wisata",
  },
  {
    id: "penginapan",
    name: "Penginapan",
    title: "Villa, Resort & Glamping",
    description: "Tempat istirahat nyaman berpanorama megah Gunung Salak dan udara segar pegunungan.",
    icon: "Bed",
    accentColor: "from-amber-600 to-orange-800",
    href: "/penginapan",
  },
  {
    id: "kuliner",
    name: "Kuliner & Kafe",
    title: "Rasa Otentik & Kopi Lereng Salak",
    description: "Santapan khas Sunda, kafe estetik dengan view pegunungan, dan kopi lokal Cijeruk.",
    icon: "UtensilsCrossed",
    accentColor: "from-rose-600 to-red-800",
    href: "/kuliner",
  },
  {
    id: "sekitar",
    name: "Sekitar Cijeruk",
    title: "Destinasi Terdekat Sekitar Cijeruk",
    description: "Rekomendasi spot menarik di kawasan tetangga: Caringin, Cigombong, Lido, dan Kaki Salak.",
    icon: "Compass",
    accentColor: "from-blue-600 to-indigo-800",
    href: "/sekitar-cijeruk",
  },
  {
    id: "umkm",
    name: "UMKM & Belanja",
    title: "Oleh-Oleh & Produk Lokal",
    description: "Dukung produk warga: hasil bumi segar, olahan nanas, kopi robusta/arabika, dan kerajinan lokal.",
    icon: "ShoppingBag",
    accentColor: "from-purple-600 to-fuchsia-800",
    href: "/umkm-belanja",
  },
];
