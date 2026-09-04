/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  MOCK_WISATA,
  MOCK_KULINER,
  MOCK_AKOMODASI,
  MOCK_SEJARAH,
  MOCK_TOKOH,
  MOCK_TERDEKAT,
  MOCK_BLOG,
  MOCK_PROFIL_DESA,
} from '@/data/mockData';
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
export { searchAllItems } from '@/lib/searchService';

// =========================================================================
// DATA FETCHERS (with Payload DB integration + graceful fallback)
// =========================================================================

export async function getWisataList(): Promise<WisataItem[]> {
  try {
    if (process.env.DATABASE_URI) {
      const { getPayload } = await import('payload');
      const configPromise = (await import('@payload-config')).default;
      const payload = await getPayload({ config: configPromise });
      const result = await payload.find({
        collection: 'wisata',
        limit: 100,
      });
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
          coverImage: doc.fotoUrl || (doc.foto && doc.foto.url) || MOCK_WISATA[0].coverImage,
          gallery: [doc.fotoUrl || (doc.foto && doc.foto.url) || MOCK_WISATA[0].coverImage],
          deskripsi: doc.deskripsi,
          lokasi: doc.lokasi || {
            namaTempat: 'Desa Cijeruk',
            alamat: 'Kecamatan Cijeruk, Kabupaten Bogor',
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
    }
  } catch {
    // Graceful fallback to static dataset
  }
  return MOCK_WISATA;
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

export async function getKulinerList(): Promise<KulinerItem[]> {
  try {
    if (process.env.DATABASE_URI) {
      const { getPayload } = await import('payload');
      const configPromise = (await import('@payload-config')).default;
      const payload = await getPayload({ config: configPromise });
      const result = await payload.find({
        collection: 'kuliner',
        limit: 100,
      });
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
          coverImage: doc.fotoUrl || (doc.foto && doc.foto.url) || MOCK_KULINER[0].coverImage,
          gallery: [doc.fotoUrl || (doc.foto && doc.foto.url) || MOCK_KULINER[0].coverImage],
          deskripsi: doc.deskripsi,
          lokasi: doc.lokasi || {
            namaTempat: 'Desa Cijeruk',
            alamat: 'Kecamatan Cijeruk, Kabupaten Bogor',
          },
          jamBuka: doc.jamBuka || '08:00',
          jamTutup: doc.jamTutup || '21:00',
          hargaKisaran: doc.hargaKisaran || 'Rp 15.000 - Rp 50.000',
          menuFavorit: Array.isArray(doc.menuFavorit) ? doc.menuFavorit : [],
          rating: Number(doc.rating) || 4.8,
        }));
      }
    }
  } catch {
    // Graceful fallback
  }
  return MOCK_KULINER;
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

export async function getAkomodasiList(): Promise<AkomodasiItem[]> {
  try {
    if (process.env.DATABASE_URI) {
      const { getPayload } = await import('payload');
      const configPromise = (await import('@payload-config')).default;
      const payload = await getPayload({ config: configPromise });
      const result = await payload.find({
        collection: 'akomodasi',
        limit: 100,
      });
      if (result.docs && result.docs.length > 0) {
        return result.docs.map((doc: any) => ({
          id: String(doc.id),
          slug: doc.slug,
          judul: doc.judul,
          subKategori: doc.subKategori,
          subKategoriLabel: doc.subKategori === 'villa-resort' ? 'Villa & Resort' : 'Camping Ground',
          featured: Boolean(doc.featured),
          tagline: doc.tagline || '',
          coverImage: doc.fotoUrl || (doc.foto && doc.foto.url) || MOCK_AKOMODASI[0].coverImage,
          gallery: [doc.fotoUrl || (doc.foto && doc.foto.url) || MOCK_AKOMODASI[0].coverImage],
          deskripsi: doc.deskripsi,
          lokasi: doc.lokasi || {
            namaTempat: 'Desa Cijeruk',
            alamat: 'Kecamatan Cijeruk, Kabupaten Bogor',
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
    }
  } catch {
    // Graceful fallback
  }
  return MOCK_AKOMODASI;
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

export async function getSejarahList(): Promise<SejarahItem[]> {
  try {
    if (process.env.DATABASE_URI) {
      const { getPayload } = await import('payload');
      const configPromise = (await import('@payload-config')).default;
      const payload = await getPayload({ config: configPromise });
      const result = await payload.find({
        collection: 'sejarah',
        limit: 100,
      });
      if (result.docs && result.docs.length > 0) {
        return result.docs.map((doc: any) => ({
          id: String(doc.id),
          slug: doc.slug,
          judul: doc.judul,
          era: doc.era,
          featured: Boolean(doc.featured),
          ringkasan: doc.ringkasan,
          coverImage: doc.fotoUrl || (doc.foto && doc.foto.url) || MOCK_SEJARAH[0].coverImage,
          gallery: [doc.fotoUrl || (doc.foto && doc.foto.url) || MOCK_SEJARAH[0].coverImage],
          deskripsi: doc.deskripsi,
          lokasi: doc.lokasi || {
            namaTempat: 'Desa Cijeruk',
            alamat: 'Kecamatan Cijeruk, Kabupaten Bogor',
          },
          faktaMenarik: Array.isArray(doc.faktaMenarik)
            ? doc.faktaMenarik.map((f: any) => (typeof f === 'string' ? f : f.item))
            : [],
        }));
      }
    }
  } catch {
    // Graceful fallback
  }
  return MOCK_SEJARAH;
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

export async function getTokohList(): Promise<TokohItem[]> {
  try {
    if (process.env.DATABASE_URI) {
      const { getPayload } = await import('payload');
      const configPromise = (await import('@payload-config')).default;
      const payload = await getPayload({ config: configPromise });
      const result = await payload.find({
        collection: 'tokoh',
        limit: 100,
      });
      if (result.docs && result.docs.length > 0) {
        return result.docs.map((doc: any) => ({
          id: String(doc.id),
          slug: doc.slug,
          nama: doc.nama,
          peran: doc.peran,
          featured: Boolean(doc.featured),
          coverImage: doc.fotoUrl || (doc.foto && doc.foto.url) || MOCK_TOKOH[0].coverImage,
          ringkasanBio: doc.ringkasanBio,
          biografiLengkap: doc.biografiLengkap,
          lokasi: doc.lokasi || {
            namaTempat: 'Desa Cijeruk',
            alamat: 'Kecamatan Cijeruk, Kabupaten Bogor',
          },
          kontribusi: Array.isArray(doc.kontribusi)
            ? doc.kontribusi.map((c: any) => (typeof c === 'string' ? c : c.item))
            : [],
        }));
      }
    }
  } catch {
    // Graceful fallback
  }
  return MOCK_TOKOH;
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

export async function getTerdekatList(): Promise<TerdekatItem[]> {
  try {
    if (process.env.DATABASE_URI) {
      const { getPayload } = await import('payload');
      const configPromise = (await import('@payload-config')).default;
      const payload = await getPayload({ config: configPromise });
      const result = await payload.find({
        collection: 'terdekat',
        limit: 100,
      });
      if (result.docs && result.docs.length > 0) {
        return result.docs.map((doc: any) => ({
          id: String(doc.id),
          slug: doc.slug,
          judul: doc.judul,
          kategori: doc.kategori,
          jarakWaktu: doc.jarakWaktu,
          tipeTrip: doc.tipeTrip,
          featured: Boolean(doc.featured),
          coverImage: doc.fotoUrl || (doc.foto && doc.foto.url) || MOCK_TERDEKAT[0].coverImage,
          gallery: [doc.fotoUrl || (doc.foto && doc.foto.url) || MOCK_TERDEKAT[0].coverImage],
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
    }
  } catch {
    // Graceful fallback
  }
  return MOCK_TERDEKAT;
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

export async function getBlogList(): Promise<BlogPostItem[]> {
  try {
    if (process.env.DATABASE_URI) {
      const { getPayload } = await import('payload');
      const configPromise = (await import('@payload-config')).default;
      const payload = await getPayload({ config: configPromise });
      const result = await payload.find({
        collection: 'blog',
        limit: 100,
      });
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
          publishedAt: doc.publishedAt ? new Date(doc.publishedAt).toLocaleDateString('id-ID') : 'Agustus 2026',
          waktuBaca: doc.waktuBaca || '3 menit baca',
          coverImage: doc.fotoUrl || (doc.foto && doc.foto.url) || MOCK_BLOG[0].coverImage,
          ringkasan: doc.ringkasan,
          konten: doc.konten,
          tags: Array.isArray(doc.tags)
            ? doc.tags.map((t: any) => (typeof t === 'string' ? t : t.tag))
            : [],
        }));
      }
    }
  } catch {
    // Graceful fallback
  }
  return MOCK_BLOG;
}

export async function getBlogBySlug(slug: string): Promise<BlogPostItem | null> {
  const list = await getBlogList();
  return list.find((item) => item.slug === slug) || null;
}

export async function getFeaturedBlog(): Promise<BlogPostItem[]> {
  const list = await getBlogList();
  const featured = list.filter((item) => item.featured);
  return featured.length > 0 ? featured : list.slice(0, 3);
}

export async function getProfilDesa(): Promise<ProfilDesaItem> {
  try {
    if (process.env.DATABASE_URI) {
      const { getPayload } = await import('payload');
      const configPromise = (await import('@payload-config')).default;
      const payload = await getPayload({ config: configPromise });
      const result = await payload.find({
        collection: 'profil-desa',
        limit: 1,
      });
      if (result.docs && result.docs.length > 0) {
        const doc: any = result.docs[0];
        return {
          namaDesa: doc.namaDesa || MOCK_PROFIL_DESA.namaDesa,
          ringkasanUmum: doc.ringkasanUmum || MOCK_PROFIL_DESA.ringkasanUmum,
          sejarahDesa: doc.sejarahDesa || MOCK_PROFIL_DESA.sejarahDesa,
          sumberResmi: doc.sumberResmi || MOCK_PROFIL_DESA.sumberResmi,
          statistik: doc.statistik || MOCK_PROFIL_DESA.statistik,
          apbdesRingkasan: doc.apbdesRingkasan || MOCK_PROFIL_DESA.apbdesRingkasan,
          kontakKantor: doc.kontakKantor || MOCK_PROFIL_DESA.kontakKantor,
        };
      }
    }
  } catch {
    // Graceful fallback
  }
  return MOCK_PROFIL_DESA;
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
