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
// (searchService re-exports its own searchAllItems for client use)

// =========================================================================
// PAYLOAD CLIENT HELPER (server-side only)
// =========================================================================
import { getPayload } from 'payload';

async function getPayloadClient() {
  const configPromise = (await import('@payload-config')).default;
  return getPayload({ config: configPromise });
}

function getFotoUrl(doc: any): string {
  if (doc.fotoUrl) return doc.fotoUrl;
  if (doc.foto && doc.foto.url) return doc.foto.url;
  return '';
}

// === WISATA ===
export async function getWisataList(): Promise<WisataItem[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({ collection: 'wisata', limit: 100 });
    if (result.docs && result.docs.length > 0) {
      return result.docs.map((doc: any) => ({
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
        lokasi: doc.lokasi || {
          namaTempat: 'Desa Cijeruk',
          alamat: 'Kecamatan Cijeruk, Bogor',
        },
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
  } catch (err) {
    console.error('Error fetching wisata:', err);
  }
  return [];
}

export async function getWisataBySlug(slug: string): Promise<WisataItem | null> {
  const list = await getWisataList();
  return list.find((item) => item.slug === slug) || null;
}

export async function getFeaturedWisata(): Promise<WisataItem[]> {
  const list = await getWisataList();
  const featured = list.filter((item) => item.featured);
  return featured.length > 0 ? featured : list.slice(0, 3);
}

// === KULINER ===
export async function getKulinerList(): Promise<KulinerItem[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({ collection: 'kuliner', limit: 100 });
    if (result.docs && result.docs.length > 0) {
      return result.docs.map((doc: any) => ({
        id: String(doc.id),
        slug: doc.slug,
        judul: doc.judul,
        subKategori: doc.subKategori,
        subKategoriLabel:
          doc.subKategori === 'open-now'
            ? 'Open Now'
            : doc.subKategori === 'wajib-coba'
            ? 'Wajib Coba'
            : 'Cafe & Resto Recommended',
        featured: Boolean(doc.featured),
        tagline: doc.tagline || '',
        coverImage: getFotoUrl(doc),
        gallery: getFotoUrl(doc) ? [getFotoUrl(doc)] : [],
        deskripsi: doc.deskripsi,
        lokasi: doc.lokasi || {
          namaTempat: 'Desa Cijeruk',
          alamat: 'Kecamatan Cijeruk, Bogor',
        },
        jamBuka: doc.jamBuka || '08:00',
        jamTutup: doc.jamTutup || '21:00',
        hargaKisaran: doc.hargaKisaran || 'Rp 15.000 - Rp 50.000',
        menuFavorit: Array.isArray(doc.menuFavorit) ? doc.menuFavorit : [],
        rating: Number(doc.rating) || 4.8,
      }));
    }
  } catch (err) {
    console.error('Error fetching kuliner:', err);
  }
  return [];
}

export async function getKulinerBySlug(slug: string): Promise<KulinerItem | null> {
  const list = await getKulinerList();
  return list.find((item) => item.slug === slug) || null;
}

export async function getFeaturedKuliner(): Promise<KulinerItem[]> {
  const list = await getKulinerList();
  const featured = list.filter((item) => item.featured);
  return featured.length > 0 ? featured : list.slice(0, 3);
}

// === AKOMODASI ===
export async function getAkomodasiList(): Promise<AkomodasiItem[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({ collection: 'akomodasi', limit: 100 });
    if (result.docs && result.docs.length > 0) {
      return result.docs.map((doc: any) => ({
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
        lokasi: doc.lokasi || {
          namaTempat: 'Desa Cijeruk',
          alamat: 'Kecamatan Cijeruk, Bogor',
        },
        hargaPerMalam: doc.hargaPerMalam || 'Hubungi Pengelola',
        kapasitas: doc.kapasitas || '2 - 10 Orang',
        kontakBooking: doc.kontakBooking || {},
        fasilitas: Array.isArray(doc.fasilitas)
          ? doc.fasilitas.map((f: any) => (typeof f === 'string' ? f : f.item))
          : [],
        rating: Number(doc.rating) || 4.8,
      }));
    }
  } catch (err) {
    console.error('Error fetching akomodasi:', err);
  }
  return [];
}

export async function getAkomodasiBySlug(slug: string): Promise<AkomodasiItem | null> {
  const list = await getAkomodasiList();
  return list.find((item) => item.slug === slug) || null;
}

export async function getFeaturedAkomodasi(): Promise<AkomodasiItem[]> {
  const list = await getAkomodasiList();
  const featured = list.filter((item) => item.featured);
  return featured.length > 0 ? featured : list.slice(0, 3);
}

// === SEJARAH ===
export async function getSejarahList(): Promise<SejarahItem[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({ collection: 'sejarah', limit: 100 });
    if (result.docs && result.docs.length > 0) {
      return result.docs.map((doc: any) => ({
        id: String(doc.id),
        slug: doc.slug,
        judul: doc.judul,
        era: doc.era,
        featured: Boolean(doc.featured),
        ringkasan: doc.ringkasan,
        coverImage: getFotoUrl(doc),
        gallery: getFotoUrl(doc) ? [getFotoUrl(doc)] : [],
        deskripsi: doc.deskripsi,
        lokasi: doc.lokasi || {
          namaTempat: 'Desa Cijeruk',
          alamat: 'Kecamatan Cijeruk, Bogor',
        },
        faktaMenarik: Array.isArray(doc.faktaMenarik)
          ? doc.faktaMenarik.map((f: any) => (typeof f === 'string' ? f : f.item))
          : [],
      }));
    }
  } catch (err) {
    console.error('Error fetching sejarah:', err);
  }
  return [];
}

export async function getSejarahBySlug(slug: string): Promise<SejarahItem | null> {
  const list = await getSejarahList();
  return list.find((item) => item.slug === slug) || null;
}

export async function getFeaturedSejarah(): Promise<SejarahItem[]> {
  const list = await getSejarahList();
  const featured = list.filter((item) => item.featured);
  return featured.length > 0 ? featured : list.slice(0, 2);
}

// === TOKOH ===
export async function getTokohList(): Promise<TokohItem[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({ collection: 'tokoh', limit: 100 });
    if (result.docs && result.docs.length > 0) {
      return result.docs.map((doc: any) => ({
        id: String(doc.id),
        slug: doc.slug,
        nama: doc.nama,
        peran: doc.peran,
        featured: Boolean(doc.featured),
        coverImage: getFotoUrl(doc),
        ringkasanBio: doc.ringkasanBio,
        biografiLengkap: doc.biografiLengkap,
        lokasi: doc.lokasi || {
          namaTempat: 'Desa Cijeruk',
          alamat: 'Kecamatan Cijeruk, Bogor',
        },
        kontribusi: Array.isArray(doc.kontribusi)
          ? doc.kontribusi.map((c: any) => (typeof c === 'string' ? c : c.item))
          : [],
      }));
    }
  } catch (err) {
    console.error('Error fetching tokoh:', err);
  }
  return [];
}

export async function getTokohBySlug(slug: string): Promise<TokohItem | null> {
  const list = await getTokohList();
  return list.find((item) => item.slug === slug) || null;
}

export async function getFeaturedTokoh(): Promise<TokohItem[]> {
  const list = await getTokohList();
  const featured = list.filter((item) => item.featured);
  return featured.length > 0 ? featured : list.slice(0, 2);
}

// === TERDEKAT ===
export async function getTerdekatList(): Promise<TerdekatItem[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({ collection: 'terdekat', limit: 100 });
    if (result.docs && result.docs.length > 0) {
      return result.docs.map((doc: any) => ({
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
        lokasi: doc.lokasi || {
          namaTempat: 'Kawasan Sekitar Cijeruk',
          alamat: 'Kabupaten Bogor',
        },
        ruteAkses: doc.ruteAkses || '',
        hargaTiket: doc.hargaTiket || '',
      }));
    }
  } catch (err) {
    console.error('Error fetching terdekat:', err);
  }
  return [];
}

export async function getTerdekatBySlug(slug: string): Promise<TerdekatItem | null> {
  const list = await getTerdekatList();
  return list.find((item) => item.slug === slug) || null;
}

export async function getFeaturedTerdekat(): Promise<TerdekatItem[]> {
  const list = await getTerdekatList();
  const featured = list.filter((item) => item.featured);
  return featured.length > 0 ? featured : list.slice(0, 3);
}

// === BLOG ===
export async function getBlogList(): Promise<BlogPostItem[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({ collection: 'blog', limit: 100 });
    if (result.docs && result.docs.length > 0) {
      return result.docs.map((doc: any) => ({
        id: String(doc.id),
        slug: doc.slug,
        judul: doc.judul,
        kategori: doc.kategori,
        kategoriLabel:
          doc.kategori === 'cerita-feature'
            ? 'Cerita & Feature Desa'
            : doc.kategori === 'kegiatan-pengumuman'
            ? 'Kegiatan & Agenda KKN/Desa'
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
  } catch (err) {
    console.error('Error fetching blog:', err);
  }
  return [];
}

export async function getBlogBySlug(slug: string): Promise<BlogPostItem | null> {
  const list = await getBlogList();
  return list.find((item) => item.slug === slug) || null;
}

export async function getFeaturedBlog(): Promise<BlogPostItem[]> {
  const list = await getBlogList();
  const featured = list.filter((item) => item.featured);
  return featured.length > 0 ? featured : [];
}

// === PROFIL DESA ===
export async function getProfilDesa(): Promise<ProfilDesaItem | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'profil-desa',
      limit: 1,
    });
    if (result.docs && result.docs.length > 0) {
      const doc: any = result.docs[0];

      function getFotoUrl(d: any): string {
        if (!d) return '';
        if (d.url) return d.url;
        if (d.fotoUrl) return d.fotoUrl;
        if (d.foto && d.foto.url) return d.foto.url;
        return '';
      }

      return {
        namaDesa: doc.namaDesa || 'Desa Cijeruk',
        heroImage: getFotoUrl(doc.heroImage),
        heroTagline: doc.heroTagline || '',
        ringkasanUmum: doc.ringkasanUmum || '',
        sejarahDesa: doc.sejarahDesa || '',
        sumberResmi: doc.sumberResmi || {
          portalBestieBogor: '',
          situsResmiDesaId: '',
        },
        statistik: doc.statistik || {
          jumlahPenduduk: 0,
          jumlahKk: 0,
          luasWilayahKm2: 0,
          ketinggianMeter: 0,
          jumlahRt: 0,
          jumlahRw: 0,
        },
        apbdesRingkasan: doc.apbdesRingkasan || {
          tahunAnggaran: '',
          totalPendapatan: '',
          totalBelanja: '',
        },
        kontakKantor: doc.kontakKantor || {
          alamat: '',
          telepon: '',
          email: '',
          jamLayanan: '',
        },
      };
    }
  } catch (err) {
    console.error('Error fetching profil desa:', err);
  }
  return null;
}

// =========================================================================
// REKOMENDASI OTOMATIS TEMPAT LAINNYA
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
        id: item.id,
        slug: item.slug,
        judul: item.judul,
        coverImage: item.coverImage,
        subLabel: item.subKategoriLabel,
        extraInfo: item.hargaTiket,
        href: `/wisata/${item.slug}`,
      }));
  }
  if (kategori === 'kuliner') {
    const list = await getKulinerList();
    return list
      .filter((item) => item.slug !== currentSlug)
      .slice(0, limit)
      .map((item) => ({
        id: item.id,
        slug: item.slug,
        judul: item.judul,
        coverImage: item.coverImage,
        subLabel: item.subKategoriLabel,
        extraInfo: item.hargaKisaran,
        href: `/kuliner/${item.slug}`,
      }));
  }
  if (kategori === 'akomodasi') {
    const list = await getAkomodasiList();
    return list
      .filter((item) => item.slug !== currentSlug)
      .slice(0, limit)
      .map((item) => ({
        id: item.id,
        slug: item.slug,
        judul: item.judul,
        coverImage: item.coverImage,
        subLabel: item.subKategoriLabel,
        extraInfo: item.hargaPerMalam,
        href: `/akomodasi/${item.slug}`,
      }));
  }
  if (kategori === 'sejarah') {
    const list = await getSejarahList();
    return list
      .filter((item) => item.slug !== currentSlug)
      .slice(0, limit)
      .map((item) => ({
        id: item.id,
        slug: item.slug,
        judul: item.judul,
        coverImage: item.coverImage,
        subLabel: item.era,
        extraInfo: item.lokasi.namaTempat,
        href: `/sejarah/${item.slug}`,
      }));
  }
  if (kategori === 'terdekat') {
    const list = await getTerdekatList();
    return list
      .filter((item) => item.slug !== currentSlug)
      .slice(0, limit)
      .map((item) => ({
        id: item.id,
        slug: item.slug,
        judul: item.judul,
        coverImage: item.coverImage,
        subLabel: item.kategori,
        extraInfo: item.jarakWaktu,
        href: `/terdekat/${item.slug}`,
      }));
  }
  return [];
}
