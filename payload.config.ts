import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Wisata } from './collections/Wisata'
import { Kuliner } from './collections/Kuliner'
import { Akomodasi } from './collections/Akomodasi'
import { Sejarah } from './collections/Sejarah'
import { Tokoh } from './collections/Tokoh'
import { Terdekat } from './collections/Terdekat'
import { BlogPost } from './collections/BlogPost'
import { ProfilDesa } from './collections/ProfilDesa'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Wisata,
    Kuliner,
    Akomodasi,
    Sejarah,
    Tokoh,
    Terdekat,
    BlogPost,
    ProfilDesa,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'cijeruk-dev-secret-key-32-chars-long-kkn-bogor',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || 'postgresql://postgres:postgres@127.0.0.1:5432/cijeruk',
    },
  }),
})
