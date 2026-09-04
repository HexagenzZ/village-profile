import type { CollectionConfig } from 'payload'

export const Sejarah: CollectionConfig = {
  slug: 'sejarah',
  labels: {
    singular: 'Tempat Bersejarah',
    plural: 'Tempat Bersejarah',
  },
  admin: {
    useAsTitle: 'judul',
    defaultColumns: ['judul', 'era', 'featured', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'judul',
      type: 'text',
      required: true,
      label: 'Nama Tempat Bersejarah / Situs Warisan',
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
      name: 'era',
      type: 'text',
      required: true,
      label: 'Era / Periode (contoh: Era Kolonial Hindia Belanda, Abad ke-19)',
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
      name: 'ringkasan',
      type: 'textarea',
      required: true,
      label: 'Ringkasan Cerita Sejarah (1-2 paragraf)',
    },
    {
      name: 'foto',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto Tempat / Dokumen Arsip (Upload)',
    },
    {
      name: 'fotoUrl',
      type: 'text',
      label: 'Foto URL (Opsional / Unsplash)',
    },
    {
      name: 'deskripsi',
      type: 'textarea',
      required: true,
      label: 'Narasi Lengkap & Nilai Historis',
    },
    {
      name: 'lokasi',
      type: 'group',
      label: 'Informasi Lokasi Situs',
      fields: [
        {
          name: 'namaTempat',
          type: 'text',
          required: true,
          label: 'Nama Lokasi / Kampung',
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
      name: 'faktaMenarik',
      type: 'array',
      label: 'Fakta Menarik / Nilai Edukasi',
      fields: [
        {
          name: 'item',
          type: 'text',
          label: 'Fakta Sejarah',
        },
      ],
    },
  ],
}
