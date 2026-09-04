export interface LocationInfo {
  namaTempat: string;
  alamat: string;
  latitude?: number;
  longitude?: number;
}

export type WisataSubCategory =
  | 'jelajah-alam'
  | 'outdoor-activity'
  | 'aktivitas-keluarga'
  | 'spot-foto';

export interface WisataItem {
  id: string;
  slug: string;
  judul: string;
  subKategori: WisataSubCategory;
  subKategoriLabel: string;
  featured: boolean;
  tagline: string;
  coverImage: string;
  gallery: string[];
  deskripsi: string;
  lokasi: LocationInfo;
  hargaTiket: string;
  jamBuka: string;
  rating: number;
  fasilitas: string[];
  highlights: string[];
}

export type KulinerSubCategory =
  | 'open-now'
  | 'wajib-coba'
  | 'cafe-resto';

export interface KulinerItem {
  id: string;
  slug: string;
  judul: string;
  subKategori: KulinerSubCategory;
  subKategoriLabel: string;
  featured: boolean;
  tagline: string;
  coverImage: string;
  gallery: string[];
  deskripsi: string;
  lokasi: LocationInfo;
  jamBuka: string; // e.g. "08:00"
  jamTutup: string; // e.g. "22:00"
  hargaKisaran: string; // e.g. "Rp 15.000 - Rp 45.000"
  menuFavorit: { namaMenu: string; harga?: string }[];
  rating: number;
}

export type AkomodasiSubCategory =
  | 'villa-resort'
  | 'camping-ground';

export interface AkomodasiItem {
  id: string;
  slug: string;
  judul: string;
  subKategori: AkomodasiSubCategory;
  subKategoriLabel: string;
  featured: boolean;
  tagline: string;
  coverImage: string;
  gallery: string[];
  deskripsi: string;
  lokasi: LocationInfo;
  hargaPerMalam: string;
  kapasitas: string;
  kontakBooking: {
    whatsapp?: string;
    telepon?: string;
    bookingUrl?: string;
  };
  fasilitas: string[];
  rating: number;
}

export interface SejarahItem {
  id: string;
  slug: string;
  judul: string;
  era: string;
  featured: boolean;
  ringkasan: string;
  coverImage: string;
  gallery: string[];
  deskripsi: string;
  lokasi: LocationInfo;
  faktaMenarik: string[];
}

export interface TokohItem {
  id: string;
  slug: string;
  nama: string;
  peran: string;
  featured: boolean;
  coverImage: string;
  ringkasanBio: string;
  biografiLengkap: string;
  lokasi: LocationInfo;
  kontribusi: string[];
}

export interface TerdekatItem {
  id: string;
  slug: string;
  judul: string;
  kategori: string;
  jarakWaktu: string;
  tipeTrip: string;
  featured: boolean;
  coverImage: string;
  gallery: string[];
  tagline: string;
  deskripsi: string;
  lokasi: LocationInfo;
  ruteAkses: string;
  hargaTiket: string;
}

export interface BlogPostItem {
  id: string;
  slug: string;
  judul: string;
  kategori: 'cerita-feature' | 'kegiatan-pengumuman' | 'tips-wisata';
  kategoriLabel: string;
  featured: boolean;
  penulis: string;
  publishedAt: string;
  waktuBaca: string;
  coverImage: string;
  ringkasan: string;
  konten: string;
  tags: string[];
}

export interface ProfilDesaItem {
  namaDesa: string;
  ringkasanUmum: string;
  sejarahDesa: string;
  sumberResmi: {
    portalBestieBogor: string;
    situsResmiDesaId: string;
  };
  statistik: {
    jumlahPenduduk: number;
    jumlahKk: number;
    luasWilayahKm2: number;
    ketinggianMeter: number;
    jumlahRt: number;
    jumlahRw: number;
  };
  apbdesRingkasan: {
    tahunAnggaran: string;
    totalPendapatan: string;
    totalBelanja: string;
  };
  kontakKantor: {
    alamat: string;
    telepon: string;
    email: string;
    jamLayanan: string;
  };
}

export interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'wisata' | 'kuliner' | 'akomodasi' | 'sejarah' | 'tokoh' | 'terdekat' | 'blog';
  categoryLabel: string;
  href: string;
  image?: string;
  badge?: string;
}

// =========================================================================
// BACKWARD-COMPATIBLE / TEMPLATE TYPES
// =========================================================================

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
    area: string;
    mapsUrl: string;
    distanceFromCenter?: string;
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
  badge?: string;
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
