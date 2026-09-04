import type { CollectionConfig } from 'payload'

export const Wisata: CollectionConfig = {
  slug: 'wisata',
  labels: {
    singular: 'Destinasi Wisata',
    plural: 'Destinasi Wisata',
  },
  admin: {
    useAsTitle: 'judul',
    defaultColumns: ['judul', 'subKategori', 'featured', 'rating', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'judul',
      type: 'text',
      required: true,
      label: 'Nama Destinasi Wisata',
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
      name: 'subKategori',
      type: 'select',
      required: true,
      label: 'Sub Kategori',
      options: [
        { label: 'Jelajah Alam', value: 'jelajah-alam' },
        { label: 'Outdoor Activity', value: 'outdoor-activity' },
        { label: 'Aktivitas Keluarga dan Anak', value: 'aktivitas-keluarga' },
        { label: 'Spot Foto & Instagrammable', value: 'spot-foto' },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Tampilkan di Highlight Beranda (Featured)',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline Singkat',
    },
    {
      name: 'foto',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto Utama (Upload)',
    },
    {
      name: 'fotoUrl',
      type: 'text',
      label: 'Foto Utama URL (Opsional / External Unsplash)',
    },
    {
      name: 'deskripsi',
      type: 'textarea',
      required: true,
      label: 'Deskripsi Lengkap',
    },
    {
      name: 'lokasi',
      type: 'group',
      label: 'Informasi Lokasi',
      fields: [
        {
          name: 'namaTempat',
          type: 'text',
          required: true,
          label: 'Nama Tempat / Kawasan',
        },
        {
          name: 'alamat',
          type: 'textarea',
          required: true,
          label: 'Alamat Lengkap',
        },
        {
          name: 'latitude',
          type: 'number',
          label: 'Latitude (Disiapkan untuk Leaflet)',
        },
        {
          name: 'longitude',
          type: 'number',
          label: 'Longitude (Disiapkan untuk Leaflet)',
        },
      ],
    },
    {
      name: 'hargaTiket',
      type: 'text',
      label: 'Harga Tiket Masuk',
    },
    {
      name: 'jamBuka',
      type: 'text',
      label: 'Jam Operasional',
    },
    {
      name: 'rating',
      type: 'number',
      label: 'Rating (1 - 5)',
      defaultValue: 4.8,
    },
    {
      name: 'fasilitas',
      type: 'array',
      label: 'Fasilitas Wisata',
      fields: [
        {
          name: 'item',
          type: 'text',
          label: 'Nama Fasilitas',
        },
      ],
    },
    {
      name: 'highlights',
      type: 'array',
      label: 'Daya Tarik Utama',
      fields: [
        {
          name: 'item',
          type: 'text',
          label: 'Keunggulan / Highlight',
        },
      ],
    },
  ],
}
