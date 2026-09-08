/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  WisataItem,
  KulinerItem,
  AkomodasiItem,
  SejarahItem,
  TokohItem,
  TerdekatItem,
  BlogPostItem,
  ProfilDesaItem,
} from '@/lib/types';

// =========================================================================
// REST HELPER — fetch ke Payload REST API (reliable di Vercel serverless)
// =========================================================================
// Di runtime Vercel, VERCEL_URL ter-set otomatis. Di dev, pakai localhost.
const BASE_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

function getFotoUrl(doc: any): string {
  if (doc.fotoUrl) return doc.fotoUrl;
  if (doc.foto && doc.foto.url) return doc.foto.url;
  if (doc.heroImage && doc.heroImage.url) return doc.heroImage.url;
  return '';
}

async function fetchCollection(collection: string): Promise<any[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/${collection}?limit=100&depth=1`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 60 }, // ISR 60s di production
    });
    const data = await res.json();
    return data.docs || [];
  } catch (err) {
    console.error(`Error fetching ${collection}:`, err);
    return [];
  }
}

async function fetchCollectionBySlug(collection: string, slug: string): Promise<any | null> {
  try {
    const res = await fetch(`${BASE_URL}/api/${collection}?limit=1&where[slug][equals]=${slug}&depth=1`);
    const data = await res.json();
    return (data.docs && data.docs[0]) || null;
  } catch (err) {
    console.error(`Error fetching ${collection} by slug:`, err);
    return null;
  }
}

// === WISATA ===
export async function getWisataList(): Promise<WisataItem[]> {
  const docs = await fetchCollection('wisata');
  return docs.map((doc: any) => ({
    id: String(doc.id),
    slug: doc.slug,
    judul: doc.judul,
    subKategori: doc.subKategori,
    subKategoriLabel:
      doc.subKategori === 'jelajah-alam'
        ? 'Jelajah Alam'
        : doc.subKategori === 'outdoor-activity'
        ? 'Outdoor Activity'
        : doc.subKategori === 'aktivitas-keluarga'
        ? 'Aktivitas Keluarga dan Anak'
        : 'Spot Foto & Instagrammable',
    featured: Boolean(doc.featured),
    tagline: doc.tagline || '',
    coverImage: getFotoUrl(doc),
    gallery: getFotoUrl(doc) ? [getFotoUrl(doc)] : [],
    deskripsi: doc.deskripsi,
    lokasi: doc.lokasi || { namaTempat: 'Desa Cijeruk', alamat: 'Kecamatan Cijeruk, Bogor' },
    hargaTiket: doc.hargaTiket || 'Gratis / Menyesuaikan',
    jamBuka: doc.jamBuka || 'Buka Setiap Hari',
    rating: Number(doc.rating) || 4.8,
    fasilitas: Array.isArray(doc.fasilitas)
      ? doc.fasilitas.map((f: any) => (typeof f === 'string' ? f : f.item))
      : [],
    highlights: Array.isArray(doc.highlights)
      ? doc.highlights.map((h: any) => (typeof h === 'string' ? h : h.item))
      : [],
  }));
}

export async function getWisataBySlug(slug: string): Promise<WisataItem | null> {
  const found = await fetchCollectionBySlug('wisata', slug);
  const docs = await fetchCollection('wisata');
  const doc: any = found || docs.find((d) => d.slug === slug);
  if (!doc) return null;
  return {
    id: String(doc.id),
    slug: doc.slug,
    judul: doc.judul,
    subKategori: doc.subKategori,
    subKategoriLabel:
      doc.subKategori === 'jelajah-alam'
        ? 'Jelajah Alam'
        : doc.subKategori === 'outdoor-activity'
        ? 'Outdoor Activity'
        : doc.subKategori === 'aktivitas-keluarga'
        ? 'Aktivitas Keluarga dan Anak'
        : 'Spot Foto & Instagrammable',
    featured: Boolean(doc.featured),
    tagline: doc.tagline || '',
    coverImage: getFotoUrl(doc),
    gallery: getFotoUrl(doc) ? [getFotoUrl(doc)] : [],
    deskripsi: doc.deskripsi,
    lokasi: doc.lokasi || { namaTempat: 'Desa Cijeruk', alamat: 'Kecamatan Cijeruk, Bogor' },
    hargaTiket: doc.hargaTiket || 'Gratis / Menyesuaikan',
    jamBuka: doc.jamBuka || 'Buka Setiap Hari',
    rating: Number(doc.rating) || 4.8,
    fasilitas: Array.isArray(doc.fasilitas)
      ? doc.fasilitas.map((f: any) => (typeof f === 'string' ? f : f.item))
      : [],
    highlights: Array.isArray(doc.highlights)
      ? doc.highlights.map((h: any) => (typeof h === 'string' ? h : h.item))
      : [],
  };
}

export async function getFeaturedWisata(): Promise<WisataItem[]> {
  const docs = await fetchCollection('wisata');
  const list = docs.map((doc: any) => ({
    id: String(doc.id),
    slug: doc.slug,
    judul: doc.judul,
    subKategori: doc.subKategori,
    subKategoriLabel:
      doc.subKategori === 'jelajah-alam'
        ? 'Jelajah Alam'
        : doc.subKategori === 'outdoor-activity'
        ? 'Outdoor Activity'
        : doc.subKategori === 'aktivitas-keluarga'
        ? 'Aktivitas Keluarga dan Anak'
        : 'Spot Foto & Instagrammable',
    featured: Boolean(doc.featured),
    tagline: doc.tagline || '',
    coverImage: getFotoUrl(doc),
    gallery: getFotoUrl(doc) ? [getFotoUrl(doc)] : [],
    deskripsi: doc.deskripsi,
    lokasi: doc.lokasi || { namaTempat: 'Desa Cijeruk', alamat: 'Kecamatan Cijeruk, Bogor' },
    hargaTiket: doc.hargaTiket || 'Gratis / Menyesuaikan',
    jamBuka: doc.jamBuka || 'Buka Setiap Hari',
    rating: Number(doc.rating) || 4.8,
    fasilitas: Array.isArray(doc.fasilitas)
      ? doc.fasilitas.map((f: any) => (typeof f === 'string' ? f : f.item))
      : [],
    highlights: Array.isArray(doc.highlights)
      ? doc.highlights.map((h: any) => (typeof h === 'string' ? h : h.item))
      : [],
  }));
  const featured = list.filter((item) => item.featured);
  return featured.length > 0 ? featured : list.slice(0, 3);
}

// === KULINER ===
export async function getKulinerList(): Promise<KulinerItem[]> {
  const docs = await fetchCollection('kuliner');
  return docs.map((doc: any) => ({
    id: String(doc.id),
    slug: doc.slug,
    judul: doc.judul,
    subKategori: doc.subKategori,
    subKategoriLabel:
      doc.subKategori === 'open-now' ? 'Open Now'
      : doc.subKategori === 'wajib-coba' ? 'Wajib Coba'
      : 'Cafe & Resto Recommended',
    featured: Boolean(doc.featured),
    tagline: doc.tagline || '',
    coverImage: getFotoUrl(doc),
    gallery: getFotoUrl(doc) ? [getFotoUrl(doc)] : [],
    deskripsi: doc.deskripsi,
    lokasi: doc.lokasi || { namaTempat: 'Desa Cijeruk', alamat: 'Kecamatan Cijeruk, Bogor' },
    jamBuka: doc.jamBuka || '08:00',
    jamTutup: doc.jamTutup || '21:00',
    hargaKisaran: doc.hargaKisaran || 'Rp 15.000 - Rp 50.000',
    menuFavorit: Array.isArray(doc.menuFavorit) ? doc.menuFavorit : [],
    rating: Number(doc.rating) || 4.8,
  }));
}

export async function getKulinerBySlug(slug: string): Promise<KulinerItem | null> {
  const doc = await fetchCollectionBySlug('kuliner', slug);
  if (!doc) return null;
  return {
    id: String(doc.id),
    slug: doc.slug,
    judul: doc.judul,
    subKategori: doc.subKategori,
    subKategoriLabel:
      doc.subKategori === 'open-now' ? 'Open Now'
      : doc.subKategori === 'wajib-coba' ? 'Wajib Coba'
      : 'Cafe & Resto Recommended',
    featured: Boolean(doc.featured),
    tagline: doc.tagline || '',
    coverImage: getFotoUrl(doc),
    gallery: getFotoUrl(doc) ? [getFotoUrl(doc)] : [],
    deskripsi: doc.deskripsi,
    lokasi: doc.lokasi || { namaTempat: 'Desa Cijeruk', alamat: 'Kecamatan Cijeruk, Bogor' },
    jamBuka: doc.jamBuka || '08:00',
    jamTutup: doc.jamTutup || '21:00',
    hargaKisaran: doc.hargaKisaran || 'Rp 15.000 - Rp 50.000',
    menuFavorit: Array.isArray(doc.menuFavorit) ? doc.menuFavorit : [],
    rating: Number(doc.rating) || 4.8,
  };
}

export async function getFeaturedKuliner(): Promise<KulinerItem[]> {
  const docs = await fetchCollection('kuliner');
  const list = docs.map((doc: any) => ({
    id: String(doc.id),
    slug: doc.slug,
    judul: doc.judul,
    subKategori: doc.subKategori,
    subKategoriLabel:
      doc.subKategori === 'open-now' ? 'Open Now'
      : doc.subKategori === 'wajib-coba' ? 'Wajib Coba'
      : 'Cafe & Resto Recommended',
    featured: Boolean(doc.featured),
    tagline: doc.tagline || '',
    coverImage: getFotoUrl(doc),
    gallery: getFotoUrl(doc) ? [getFotoUrl(doc)] : [],
    deskripsi: doc.deskripsi,
    lokasi: doc.lokasi || { namaTempat: 'Desa Cijeruk', alamat: 'Kecamatan Cijeruk, Bogor' },
    jamBuka: doc.jamBuka || '08:00',
    jamTutup: doc.jamTutup || '21:00',
    hargaKisaran: doc.hargaKisaran || 'Rp 15.000 - Rp 50.000',
    menuFavorit: Array.isArray(doc.menuFavorit) ? doc.menuFavorit : [],
    rating: Number(doc.rating) || 4.8,
  }));
  const featured = list.filter((item) => item.featured);
  return featured.length > 0 ? featured : list.slice(0, 3);
}

// === AKOMODASI ===
export async function getAkomodasiList(): Promise<AkomodasiItem[]> {
  const docs = await fetchCollection('akomodasi');
  return docs.map((doc: any) => ({
    id: String(doc.id),
    slug: doc.slug,
    judul: doc.judul,
    subKategori: doc.subKategori,
    subKategoriLabel: doc.subKategori === 'villa-resort' ? 'Villa & Resort' : 'Camping Ground',
    featured: Boolean(doc.featured),
    tagline: doc.tagline || '',
    coverImage: getFotoUrl(doc),
    gallery: getFotoUrl(doc) ? [getFotoUrl(doc)] : [],
    deskripsi: doc.deskripsi,
    lokasi: doc.lokasi || { namaTempat: 'Desa Cijeruk', alamat: 'Kecamatan Cijeruk, Bogor' },
    hargaPerMalam: doc.hargaPerMalam || 'Hubungi Pengelola',
    kapasitas: doc.kapasitas || '2 - 10 Orang',
    kontakBooking: doc.kontakBooking || {},
    fasilitas: Array.isArray(doc.fasilitas)
      ? doc.fasilitas.map((f: any) => (typeof f === 'string' ? f : f.item))
      : [],
    rating: Number(doc.rating) || 4.8,
  }));
}

export async function getAkomodasiBySlug(slug: string): Promise<AkomodasiItem | null> {
  const doc = await fetchCollectionBySlug('akomodasi', slug);
  if (!doc) return null;
  return {
    id: String(doc.id),
    slug: doc.slug,
    judul: doc.judul,
    subKategori: doc.subKategori,
    subKategoriLabel: doc.subKategori === 'villa-resort' ? 'Villa & Resort' : 'Camping Ground',
    featured: Boolean(doc.featured),
    tagline: doc.tagline || '',
    coverImage: getFotoUrl(doc),
    gallery: getFotoUrl(doc) ? [getFotoUrl(doc)] : [],
    deskripsi: doc.deskripsi,
    lokasi: doc.lokasi || { namaTempat: 'Desa Cijeruk', alamat: 'Kecamatan Cijeruk, Bogor' },
    hargaPerMalam: doc.hargaPerMalam || 'Hubungi Pengelola',
    kapasitas: doc.kapasitas || '2 - 10 Orang',
    kontakBooking: doc.kontakBooking || {},
    fasilitas: Array.isArray(doc.fasilitas)
      ? doc.fasilitas.map((f: any) => (typeof f === 'string' ? f : f.item))
      : [],
    rating: Number(doc.rating) || 4.8,
  };
}

export async function getFeaturedAkomodasi(): Promise<AkomodasiItem[]> {
  const docs = await fetchCollection('akomodasi');
  const list = docs.map((doc: any) => ({
    id: String(doc.id),
    slug: doc.slug,
    judul: doc.judul,
    subKategori: doc.subKategori,
    subKategoriLabel: doc.subKategori === 'villa-resort' ? 'Villa & Resort' : 'Camping Ground',
    featured: Boolean(doc.featured),
    tagline: doc.tagline || '',
    coverImage: getFotoUrl(doc),
    gallery: getFotoUrl(doc) ? [getFotoUrl(doc)] : [],
    deskripsi: doc.deskripsi,
    lokasi: doc.lokasi || { namaTempat: 'Desa Cijeruk', alamat: 'Kecamatan Cijeruk, Bogor' },
    hargaPerMalam: doc.hargaPerMalam || 'Hubungi Pengelola',
    kapasitas: doc.kapasitas || '2 - 10 Orang',
    kontakBooking: doc.kontakBooking || {},
    fasilitas: Array.isArray(doc.fasilitas)
      ? doc.fasilitas.map((f: any) => (typeof f === 'string' ? f : f.item))
      : [],
    rating: Number(doc.rating) || 4.8,
  }));
  const featured = list.filter((item) => item.featured);
  return featured.length > 0 ? featured : list.slice(0, 3);
}

// === SEJARAH ===
export async function getSejarahList(): Promise<SejarahItem[]> {
  const docs = await fetchCollection('sejarah');
  return docs.map((doc: any) => ({
    id: String(doc.id),
    slug: doc.slug,
    judul: doc.judul,
    era: doc.era,
    featured: Boolean(doc.featured),
    ringkasan: doc.ringkasan,
    coverImage: getFotoUrl(doc),
    gallery: getFotoUrl(doc) ? [getFotoUrl(doc)] : [],
    deskripsi: doc.deskripsi,
    lokasi: doc.lokasi || { namaTempat: 'Desa Cijeruk', alamat: 'Kecamatan Cijeruk, Bogor' },
    faktaMenarik: Array.isArray(doc.faktaMenarik)
      ? doc.faktaMenarik.map((f: any) => (typeof f === 'string' ? f : f.item))
      : [],
  }));
}

export async function getSejarahBySlug(slug: string): Promise<SejarahItem | null> {
  const doc = await fetchCollectionBySlug('sejarah', slug);
  if (!doc) return null;
  return {
    id: String(doc.id),
    slug: doc.slug,
    judul: doc.judul,
    era: doc.era,
    featured: Boolean(doc.featured),
    ringkasan: doc.ringkasan,
    coverImage: getFotoUrl(doc),
    gallery: getFotoUrl(doc) ? [getFotoUrl(doc)] : [],
    deskripsi: doc.deskripsi,
    lokasi: doc.lokasi || { namaTempat: 'Desa Cijeruk', alamat: 'Kecamatan Cijeruk, Bogor' },
    faktaMenarik: Array.isArray(doc.faktaMenarik)
      ? doc.faktaMenarik.map((f: any) => (typeof f === 'string' ? f : f.item))
      : [],
  };
}

export async function getFeaturedSejarah(): Promise<SejarahItem[]> {
  const docs = await fetchCollection('sejarah');
  const list = docs.map((doc: any) => ({
    id: String(doc.id),
    slug: doc.slug,
    judul: doc.judul,
    era: doc.era,
    featured: Boolean(doc.featured),
    ringkasan: doc.ringkasan,
    coverImage: getFotoUrl(doc),
    gallery: getFotoUrl(doc) ? [getFotoUrl(doc)] : [],
    deskripsi: doc.deskripsi,
    lokasi: doc.lokasi || { namaTempat: 'Desa Cijeruk', alamat: 'Kecamatan Cijeruk, Bogor' },
    faktaMenarik: Array.isArray(doc.faktaMenarik)
      ? doc.faktaMenarik.map((f: any) => (typeof f === 'string' ? f : f.item))
      : [],
  }));
  const featured = list.filter((item) => item.featured);
  return featured.length > 0 ? featured : list.slice(0, 2);
}

// === TOKOH ===
export async function getTokohList(): Promise<TokohItem[]> {
  const docs = await fetchCollection('tokoh');
  return docs.map((doc: any) => ({
    id: String(doc.id),
    slug: doc.slug,
    nama: doc.nama,
    peran: doc.peran,
    featured: Boolean(doc.featured),
    coverImage: getFotoUrl(doc),
    ringkasanBio: doc.ringkasanBio,
    biografiLengkap: doc.biografiLengkap,
    lokasi: doc.lokasi || { namaTempat: 'Desa Cijeruk', alamat: 'Kecamatan Cijeruk, Bogor' },
    kontribusi: Array.isArray(doc.kontribusi)
      ? doc.kontribusi.map((c: any) => (typeof c === 'string' ? c : c.item))
      : [],
  }));
}

export async function getTokohBySlug(slug: string): Promise<TokohItem | null> {
  const doc = await fetchCollectionBySlug('tokoh', slug);
  if (!doc) return null;
  return {
    id: String(doc.id),
    slug: doc.slug,
    nama: doc.nama,
    peran: doc.peran,
    featured: Boolean(doc.featured),
    coverImage: getFotoUrl(doc),
    ringkasanBio: doc.ringkasanBio,
    biografiLengkap: doc.biografiLengkap,
    lokasi: doc.lokasi || { namaTempat: 'Desa Cijeruk', alamat: 'Kecamatan Cijeruk, Bogor' },
    kontribusi: Array.isArray(doc.kontribusi)
      ? doc.kontribusi.map((c: any) => (typeof c === 'string' ? c : c.item))
      : [],
  };
}

export async function getFeaturedTokoh(): Promise<TokohItem[]> {
  const docs = await fetchCollection('tokoh');
  const list = docs.map((doc: any) => ({
    id: String(doc.id),
    slug: doc.slug,
    nama: doc.nama,
    peran: doc.peran,
    featured: Boolean(doc.featured),
    coverImage: getFotoUrl(doc),
    ringkasanBio: doc.ringkasanBio,
    biografiLengkap: doc.biografiLengkap,
    lokasi: doc.lokasi || { namaTempat: 'Desa Cijeruk', alamat: 'Kecamatan Cijeruk, Bogor' },
    kontribusi: Array.isArray(doc.kontribusi)
      ? doc.kontribusi.map((c: any) => (typeof c === 'string' ? c : c.item))
      : [],
  }));
  const featured = list.filter((item) => item.featured);
  return featured.length > 0 ? featured : list.slice(0, 2);
}

// === TERDEKAT ===
export async function getTerdekatList(): Promise<TerdekatItem[]> {
  const docs = await fetchCollection('terdekat');
  return docs.map((doc: any) => ({
    id: String(doc.id),
    slug: doc.slug,
    judul: doc.judul,
    kategori: doc.kategori,
    jarakWaktu: doc.jarakWaktu,
    tipeTrip: doc.tipeTrip,
    featured: Boolean(doc.featured),
    coverImage: getFotoUrl(doc),
    gallery: getFotoUrl(doc) ? [getFotoUrl(doc)] : [],
    tagline: doc.tagline || '',
    deskripsi: doc.deskripsi,
    lokasi: doc.lokasi || { namaTempat: 'Kawasan Sekitar Cijeruk', alamat: 'Kabupaten Bogor' },
    ruteAkses: doc.ruteAkses || '',
    hargaTiket: doc.hargaTiket || '',
  }));
}

export async function getTerdekatBySlug(slug: string): Promise<TerdekatItem | null> {
  const doc = await fetchCollectionBySlug('terdekat', slug);
  if (!doc) return null;
  return {
    id: String(doc.id),
    slug: doc.slug,
    judul: doc.judul,
    kategori: doc.kategori,
    jarakWaktu: doc.jarakWaktu,
    tipeTrip: doc.tipeTrip,
    featured: Boolean(doc.featured),
    coverImage: getFotoUrl(doc),
    gallery: getFotoUrl(doc) ? [getFotoUrl(doc)] : [],
    tagline: doc.tagline || '',
    deskripsi: doc.deskripsi,
    lokasi: doc.lokasi || { namaTempat: 'Kawasan Sekitar Cijeruk', alamat: 'Kabupaten Bogor' },
    ruteAkses: doc.ruteAkses || '',
    hargaTiket: doc.hargaTiket || '',
  };
}

export async function getFeaturedTerdekat(): Promise<TerdekatItem[]> {
  const docs = await fetchCollection('terdekat');
  const list = docs.map((doc: any) => ({
    id: String(doc.id),
    slug: doc.slug,
    judul: doc.judul,
    kategori: doc.kategori,
    jarakWaktu: doc.jarakWaktu,
    tipeTrip: doc.tipeTrip,
    featured: Boolean(doc.featured),
    coverImage: getFotoUrl(doc),
    gallery: getFotoUrl(doc) ? [getFotoUrl(doc)] : [],
    tagline: doc.tagline || '',
    deskripsi: doc.deskripsi,
    lokasi: doc.lokasi || { namaTempat: 'Kawasan Sekitar Cijeruk', alamat: 'Kabupaten Bogor' },
    ruteAkses: doc.ruteAkses || '',
    hargaTiket: doc.hargaTiket || '',
  }));
  const featured = list.filter((item) => item.featured);
  return featured.length > 0 ? featured : list.slice(0, 3);
}

// === BLOG ===
export async function getBlogList(): Promise<BlogPostItem[]> {
  const docs = await fetchCollection('blog');
  return docs.map((doc: any) => ({
    id: String(doc.id),
    slug: doc.slug,
    judul: doc.judul,
    kategori: doc.kategori,
    kategoriLabel:
      doc.kategori === 'cerita-feature' ? 'Cerita & Feature Desa'
      : doc.kategori === 'kegiatan-pengumuman' ? 'Kegiatan & Agenda KKN/Desa'
      : 'Tips & Panduan Wisatawan',
    featured: Boolean(doc.featured),
    penulis: doc.penulis || 'Tim KKN Cijeruk',
    publishedAt: doc.publishedAt
      ? new Date(doc.publishedAt).toLocaleDateString('id-ID')
      : '',
    waktuBaca: doc.waktuBaca || '3 menit baca',
    coverImage: getFotoUrl(doc),
    ringkasan: doc.ringkasan,
    konten: doc.konten,
    tags: Array.isArray(doc.tags)
      ? doc.tags.map((t: any) => (typeof t === 'string' ? t : t.tag))
      : [],
  }));
}

export async function getBlogBySlug(slug: string): Promise<BlogPostItem | null> {
  const doc = await fetchCollectionBySlug('blog', slug);
  if (!doc) return null;
  return {
    id: String(doc.id),
    slug: doc.slug,
    judul: doc.judul,
    kategori: doc.kategori,
    kategoriLabel:
      doc.kategori === 'cerita-feature' ? 'Cerita & Feature Desa'
      : doc.kategori === 'kegiatan-pengumuman' ? 'Kegiatan & Agenda KKN/Desa'
      : 'Tips & Panduan Wisatawan',
    featured: Boolean(doc.featured),
    penulis: doc.penulis || 'Tim KKN Cijeruk',
    publishedAt: doc.publishedAt
      ? new Date(doc.publishedAt).toLocaleDateString('id-ID')
      : '',
    waktuBaca: doc.waktuBaca || '3 menit baca',
    coverImage: getFotoUrl(doc),
    ringkasan: doc.ringkasan,
    konten: doc.konten,
    tags: Array.isArray(doc.tags)
      ? doc.tags.map((t: any) => (typeof t === 'string' ? t : t.tag))
      : [],
  };
}

export async function getFeaturedBlog(): Promise<BlogPostItem[]> {
  const docs = await fetchCollection('blog');
  const list = docs.map((doc: any) => ({
    id: String(doc.id),
    slug: doc.slug,
    judul: doc.judul,
    kategori: doc.kategori,
    kategoriLabel:
      doc.kategori === 'cerita-feature' ? 'Cerita & Feature Desa'
      : doc.kategori === 'kegiatan-pengumuman' ? 'Kegiatan & Agenda KKN/Desa'
      : 'Tips & Panduan Wisatawan',
    featured: Boolean(doc.featured),
    penulis: doc.penulis || 'Tim KKN Cijeruk',
    publishedAt: doc.publishedAt
      ? new Date(doc.publishedAt).toLocaleDateString('id-ID')
      : '',
    waktuBaca: doc.waktuBaca || '3 menit baca',
    coverImage: getFotoUrl(doc),
    ringkasan: doc.ringkasan,
    konten: doc.konten,
    tags: Array.isArray(doc.tags)
      ? doc.tags.map((t: any) => (typeof t === 'string' ? t : t.tag))
      : [],
  }));
  const featured = list.filter((item) => item.featured);
  return featured.length > 0 ? featured : [];
}

// === PROFIL DESA ===
export async function getProfilDesa(): Promise<ProfilDesaItem | null> {
  const docs = await fetchCollection('profil-desa');
  if (docs.length === 0) return null;
  const doc: any = docs[0];

  function resolveFotoUrl(d: any): string {
    if (!d) return '';
    if (d.url) return d.url;
    if (d.foto && d.foto.url) return d.foto.url;
    return '';
  }

  return {
    namaDesa: doc.namaDesa || 'Desa Cijeruk',
    heroImage: resolveFotoUrl(doc.heroImage),
    heroTagline: doc.heroTagline || '',
    ringkasanUmum: doc.ringkasanUmum || '',
    sejarahDesa: doc.sejarahDesa || '',
    sumberResmi: doc.sumberResmi || { portalBestieBogor: '', situsResmiDesaId: '' },
    statistik: doc.statistik || {
      jumlahPenduduk: 0, jumlahKk: 0, luasWilayahKm2: 0, ketinggianMeter: 0, jumlahRt: 0, jumlahRw: 0,
    },
    apbdesRingkasan: doc.apbdesRingkasan || { tahunAnggaran: '', totalPendapatan: '', totalBelanja: '' },
    kontakKantor: doc.kontakKantor || { alamat: '', telepon: '', email: '', jamLayanan: '' },
  };
}

// =========================================================================
// REKOMENDASI TEMPAT LAIN
// =========================================================================

export async function getRekomendasiTempat(
  kategori: 'wisata' | 'kuliner' | 'akomodasi' | 'sejarah' | 'terdekat',
  currentSlug: string,
  limit: number = 3
) {
  if (kategori === 'wisata') {
    const list = await getWisataList();
    return list
      .filter((item) => item.slug !== currentSlug)
      .slice(0, limit)
      .map((item) => ({
        id: item.id, slug: item.slug, judul: item.judul, coverImage: item.coverImage,
        subLabel: item.subKategoriLabel, extraInfo: item.hargaTiket, href: `/wisata/${item.slug}`,
      }));
  }
  if (kategori === 'kuliner') {
    const list = await getKulinerList();
    return list
      .filter((item) => item.slug !== currentSlug)
      .slice(0, limit)
      .map((item) => ({
        id: item.id, slug: item.slug, judul: item.judul, coverImage: item.coverImage,
        subLabel: item.subKategoriLabel, extraInfo: item.hargaKisaran, href: `/kuliner/${item.slug}`,
      }));
  }
  if (kategori === 'akomodasi') {
    const list = await getAkomodasiList();
    return list
      .filter((item) => item.slug !== currentSlug)
      .slice(0, limit)
      .map((item) => ({
        id: item.id, slug: item.slug, judul: item.judul, coverImage: item.coverImage,
        subLabel: item.subKategoriLabel, extraInfo: item.hargaPerMalam, href: `/akomodasi/${item.slug}`,
      }));
  }
  if (kategori === 'sejarah') {
    const list = await getSejarahList();
    return list
      .filter((item) => item.slug !== currentSlug)
      .slice(0, limit)
      .map((item) => ({
        id: item.id, slug: item.slug, judul: item.judul, coverImage: item.coverImage,
        subLabel: item.era, extraInfo: item.lokasi.namaTempat, href: `/sejarah/${item.slug}`,
      }));
  }
  if (kategori === 'terdekat') {
    const list = await getTerdekatList();
    return list
      .filter((item) => item.slug !== currentSlug)
      .slice(0, limit)
      .map((item) => ({
        id: item.id, slug: item.slug, judul: item.judul, coverImage: item.coverImage,
        subLabel: item.kategori, extraInfo: item.jarakWaktu, href: `/terdekat/${item.slug}`,
      }));
  }
  return [];
}
