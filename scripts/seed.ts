import configPromise from '../payload.config.js'
import { getPayload } from 'payload'
import {
  MOCK_WISATA,
  MOCK_KULINER,
  MOCK_AKOMODASI,
  MOCK_SEJARAH,
  MOCK_TOKOH,
  MOCK_TERDEKAT,
  MOCK_BLOG,
  MOCK_PROFIL_DESA,
} from '../data/mockData.js'

async function seed() {
  console.log('🌱 Starting Payload CMS database seed for Desa Cijeruk...')
  const payload = await getPayload({ config: configPromise })

  // 1. Seed Wisata
  for (const item of MOCK_WISATA) {
    const existing = await payload.find({
      collection: 'wisata',
      where: { slug: { equals: item.slug } },
      limit: 1,
    })
    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'wisata',
        data: {
          judul: item.judul,
          slug: item.slug,
          subKategori: item.subKategori,
          featured: item.featured,
          tagline: item.tagline,
          fotoUrl: item.coverImage,
          deskripsi: item.deskripsi,
          lokasi: item.lokasi,
          hargaTiket: item.hargaTiket,
          jamBuka: item.jamBuka,
          rating: item.rating,
          fasilitas: item.fasilitas.map((f) => ({ item: f })),
          highlights: item.highlights.map((h) => ({ item: h })),
        },
      })
      console.log(`  ✓ Created Wisata: ${item.judul}`)
    }
  }

  // 2. Seed Kuliner
  for (const item of MOCK_KULINER) {
    const existing = await payload.find({
      collection: 'kuliner',
      where: { slug: { equals: item.slug } },
      limit: 1,
    })
    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'kuliner',
        data: {
          judul: item.judul,
          slug: item.slug,
          subKategori: item.subKategori,
          featured: item.featured,
          tagline: item.tagline,
          fotoUrl: item.coverImage,
          deskripsi: item.deskripsi,
          lokasi: item.lokasi,
          jamBuka: item.jamBuka,
          jamTutup: item.jamTutup,
          hargaKisaran: item.hargaKisaran,
          menuFavorit: item.menuFavorit,
          rating: item.rating,
        },
      })
      console.log(`  ✓ Created Kuliner: ${item.judul}`)
    }
  }

  // 3. Seed Akomodasi
  for (const item of MOCK_AKOMODASI) {
    const existing = await payload.find({
      collection: 'akomodasi',
      where: { slug: { equals: item.slug } },
      limit: 1,
    })
    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'akomodasi',
        data: {
          judul: item.judul,
          slug: item.slug,
          subKategori: item.subKategori,
          featured: item.featured,
          tagline: item.tagline,
          fotoUrl: item.coverImage,
          deskripsi: item.deskripsi,
          lokasi: item.lokasi,
          hargaPerMalam: item.hargaPerMalam,
          kapasitas: item.kapasitas,
          kontakBooking: item.kontakBooking,
          fasilitas: item.fasilitas.map((f) => ({ item: f })),
          rating: item.rating,
        },
      })
      console.log(`  ✓ Created Akomodasi: ${item.judul}`)
    }
  }

  // 4. Seed Sejarah
  for (const item of MOCK_SEJARAH) {
    const existing = await payload.find({
      collection: 'sejarah',
      where: { slug: { equals: item.slug } },
      limit: 1,
    })
    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'sejarah',
        data: {
          judul: item.judul,
          slug: item.slug,
          era: item.era,
          featured: item.featured,
          ringkasan: item.ringkasan,
          fotoUrl: item.coverImage,
          deskripsi: item.deskripsi,
          lokasi: item.lokasi,
          faktaMenarik: item.faktaMenarik.map((f) => ({ item: f })),
        },
      })
      console.log(`  ✓ Created Sejarah: ${item.judul}`)
    }
  }

  // 5. Seed Tokoh
  for (const item of MOCK_TOKOH) {
    const existing = await payload.find({
      collection: 'tokoh',
      where: { slug: { equals: item.slug } },
      limit: 1,
    })
    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'tokoh',
        data: {
          nama: item.nama,
          slug: item.slug,
          peran: item.peran,
          featured: item.featured,
          fotoUrl: item.coverImage,
          ringkasanBio: item.ringkasanBio,
          biografiLengkap: item.biografiLengkap,
          lokasi: item.lokasi,
          kontribusi: item.kontribusi.map((c) => ({ item: c })),
        },
      })
      console.log(`  ✓ Created Tokoh: ${item.nama}`)
    }
  }

  // 6. Seed Terdekat
  for (const item of MOCK_TERDEKAT) {
    const existing = await payload.find({
      collection: 'terdekat',
      where: { slug: { equals: item.slug } },
      limit: 1,
    })
    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'terdekat',
        data: {
          judul: item.judul,
          slug: item.slug,
          kategori: 'danau-air',
          jarakWaktu: item.jarakWaktu,
          tipeTrip: item.tipeTrip,
          featured: item.featured,
          fotoUrl: item.coverImage,
          tagline: item.tagline,
          deskripsi: item.deskripsi,
          lokasi: item.lokasi,
          ruteAkses: item.ruteAkses,
          hargaTiket: item.hargaTiket,
        },
      })
      console.log(`  ✓ Created Terdekat: ${item.judul}`)
    }
  }

  // 7. Seed Blog
  for (const item of MOCK_BLOG) {
    const existing = await payload.find({
      collection: 'blog',
      where: { slug: { equals: item.slug } },
      limit: 1,
    })
    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'blog',
        data: {
          judul: item.judul,
          slug: item.slug,
          kategori: item.kategori,
          featured: item.featured,
          penulis: item.penulis,
          waktuBaca: item.waktuBaca,
          fotoUrl: item.coverImage,
          ringkasan: item.ringkasan,
          konten: item.konten,
          tags: item.tags.map((t) => ({ tag: t })),
        },
      })
      console.log(`  ✓ Created Blog: ${item.judul}`)
    }
  }

  // 8. Seed Profil Desa
  const existingProfil = await payload.find({
    collection: 'profil-desa',
    limit: 1,
  })
  if (existingProfil.docs.length === 0) {
    await payload.create({
      collection: 'profil-desa',
      data: {
        namaDesa: MOCK_PROFIL_DESA.namaDesa,
        ringkasanUmum: MOCK_PROFIL_DESA.ringkasanUmum,
        sejarahDesa: MOCK_PROFIL_DESA.sejarahDesa,
        sumberResmi: MOCK_PROFIL_DESA.sumberResmi,
        statistik: MOCK_PROFIL_DESA.statistik,
        apbdesRingkasan: MOCK_PROFIL_DESA.apbdesRingkasan,
        kontakKantor: MOCK_PROFIL_DESA.kontakKantor,
      },
    })
    console.log(`  ✓ Created Profil Desa`)
  }

  console.log('✅ Payload CMS seed completed successfully!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Error seeding Payload CMS:', err)
  process.exit(1)
})
