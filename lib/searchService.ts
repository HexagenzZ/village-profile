import Fuse from 'fuse.js';
import {
  MOCK_WISATA,
  MOCK_KULINER,
  MOCK_AKOMODASI,
  MOCK_SEJARAH,
  MOCK_TOKOH,
  MOCK_TERDEKAT,
  MOCK_BLOG,
} from '@/data/mockData';
import { SearchResultItem } from '@/lib/types';

const searchableList: SearchResultItem[] = [
  ...MOCK_WISATA.map((w) => ({
    id: w.id,
    title: w.judul,
    subtitle: `${w.subKategoriLabel} • ${w.lokasi.namaTempat}`,
    category: 'wisata' as const,
    categoryLabel: 'Wisata & Rekreasi',
    href: `/wisata/${w.slug}`,
    image: w.coverImage,
    badge: w.subKategoriLabel,
  })),
  ...MOCK_KULINER.map((k) => ({
    id: k.id,
    title: k.judul,
    subtitle: `${k.subKategoriLabel} • Buka ${k.jamBuka}-${k.jamTutup}`,
    category: 'kuliner' as const,
    categoryLabel: 'Kuliner',
    href: `/kuliner/${k.slug}`,
    image: k.coverImage,
    badge: k.subKategoriLabel,
  })),
  ...MOCK_AKOMODASI.map((a) => ({
    id: a.id,
    title: a.judul,
    subtitle: `${a.subKategoriLabel} • ${a.hargaPerMalam}`,
    category: 'akomodasi' as const,
    categoryLabel: 'Akomodasi',
    href: `/akomodasi/${a.slug}`,
    image: a.coverImage,
    badge: a.subKategoriLabel,
  })),
  ...MOCK_SEJARAH.map((s) => ({
    id: s.id,
    title: s.judul,
    subtitle: `${s.era}`,
    category: 'sejarah' as const,
    categoryLabel: 'Sejarah & Budaya',
    href: `/sejarah/${s.slug}`,
    image: s.coverImage,
    badge: 'Tempat Bersejarah',
  })),
  ...MOCK_TOKOH.map((t) => ({
    id: t.id,
    title: t.nama,
    subtitle: t.peran,
    category: 'tokoh' as const,
    categoryLabel: 'Tokoh Berpengaruh',
    href: `/sejarah-tokoh?tab=tokoh`,
    image: t.coverImage,
    badge: 'Tokoh Desa',
  })),
  ...MOCK_TERDEKAT.map((td) => ({
    id: td.id,
    title: td.judul,
    subtitle: `${td.jarakWaktu} • ${td.kategori}`,
    category: 'terdekat' as const,
    categoryLabel: 'Destinasi Terdekat',
    href: `/terdekat/${td.slug}`,
    image: td.coverImage,
    badge: td.jarakWaktu,
  })),
  ...MOCK_BLOG.map((b) => ({
    id: b.id,
    title: b.judul,
    subtitle: `${b.kategoriLabel} • ${b.waktuBaca}`,
    category: 'blog' as const,
    categoryLabel: 'Blog & Kabar',
    href: `/blog/${b.slug}`,
    image: b.coverImage,
    badge: b.kategoriLabel,
  })),
];

const fuse = new Fuse(searchableList, {
  keys: ['title', 'subtitle', 'categoryLabel', 'badge'],
  threshold: 0.4,
  ignoreLocation: true,
});

export function searchAllItems(query: string): SearchResultItem[] {
  if (!query || query.trim().length === 0) return [];
  return fuse.search(query).map((res) => res.item);
}
