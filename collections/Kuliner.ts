import type { CollectionConfig } from 'payload'

export const Kuliner: CollectionConfig = {
  slug: 'kuliner',
  labels: {
    singular: 'Kuliner & Kafe',
    plural: 'Kuliner & Kafe',
  },
  admin: {
    useAsTitle: 'judul',
    defaultColumns: ['judul', 'subKategori', 'jamBuka', 'jamTutup', 'hargaKisaran', 'featured'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'judul',
      type: 'text',
      required: true,
      label: 'Nama Tempat Kuliner / Rumah Makan',
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
        { label: 'Open Now', value: 'open-now' },
        { label: 'Wajib Coba', value: 'wajib-coba' },
        { label: 'Cafe & Resto Recommended', value: 'cafe-resto' },
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
      label: 'Tagline Rasa / Suasana',
    },
    {
      name: 'foto',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto Tempat Kuliner (Upload)',
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
      label: 'Deskripsi Kuliner',
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
          label: 'Nama Tempat / Jalan',
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
      name: 'jamBuka',
      type: 'text',
      required: true,
      label: 'Jam Buka (contoh: 08:00)',
      defaultValue: '08:00',
    },
    {
      name: 'jamTutup',
      type: 'text',
      required: true,
      label: 'Jam Tutup (contoh: 21:00)',
      defaultValue: '21:00',
    },
    {
      name: 'hargaKisaran',
      type: 'text',
      required: true,
      label: 'Kisaran Harga (contoh: Rp 15.000 - Rp 50.000)',
    },
    {
      name: 'menuFavorit',
      type: 'array',
      label: 'Menu Rekomendasi / Wajib Coba',
      fields: [
        {
          name: 'namaMenu',
          type: 'text',
          required: true,
          label: 'Nama Menu',
        },
        {
          name: 'harga',
          type: 'text',
          label: 'Harga Menu (Opsional)',
        },
      ],
    },
    {
      name: 'rating',
      type: 'number',
      label: 'Rating (1 - 5)',
      defaultValue: 4.7,
    },
  ],
}
