import type { CollectionConfig } from 'payload'

export const BlogPost: CollectionConfig = {
  slug: 'blog',
  labels: {
    singular: 'Artikel Blog',
    plural: 'Artikel Blog',
  },
  admin: {
    useAsTitle: 'judul',
    defaultColumns: ['judul', 'kategori', 'penulis', 'publishedAt', 'featured'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'judul',
      type: 'text',
      required: true,
      label: 'Judul Artikel',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug URL',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'kategori',
      type: 'select',
      required: true,
      label: 'Kategori Artikel',
      options: [
        { label: 'Cerita & Feature Desa', value: 'cerita-feature' },
        { label: 'Kegiatan & Agenda KKN/Desa', value: 'kegiatan-pengumuman' },
        { label: 'Tips & Panduan Wisatawan', value: 'tips-wisata' },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Tampilkan sebagai Artikel Utama / Sorotan',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'penulis',
      type: 'text',
      required: true,
      label: 'Nama Penulis / Tim KKN',
      defaultValue: 'Tim KKN Cijeruk',
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Tanggal Publikasi',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'waktuBaca',
      type: 'text',
      label: 'Estimasi Waktu Baca (contoh: 3 menit baca)',
      defaultValue: '3 menit baca',
    },
    {
      name: 'foto',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto Sampul (Upload)',
    },
    {
      name: 'fotoUrl',
      type: 'text',
      label: 'Foto URL (Opsional / Unsplash)',
    },
    {
      name: 'ringkasan',
      type: 'textarea',
      required: true,
      label: 'Ringkasan / Excerpt Singkat',
    },
    {
      name: 'konten',
      type: 'textarea',
      required: true,
      label: 'Isi Konten Artikel Lengkap',
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tagar Artikel',
      fields: [
        {
          name: 'tag',
          type: 'text',
          label: 'Tag',
        },
      ],
    },
  ],
}
