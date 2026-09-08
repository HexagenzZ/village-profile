import configPromise from '../payload.config.js'
import { getPayload } from 'payload'

// This seed script is kept for compatibility but currently seeds empty
// All content is now managed through the Payload CMS admin panel
// Admin can post data directly via /admin login

async function seed() {
  console.log('🌱 Starting Payload CMS seed for Desa Cijeruk...')
  const payload = await getPayload({ config: configPromise })

  // Check if any collection already has data
  const collections = ['wisata', 'kuliner', 'akomodasi', 'sejarah', 'tokoh', 'terdekat', 'blog', 'profil-desa'] as const
  let hasData = false

  for (const col of collections) {
    const result = await payload.find({ collection: col, limit: 1 })
    if (result.docs.length > 0) {
      hasData = true
      console.log(`  ℹ Collection "${col}" already has ${result.totalDocs} document(s)`)
    } else {
      console.log(`  ✓ Collection "${col}" is empty - ready for admin input`)
    }
  }

  if (!hasData) {
    console.log('\n📝 Silakan post data melalui admin panel.')
    console.log('   Login ke /admin, lalu tambahkan konten di masing-masing koleksi.')
    console.log('   Semua halaman website akan menampilkan data dari CMS secara otomatis.\n')
  }

  console.log('✅ Seed check completed!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Error during seed check:', err)
  process.exit(1)
})
