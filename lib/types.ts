export type DestinationCategory =
  | "wisata"
  | "penginapan"
  | "kuliner"
  | "sekitar"
  | "umkm";

export type AccommodationType = "villa" | "resort" | "glamping" | "hotel" | "homestay";

export interface DestinationItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: DestinationCategory;
  subCategory: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  location: {
    address: string;
    area: string; // e.g. "Desa Cijeruk", "Caringin", "Lido"
    mapsUrl: string;
    distanceFromCenter?: string; // e.g. "5 menit dari Balai Desa Cijeruk"
  };
  coverImage: string;
  gallery: string[];
  videoPreviewUrl?: string;
  description: string;
  highlights: string[];
  facilities: string[];
  contact: {
    phone?: string;
    whatsapp?: string;
    instagram?: string;
    website?: string;
  };
  openingHours: string;
  isFeatured?: boolean;
  isTrending?: boolean;
  isOutsideCijeruk?: boolean;
  badge?: string; // e.g. "🔥 Top Pick", "🏔️ View Gunung Salak", "☕ Hits"
  tags: string[];
}

export interface VillageProfile {
  name: string;
  district: string;
  regency: string;
  province: string;
  overview: string;
  history: string;
  vision: string;
  mission: string[];
  statistics: {
    population: number;
    households: number;
    areaSizeKm2: number;
    altitudeMeters: number;
    rtCount: number;
    rwCount: number;
  };
  geography: {
    north: string;
    south: string;
    east: string;
    west: string;
    climate: string;
  };
  villageHead: {
    name: string;
    title: string;
    period: string;
    message: string;
    photoUrl: string;
  };
  office: {
    address: string;
    phone: string;
    email: string;
    operatingHours: string;
    mapsEmbedUrl: string;
  };
}

export interface FunFact {
  id: string;
  title: string;
  fact: string;
  category: string;
  iconName?: string;
}

export interface CategoryMeta {
  id: DestinationCategory;
  name: string;
  title: string;
  description: string;
  icon: string;
  accentColor: string;
  href: string;
}
