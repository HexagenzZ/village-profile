import Fuse from 'fuse.js';
import { SearchResultItem } from '@/lib/types';

// Client-side search via Payload REST API
const COLLECTIONS = ['wisata', 'kuliner', 'akomodasi', 'sejarah', 'tokoh', 'terdekat', 'blog'] as const;

type CollectionMap = {
  wisata: 'wisata';
  kuliner: 'kuliner';
  akomodasi: 'akomodasi';
  sejarah: 'sejarah';
  tokoh: 'tokoh';
  terdekat: 'terdekat';
  blog: 'blog';
};

export async function searchAllItems(query: string): Promise<SearchResultItem[]> {
  if (!query || query.trim().length === 0) return [];
  
  try {
    const results: SearchResultItem[] = [];
    
    for (const col of COLLECTIONS) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || ''}/api/${col}?limit=100`, {
        next: { revalidate: 300 },
      });
      
      if (!res.ok) continue;
      
      const data = await res.json();
      const docs = data.docs || [];
      
      for (const doc of docs) {
        let item: Partial<SearchResultItem> = { id: String(doc.id), image: doc.fotoUrl || (doc.foto && typeof doc.foto === 'object' ? doc.foto.url : '') };
        
        if (col === 'wisata') {
          item = {
            ...item,
            title: doc.judul,
            subtitle: `${getSubLabel(doc.subKategori)} • ${doc.lokasi?.namaTempat || 'Cijeruk'}`,
            category: 'wisata',
            categoryLabel: 'Wisata & Rekreasi',
            href: `/wisata/${doc.slug}`,
            badge: getSubLabel(doc.subKategori),
          };
        } else if (col === 'kuliner') {
          item = {
            ...item,
            title: doc.judul,
            subtitle: `${getKulinerLabel(doc.subKategori)} • ${doc.jamBuka}-${doc.jamTutup}`,
            category: 'kuliner',
            categoryLabel: 'Kuliner',
            href: `/kuliner/${doc.slug}`,
            badge: getKulinerLabel(doc.subKategori),
          };
        } else if (col === 'akomodasi') {
          item = {
            ...item,
            title: doc.judul,
            subtitle: `${doc.subKategori === 'villa-resort' ? 'Villa & Resort' : 'Camping Ground'} • ${doc.hargaPerMalam}`,
            category: 'akomodasi',
            categoryLabel: 'Akomodasi',
            href: `/akomodasi/${doc.slug}`,
            badge: doc.subKategori === 'villa-resort' ? 'Villa & Resort' : 'Camping Ground',
          };
        } else if (col === 'sejarah') {
          item = {
            ...item,
            title: doc.judul,
            subtitle: doc.era,
            category: 'sejarah',
            categoryLabel: 'Sejarah & Budaya',
            href: `/sejarah/${doc.slug}`,
            badge: 'Tempat Bersejarah',
          };
        } else if (col === 'tokoh') {
          item = {
            ...item,
            title: doc.nama,
            subtitle: doc.peran,
            category: 'tokoh',
            categoryLabel: 'Tokoh Berpengaruh',
            href: `/sejarah-tokoh?tab=tokoh`,
            badge: 'Tokoh Desa',
          };
        } else if (col === 'terdekat') {
          item = {
            ...item,
            title: doc.judul,
            subtitle: `${doc.jarakWaktu} • ${doc.kategori}`,
            category: 'terdekat',
            categoryLabel: 'Destinasi Terdekat',
            href: `/terdekat/${doc.slug}`,
            badge: doc.jarakWaktu,
          };
        } else if (col === 'blog') {
          item = {
            ...item,
            title: doc.judul,
            subtitle: `${getBlogLabel(doc.kategori)} • ${doc.waktuBaca || '3 menit baca'}`,
            category: 'blog',
            categoryLabel: 'Blog & Kabar',
            href: `/blog/${doc.slug}`,
            badge: getBlogLabel(doc.kategori),
          };
        }
        
        results.push(item as SearchResultItem);
      }
    }
    
    // Use Fuse.js for fuzzy filtering on client-side
    const fuse = new Fuse(results, {
      keys: ['title', 'subtitle', 'categoryLabel', 'badge'],
      threshold: 0.4,
      ignoreLocation: true,
    });
    
    return fuse.search(query).map((res) => res.item);
  } catch (err) {
    console.error('Search error:', err);
    return [];
  }
}

function getSubLabel(sub: string): string {
  switch (sub) {
    case 'jelajah-alam': return 'Jelajah Alam';
    case 'outdoor-activity': return 'Outdoor Activity';
    case 'aktivitas-keluarga': return 'Aktivitas Keluarga dan Anak';
    case 'spot-foto': return 'Spot Foto & Instagrammable';
    default: return sub || '';
  }
}

function getKulinerLabel(sub: string): string {
  switch (sub) {
    case 'open-now': return 'Open Now';
    case 'wajib-coba': return 'Wajib Coba';
    case 'cafe-resto': return 'Cafe & Resto Recommended';
    default: return sub || '';
  }
}

function getBlogLabel(cat: string): string {
  switch (cat) {
    case 'cerita-feature': return 'Cerita & Feature Desa';
    case 'kegiatan-pengumuman': return 'Kegiatan & Agenda KKN/Desa';
    case 'tips-wisata': return 'Tips & Panduan Wisatawan';
    default: return cat || '';
  }
}
