import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    // staticDir removed — Vercel Blob adapter handles storage di production.
    // Di dev local, Payload butuh public/media (buat static serve), jadi set kondisional:
    staticDir: process.env.NODE_ENV === 'development' ? 'public/media' : undefined,
    mimeTypes: ['image/*'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Teks Alternatif (Alt)',
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Keterangan Foto',
    },
  ],
}
